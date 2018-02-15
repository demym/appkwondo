"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
var Notification_1 = require("../Notification");
var ColdObservable_1 = require("./ColdObservable");
var HotObservable_1 = require("./HotObservable");
var SubscriptionLog_1 = require("./SubscriptionLog");
var VirtualTimeScheduler_1 = require("../scheduler/VirtualTimeScheduler");
var defaultMaxFrame = 750;
var TestScheduler = (function (_super) {
    __extends(TestScheduler, _super);
    function TestScheduler(assertDeepEqual) {
        var _this = _super.call(this, VirtualTimeScheduler_1.VirtualAction, defaultMaxFrame) || this;
        _this.assertDeepEqual = assertDeepEqual;
        _this.hotObservables = [];
        _this.coldObservables = [];
        _this.flushTests = [];
        return _this;
    }
    TestScheduler.prototype.createTime = function (marbles) {
        var indexOf = marbles.indexOf('|');
        if (indexOf === -1) {
            throw new Error('marble diagram for time should have a completion marker "|"');
        }
        return indexOf * TestScheduler.frameTimeFactor;
    };
    TestScheduler.prototype.createColdObservable = function (marbles, values, error) {
        if (marbles.indexOf('^') !== -1) {
            throw new Error('cold observable cannot have subscription offset "^"');
        }
        if (marbles.indexOf('!') !== -1) {
            throw new Error('cold observable cannot have unsubscription marker "!"');
        }
        var messages = TestScheduler.parseMarbles(marbles, values, error);
        var cold = new ColdObservable_1.ColdObservable(messages, this);
        this.coldObservables.push(cold);
        return cold;
    };
    TestScheduler.prototype.createHotObservable = function (marbles, values, error) {
        if (marbles.indexOf('!') !== -1) {
            throw new Error('hot observable cannot have unsubscription marker "!"');
        }
        var messages = TestScheduler.parseMarbles(marbles, values, error);
        var subject = new HotObservable_1.HotObservable(messages, this);
        this.hotObservables.push(subject);
        return subject;
    };
    TestScheduler.prototype.materializeInnerObservable = function (observable, outerFrame) {
        var _this = this;
        var messages = [];
        observable.subscribe(function (value) {
            messages.push({ frame: _this.frame - outerFrame, notification: Notification_1.Notification.createNext(value) });
        }, function (err) {
            messages.push({ frame: _this.frame - outerFrame, notification: Notification_1.Notification.createError(err) });
        }, function () {
            messages.push({ frame: _this.frame - outerFrame, notification: Notification_1.Notification.createComplete() });
        });
        return messages;
    };
    TestScheduler.prototype.expectObservable = function (observable, unsubscriptionMarbles) {
        var _this = this;
        if (unsubscriptionMarbles === void 0) { unsubscriptionMarbles = null; }
        var actual = [];
        var flushTest = { actual: actual, ready: false };
        var unsubscriptionFrame = TestScheduler
            .parseMarblesAsSubscriptions(unsubscriptionMarbles).unsubscribedFrame;
        var subscription;
        this.schedule(function () {
            subscription = observable.subscribe(function (x) {
                var value = x;
                if (x instanceof Observable_1.Observable) {
                    value = _this.materializeInnerObservable(value, _this.frame);
                }
                actual.push({ frame: _this.frame, notification: Notification_1.Notification.createNext(value) });
            }, function (err) {
                actual.push({ frame: _this.frame, notification: Notification_1.Notification.createError(err) });
            }, function () {
                actual.push({ frame: _this.frame, notification: Notification_1.Notification.createComplete() });
            });
        }, 0);
        if (unsubscriptionFrame !== Number.POSITIVE_INFINITY) {
            this.schedule(function () { return subscription.unsubscribe(); }, unsubscriptionFrame);
        }
        this.flushTests.push(flushTest);
        return {
            toBe: function (marbles, values, errorValue) {
                flushTest.ready = true;
                flushTest.expected = TestScheduler.parseMarbles(marbles, values, errorValue, true);
            }
        };
    };
    TestScheduler.prototype.expectSubscriptions = function (actualSubscriptionLogs) {
        var flushTest = { actual: actualSubscriptionLogs, ready: false };
        this.flushTests.push(flushTest);
        return {
            toBe: function (marbles) {
                var marblesArray = (typeof marbles === 'string') ? [marbles] : marbles;
                flushTest.ready = true;
                flushTest.expected = marblesArray.map(function (marbles) {
                    return TestScheduler.parseMarblesAsSubscriptions(marbles);
                });
            }
        };
    };
    TestScheduler.prototype.flush = function () {
        var hotObservables = this.hotObservables;
        while (hotObservables.length > 0) {
            hotObservables.shift().setup();
        }
        _super.prototype.flush.call(this);
        var readyFlushTests = this.flushTests.filter(function (test) { return test.ready; });
        while (readyFlushTests.length > 0) {
            var test = readyFlushTests.shift();
            this.assertDeepEqual(test.actual, test.expected);
        }
    };
    TestScheduler.parseMarblesAsSubscriptions = function (marbles) {
        if (typeof marbles !== 'string') {
            return new SubscriptionLog_1.SubscriptionLog(Number.POSITIVE_INFINITY);
        }
        var len = marbles.length;
        var groupStart = -1;
        var subscriptionFrame = Number.POSITIVE_INFINITY;
        var unsubscriptionFrame = Number.POSITIVE_INFINITY;
        for (var i = 0; i < len; i++) {
            var frame = i * this.frameTimeFactor;
            var c = marbles[i];
            switch (c) {
                case '-':
                case ' ':
                    break;
                case '(':
                    groupStart = frame;
                    break;
                case ')':
                    groupStart = -1;
                    break;
                case '^':
                    if (subscriptionFrame !== Number.POSITIVE_INFINITY) {
                        throw new Error('found a second subscription point \'^\' in a ' +
                            'subscription marble diagram. There can only be one.');
                    }
                    subscriptionFrame = groupStart > -1 ? groupStart : frame;
                    break;
                case '!':
                    if (unsubscriptionFrame !== Number.POSITIVE_INFINITY) {
                        throw new Error('found a second subscription point \'^\' in a ' +
                            'subscription marble diagram. There can only be one.');
                    }
                    unsubscriptionFrame = groupStart > -1 ? groupStart : frame;
                    break;
                default:
                    throw new Error('there can only be \'^\' and \'!\' markers in a ' +
                        'subscription marble diagram. Found instead \'' + c + '\'.');
            }
        }
        if (unsubscriptionFrame < 0) {
            return new SubscriptionLog_1.SubscriptionLog(subscriptionFrame);
        }
        else {
            return new SubscriptionLog_1.SubscriptionLog(subscriptionFrame, unsubscriptionFrame);
        }
    };
    TestScheduler.parseMarbles = function (marbles, values, errorValue, materializeInnerObservables) {
        if (materializeInnerObservables === void 0) { materializeInnerObservables = false; }
        if (marbles.indexOf('!') !== -1) {
            throw new Error('conventional marble diagrams cannot have the ' +
                'unsubscription marker "!"');
        }
        var len = marbles.length;
        var testMessages = [];
        var subIndex = marbles.indexOf('^');
        var frameOffset = subIndex === -1 ? 0 : (subIndex * -this.frameTimeFactor);
        var getValue = typeof values !== 'object' ?
            function (x) { return x; } :
            function (x) {
                if (materializeInnerObservables && values[x] instanceof ColdObservable_1.ColdObservable) {
                    return values[x].messages;
                }
                return values[x];
            };
        var groupStart = -1;
        for (var i = 0; i < len; i++) {
            var frame = i * this.frameTimeFactor + frameOffset;
            var notification = void 0;
            var c = marbles[i];
            switch (c) {
                case '-':
                case ' ':
                    break;
                case '(':
                    groupStart = frame;
                    break;
                case ')':
                    groupStart = -1;
                    break;
                case '|':
                    notification = Notification_1.Notification.createComplete();
                    break;
                case '^':
                    break;
                case '#':
                    notification = Notification_1.Notification.createError(errorValue || 'error');
                    break;
                default:
                    notification = Notification_1.Notification.createNext(getValue(c));
                    break;
            }
            if (notification) {
                testMessages.push({ frame: groupStart > -1 ? groupStart : frame, notification: notification });
            }
        }
        return testMessages;
    };
    return TestScheduler;
}(VirtualTimeScheduler_1.VirtualTimeScheduler));
exports.TestScheduler = TestScheduler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdFNjaGVkdWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRlc3RTY2hlZHVsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTJDO0FBQzNDLGdEQUErQztBQUMvQyxtREFBa0Q7QUFDbEQsaURBQWdEO0FBRWhELHFEQUFvRDtBQUVwRCwwRUFBd0Y7QUFFeEYsSUFBTSxlQUFlLEdBQVcsR0FBRyxDQUFDO0FBV3BDO0lBQW1DLGlDQUFvQjtJQUtyRCx1QkFBbUIsZUFBK0Q7UUFBbEYsWUFDRSxrQkFBTSxvQ0FBYSxFQUFFLGVBQWUsQ0FBQyxTQUN0QztRQUZrQixxQkFBZSxHQUFmLGVBQWUsQ0FBZ0Q7UUFKMUUsb0JBQWMsR0FBeUIsRUFBRSxDQUFDO1FBQzFDLHFCQUFlLEdBQTBCLEVBQUUsQ0FBQztRQUM1QyxnQkFBVSxHQUFvQixFQUFFLENBQUM7O0lBSXpDLENBQUM7SUFFRCxrQ0FBVSxHQUFWLFVBQVcsT0FBZTtRQUN4QixJQUFNLE9BQU8sR0FBVyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyw2REFBNkQsQ0FBQyxDQUFDO1FBQ2pGLENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyxlQUFlLENBQUM7SUFDakQsQ0FBQztJQUVELDRDQUFvQixHQUFwQixVQUF3QixPQUFlLEVBQUUsTUFBWSxFQUFFLEtBQVc7UUFDaEUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FB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Q0FBQztvQkFDbkIsS0FBSyxDQUFDO2dCQUNSLEtBQUssR0FBRztvQkFDTixVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLEtBQUssQ0FBQztnQkFDUixLQUFLLEdBQUc7b0JBQ04sWUFBWSxHQUFHLDJCQUFZLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQzdDLEtBQUssQ0FBQztnQkFDUixLQUFLLEdBQUc7b0JBQ04sS0FBSyxDQUFDO2dCQUNSLEtBQUssR0FBRztvQkFDTixZQUFZLEdBQUcsMkJBQVksQ0FBQyxXQUFXLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxDQUFDO29CQUMvRCxLQUFLLENBQUM7Z0JBQ1I7b0JBQ0UsWUFBWSxHQUFHLDJCQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwRCxLQUFLLENBQUM7WUFDVixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDakIsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxHQUFHLEtBQUssRUFBRSxZQUFZLGNBQUEsRUFBRSxDQUFDLENBQUM7WUFDbkYsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUEvTkQsQ0FBbUMsMkNBQW9CLEdBK050RDtBQS9OWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4uL05vdGlmaWNhdGlvbic7XG5pbXBvcnQgeyBDb2xkT2JzZXJ2YWJsZSB9IGZyb20gJy4vQ29sZE9ic2VydmFibGUnO1xuaW1wb3J0IHsgSG90T2JzZXJ2YWJsZSB9IGZyb20gJy4vSG90T2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBUZXN0TWVzc2FnZSB9IGZyb20gJy4vVGVzdE1lc3NhZ2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uTG9nIH0gZnJvbSAnLi9TdWJzY3JpcHRpb25Mb2cnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IFZpcnR1YWxUaW1lU2NoZWR1bGVyLCBWaXJ0dWFsQWN0aW9uIH0gZnJvbSAnLi4vc2NoZWR1bGVyL1ZpcnR1YWxUaW1lU2NoZWR1bGVyJztcblxuY29uc3QgZGVmYXVsdE1heEZyYW1lOiBudW1iZXIgPSA3NTA7XG5cbmludGVyZmFjZSBGbHVzaGFibGVUZXN0IHtcbiAgcmVhZHk6IGJvb2xlYW47XG4gIGFjdHVhbD86IGFueVtdO1xuICBleHBlY3RlZD86IGFueVtdO1xufVxuXG5leHBvcnQgdHlwZSBvYnNlcnZhYmxlVG9CZUZuID0gKG1hcmJsZXM6IHN0cmluZywgdmFsdWVzPzogYW55LCBlcnJvclZhbHVlPzogYW55KSA9PiB2b2lkO1xuZXhwb3J0IHR5cGUgc3Vic2NyaXB0aW9uTG9nc1RvQmVGbiA9IChtYXJibGVzOiBzdHJpbmcgfCBzdHJpbmdbXSkgPT4gdm9pZDtcblxuZXhwb3J0IGNsYXNzIFRlc3RTY2hlZHVsZXIgZXh0ZW5kcyBWaXJ0dWFsVGltZVNjaGVkdWxlciB7XG4gIHByaXZhdGUgaG90T2JzZXJ2YWJsZXM6IEhvdE9ic2VydmFibGU8YW55PltdID0gW107XG4gIHByaXZhdGUgY29sZE9ic2VydmFibGVzOiBDb2xkT2JzZXJ2YWJsZTxhbnk+W10gPSBbXTtcbiAgcHJpdmF0ZSBmbHVzaFRlc3RzOiBGbHVzaGFibGVUZXN0W10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgYXNzZXJ0RGVlcEVxdWFsOiAoYWN0dWFsOiBhbnksIGV4cGVjdGVkOiBhbnkpID0+IGJvb2xlYW4gfCB2b2lkKSB7XG4gICAgc3VwZXIoVmlydHVhbEFjdGlvbiwgZGVmYXVsdE1heEZyYW1lKTtcbiAgfVxuXG4gIGNyZWF0ZVRpbWUobWFyYmxlczogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBjb25zdCBpbmRleE9mOiBudW1iZXIgPSBtYXJibGVzLmluZGV4T2YoJ3wnKTtcbiAgICBpZiAoaW5kZXhPZiA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWFyYmxlIGRpYWdyYW0gZm9yIHRpbWUgc2hvdWxkIGhhdmUgYSBjb21wbGV0aW9uIG1hcmtlciBcInxcIicpO1xuICAgIH1cbiAgICByZXR1cm4gaW5kZXhPZiAqIFRlc3RTY2hlZHVsZXIuZnJhbWVUaW1lRmFjdG9yO1xuICB9XG5cbiAgY3JlYXRlQ29sZE9ic2VydmFibGU8VD4obWFyYmxlczogc3RyaW5nLCB2YWx1ZXM/OiBhbnksIGVycm9yPzogYW55KTogQ29sZE9ic2VydmFibGU8VD4ge1xuICAgIGlmIChtYXJibGVzLmluZGV4T2YoJ14nKSAhPT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY29sZCBvYnNlcnZhYmxlIGNhbm5vdCBoYXZlIHN1YnNjcmlwdGlvbiBvZmZzZXQgXCJeXCInKTtcbiAgICB9XG4gICAgaWYgKG1hcmJsZXMuaW5kZXhPZignIScpICE9PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb2xkIG9ic2VydmFibGUgY2Fubm90IGhhdmUgdW5zdWJzY3JpcHRpb24gbWFya2VyIFwiIVwiJyk7XG4gICAgfVxuICAgIGNvbnN0IG1lc3NhZ2VzID0gVGVzdFNjaGVkdWxlci5wYXJzZU1hcmJsZXMobWFyYmxlcywgdmFsdWVzLCBlcnJvcik7XG4gICAgY29uc3QgY29sZCA9IG5ldyBDb2xkT2JzZXJ2YWJsZTxUPihtZXNzYWdlcywgdGhpcyk7XG4gICAgdGhpcy5jb2xkT2JzZXJ2YWJsZXMucHVzaChjb2xkKTtcbiAgICByZXR1cm4gY29sZDtcbiAgfVxuXG4gIGNyZWF0ZUhvdE9ic2VydmFibGU8VD4obWFyYmxlczogc3RyaW5nLCB2YWx1ZXM/OiBhbnksIGVycm9yPzogYW55KTogSG90T2JzZXJ2YWJsZTxUPiB7XG4gICAgaWYgKG1hcmJsZXMuaW5kZXhPZignIScpICE9PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdob3Qgb2JzZXJ2YWJsZSBjYW5ub3QgaGF2ZSB1bnN1YnNjcmlwdGlvbiBtYXJrZXIgXCIhXCInKTtcbiAgICB9XG4gICAgY29uc3QgbWVzc2FnZXMgPSBUZXN0U2NoZWR1bGVyLnBhcnNlTWFyYmxlcyhtYXJibGVzLCB2YWx1ZXMsIGVycm9yKTtcbiAgICBjb25zdCBzdWJqZWN0ID0gbmV3IEhvdE9ic2VydmFibGU8VD4obWVzc2FnZXMsIHRoaXMpO1xuICAgIHRoaXMuaG90T2JzZXJ2YWJsZXMucHVzaChzdWJqZWN0KTtcbiAgICByZXR1cm4gc3ViamVjdDtcbiAgfVxuXG4gIHByaXZhdGUgbWF0ZXJpYWxpemVJbm5lck9ic2VydmFibGUob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyRnJhbWU6IG51bWJlcik6IFRlc3RNZXNzYWdlW10ge1xuICAgIGNvbnN0IG1lc3NhZ2VzOiBUZXN0TWVzc2FnZVtdID0gW107XG4gICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICBtZXNzYWdlcy5wdXNoKHsgZnJhbWU6IHRoaXMuZnJhbWUgLSBvdXRlckZyYW1lLCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbi5jcmVhdGVOZXh0KHZhbHVlKSB9KTtcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICBtZXNzYWdlcy5wdXNoKHsgZnJhbWU6IHRoaXMuZnJhbWUgLSBvdXRlckZyYW1lLCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbi5jcmVhdGVFcnJvcihlcnIpIH0pO1xuICAgIH0sICgpID0+IHtcbiAgICAgIG1lc3NhZ2VzLnB1c2goeyBmcmFtZTogdGhpcy5mcmFtZSAtIG91dGVyRnJhbWUsIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uLmNyZWF0ZUNvbXBsZXRlKCkgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG1lc3NhZ2VzO1xuICB9XG5cbiAgZXhwZWN0T2JzZXJ2YWJsZShvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4sXG4gICAgICAgICAgICAgICAgICAgdW5zdWJzY3JpcHRpb25NYXJibGVzOiBzdHJpbmcgPSBudWxsKTogKHsgdG9CZTogb2JzZXJ2YWJsZVRvQmVGbiB9KSB7XG4gICAgY29uc3QgYWN0dWFsOiBUZXN0TWVzc2FnZVtdID0gW107XG4gICAgY29uc3QgZmx1c2hUZXN0OiBGbHVzaGFibGVUZXN0ID0geyBhY3R1YWwsIHJlYWR5OiBmYWxzZSB9O1xuICAgIGNvbnN0IHVuc3Vic2NyaXB0aW9uRnJhbWUgPSBUZXN0U2NoZWR1bGVyXG4gICAgICAucGFyc2VNYXJibGVzQXNTdWJzY3JpcHRpb25zKHVuc3Vic2NyaXB0aW9uTWFyYmxlcykudW5zdWJzY3JpYmVkRnJhbWU7XG4gICAgbGV0IHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XG4gICAgICBzdWJzY3JpcHRpb24gPSBvYnNlcnZhYmxlLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0geDtcbiAgICAgICAgLy8gU3VwcG9ydCBPYnNlcnZhYmxlLW9mLU9ic2VydmFibGVzXG4gICAgICAgIGlmICh4IGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xuICAgICAgICAgIHZhbHVlID0gdGhpcy5tYXRlcmlhbGl6ZUlubmVyT2JzZXJ2YWJsZSh2YWx1ZSwgdGhpcy5mcmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgYWN0dWFsLnB1c2goeyBmcmFtZTogdGhpcy5mcmFtZSwgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb24uY3JlYXRlTmV4dCh2YWx1ZSkgfSk7XG4gICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgIGFjdHVhbC5wdXNoKHsgZnJhbWU6IHRoaXMuZnJhbWUsIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uLmNyZWF0ZUVycm9yKGVycikgfSk7XG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIGFjdHVhbC5wdXNoKHsgZnJhbWU6IHRoaXMuZnJhbWUsIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uLmNyZWF0ZUNvbXBsZXRlKCkgfSk7XG4gICAgICB9KTtcbiAgICB9LCAwKTtcblxuICAgIGlmICh1bnN1YnNjcmlwdGlvbkZyYW1lICE9PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkpIHtcbiAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCksIHVuc3Vic2NyaXB0aW9uRnJhbWUpO1xuICAgIH1cblxuICAgIHRoaXMuZmx1c2hUZXN0cy5wdXNoKGZsdXNoVGVzdCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9CZShtYXJibGVzOiBzdHJpbmcsIHZhbHVlcz86IGFueSwgZXJyb3JWYWx1ZT86IGFueSkge1xuICAgICAgICBmbHVzaFRlc3QucmVhZHkgPSB0cnVlO1xuICAgICAgICBmbHVzaFRlc3QuZXhwZWN0ZWQgPSBUZXN0U2NoZWR1bGVyLnBhcnNlTWFyYmxlcyhtYXJibGVzLCB2YWx1ZXMsIGVycm9yVmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBleHBlY3RTdWJzY3JpcHRpb25zKGFjdHVhbFN1YnNjcmlwdGlvbkxvZ3M6IFN1YnNjcmlwdGlvbkxvZ1tdKTogKHsgdG9CZTogc3Vic2NyaXB0aW9uTG9nc1RvQmVGbiB9KSB7XG4gICAgY29uc3QgZmx1c2hUZXN0OiBGbHVzaGFibGVUZXN0ID0geyBhY3R1YWw6IGFjdHVhbFN1YnNjcmlwdGlvbkxvZ3MsIHJlYWR5OiBmYWxzZSB9O1xuICAgIHRoaXMuZmx1c2hUZXN0cy5wdXNoKGZsdXNoVGVzdCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvQmUobWFyYmxlczogc3RyaW5nIHwgc3RyaW5nW10pIHtcbiAgICAgICAgY29uc3QgbWFyYmxlc0FycmF5OiBzdHJpbmdbXSA9ICh0eXBlb2YgbWFyYmxlcyA9PT0gJ3N0cmluZycpID8gW21hcmJsZXNdIDogbWFyYmxlcztcbiAgICAgICAgZmx1c2hUZXN0LnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgZmx1c2hUZXN0LmV4cGVjdGVkID0gbWFyYmxlc0FycmF5Lm1hcChtYXJibGVzID0+XG4gICAgICAgICAgVGVzdFNjaGVkdWxlci5wYXJzZU1hcmJsZXNBc1N1YnNjcmlwdGlvbnMobWFyYmxlcylcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZmx1c2goKSB7XG4gICAgY29uc3QgaG90T2JzZXJ2YWJsZXMgPSB0aGlzLmhvdE9ic2VydmFibGVzO1xuICAgIHdoaWxlIChob3RPYnNlcnZhYmxlcy5sZW5ndGggPiAwKSB7XG4gICAgICBob3RPYnNlcnZhYmxlcy5zaGlmdCgpLnNldHVwKCk7XG4gICAgfVxuXG4gICAgc3VwZXIuZmx1c2goKTtcbiAgICBjb25zdCByZWFkeUZsdXNoVGVzdHMgPSB0aGlzLmZsdXNoVGVzdHMuZmlsdGVyKHRlc3QgPT4gdGVzdC5yZWFkeSk7XG4gICAgd2hpbGUgKHJlYWR5Rmx1c2hUZXN0cy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCB0ZXN0ID0gcmVhZHlGbHVzaFRlc3RzLnNoaWZ0KCk7XG4gICAgICB0aGlzLmFzc2VydERlZXBFcXVhbCh0ZXN0LmFjdHVhbCwgdGVzdC5leHBlY3RlZCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHBhcnNlTWFyYmxlc0FzU3Vic2NyaXB0aW9ucyhtYXJibGVzOiBzdHJpbmcpOiBTdWJzY3JpcHRpb25Mb2cge1xuICAgIGlmICh0eXBlb2YgbWFyYmxlcyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBuZXcgU3Vic2NyaXB0aW9uTG9nKE51bWJlci5QT1NJVElWRV9JTkZJTklUWSk7XG4gICAgfVxuICAgIGNvbnN0IGxlbiA9IG1hcmJsZXMubGVuZ3RoO1xuICAgIGxldCBncm91cFN0YXJ0ID0gLTE7XG4gICAgbGV0IHN1YnNjcmlwdGlvbkZyYW1lID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgIGxldCB1bnN1YnNjcmlwdGlvbkZyYW1lID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgZnJhbWUgPSBpICogdGhpcy5mcmFtZVRpbWVGYWN0b3I7XG4gICAgICBjb25zdCBjID0gbWFyYmxlc1tpXTtcbiAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICBjYXNlICctJzpcbiAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJygnOlxuICAgICAgICAgIGdyb3VwU3RhcnQgPSBmcmFtZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnKSc6XG4gICAgICAgICAgZ3JvdXBTdGFydCA9IC0xO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdeJzpcbiAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uRnJhbWUgIT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3VuZCBhIHNlY29uZCBzdWJzY3JpcHRpb24gcG9pbnQgXFwnXlxcJyBpbiBhICcgK1xuICAgICAgICAgICAgICAnc3Vic2NyaXB0aW9uIG1hcmJsZSBkaWFncmFtLiBUaGVyZSBjYW4gb25seSBiZSBvbmUuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN1YnNjcmlwdGlvbkZyYW1lID0gZ3JvdXBTdGFydCA+IC0xID8gZ3JvdXBTdGFydCA6IGZyYW1lO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICchJzpcbiAgICAgICAgICBpZiAodW5zdWJzY3JpcHRpb25GcmFtZSAhPT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZvdW5kIGEgc2Vjb25kIHN1YnNjcmlwdGlvbiBwb2ludCBcXCdeXFwnIGluIGEgJyArXG4gICAgICAgICAgICAgICdzdWJzY3JpcHRpb24gbWFyYmxlIGRpYWdyYW0uIFRoZXJlIGNhbiBvbmx5IGJlIG9uZS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdW5zdWJzY3JpcHRpb25GcmFtZSA9IGdyb3VwU3RhcnQgPiAtMSA/IGdyb3VwU3RhcnQgOiBmcmFtZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZXJlIGNhbiBvbmx5IGJlIFxcJ15cXCcgYW5kIFxcJyFcXCcgbWFya2VycyBpbiBhICcgK1xuICAgICAgICAgICAgJ3N1YnNjcmlwdGlvbiBtYXJibGUgZGlhZ3JhbS4gRm91bmQgaW5zdGVhZCBcXCcnICsgYyArICdcXCcuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHVuc3Vic2NyaXB0aW9uRnJhbWUgPCAwKSB7XG4gICAgICByZXR1cm4gbmV3IFN1YnNjcmlwdGlvbkxvZyhzdWJzY3JpcHRpb25GcmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgU3Vic2NyaXB0aW9uTG9nKHN1YnNjcmlwdGlvbkZyYW1lLCB1bnN1YnNjcmlwdGlvbkZyYW1lKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcGFyc2VNYXJibGVzKG1hcmJsZXM6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM/OiBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgZXJyb3JWYWx1ZT86IGFueSxcbiAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbGl6ZUlubmVyT2JzZXJ2YWJsZXM6IGJvb2xlYW4gPSBmYWxzZSk6IFRlc3RNZXNzYWdlW10ge1xuICAgIGlmIChtYXJibGVzLmluZGV4T2YoJyEnKSAhPT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY29udmVudGlvbmFsIG1hcmJsZSBkaWFncmFtcyBjYW5ub3QgaGF2ZSB0aGUgJyArXG4gICAgICAgICd1bnN1YnNjcmlwdGlvbiBtYXJrZXIgXCIhXCInKTtcbiAgICB9XG4gICAgY29uc3QgbGVuID0gbWFyYmxlcy5sZW5ndGg7XG4gICAgY29uc3QgdGVzdE1lc3NhZ2VzOiBUZXN0TWVzc2FnZVtdID0gW107XG4gICAgY29uc3Qgc3ViSW5kZXggPSBtYXJibGVzLmluZGV4T2YoJ14nKTtcbiAgICBjb25zdCBmcmFtZU9mZnNldCA9IHN1YkluZGV4ID09PSAtMSA/IDAgOiAoc3ViSW5kZXggKiAtdGhpcy5mcmFtZVRpbWVGYWN0b3IpO1xuICAgIGNvbnN0IGdldFZhbHVlID0gdHlwZW9mIHZhbHVlcyAhPT0gJ29iamVjdCcgP1xuICAgICAgKHg6IGFueSkgPT4geCA6XG4gICAgICAoeDogYW55KSA9PiB7XG4gICAgICAgIC8vIFN1cHBvcnQgT2JzZXJ2YWJsZS1vZi1PYnNlcnZhYmxlc1xuICAgICAgICBpZiAobWF0ZXJpYWxpemVJbm5lck9ic2VydmFibGVzICYmIHZhbHVlc1t4XSBpbnN0YW5jZW9mIENvbGRPYnNlcnZhYmxlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlc1t4XS5tZXNzYWdlcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWVzW3hdO1xuICAgICAgfTtcbiAgICBsZXQgZ3JvdXBTdGFydCA9IC0xO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgZnJhbWUgPSBpICogdGhpcy5mcmFtZVRpbWVGYWN0b3IgKyBmcmFtZU9mZnNldDtcbiAgICAgIGxldCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbjxhbnk+O1xuICAgICAgY29uc3QgYyA9IG1hcmJsZXNbaV07XG4gICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgY2FzZSAnLSc6XG4gICAgICAgIGNhc2UgJyAnOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcoJzpcbiAgICAgICAgICBncm91cFN0YXJ0ID0gZnJhbWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJyknOlxuICAgICAgICAgIGdyb3VwU3RhcnQgPSAtMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnfCc6XG4gICAgICAgICAgbm90aWZpY2F0aW9uID0gTm90aWZpY2F0aW9uLmNyZWF0ZUNvbXBsZXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ14nOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcjJzpcbiAgICAgICAgICBub3RpZmljYXRpb24gPSBOb3RpZmljYXRpb24uY3JlYXRlRXJyb3IoZXJyb3JWYWx1ZSB8fCAnZXJyb3InKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBub3RpZmljYXRpb24gPSBOb3RpZmljYXRpb24uY3JlYXRlTmV4dChnZXRWYWx1ZShjKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmIChub3RpZmljYXRpb24pIHtcbiAgICAgICAgdGVzdE1lc3NhZ2VzLnB1c2goeyBmcmFtZTogZ3JvdXBTdGFydCA+IC0xID8gZ3JvdXBTdGFydCA6IGZyYW1lLCBub3RpZmljYXRpb24gfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0ZXN0TWVzc2FnZXM7XG4gIH1cbn1cbiJdfQ==