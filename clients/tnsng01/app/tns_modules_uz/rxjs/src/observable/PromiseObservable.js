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
var root_1 = require("../util/root");
var Observable_1 = require("../Observable");
var PromiseObservable = (function (_super) {
    __extends(PromiseObservable, _super);
    function PromiseObservable(promise, scheduler) {
        var _this = _super.call(this) || this;
        _this.promise = promise;
        _this.scheduler = scheduler;
        return _this;
    }
    PromiseObservable.create = function (promise, scheduler) {
        return new PromiseObservable(promise, scheduler);
    };
    PromiseObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        var promise = this.promise;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    subscriber.next(this.value);
                    subscriber.complete();
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.next(value);
                        subscriber.complete();
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.error(err);
                    }
                })
                    .then(null, function (err) {
                    root_1.root.setTimeout(function () { throw err; });
                });
            }
        }
        else {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber: subscriber });
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchError, 0, { err: err, subscriber: subscriber }));
                    }
                })
                    .then(null, function (err) {
                    root_1.root.setTimeout(function () { throw err; });
                });
            }
        }
    };
    return PromiseObservable;
}(Observable_1.Observable));
exports.PromiseObservable = PromiseObservable;
function dispatchNext(arg) {
    var value = arg.value, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
    }
}
function dispatchError(arg) {
    var err = arg.err, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.error(err);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvbWlzZU9ic2VydmFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQcm9taXNlT2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBb0M7QUFFcEMsNENBQTJDO0FBUzNDO0lBQTBDLHFDQUFhO0lBa0NyRCwyQkFBb0IsT0FBdUIsRUFBVSxTQUFzQjtRQUEzRSxZQUNFLGlCQUFPLFNBQ1I7UUFGbUIsYUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFBVSxlQUFTLEdBQVQsU0FBUyxDQUFhOztJQUUzRSxDQUFDO0lBTk0sd0JBQU0sR0FBYixVQUFpQixPQUF1QixFQUFFLFNBQXNCO1FBQzlELE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBTVMsc0NBQVUsR0FBcEIsVUFBcUIsVUFBeUI7UUFBOUMsaUJBd0RDO1FBdkRDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0IsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUVqQyxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDdkIsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzVCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDeEIsQ0FBQztZQUNILENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsSUFBSSxDQUNWLFVBQUMsS0FBSztvQkFDSixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbkIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3ZCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDeEIsQ0FBQztnQkFDSCxDQUFDLEVBQ0QsVUFBQyxHQUFHO29CQUNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3hCLENBQUM7Z0JBQ0gsQ0FBQyxDQUNGO3FCQUNBLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQSxHQUFHO29CQUViLFdBQUksQ0FBQyxVQUFVLENBQUMsY0FBUSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsWUFBQSxFQUFFLENBQUMsQ0FBQztnQkFDaEYsQ0FBQztZQUNILENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsSUFBSSxDQUNWLFVBQUMsS0FBSztvQkFDSixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbkIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxPQUFBLEVBQUUsVUFBVSxZQUFBLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzdFLENBQUM7Z0JBQ0gsQ0FBQyxFQUNELFVBQUMsR0FBRztvQkFDRixFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUN2QixVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsS0FBQSxFQUFFLFVBQVUsWUFBQSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM1RSxDQUFDO2dCQUNILENBQUMsQ0FBQztxQkFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQUMsR0FBRztvQkFFZCxXQUFJLENBQUMsVUFBVSxDQUFDLGNBQVEsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUEvRkQsQ0FBMEMsdUJBQVUsR0ErRm5EO0FBL0ZZLDhDQUFpQjtBQXFHOUIsc0JBQXlCLEdBQXVCO0lBQ3RDLElBQUEsaUJBQUssRUFBRSwyQkFBVSxDQUFTO0lBQ2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdkIsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDeEIsQ0FBQztBQUNILENBQUM7QUFNRCx1QkFBMEIsR0FBd0I7SUFDeEMsSUFBQSxhQUFHLEVBQUUsMkJBQVUsQ0FBUztJQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByb290IH0gZnJvbSAnLi4vdXRpbC9yb290JztcbmltcG9ydCB7IElTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgUHJvbWlzZU9ic2VydmFibGU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcblxuICBwdWJsaWMgdmFsdWU6IFQ7XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgUHJvbWlzZSB0byBhbiBPYnNlcnZhYmxlLlxuICAgKlxuICAgKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+UmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQganVzdCBlbWl0cyB0aGUgUHJvbWlzZSdzXG4gICAqIHJlc29sdmVkIHZhbHVlLCB0aGVuIGNvbXBsZXRlcy48L3NwYW4+XG4gICAqXG4gICAqIENvbnZlcnRzIGFuIEVTMjAxNSBQcm9taXNlIG9yIGEgUHJvbWlzZXMvQSsgc3BlYyBjb21wbGlhbnQgUHJvbWlzZSB0byBhblxuICAgKiBPYnNlcnZhYmxlLiBJZiB0aGUgUHJvbWlzZSByZXNvbHZlcyB3aXRoIGEgdmFsdWUsIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZVxuICAgKiBlbWl0cyB0aGF0IHJlc29sdmVkIHZhbHVlIGFzIGEgYG5leHRgLCBhbmQgdGhlbiBjb21wbGV0ZXMuIElmIHRoZSBQcm9taXNlXG4gICAqIGlzIHJlamVjdGVkLCB0aGVuIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBlbWl0cyB0aGUgY29ycmVzcG9uZGluZyBFcnJvci5cbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+Q29udmVydCB0aGUgUHJvbWlzZSByZXR1cm5lZCBieSBGZXRjaCB0byBhbiBPYnNlcnZhYmxlPC9jYXB0aW9uPlxuICAgKiB2YXIgcmVzdWx0ID0gUnguT2JzZXJ2YWJsZS5mcm9tUHJvbWlzZShmZXRjaCgnaHR0cDovL215c2VydmVyLmNvbS8nKSk7XG4gICAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSwgZSA9PiBjb25zb2xlLmVycm9yKGUpKTtcbiAgICpcbiAgICogQHNlZSB7QGxpbmsgYmluZENhbGxiYWNrfVxuICAgKiBAc2VlIHtAbGluayBmcm9tfVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb21pc2VMaWtlPFQ+fSBwcm9taXNlIFRoZSBwcm9taXNlIHRvIGJlIGNvbnZlcnRlZC5cbiAgICogQHBhcmFtIHtTY2hlZHVsZXJ9IFtzY2hlZHVsZXJdIEFuIG9wdGlvbmFsIElTY2hlZHVsZXIgdG8gdXNlIGZvciBzY2hlZHVsaW5nXG4gICAqIHRoZSBkZWxpdmVyeSBvZiB0aGUgcmVzb2x2ZWQgdmFsdWUgKG9yIHRoZSByZWplY3Rpb24pLlxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHdoaWNoIHdyYXBzIHRoZSBQcm9taXNlLlxuICAgKiBAc3RhdGljIHRydWVcbiAgICogQG5hbWUgZnJvbVByb21pc2VcbiAgICogQG93bmVyIE9ic2VydmFibGVcbiAgICovXG4gIHN0YXRpYyBjcmVhdGU8VD4ocHJvbWlzZTogUHJvbWlzZUxpa2U8VD4sIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2VPYnNlcnZhYmxlKHByb21pc2UsIHNjaGVkdWxlcik7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHByb21pc2U6IFByb21pc2VMaWtlPFQ+LCBwcml2YXRlIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPik6IFRlYXJkb3duTG9naWMge1xuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLnByb21pc2U7XG4gICAgY29uc3Qgc2NoZWR1bGVyID0gdGhpcy5zY2hlZHVsZXI7XG5cbiAgICBpZiAoc2NoZWR1bGVyID09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLl9pc1NjYWxhcikge1xuICAgICAgICBpZiAoIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRoaXMudmFsdWUpO1xuICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvbWlzZS50aGVuKFxuICAgICAgICAgICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5faXNTY2FsYXIgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICAgLnRoZW4obnVsbCwgZXJyID0+IHtcbiAgICAgICAgICAvLyBlc2NhcGUgdGhlIHByb21pc2UgdHJhcCwgdGhyb3cgdW5oYW5kbGVkIGVycm9yc1xuICAgICAgICAgIHJvb3Quc2V0VGltZW91dCgoKSA9PiB7IHRocm93IGVycjsgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5faXNTY2FsYXIpIHtcbiAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hOZXh0LCAwLCB7IHZhbHVlOiB0aGlzLnZhbHVlLCBzdWJzY3JpYmVyIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9taXNlLnRoZW4oXG4gICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9pc1NjYWxhciA9IHRydWU7XG4gICAgICAgICAgICBpZiAoIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgIHN1YnNjcmliZXIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShkaXNwYXRjaE5leHQsIDAsIHsgdmFsdWUsIHN1YnNjcmliZXIgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICBzdWJzY3JpYmVyLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hFcnJvciwgMCwgeyBlcnIsIHN1YnNjcmliZXIgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4obnVsbCwgKGVycikgPT4ge1xuICAgICAgICAgICAgLy8gZXNjYXBlIHRoZSBwcm9taXNlIHRyYXAsIHRocm93IHVuaGFuZGxlZCBlcnJvcnNcbiAgICAgICAgICAgIHJvb3Quc2V0VGltZW91dCgoKSA9PiB7IHRocm93IGVycjsgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmludGVyZmFjZSBEaXNwYXRjaE5leHRBcmc8VD4ge1xuICBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+O1xuICB2YWx1ZTogVDtcbn1cbmZ1bmN0aW9uIGRpc3BhdGNoTmV4dDxUPihhcmc6IERpc3BhdGNoTmV4dEFyZzxUPikge1xuICBjb25zdCB7IHZhbHVlLCBzdWJzY3JpYmVyIH0gPSBhcmc7XG4gIGlmICghc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgRGlzcGF0Y2hFcnJvckFyZzxUPiB7XG4gIHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD47XG4gIGVycjogYW55O1xufVxuZnVuY3Rpb24gZGlzcGF0Y2hFcnJvcjxUPihhcmc6IERpc3BhdGNoRXJyb3JBcmc8VD4pIHtcbiAgY29uc3QgeyBlcnIsIHN1YnNjcmliZXIgfSA9IGFyZztcbiAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgfVxufVxuIl19