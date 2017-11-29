(function (global) {
    var Scheduler = (function () {
        function Scheduler() {
            this.nextId = 0;
            this._schedulerQueue = [];
            this._currentTime = 0;
        }
        Scheduler.prototype.scheduleFunction = function (cb, delay, args, isPeriodic, isRequestAnimationFrame, id) {
            if (args === void 0) { args = []; }
            if (isPeriodic === void 0) { isPeriodic = false; }
            if (isRequestAnimationFrame === void 0) { isRequestAnimationFrame = false; }
            if (id === void 0) { id = -1; }
            var currentId = id < 0 ? this.nextId++ : id;
            var endTime = this._currentTime + delay;
            var newEntry = {
                endTime: endTime,
                id: currentId,
                func: cb,
                args: args,
                delay: delay,
                isPeriodic: isPeriodic,
                isRequestAnimationFrame: isRequestAnimationFrame
            };
            var i = 0;
            for (; i < this._schedulerQueue.length; i++) {
                var currentEntry = this._schedulerQueue[i];
                if (newEntry.endTime < currentEntry.endTime) {
                    break;
                }
            }
            this._schedulerQueue.splice(i, 0, newEntry);
            return currentId;
        };
        Scheduler.prototype.removeScheduledFunctionWithId = function (id) {
            for (var i = 0; i < this._schedulerQueue.length; i++) {
                if (this._schedulerQueue[i].id == id) {
                    this._schedulerQueue.splice(i, 1);
                    break;
                }
            }
        };
        Scheduler.prototype.tick = function (millis, doTick) {
            if (millis === void 0) { millis = 0; }
            var finalTime = this._currentTime + millis;
            var lastCurrentTime = 0;
            if (this._schedulerQueue.length === 0 && doTick) {
                doTick(millis);
                return;
            }
            while (this._schedulerQueue.length > 0) {
                var current = this._schedulerQueue[0];
                if (finalTime < current.endTime) {
                    break;
                }
                else {
                    var current_1 = this._schedulerQueue.shift();
                    lastCurrentTime = this._currentTime;
                    this._currentTime = current_1.endTime;
                    if (doTick) {
                        doTick(this._currentTime - lastCurrentTime);
                    }
                    var retval = current_1.func.apply(global, current_1.args);
                    if (!retval) {
                        break;
                    }
                }
            }
            this._currentTime = finalTime;
        };
        Scheduler.prototype.flush = function (limit, flushPeriodic, doTick) {
            if (limit === void 0) { limit = 20; }
            if (flushPeriodic === void 0) { flushPeriodic = false; }
            if (flushPeriodic) {
                return this.flushPeriodic(doTick);
            }
            else {
                return this.flushNonPeriodic(limit, doTick);
            }
        };
        Scheduler.prototype.flushPeriodic = function (doTick) {
            if (this._schedulerQueue.length === 0) {
                return 0;
            }
            var startTime = this._currentTime;
            var lastTask = this._schedulerQueue[this._schedulerQueue.length - 1];
            this.tick(lastTask.endTime - startTime, doTick);
            return this._currentTime - startTime;
        };
        Scheduler.prototype.flushNonPeriodic = function (limit, doTick) {
            var startTime = this._currentTime;
            var lastCurrentTime = 0;
            var count = 0;
            while (this._schedulerQueue.length > 0) {
                count++;
                if (count > limit) {
                    throw new Error('flush failed after reaching the limit of ' + limit +
                        ' tasks. Does your code use a polling timeout?');
                }
                if (this._schedulerQueue.filter(function (task) { return !task.isPeriodic && !task.isRequestAnimationFrame; })
                    .length === 0) {
                    break;
                }
                var current = this._schedulerQueue.shift();
                lastCurrentTime = this._currentTime;
                this._currentTime = current.endTime;
                if (doTick) {
                    doTick(this._currentTime - lastCurrentTime);
                }
                var retval = current.func.apply(global, current.args);
                if (!retval) {
                    break;
                }
            }
            return this._currentTime - startTime;
        };
        return Scheduler;
    }());
    var FakeAsyncTestZoneSpec = (function () {
        function FakeAsyncTestZoneSpec(namePrefix, trackPendingRequestAnimationFrame) {
            if (trackPendingRequestAnimationFrame === void 0) { trackPendingRequestAnimationFrame = false; }
            this.trackPendingRequestAnimationFrame = trackPendingRequestAnimationFrame;
            this._scheduler = new Scheduler();
            this._microtasks = [];
            this._lastError = null;
            this._uncaughtPromiseErrors = Promise[Zone.__symbol__('uncaughtPromiseErrors')];
            this.pendingPeriodicTimers = [];
            this.pendingTimers = [];
            this.properties = { 'FakeAsyncTestZoneSpec': this };
            this.name = 'fakeAsyncTestZone for ' + namePrefix;
        }
        FakeAsyncTestZoneSpec.assertInZone = function () {
            if (Zone.current.get('FakeAsyncTestZoneSpec') == null) {
                throw new Error('The code should be running in the fakeAsync zone to call this function');
            }
        };
        FakeAsyncTestZoneSpec.prototype._fnAndFlush = function (fn, completers) {
            var _this = this;
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                fn.apply(global, args);
                if (_this._lastError === null) {
                    if (completers.onSuccess != null) {
                        completers.onSuccess.apply(global);
                    }
                    _this.flushMicrotasks();
                }
                else {
                    if (completers.onError != null) {
                        completers.onError.apply(global);
                    }
                }
                return _this._lastError === null;
            };
        };
        FakeAsyncTestZoneSpec._removeTimer = function (timers, id) {
            var index = timers.indexOf(id);
            if (index > -1) {
                timers.splice(index, 1);
            }
        };
        FakeAsyncTestZoneSpec.prototype._dequeueTimer = function (id) {
            var _this = this;
            return function () {
                FakeAsyncTestZoneSpec._removeTimer(_this.pendingTimers, id);
            };
        };
        FakeAsyncTestZoneSpec.prototype._requeuePeriodicTimer = function (fn, interval, args, id) {
            var _this = this;
            return function () {
                if (_this.pendingPeriodicTimers.indexOf(id) !== -1) {
                    _this._scheduler.scheduleFunction(fn, interval, args, true, false, id);
                }
            };
        };
        FakeAsyncTestZoneSpec.prototype._dequeuePeriodicTimer = function (id) {
            var _this = this;
            return function () {
                FakeAsyncTestZoneSpec._removeTimer(_this.pendingPeriodicTimers, id);
            };
        };
        FakeAsyncTestZoneSpec.prototype._setTimeout = function (fn, delay, args, isTimer) {
            if (isTimer === void 0) { isTimer = true; }
            var removeTimerFn = this._dequeueTimer(this._scheduler.nextId);
            var cb = this._fnAndFlush(fn, { onSuccess: removeTimerFn, onError: removeTimerFn });
            var id = this._scheduler.scheduleFunction(cb, delay, args, false, !isTimer);
            if (isTimer) {
                this.pendingTimers.push(id);
            }
            return id;
        };
        FakeAsyncTestZoneSpec.prototype._clearTimeout = function (id) {
            FakeAsyncTestZoneSpec._removeTimer(this.pendingTimers, id);
            this._scheduler.removeScheduledFunctionWithId(id);
        };
        FakeAsyncTestZoneSpec.prototype._setInterval = function (fn, interval) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var id = this._scheduler.nextId;
            var completers = { onSuccess: null, onError: this._dequeuePeriodicTimer(id) };
            var cb = this._fnAndFlush(fn, completers);
            completers.onSuccess = this._requeuePeriodicTimer(cb, interval, args, id);
            this._scheduler.scheduleFunction(cb, interval, args, true);
            this.pendingPeriodicTimers.push(id);
            return id;
        };
        FakeAsyncTestZoneSpec.prototype._clearInterval = function (id) {
            FakeAsyncTestZoneSpec._removeTimer(this.pendingPeriodicTimers, id);
            this._scheduler.removeScheduledFunctionWithId(id);
        };
        FakeAsyncTestZoneSpec.prototype._resetLastErrorAndThrow = function () {
            var error = this._lastError || this._uncaughtPromiseErrors[0];
            this._uncaughtPromiseErrors.length = 0;
            this._lastError = null;
            throw error;
        };
        FakeAsyncTestZoneSpec.prototype.tick = function (millis, doTick) {
            if (millis === void 0) { millis = 0; }
            FakeAsyncTestZoneSpec.assertInZone();
            this.flushMicrotasks();
            this._scheduler.tick(millis, doTick);
            if (this._lastError !== null) {
                this._resetLastErrorAndThrow();
            }
        };
        FakeAsyncTestZoneSpec.prototype.flushMicrotasks = function () {
            var _this = this;
            FakeAsyncTestZoneSpec.assertInZone();
            var flushErrors = function () {
                if (_this._lastError !== null || _this._uncaughtPromiseErrors.length) {
                    _this._resetLastErrorAndThrow();
                }
            };
            while (this._microtasks.length > 0) {
                var microtask = this._microtasks.shift();
                microtask.func.apply(microtask.target, microtask.args);
            }
            flushErrors();
        };
        FakeAsyncTestZoneSpec.prototype.flush = function (limit, flushPeriodic, doTick) {
            FakeAsyncTestZoneSpec.assertInZone();
            this.flushMicrotasks();
            var elapsed = this._scheduler.flush(limit, flushPeriodic, doTick);
            if (this._lastError !== null) {
                this._resetLastErrorAndThrow();
            }
            return elapsed;
        };
        FakeAsyncTestZoneSpec.prototype.onScheduleTask = function (delegate, current, target, task) {
            switch (task.type) {
                case 'microTask':
                    var args = task.data && task.data.args;
                    var addtionalArgs = void 0;
                    if (args) {
                        var callbackIndex = task.data.callbackIndex;
                        if (typeof args.length === 'number' && args.length > callbackIndex + 1) {
                            addtionalArgs = Array.prototype.slice.call(args, callbackIndex + 1);
                        }
                    }
                    this._microtasks.push({
                        func: task.invoke,
                        args: addtionalArgs,
                        target: task.data && task.data.target
                    });
                    break;
                case 'macroTask':
                    switch (task.source) {
                        case 'setTimeout':
                            task.data['handleId'] =
                                this._setTimeout(task.invoke, task.data['delay'], task.data['args']);
                            break;
                        case 'setInterval':
                            task.data['handleId'] =
                                this._setInterval(task.invoke, task.data['delay'], task.data['args']);
                            break;
                        case 'XMLHttpRequest.send':
                            throw new Error('Cannot make XHRs from within a fake async test.');
                        case 'requestAnimationFrame':
                        case 'webkitRequestAnimationFrame':
                        case 'mozRequestAnimationFrame':
                            task.data['handleId'] = this._setTimeout(task.invoke, 16, task.data['args'], this.trackPendingRequestAnimationFrame);
                            break;
                        default:
                            throw new Error('Unknown macroTask scheduled in fake async test: ' + task.source);
                    }
                    break;
                case 'eventTask':
                    task = delegate.scheduleTask(target, task);
                    break;
            }
            return task;
        };
        FakeAsyncTestZoneSpec.prototype.onCancelTask = function (delegate, current, target, task) {
            switch (task.source) {
                case 'setTimeout':
                case 'requestAnimationFrame':
                case 'webkitRequestAnimationFrame':
                case 'mozRequestAnimationFrame':
                    return this._clearTimeout(task.data['handleId']);
                case 'setInterval':
                    return this._clearInterval(task.data['handleId']);
                default:
                    return delegate.cancelTask(target, task);
            }
        };
        FakeAsyncTestZoneSpec.prototype.onHandleError = function (parentZoneDelegate, currentZone, targetZone, error) {
            this._lastError = error;
            return false;
        };
        return FakeAsyncTestZoneSpec;
    }());
    Zone['FakeAsyncTestZoneSpec'] = FakeAsyncTestZoneSpec;
})(typeof window === 'object' && window || typeof self === 'object' && self || global);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFrZS1hc3luYy10ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmFrZS1hc3luYy10ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLENBQUMsVUFBUyxNQUFXO0lBaUJuQjtRQVNFO1lBUE8sV0FBTSxHQUFXLENBQUMsQ0FBQztZQUdsQixvQkFBZSxHQUF3QixFQUFFLENBQUM7WUFFMUMsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFFbEIsQ0FBQztRQUVoQixvQ0FBZ0IsR0FBaEIsVUFDSSxFQUFZLEVBQUUsS0FBYSxFQUFFLElBQWdCLEVBQUUsVUFBMkIsRUFDMUUsdUJBQXdDLEVBQUUsRUFBZTtZQUQ1QixxQkFBQSxFQUFBLFNBQWdCO1lBQUUsMkJBQUEsRUFBQSxrQkFBMkI7WUFDMUUsd0NBQUEsRUFBQSwrQkFBd0M7WUFBRSxtQkFBQSxFQUFBLE1BQWMsQ0FBQztZQUMzRCxJQUFJLFNBQVMsR0FBVyxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDcEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFHeEMsSUFBSSxRQUFRLEdBQXNCO2dCQUNoQyxPQUFPLEVBQUUsT0FBTztnQkFDaEIsRUFBRSxFQUFFLFNBQVM7Z0JBQ2IsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osVUFBVSxFQUFFLFVBQVU7Z0JBQ3RCLHVCQUF1QixFQUFFLHVCQUF1QjthQUNqRCxDQUFDO1lBQ0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1YsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDNUMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FB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bEIsS0FBSyx1QkFBdUIsQ0FBQztnQkFDN0IsS0FBSyw2QkFBNkIsQ0FBQztnQkFDbkMsS0FBSywwQkFBMEI7b0JBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsS0FBSyxhQUFhO29CQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BEO29CQUNFLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM3QyxDQUFDO1FBQ0gsQ0FBQztRQUVELDZDQUFhLEdBQWIsVUFDSSxrQkFBZ0MsRUFBRSxXQUFpQixFQUFFLFVBQWdCLEVBQ3JFLEtBQVU7WUFDWixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNILDRCQUFDO0lBQUQsQ0FBQyxBQWhPRCxJQWdPQztJQUlBLElBQVksQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLHFCQUFxQixDQUFDO0FBQ2pFLENBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuKGZ1bmN0aW9uKGdsb2JhbDogYW55KSB7XG4gIGludGVyZmFjZSBTY2hlZHVsZWRGdW5jdGlvbiB7XG4gICAgZW5kVGltZTogbnVtYmVyO1xuICAgIGlkOiBudW1iZXI7XG4gICAgZnVuYzogRnVuY3Rpb247XG4gICAgYXJnczogYW55W107XG4gICAgZGVsYXk6IG51bWJlcjtcbiAgICBpc1BlcmlvZGljOiBib29sZWFuO1xuICAgIGlzUmVxdWVzdEFuaW1hdGlvbkZyYW1lOiBib29sZWFuO1xuICB9XG5cbiAgaW50ZXJmYWNlIE1pY3JvVGFza1NjaGVkdWxlZEZ1bmN0aW9uIHtcbiAgICBmdW5jOiBGdW5jdGlvbjtcbiAgICBhcmdzOiBhbnlbXTtcbiAgICB0YXJnZXQ6IGFueTtcbiAgfVxuXG4gIGNsYXNzIFNjaGVkdWxlciB7XG4gICAgLy8gTmV4dCBzY2hlZHVsZXIgaWQuXG4gICAgcHVibGljIG5leHRJZDogbnVtYmVyID0gMDtcblxuICAgIC8vIFNjaGVkdWxlciBxdWV1ZSB3aXRoIHRoZSB0dXBsZSBvZiBlbmQgdGltZSBhbmQgY2FsbGJhY2sgZnVuY3Rpb24gLSBzb3J0ZWQgYnkgZW5kIHRpbWUuXG4gICAgcHJpdmF0ZSBfc2NoZWR1bGVyUXVldWU6IFNjaGVkdWxlZEZ1bmN0aW9uW10gPSBbXTtcbiAgICAvLyBDdXJyZW50IHNpbXVsYXRlZCB0aW1lIGluIG1pbGxpcy5cbiAgICBwcml2YXRlIF9jdXJyZW50VGltZTogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIHNjaGVkdWxlRnVuY3Rpb24oXG4gICAgICAgIGNiOiBGdW5jdGlvbiwgZGVsYXk6IG51bWJlciwgYXJnczogYW55W10gPSBbXSwgaXNQZXJpb2RpYzogYm9vbGVhbiA9IGZhbHNlLFxuICAgICAgICBpc1JlcXVlc3RBbmltYXRpb25GcmFtZTogYm9vbGVhbiA9IGZhbHNlLCBpZDogbnVtYmVyID0gLTEpOiBudW1iZXIge1xuICAgICAgbGV0IGN1cnJlbnRJZDogbnVtYmVyID0gaWQgPCAwID8gdGhpcy5uZXh0SWQrKyA6IGlkO1xuICAgICAgbGV0IGVuZFRpbWUgPSB0aGlzLl9jdXJyZW50VGltZSArIGRlbGF5O1xuXG4gICAgICAvLyBJbnNlcnQgc28gdGhhdCBzY2hlZHVsZXIgcXVldWUgcmVtYWlucyBzb3J0ZWQgYnkgZW5kIHRpbWUuXG4gICAgICBsZXQgbmV3RW50cnk6IFNjaGVkdWxlZEZ1bmN0aW9uID0ge1xuICAgICAgICBlbmRUaW1lOiBlbmRUaW1lLFxuICAgICAgICBpZDogY3VycmVudElkLFxuICAgICAgICBmdW5jOiBjYixcbiAgICAgICAgYXJnczogYXJncyxcbiAgICAgICAgZGVsYXk6IGRlbGF5LFxuICAgICAgICBpc1BlcmlvZGljOiBpc1BlcmlvZGljLFxuICAgICAgICBpc1JlcXVlc3RBbmltYXRpb25GcmFtZTogaXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgIH07XG4gICAgICBsZXQgaSA9IDA7XG4gICAgICBmb3IgKDsgaSA8IHRoaXMuX3NjaGVkdWxlclF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBjdXJyZW50RW50cnkgPSB0aGlzLl9zY2hlZHVsZXJRdWV1ZVtpXTtcbiAgICAgICAgaWYgKG5ld0VudHJ5LmVuZFRpbWUgPCBjdXJyZW50RW50cnkuZW5kVGltZSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl9zY2hlZHVsZXJRdWV1ZS5zcGxpY2UoaSwgMCwgbmV3RW50cnkpO1xuICAgICAgcmV0dXJuIGN1cnJlbnRJZDtcbiAgICB9XG5cbiAgICByZW1vdmVTY2hlZHVsZWRGdW5jdGlvbldpdGhJZChpZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NjaGVkdWxlclF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLl9zY2hlZHVsZXJRdWV1ZVtpXS5pZCA9PSBpZCkge1xuICAgICAgICAgIHRoaXMuX3NjaGVkdWxlclF1ZXVlLnNwbGljZShpLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRpY2sobWlsbGlzOiBudW1iZXIgPSAwLCBkb1RpY2s/OiAoZWxhcHNlZDogbnVtYmVyKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICBsZXQgZmluYWxUaW1lID0gdGhpcy5fY3VycmVudFRpbWUgKyBtaWxsaXM7XG4gICAgICBsZXQgbGFzdEN1cnJlbnRUaW1lID0gMDtcbiAgICAgIGlmICh0aGlzLl9zY2hlZHVsZXJRdWV1ZS5sZW5ndGggPT09IDAgJiYgZG9UaWNrKSB7XG4gICAgICAgIGRvVGljayhtaWxsaXMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB3aGlsZSAodGhpcy5fc2NoZWR1bGVyUXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX3NjaGVkdWxlclF1ZXVlWzBdO1xuICAgICAgICBpZiAoZmluYWxUaW1lIDwgY3VycmVudC5lbmRUaW1lKSB7XG4gICAgICAgICAgLy8gRG9uZSBwcm9jZXNzaW5nIHRoZSBxdWV1ZSBzaW5jZSBpdCdzIHNvcnRlZCBieSBlbmRUaW1lLlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRpbWUgdG8gcnVuIHNjaGVkdWxlZCBmdW5jdGlvbi4gUmVtb3ZlIGl0IGZyb20gdGhlIGhlYWQgb2YgcXVldWUuXG4gICAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLl9zY2hlZHVsZXJRdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgIGxhc3RDdXJyZW50VGltZSA9IHRoaXMuX2N1cnJlbnRUaW1lO1xuICAgICAgICAgIHRoaXMuX2N1cnJlbnRUaW1lID0gY3VycmVudC5lbmRUaW1lO1xuICAgICAgICAgIGlmIChkb1RpY2spIHtcbiAgICAgICAgICAgIGRvVGljayh0aGlzLl9jdXJyZW50VGltZSAtIGxhc3RDdXJyZW50VGltZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCByZXR2YWwgPSBjdXJyZW50LmZ1bmMuYXBwbHkoZ2xvYmFsLCBjdXJyZW50LmFyZ3MpO1xuICAgICAgICAgIGlmICghcmV0dmFsKSB7XG4gICAgICAgICAgICAvLyBVbmNhdWdodCBleGNlcHRpb24gaW4gdGhlIGN1cnJlbnQgc2NoZWR1bGVkIGZ1bmN0aW9uLiBTdG9wIHByb2Nlc3NpbmcgdGhlIHF1ZXVlLlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl9jdXJyZW50VGltZSA9IGZpbmFsVGltZTtcbiAgICB9XG5cbiAgICBmbHVzaChsaW1pdCA9IDIwLCBmbHVzaFBlcmlvZGljID0gZmFsc2UsIGRvVGljaz86IChlbGFwc2VkOiBudW1iZXIpID0+IHZvaWQpOiBudW1iZXIge1xuICAgICAgaWYgKGZsdXNoUGVyaW9kaWMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmx1c2hQZXJpb2RpYyhkb1RpY2spO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmx1c2hOb25QZXJpb2RpYyhsaW1pdCwgZG9UaWNrKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGZsdXNoUGVyaW9kaWMoZG9UaWNrPzogKGVsYXBzZWQ6IG51bWJlcikgPT4gdm9pZCk6IG51bWJlciB7XG4gICAgICBpZiAodGhpcy5fc2NoZWR1bGVyUXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgLy8gRmluZCB0aGUgbGFzdCB0YXNrIGN1cnJlbnRseSBxdWV1ZWQgaW4gdGhlIHNjaGVkdWxlciBxdWV1ZSBhbmQgdGlja1xuICAgICAgLy8gdGlsbCB0aGF0IHRpbWUuXG4gICAgICBjb25zdCBzdGFydFRpbWUgPSB0aGlzLl9jdXJyZW50VGltZTtcbiAgICAgIGNvbnN0IGxhc3RUYXNrID0gdGhpcy5fc2NoZWR1bGVyUXVldWVbdGhpcy5fc2NoZWR1bGVyUXVldWUubGVuZ3RoIC0gMV07XG4gICAgICB0aGlzLnRpY2sobGFzdFRhc2suZW5kVGltZSAtIHN0YXJ0VGltZSwgZG9UaWNrKTtcbiAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50VGltZSAtIHN0YXJ0VGltZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZsdXNoTm9uUGVyaW9kaWMobGltaXQ6IG51bWJlciwgZG9UaWNrPzogKGVsYXBzZWQ6IG51bWJlcikgPT4gdm9pZCk6IG51bWJlciB7XG4gICAgICBjb25zdCBzdGFydFRpbWUgPSB0aGlzLl9jdXJyZW50VGltZTtcbiAgICAgIGxldCBsYXN0Q3VycmVudFRpbWUgPSAwO1xuICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgIHdoaWxlICh0aGlzLl9zY2hlZHVsZXJRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICAgIGlmIChjb3VudCA+IGxpbWl0KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAnZmx1c2ggZmFpbGVkIGFmdGVyIHJlYWNoaW5nIHRoZSBsaW1pdCBvZiAnICsgbGltaXQgK1xuICAgICAgICAgICAgICAnIHRhc2tzLiBEb2VzIHlvdXIgY29kZSB1c2UgYSBwb2xsaW5nIHRpbWVvdXQ/Jyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmbHVzaCBvbmx5IG5vbi1wZXJpb2RpYyB0aW1lcnMuXG4gICAgICAgIC8vIElmIHRoZSBvbmx5IHJlbWFpbmluZyB0YXNrcyBhcmUgcGVyaW9kaWMob3IgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKSwgZmluaXNoIGZsdXNoaW5nLlxuICAgICAgICBpZiAodGhpcy5fc2NoZWR1bGVyUXVldWUuZmlsdGVyKHRhc2sgPT4gIXRhc2suaXNQZXJpb2RpYyAmJiAhdGFzay5pc1JlcXVlc3RBbmltYXRpb25GcmFtZSlcbiAgICAgICAgICAgICAgICAubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5fc2NoZWR1bGVyUXVldWUuc2hpZnQoKTtcbiAgICAgICAgbGFzdEN1cnJlbnRUaW1lID0gdGhpcy5fY3VycmVudFRpbWU7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRUaW1lID0gY3VycmVudC5lbmRUaW1lO1xuICAgICAgICBpZiAoZG9UaWNrKSB7XG4gICAgICAgICAgLy8gVXBkYXRlIGFueSBzZWNvbmRhcnkgc2NoZWR1bGVycyBsaWtlIEphc21pbmUgbW9jayBEYXRlLlxuICAgICAgICAgIGRvVGljayh0aGlzLl9jdXJyZW50VGltZSAtIGxhc3RDdXJyZW50VGltZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmV0dmFsID0gY3VycmVudC5mdW5jLmFwcGx5KGdsb2JhbCwgY3VycmVudC5hcmdzKTtcbiAgICAgICAgaWYgKCFyZXR2YWwpIHtcbiAgICAgICAgICAvLyBVbmNhdWdodCBleGNlcHRpb24gaW4gdGhlIGN1cnJlbnQgc2NoZWR1bGVkIGZ1bmN0aW9uLiBTdG9wIHByb2Nlc3NpbmcgdGhlIHF1ZXVlLlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5fY3VycmVudFRpbWUgLSBzdGFydFRpbWU7XG4gICAgfVxuICB9XG5cbiAgY2xhc3MgRmFrZUFzeW5jVGVzdFpvbmVTcGVjIGltcGxlbWVudHMgWm9uZVNwZWMge1xuICAgIHN0YXRpYyBhc3NlcnRJblpvbmUoKTogdm9pZCB7XG4gICAgICBpZiAoWm9uZS5jdXJyZW50LmdldCgnRmFrZUFzeW5jVGVzdFpvbmVTcGVjJykgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjb2RlIHNob3VsZCBiZSBydW5uaW5nIGluIHRoZSBmYWtlQXN5bmMgem9uZSB0byBjYWxsIHRoaXMgZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zY2hlZHVsZXI6IFNjaGVkdWxlciA9IG5ldyBTY2hlZHVsZXIoKTtcbiAgICBwcml2YXRlIF9taWNyb3Rhc2tzOiBNaWNyb1Rhc2tTY2hlZHVsZWRGdW5jdGlvbltdID0gW107XG4gICAgcHJpdmF0ZSBfbGFzdEVycm9yOiBFcnJvciA9IG51bGw7XG4gICAgcHJpdmF0ZSBfdW5jYXVnaHRQcm9taXNlRXJyb3JzOiB7cmVqZWN0aW9uOiBhbnl9W10gPVxuICAgICAgICAoUHJvbWlzZSBhcyBhbnkpWyhab25lIGFzIGFueSkuX19zeW1ib2xfXygndW5jYXVnaHRQcm9taXNlRXJyb3JzJyldO1xuXG4gICAgcGVuZGluZ1BlcmlvZGljVGltZXJzOiBudW1iZXJbXSA9IFtdO1xuICAgIHBlbmRpbmdUaW1lcnM6IG51bWJlcltdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lUHJlZml4OiBzdHJpbmcsIHByaXZhdGUgdHJhY2tQZW5kaW5nUmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZmFsc2UpIHtcbiAgICAgIHRoaXMubmFtZSA9ICdmYWtlQXN5bmNUZXN0Wm9uZSBmb3IgJyArIG5hbWVQcmVmaXg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZm5BbmRGbHVzaChmbjogRnVuY3Rpb24sIGNvbXBsZXRlcnM6IHtvblN1Y2Nlc3M/OiBGdW5jdGlvbiwgb25FcnJvcj86IEZ1bmN0aW9ufSk6XG4gICAgICAgIEZ1bmN0aW9uIHtcbiAgICAgIHJldHVybiAoLi4uYXJnczogYW55W10pOiBib29sZWFuID0+IHtcbiAgICAgICAgZm4uYXBwbHkoZ2xvYmFsLCBhcmdzKTtcblxuICAgICAgICBpZiAodGhpcy5fbGFzdEVycm9yID09PSBudWxsKSB7ICAvLyBTdWNjZXNzXG4gICAgICAgICAgaWYgKGNvbXBsZXRlcnMub25TdWNjZXNzICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbXBsZXRlcnMub25TdWNjZXNzLmFwcGx5KGdsb2JhbCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEZsdXNoIG1pY3JvdGFza3Mgb25seSBvbiBzdWNjZXNzLlxuICAgICAgICAgIHRoaXMuZmx1c2hNaWNyb3Rhc2tzKCk7XG4gICAgICAgIH0gZWxzZSB7ICAvLyBGYWlsdXJlXG4gICAgICAgICAgaWYgKGNvbXBsZXRlcnMub25FcnJvciAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb21wbGV0ZXJzLm9uRXJyb3IuYXBwbHkoZ2xvYmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmV0dXJuIHRydWUgaWYgdGhlcmUgd2VyZSBubyBlcnJvcnMsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3RFcnJvciA9PT0gbnVsbDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3JlbW92ZVRpbWVyKHRpbWVyczogbnVtYmVyW10sIGlkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgIGxldCBpbmRleCA9IHRpbWVycy5pbmRleE9mKGlkKTtcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIHRpbWVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2RlcXVldWVUaW1lcihpZDogbnVtYmVyKTogRnVuY3Rpb24ge1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgRmFrZUFzeW5jVGVzdFpvbmVTcGVjLl9yZW1vdmVUaW1lcih0aGlzLnBlbmRpbmdUaW1lcnMsIGlkKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVxdWV1ZVBlcmlvZGljVGltZXIoZm46IEZ1bmN0aW9uLCBpbnRlcnZhbDogbnVtYmVyLCBhcmdzOiBhbnlbXSwgaWQ6IG51bWJlcik6XG4gICAgICAgIEZ1bmN0aW9uIHtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIC8vIFJlcXVldWUgdGhlIHRpbWVyIGNhbGxiYWNrIGlmIGl0J3Mgbm90IGJlZW4gY2FuY2VsZWQuXG4gICAgICAgIGlmICh0aGlzLnBlbmRpbmdQZXJpb2RpY1RpbWVycy5pbmRleE9mKGlkKSAhPT0gLTEpIHtcbiAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIuc2NoZWR1bGVGdW5jdGlvbihmbiwgaW50ZXJ2YWwsIGFyZ3MsIHRydWUsIGZhbHNlLCBpZCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGVxdWV1ZVBlcmlvZGljVGltZXIoaWQ6IG51bWJlcik6IEZ1bmN0aW9uIHtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIEZha2VBc3luY1Rlc3Rab25lU3BlYy5fcmVtb3ZlVGltZXIodGhpcy5wZW5kaW5nUGVyaW9kaWNUaW1lcnMsIGlkKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2V0VGltZW91dChmbjogRnVuY3Rpb24sIGRlbGF5OiBudW1iZXIsIGFyZ3M6IGFueVtdLCBpc1RpbWVyID0gdHJ1ZSk6IG51bWJlciB7XG4gICAgICBsZXQgcmVtb3ZlVGltZXJGbiA9IHRoaXMuX2RlcXVldWVUaW1lcih0aGlzLl9zY2hlZHVsZXIubmV4dElkKTtcbiAgICAgIC8vIFF1ZXVlIHRoZSBjYWxsYmFjayBhbmQgZGVxdWV1ZSB0aGUgdGltZXIgb24gc3VjY2VzcyBhbmQgZXJyb3IuXG4gICAgICBsZXQgY2IgPSB0aGlzLl9mbkFuZEZsdXNoKGZuLCB7b25TdWNjZXNzOiByZW1vdmVUaW1lckZuLCBvbkVycm9yOiByZW1vdmVUaW1lckZufSk7XG4gICAgICBsZXQgaWQgPSB0aGlzLl9zY2hlZHVsZXIuc2NoZWR1bGVGdW5jdGlvbihjYiwgZGVsYXksIGFyZ3MsIGZhbHNlLCAhaXNUaW1lcik7XG4gICAgICBpZiAoaXNUaW1lcikge1xuICAgICAgICB0aGlzLnBlbmRpbmdUaW1lcnMucHVzaChpZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2xlYXJUaW1lb3V0KGlkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgIEZha2VBc3luY1Rlc3Rab25lU3BlYy5fcmVtb3ZlVGltZXIodGhpcy5wZW5kaW5nVGltZXJzLCBpZCk7XG4gICAgICB0aGlzLl9zY2hlZHVsZXIucmVtb3ZlU2NoZWR1bGVkRnVuY3Rpb25XaXRoSWQoaWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NldEludGVydmFsKGZuOiBGdW5jdGlvbiwgaW50ZXJ2YWw6IG51bWJlciwgLi4uYXJnczogYW55W10pOiBudW1iZXIge1xuICAgICAgbGV0IGlkID0gdGhpcy5fc2NoZWR1bGVyLm5leHRJZDtcbiAgICAgIGxldCBjb21wbGV0ZXJzID0ge29uU3VjY2VzczogbnVsbCBhcyBGdW5jdGlvbiwgb25FcnJvcjogdGhpcy5fZGVxdWV1ZVBlcmlvZGljVGltZXIoaWQpfTtcbiAgICAgIGxldCBjYiA9IHRoaXMuX2ZuQW5kRmx1c2goZm4sIGNvbXBsZXRlcnMpO1xuXG4gICAgICAvLyBVc2UgdGhlIGNhbGxiYWNrIGNyZWF0ZWQgYWJvdmUgdG8gcmVxdWV1ZSBvbiBzdWNjZXNzLlxuICAgICAgY29tcGxldGVycy5vblN1Y2Nlc3MgPSB0aGlzLl9yZXF1ZXVlUGVyaW9kaWNUaW1lcihjYiwgaW50ZXJ2YWwsIGFyZ3MsIGlkKTtcblxuICAgICAgLy8gUXVldWUgdGhlIGNhbGxiYWNrIGFuZCBkZXF1ZXVlIHRoZSBwZXJpb2RpYyB0aW1lciBvbmx5IG9uIGVycm9yLlxuICAgICAgdGhpcy5fc2NoZWR1bGVyLnNjaGVkdWxlRnVuY3Rpb24oY2IsIGludGVydmFsLCBhcmdzLCB0cnVlKTtcbiAgICAgIHRoaXMucGVuZGluZ1BlcmlvZGljVGltZXJzLnB1c2goaWQpO1xuICAgICAgcmV0dXJuIGlkO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NsZWFySW50ZXJ2YWwoaWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgRmFrZUFzeW5jVGVzdFpvbmVTcGVjLl9yZW1vdmVUaW1lcih0aGlzLnBlbmRpbmdQZXJpb2RpY1RpbWVycywgaWQpO1xuICAgICAgdGhpcy5fc2NoZWR1bGVyLnJlbW92ZVNjaGVkdWxlZEZ1bmN0aW9uV2l0aElkKGlkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXNldExhc3RFcnJvckFuZFRocm93KCk6IHZvaWQge1xuICAgICAgbGV0IGVycm9yID0gdGhpcy5fbGFzdEVycm9yIHx8IHRoaXMuX3VuY2F1Z2h0UHJvbWlzZUVycm9yc1swXTtcbiAgICAgIHRoaXMuX3VuY2F1Z2h0UHJvbWlzZUVycm9ycy5sZW5ndGggPSAwO1xuICAgICAgdGhpcy5fbGFzdEVycm9yID0gbnVsbDtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIHRpY2sobWlsbGlzOiBudW1iZXIgPSAwLCBkb1RpY2s/OiAoZWxhcHNlZDogbnVtYmVyKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICBGYWtlQXN5bmNUZXN0Wm9uZVNwZWMuYXNzZXJ0SW5ab25lKCk7XG4gICAgICB0aGlzLmZsdXNoTWljcm90YXNrcygpO1xuICAgICAgdGhpcy5fc2NoZWR1bGVyLnRpY2sobWlsbGlzLCBkb1RpY2spO1xuICAgICAgaWYgKHRoaXMuX2xhc3RFcnJvciAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9yZXNldExhc3RFcnJvckFuZFRocm93KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZmx1c2hNaWNyb3Rhc2tzKCk6IHZvaWQge1xuICAgICAgRmFrZUFzeW5jVGVzdFpvbmVTcGVjLmFzc2VydEluWm9uZSgpO1xuICAgICAgY29uc3QgZmx1c2hFcnJvcnMgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9sYXN0RXJyb3IgIT09IG51bGwgfHwgdGhpcy5fdW5jYXVnaHRQcm9taXNlRXJyb3JzLmxlbmd0aCkge1xuICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGFuIGVycm9yIHN0b3AgcHJvY2Vzc2luZyB0aGUgbWljcm90YXNrIHF1ZXVlIGFuZCByZXRocm93IHRoZSBlcnJvci5cbiAgICAgICAgICB0aGlzLl9yZXNldExhc3RFcnJvckFuZFRocm93KCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB3aGlsZSAodGhpcy5fbWljcm90YXNrcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBtaWNyb3Rhc2sgPSB0aGlzLl9taWNyb3Rhc2tzLnNoaWZ0KCk7XG4gICAgICAgIG1pY3JvdGFzay5mdW5jLmFwcGx5KG1pY3JvdGFzay50YXJnZXQsIG1pY3JvdGFzay5hcmdzKTtcbiAgICAgIH1cbiAgICAgIGZsdXNoRXJyb3JzKCk7XG4gICAgfVxuXG4gICAgZmx1c2gobGltaXQ/OiBudW1iZXIsIGZsdXNoUGVyaW9kaWM/OiBib29sZWFuLCBkb1RpY2s/OiAoZWxhcHNlZDogbnVtYmVyKSA9PiB2b2lkKTogbnVtYmVyIHtcbiAgICAgIEZha2VBc3luY1Rlc3Rab25lU3BlYy5hc3NlcnRJblpvbmUoKTtcbiAgICAgIHRoaXMuZmx1c2hNaWNyb3Rhc2tzKCk7XG4gICAgICBjb25zdCBlbGFwc2VkID0gdGhpcy5fc2NoZWR1bGVyLmZsdXNoKGxpbWl0LCBmbHVzaFBlcmlvZGljLCBkb1RpY2spO1xuICAgICAgaWYgKHRoaXMuX2xhc3RFcnJvciAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9yZXNldExhc3RFcnJvckFuZFRocm93KCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWxhcHNlZDtcbiAgICB9XG5cbiAgICAvLyBab25lU3BlYyBpbXBsZW1lbnRhdGlvbiBiZWxvdy5cblxuICAgIG5hbWU6IHN0cmluZztcblxuICAgIHByb3BlcnRpZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0geydGYWtlQXN5bmNUZXN0Wm9uZVNwZWMnOiB0aGlzfTtcblxuICAgIG9uU2NoZWR1bGVUYXNrKGRlbGVnYXRlOiBab25lRGVsZWdhdGUsIGN1cnJlbnQ6IFpvbmUsIHRhcmdldDogWm9uZSwgdGFzazogVGFzayk6IFRhc2sge1xuICAgICAgc3dpdGNoICh0YXNrLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnbWljcm9UYXNrJzpcbiAgICAgICAgICBsZXQgYXJncyA9IHRhc2suZGF0YSAmJiAodGFzay5kYXRhIGFzIGFueSkuYXJncztcbiAgICAgICAgICAvLyBzaG91bGQgcGFzcyBhZGRpdGlvbmFsIGFyZ3VtZW50cyB0byBjYWxsYmFjayBpZiBoYXZlIGFueVxuICAgICAgICAgIC8vIGN1cnJlbnRseSB3ZSBrbm93IHByb2Nlc3MubmV4dFRpY2sgd2lsbCBoYXZlIHN1Y2ggYWRkaXRpb25hbFxuICAgICAgICAgIC8vIGFyZ3VtZW50c1xuICAgICAgICAgIGxldCBhZGR0aW9uYWxBcmdzOiBhbnlbXTtcbiAgICAgICAgICBpZiAoYXJncykge1xuICAgICAgICAgICAgbGV0IGNhbGxiYWNrSW5kZXggPSAodGFzay5kYXRhIGFzIGFueSkuY2FsbGJhY2tJbmRleDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJncy5sZW5ndGggPT09ICdudW1iZXInICYmIGFyZ3MubGVuZ3RoID4gY2FsbGJhY2tJbmRleCArIDEpIHtcbiAgICAgICAgICAgICAgYWRkdGlvbmFsQXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MsIGNhbGxiYWNrSW5kZXggKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fbWljcm90YXNrcy5wdXNoKHtcbiAgICAgICAgICAgIGZ1bmM6IHRhc2suaW52b2tlLFxuICAgICAgICAgICAgYXJnczogYWRkdGlvbmFsQXJncyxcbiAgICAgICAgICAgIHRhcmdldDogdGFzay5kYXRhICYmICh0YXNrLmRhdGEgYXMgYW55KS50YXJnZXRcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbWFjcm9UYXNrJzpcbiAgICAgICAgICBzd2l0Y2ggKHRhc2suc291cmNlKSB7XG4gICAgICAgICAgICBjYXNlICdzZXRUaW1lb3V0JzpcbiAgICAgICAgICAgICAgdGFzay5kYXRhWydoYW5kbGVJZCddID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX3NldFRpbWVvdXQodGFzay5pbnZva2UsIHRhc2suZGF0YVsnZGVsYXknXSwgKHRhc2suZGF0YSBhcyBhbnkpWydhcmdzJ10pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NldEludGVydmFsJzpcbiAgICAgICAgICAgICAgdGFzay5kYXRhWydoYW5kbGVJZCddID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX3NldEludGVydmFsKHRhc2suaW52b2tlLCB0YXNrLmRhdGFbJ2RlbGF5J10sICh0YXNrLmRhdGEgYXMgYW55KVsnYXJncyddKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdYTUxIdHRwUmVxdWVzdC5zZW5kJzpcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgbWFrZSBYSFJzIGZyb20gd2l0aGluIGEgZmFrZSBhc3luYyB0ZXN0LicpO1xuICAgICAgICAgICAgY2FzZSAncmVxdWVzdEFuaW1hdGlvbkZyYW1lJzpcbiAgICAgICAgICAgIGNhc2UgJ3dlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSc6XG4gICAgICAgICAgICBjYXNlICdtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnOlxuICAgICAgICAgICAgICAvLyBTaW11bGF0ZSBhIHJlcXVlc3RBbmltYXRpb25GcmFtZSBieSB1c2luZyBhIHNldFRpbWVvdXQgd2l0aCAxNiBtcy5cbiAgICAgICAgICAgICAgLy8gKDYwIGZyYW1lcyBwZXIgc2Vjb25kKVxuICAgICAgICAgICAgICB0YXNrLmRhdGFbJ2hhbmRsZUlkJ10gPSB0aGlzLl9zZXRUaW1lb3V0KFxuICAgICAgICAgICAgICAgICAgdGFzay5pbnZva2UsIDE2LCAodGFzay5kYXRhIGFzIGFueSlbJ2FyZ3MnXSxcbiAgICAgICAgICAgICAgICAgIHRoaXMudHJhY2tQZW5kaW5nUmVxdWVzdEFuaW1hdGlvbkZyYW1lKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gbWFjcm9UYXNrIHNjaGVkdWxlZCBpbiBmYWtlIGFzeW5jIHRlc3Q6ICcgKyB0YXNrLnNvdXJjZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdldmVudFRhc2snOlxuICAgICAgICAgIHRhc2sgPSBkZWxlZ2F0ZS5zY2hlZHVsZVRhc2sodGFyZ2V0LCB0YXNrKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHJldHVybiB0YXNrO1xuICAgIH1cblxuICAgIG9uQ2FuY2VsVGFzayhkZWxlZ2F0ZTogWm9uZURlbGVnYXRlLCBjdXJyZW50OiBab25lLCB0YXJnZXQ6IFpvbmUsIHRhc2s6IFRhc2spOiBhbnkge1xuICAgICAgc3dpdGNoICh0YXNrLnNvdXJjZSkge1xuICAgICAgICBjYXNlICdzZXRUaW1lb3V0JzpcbiAgICAgICAgY2FzZSAncmVxdWVzdEFuaW1hdGlvbkZyYW1lJzpcbiAgICAgICAgY2FzZSAnd2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lJzpcbiAgICAgICAgY2FzZSAnbW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5fY2xlYXJUaW1lb3V0KHRhc2suZGF0YVsnaGFuZGxlSWQnXSk7XG4gICAgICAgIGNhc2UgJ3NldEludGVydmFsJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5fY2xlYXJJbnRlcnZhbCh0YXNrLmRhdGFbJ2hhbmRsZUlkJ10pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZS5jYW5jZWxUYXNrKHRhcmdldCwgdGFzayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgb25IYW5kbGVFcnJvcihcbiAgICAgICAgcGFyZW50Wm9uZURlbGVnYXRlOiBab25lRGVsZWdhdGUsIGN1cnJlbnRab25lOiBab25lLCB0YXJnZXRab25lOiBab25lLFxuICAgICAgICBlcnJvcjogYW55KTogYm9vbGVhbiB7XG4gICAgICB0aGlzLl9sYXN0RXJyb3IgPSBlcnJvcjtcbiAgICAgIHJldHVybiBmYWxzZTsgIC8vIERvbid0IHByb3BhZ2F0ZSBlcnJvciB0byBwYXJlbnQgem9uZS5cbiAgICB9XG4gIH1cblxuICAvLyBFeHBvcnQgdGhlIGNsYXNzIHNvIHRoYXQgbmV3IGluc3RhbmNlcyBjYW4gYmUgY3JlYXRlZCB3aXRoIHByb3BlclxuICAvLyBjb25zdHJ1Y3RvciBwYXJhbXMuXG4gIChab25lIGFzIGFueSlbJ0Zha2VBc3luY1Rlc3Rab25lU3BlYyddID0gRmFrZUFzeW5jVGVzdFpvbmVTcGVjO1xufSkodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93IHx8IHR5cGVvZiBzZWxmID09PSAnb2JqZWN0JyAmJiBzZWxmIHx8IGdsb2JhbCk7XG4iXX0=