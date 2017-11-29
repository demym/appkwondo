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
var tryCatch_1 = require("../util/tryCatch");
var errorObject_1 = require("../util/errorObject");
var AsyncSubject_1 = require("../AsyncSubject");
var BoundNodeCallbackObservable = (function (_super) {
    __extends(BoundNodeCallbackObservable, _super);
    function BoundNodeCallbackObservable(callbackFunc, selector, args, context, scheduler) {
        var _this = _super.call(this) || this;
        _this.callbackFunc = callbackFunc;
        _this.selector = selector;
        _this.args = args;
        _this.context = context;
        _this.scheduler = scheduler;
        return _this;
    }
    BoundNodeCallbackObservable.create = function (func, selector, scheduler) {
        if (selector === void 0) { selector = undefined; }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new BoundNodeCallbackObservable(func, selector, args, this, scheduler);
        };
    };
    BoundNodeCallbackObservable.prototype._subscribe = function (subscriber) {
        var callbackFunc = this.callbackFunc;
        var args = this.args;
        var scheduler = this.scheduler;
        var subject = this.subject;
        if (!scheduler) {
            if (!subject) {
                subject = this.subject = new AsyncSubject_1.AsyncSubject();
                var handler = function handlerFn() {
                    var innerArgs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        innerArgs[_i] = arguments[_i];
                    }
                    var source = handlerFn.source;
                    var selector = source.selector, subject = source.subject;
                    var err = innerArgs.shift();
                    if (err) {
                        subject.error(err);
                    }
                    else if (selector) {
                        var result_1 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                        if (result_1 === errorObject_1.errorObject) {
                            subject.error(errorObject_1.errorObject.e);
                        }
                        else {
                            subject.next(result_1);
                            subject.complete();
                        }
                    }
                    else {
                        subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                        subject.complete();
                    }
                };
                handler.source = this;
                var result = tryCatch_1.tryCatch(callbackFunc).apply(this.context, args.concat(handler));
                if (result === errorObject_1.errorObject) {
                    subject.error(errorObject_1.errorObject.e);
                }
            }
            return subject.subscribe(subscriber);
        }
        else {
            return scheduler.schedule(dispatch, 0, { source: this, subscriber: subscriber, context: this.context });
        }
    };
    return BoundNodeCallbackObservable;
}(Observable_1.Observable));
exports.BoundNodeCallbackObservable = BoundNodeCallbackObservable;
function dispatch(state) {
    var self = this;
    var source = state.source, subscriber = state.subscriber, context = state.context;
    var _a = source, callbackFunc = _a.callbackFunc, args = _a.args, scheduler = _a.scheduler;
    var subject = source.subject;
    if (!subject) {
        subject = source.subject = new AsyncSubject_1.AsyncSubject();
        var handler = function handlerFn() {
            var innerArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                innerArgs[_i] = arguments[_i];
            }
            var source = handlerFn.source;
            var selector = source.selector, subject = source.subject;
            var err = innerArgs.shift();
            if (err) {
                self.add(scheduler.schedule(dispatchError, 0, { err: err, subject: subject }));
            }
            else if (selector) {
                var result_2 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                if (result_2 === errorObject_1.errorObject) {
                    self.add(scheduler.schedule(dispatchError, 0, { err: errorObject_1.errorObject.e, subject: subject }));
                }
                else {
                    self.add(scheduler.schedule(dispatchNext, 0, { value: result_2, subject: subject }));
                }
            }
            else {
                var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
                self.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
            }
        };
        handler.source = source;
        var result = tryCatch_1.tryCatch(callbackFunc).apply(context, args.concat(handler));
        if (result === errorObject_1.errorObject) {
            self.add(scheduler.schedule(dispatchError, 0, { err: errorObject_1.errorObject.e, subject: subject }));
        }
    }
    self.add(subject.subscribe(subscriber));
}
function dispatchNext(arg) {
    var value = arg.value, subject = arg.subject;
    subject.next(value);
    subject.complete();
}
function dispatchError(arg) {
    var err = arg.err, subject = arg.subject;
    subject.error(err);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmROb2RlQ2FsbGJhY2tPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQm91bmROb2RlQ2FsbGJhY2tPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDRDQUEyQztBQUszQyw2Q0FBNEM7QUFDNUMsbURBQWtEO0FBQ2xELGdEQUErQztBQU8vQztJQUFvRCwrQ0FBYTtJQW9KL0QscUNBQW9CLFlBQXNCLEVBQ3RCLFFBQWtCLEVBQ2xCLElBQVcsRUFDWCxPQUFZLEVBQ2IsU0FBcUI7UUFKeEMsWUFLRSxpQkFBTyxTQUNSO1FBTm1CLGtCQUFZLEdBQVosWUFBWSxDQUFVO1FBQ3RCLGNBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsVUFBSSxHQUFKLElBQUksQ0FBTztRQUNYLGFBQU8sR0FBUCxPQUFPLENBQUs7UUFDYixlQUFTLEdBQVQsU0FBUyxDQUFZOztJQUV4QyxDQUFDO0lBZE0sa0NBQU0sR0FBYixVQUFpQixJQUFjLEVBQ2QsUUFBcUMsRUFDckMsU0FBc0I7UUFEdEIseUJBQUEsRUFBQSxvQkFBcUM7UUFFcEQsTUFBTSxDQUFDO1lBQW9CLGNBQWM7aUJBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztnQkFBZCx5QkFBYzs7WUFDdkMsTUFBTSxDQUFDLElBQUksMkJBQTJCLENBQUksSUFBSSxFQUFPLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3hGLENBQUMsQ0FBQztJQUNKLENBQUM7SUFVUyxnREFBVSxHQUFwQixVQUFxQixVQUErQjtRQUNsRCxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3ZDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FB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QzdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBJU2NoZWR1bGVyIH0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4uL3NjaGVkdWxlci9BY3Rpb24nO1xuaW1wb3J0IHsgdHJ5Q2F0Y2ggfSBmcm9tICcuLi91dGlsL3RyeUNhdGNoJztcbmltcG9ydCB7IGVycm9yT2JqZWN0IH0gZnJvbSAnLi4vdXRpbC9lcnJvck9iamVjdCc7XG5pbXBvcnQgeyBBc3luY1N1YmplY3QgfSBmcm9tICcuLi9Bc3luY1N1YmplY3QnO1xuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIEJvdW5kTm9kZUNhbGxiYWNrT2JzZXJ2YWJsZTxUPiBleHRlbmRzIE9ic2VydmFibGU8VD4ge1xuICBzdWJqZWN0OiBBc3luY1N1YmplY3Q8VD47XG5cbiAgLyogdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoICovXG4gIHN0YXRpYyBjcmVhdGU8Uj4oY2FsbGJhY2tGdW5jOiAoY2FsbGJhY2s6IChlcnI6IGFueSwgcmVzdWx0OiBSKSA9PiBhbnkpID0+IGFueSwgc2VsZWN0b3I/OiB2b2lkLCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogKCkgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBSPihjYWxsYmFja0Z1bmM6ICh2MTogVCwgY2FsbGJhY2s6IChlcnI6IGFueSwgcmVzdWx0OiBSKSA9PiBhbnkpID0+IGFueSwgc2VsZWN0b3I/OiB2b2lkLCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogKHYxOiBUKSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFQyLCBSPihjYWxsYmFja0Z1bmM6ICh2MTogVCwgdjI6IFQyLCBjYWxsYmFjazogKGVycjogYW55LCByZXN1bHQ6IFIpID0+IGFueSkgPT4gYW55LCBzZWxlY3Rvcj86IHZvaWQsIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiAodjE6IFQsIHYyOiBUMikgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgVDMsIFI+KGNhbGxiYWNrRnVuYzogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgY2FsbGJhY2s6IChlcnI6IGFueSwgcmVzdWx0OiBSKSA9PiBhbnkpID0+IGFueSwgc2VsZWN0b3I/OiB2b2lkLCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogKHYxOiBULCB2MjogVDIsIHYzOiBUMykgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgVDMsIFQ0LCBSPihjYWxsYmFja0Z1bmM6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCwgY2FsbGJhY2s6IChlcnI6IGFueSwgcmVzdWx0OiBSKSA9PiBhbnkpID0+IGFueSwgc2VsZWN0b3I/OiB2b2lkLCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0KSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFQyLCBUMywgVDQsIFQ1LCBSPihjYWxsYmFja0Z1bmM6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCwgdjU6IFQ1LCBjYWxsYmFjazogKGVycjogYW55LCByZXN1bHQ6IFIpID0+IGFueSkgPT4gYW55LCBzZWxlY3Rvcj86IHZvaWQsIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSkgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFI+KGNhbGxiYWNrRnVuYzogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCB2NTogVDUsIHY2OiBUNiwgY2FsbGJhY2s6IChlcnI6IGFueSwgcmVzdWx0OiBSKSA9PiBhbnkpID0+IGFueSwgc2VsZWN0b3I/OiB2b2lkLCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCB2NTogVDUsIHY2OiBUNikgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxUPihjYWxsYmFja0Z1bmM6IEZ1bmN0aW9uLCBzZWxlY3Rvcj86IHZvaWQsIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiAoLi4uYXJnczogYW55W10pID0+IE9ic2VydmFibGU8VD47XG4gIHN0YXRpYyBjcmVhdGU8VD4oY2FsbGJhY2tGdW5jOiBGdW5jdGlvbiwgc2VsZWN0b3I/OiAoLi4uYXJnczogYW55W10pID0+IFQsIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiAoLi4uYXJnczogYW55W10pID0+IE9ic2VydmFibGU8VD47XG4gIC8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgTm9kZS5qcy1zdHlsZSBjYWxsYmFjayBBUEkgdG8gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW5cbiAgICogT2JzZXJ2YWJsZS5cbiAgICpcbiAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkl0J3MganVzdCBsaWtlIHtAbGluayBiaW5kQ2FsbGJhY2t9LCBidXQgdGhlXG4gICAqIGNhbGxiYWNrIGlzIGV4cGVjdGVkIHRvIGJlIG9mIHR5cGUgYGNhbGxiYWNrKGVycm9yLCByZXN1bHQpYC48L3NwYW4+XG4gICAqXG4gICAqIGBiaW5kTm9kZUNhbGxiYWNrYCBpcyBub3QgYW4gb3BlcmF0b3IgYmVjYXVzZSBpdHMgaW5wdXQgYW5kIG91dHB1dCBhcmUgbm90XG4gICAqIE9ic2VydmFibGVzLiBUaGUgaW5wdXQgaXMgYSBmdW5jdGlvbiBgZnVuY2Agd2l0aCBzb21lIHBhcmFtZXRlcnMsIGJ1dCB0aGVcbiAgICogbGFzdCBwYXJhbWV0ZXIgbXVzdCBiZSBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgYGZ1bmNgIGNhbGxzIHdoZW4gaXQgaXNcbiAgICogZG9uZS4gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGV4cGVjdGVkIHRvIGZvbGxvdyBOb2RlLmpzIGNvbnZlbnRpb25zLFxuICAgKiB3aGVyZSB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIGNhbGxiYWNrIGlzIGFuIGVycm9yIG9iamVjdCwgc2lnbmFsaW5nXG4gICAqIHdoZXRoZXIgY2FsbCB3YXMgc3VjY2Vzc2Z1bC4gSWYgdGhhdCBvYmplY3QgaXMgcGFzc2VkIHRvIGNhbGxiYWNrLCBpdCBtZWFuc1xuICAgKiBzb21ldGhpbmcgd2VudCB3cm9uZy5cbiAgICpcbiAgICogVGhlIG91dHB1dCBvZiBgYmluZE5vZGVDYWxsYmFja2AgaXMgYSBmdW5jdGlvbiB0aGF0IHRha2VzIHRoZSBzYW1lXG4gICAqIHBhcmFtZXRlcnMgYXMgYGZ1bmNgLCBleGNlcHQgdGhlIGxhc3Qgb25lICh0aGUgY2FsbGJhY2spLiBXaGVuIHRoZSBvdXRwdXRcbiAgICogZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggYXJndW1lbnRzLCBpdCB3aWxsIHJldHVybiBhbiBPYnNlcnZhYmxlLlxuICAgKiBJZiBgZnVuY2AgY2FsbHMgaXRzIGNhbGxiYWNrIHdpdGggZXJyb3IgcGFyYW1ldGVyIHByZXNlbnQsIE9ic2VydmFibGUgd2lsbFxuICAgKiBlcnJvciB3aXRoIHRoYXQgdmFsdWUgYXMgd2VsbC4gSWYgZXJyb3IgcGFyYW1ldGVyIGlzIG5vdCBwYXNzZWQsIE9ic2VydmFibGUgd2lsbCBlbWl0XG4gICAqIHNlY29uZCBwYXJhbWV0ZXIuIElmIHRoZXJlIGFyZSBtb3JlIHBhcmFtZXRlcnMgKHRoaXJkIGFuZCBzbyBvbiksXG4gICAqIE9ic2VydmFibGUgd2lsbCBlbWl0IGFuIGFycmF5IHdpdGggYWxsIGFyZ3VtZW50cywgZXhjZXB0IGZpcnN0IGVycm9yIGFyZ3VtZW50LlxuICAgKlxuICAgKiBPcHRpb25hbGx5IGBiaW5kTm9kZUNhbGxiYWNrYCBhY2NlcHRzIHNlbGVjdG9yIGZ1bmN0aW9uLCB3aGljaCBhbGxvd3MgeW91IHRvXG4gICAqIG1ha2UgcmVzdWx0aW5nIE9ic2VydmFibGUgZW1pdCB2YWx1ZSBjb21wdXRlZCBieSBzZWxlY3RvciwgaW5zdGVhZCBvZiByZWd1bGFyXG4gICAqIGNhbGxiYWNrIGFyZ3VtZW50cy4gSXQgd29ya3Mgc2ltaWxhcmx5IHRvIHtAbGluayBiaW5kQ2FsbGJhY2t9IHNlbGVjdG9yLCBidXRcbiAgICogTm9kZS5qcy1zdHlsZSBlcnJvciBhcmd1bWVudCB3aWxsIG5ldmVyIGJlIHBhc3NlZCB0byB0aGF0IGZ1bmN0aW9uLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgYGZ1bmNgIHdpbGwgbm90IGJlIGNhbGxlZCBhdCB0aGUgc2FtZSB0aW1lIG91dHB1dCBmdW5jdGlvbiBpcyxcbiAgICogYnV0IHJhdGhlciB3aGVuZXZlciByZXN1bHRpbmcgT2JzZXJ2YWJsZSBpcyBzdWJzY3JpYmVkLiBCeSBkZWZhdWx0IGNhbGwgdG9cbiAgICogYGZ1bmNgIHdpbGwgaGFwcGVuIHN5bmNocm9ub3VzbHkgYWZ0ZXIgc3Vic2NyaXB0aW9uLCBidXQgdGhhdCBjYW4gYmUgY2hhbmdlZFxuICAgKiB3aXRoIHByb3BlciB7QGxpbmsgU2NoZWR1bGVyfSBwcm92aWRlZCBhcyBvcHRpb25hbCB0aGlyZCBwYXJhbWV0ZXIuIFNjaGVkdWxlclxuICAgKiBjYW4gYWxzbyBjb250cm9sIHdoZW4gdmFsdWVzIGZyb20gY2FsbGJhY2sgd2lsbCBiZSBlbWl0dGVkIGJ5IE9ic2VydmFibGUuXG4gICAqIFRvIGZpbmQgb3V0IG1vcmUsIGNoZWNrIG91dCBkb2N1bWVudGF0aW9uIGZvciB7QGxpbmsgYmluZENhbGxiYWNrfSwgd2hlcmVcbiAgICogU2NoZWR1bGVyIHdvcmtzIGV4YWN0bHkgdGhlIHNhbWUuXG4gICAqXG4gICAqIEFzIGluIHtAbGluayBiaW5kQ2FsbGJhY2t9LCBjb250ZXh0IChgdGhpc2AgcHJvcGVydHkpIG9mIGlucHV0IGZ1bmN0aW9uIHdpbGwgYmUgc2V0IHRvIGNvbnRleHRcbiAgICogb2YgcmV0dXJuZWQgZnVuY3Rpb24sIHdoZW4gaXQgaXMgY2FsbGVkLlxuICAgKlxuICAgKiBBZnRlciBPYnNlcnZhYmxlIGVtaXRzIHZhbHVlLCBpdCB3aWxsIGNvbXBsZXRlIGltbWVkaWF0ZWx5LiBUaGlzIG1lYW5zXG4gICAqIGV2ZW4gaWYgYGZ1bmNgIGNhbGxzIGNhbGxiYWNrIGFnYWluLCB2YWx1ZXMgZnJvbSBzZWNvbmQgYW5kIGNvbnNlY3V0aXZlXG4gICAqIGNhbGxzIHdpbGwgbmV2ZXIgYXBwZWFyIG9uIHRoZSBzdHJlYW0uIElmIHlvdSBuZWVkIHRvIGhhbmRsZSBmdW5jdGlvbnNcbiAgICogdGhhdCBjYWxsIGNhbGxiYWNrcyBtdWx0aXBsZSB0aW1lcywgY2hlY2sgb3V0IHtAbGluayBmcm9tRXZlbnR9IG9yXG4gICAqIHtAbGluayBmcm9tRXZlbnRQYXR0ZXJufSBpbnN0ZWFkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgYGJpbmROb2RlQ2FsbGJhY2tgIGNhbiBiZSB1c2VkIGluIG5vbi1Ob2RlLmpzIGVudmlyb25tZW50cyBhcyB3ZWxsLlxuICAgKiBcIk5vZGUuanMtc3R5bGVcIiBjYWxsYmFja3MgYXJlIGp1c3QgYSBjb252ZW50aW9uLCBzbyBpZiB5b3Ugd3JpdGUgZm9yXG4gICAqIGJyb3dzZXJzIG9yIGFueSBvdGhlciBlbnZpcm9ubWVudCBhbmQgQVBJIHlvdSB1c2UgaW1wbGVtZW50cyB0aGF0IGNhbGxiYWNrIHN0eWxlLFxuICAgKiBgYmluZE5vZGVDYWxsYmFja2AgY2FuIGJlIHNhZmVseSB1c2VkIG9uIHRoYXQgQVBJIGZ1bmN0aW9ucyBhcyB3ZWxsLlxuICAgKlxuICAgKiBSZW1lbWJlciB0aGF0IEVycm9yIG9iamVjdCBwYXNzZWQgdG8gY2FsbGJhY2sgZG9lcyBub3QgaGF2ZSB0byBiZSBhbiBpbnN0YW5jZVxuICAgKiBvZiBKYXZhU2NyaXB0IGJ1aWx0LWluIGBFcnJvcmAgb2JqZWN0LiBJbiBmYWN0LCBpdCBkb2VzIG5vdCBldmVuIGhhdmUgdG8gYW4gb2JqZWN0LlxuICAgKiBFcnJvciBwYXJhbWV0ZXIgb2YgY2FsbGJhY2sgZnVuY3Rpb24gaXMgaW50ZXJwcmV0ZWQgYXMgXCJwcmVzZW50XCIsIHdoZW4gdmFsdWVcbiAgICogb2YgdGhhdCBwYXJhbWV0ZXIgaXMgdHJ1dGh5LiBJdCBjb3VsZCBiZSwgZm9yIGV4YW1wbGUsIG5vbi16ZXJvIG51bWJlciwgbm9uLWVtcHR5XG4gICAqIHN0cmluZyBvciBib29sZWFuIGB0cnVlYC4gSW4gYWxsIG9mIHRoZXNlIGNhc2VzIHJlc3VsdGluZyBPYnNlcnZhYmxlIHdvdWxkIGVycm9yXG4gICAqIHdpdGggdGhhdCB2YWx1ZS4gVGhpcyBtZWFucyB1c3VhbGx5IHJlZ3VsYXIgc3R5bGUgY2FsbGJhY2tzIHdpbGwgZmFpbCB2ZXJ5IG9mdGVuIHdoZW5cbiAgICogYGJpbmROb2RlQ2FsbGJhY2tgIGlzIHVzZWQuIElmIHlvdXIgT2JzZXJ2YWJsZSBlcnJvcnMgbXVjaCBtb3JlIG9mdGVuIHRoZW4geW91XG4gICAqIHdvdWxkIGV4cGVjdCwgY2hlY2sgaWYgY2FsbGJhY2sgcmVhbGx5IGlzIGNhbGxlZCBpbiBOb2RlLmpzLXN0eWxlIGFuZCwgaWYgbm90LFxuICAgKiBzd2l0Y2ggdG8ge0BsaW5rIGJpbmRDYWxsYmFja30gaW5zdGVhZC5cbiAgICpcbiAgICogTm90ZSB0aGF0IGV2ZW4gaWYgZXJyb3IgcGFyYW1ldGVyIGlzIHRlY2huaWNhbGx5IHByZXNlbnQgaW4gY2FsbGJhY2ssIGJ1dCBpdHMgdmFsdWVcbiAgICogaXMgZmFsc3ksIGl0IHN0aWxsIHdvbid0IGFwcGVhciBpbiBhcnJheSBlbWl0dGVkIGJ5IE9ic2VydmFibGUgb3IgaW4gc2VsZWN0b3IgZnVuY3Rpb24uXG4gICAqXG4gICAqXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPlJlYWQgYSBmaWxlIGZyb20gdGhlIGZpbGVzeXN0ZW0gYW5kIGdldCB0aGUgZGF0YSBhcyBhbiBPYnNlcnZhYmxlPC9jYXB0aW9uPlxuICAgKiBpbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG4gICAqIHZhciByZWFkRmlsZUFzT2JzZXJ2YWJsZSA9IFJ4Lk9ic2VydmFibGUuYmluZE5vZGVDYWxsYmFjayhmcy5yZWFkRmlsZSk7XG4gICAqIHZhciByZXN1bHQgPSByZWFkRmlsZUFzT2JzZXJ2YWJsZSgnLi9yb2FkTmFtZXMudHh0JywgJ3V0ZjgnKTtcbiAgICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpLCBlID0+IGNvbnNvbGUuZXJyb3IoZSkpO1xuICAgKlxuICAgKlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5Vc2Ugb24gZnVuY3Rpb24gY2FsbGluZyBjYWxsYmFjayB3aXRoIG11bHRpcGxlIGFyZ3VtZW50czwvY2FwdGlvbj5cbiAgICogc29tZUZ1bmN0aW9uKChlcnIsIGEsIGIpID0+IHtcbiAgICogICBjb25zb2xlLmxvZyhlcnIpOyAvLyBudWxsXG4gICAqICAgY29uc29sZS5sb2coYSk7IC8vIDVcbiAgICogICBjb25zb2xlLmxvZyhiKTsgLy8gXCJzb21lIHN0cmluZ1wiXG4gICAqIH0pO1xuICAgKiB2YXIgYm91bmRTb21lRnVuY3Rpb24gPSBSeC5PYnNlcnZhYmxlLmJpbmROb2RlQ2FsbGJhY2soc29tZUZ1bmN0aW9uKTtcbiAgICogYm91bmRTb21lRnVuY3Rpb24oKVxuICAgKiAuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICogICBjb25zb2xlLmxvZyh2YWx1ZSk7IC8vIFs1LCBcInNvbWUgc3RyaW5nXCJdXG4gICAqIH0pO1xuICAgKlxuICAgKlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5Vc2Ugd2l0aCBzZWxlY3RvciBmdW5jdGlvbjwvY2FwdGlvbj5cbiAgICogc29tZUZ1bmN0aW9uKChlcnIsIGEsIGIpID0+IHtcbiAgICogICBjb25zb2xlLmxvZyhlcnIpOyAvLyB1bmRlZmluZWRcbiAgICogICBjb25zb2xlLmxvZyhhKTsgLy8gXCJhYmNcIlxuICAgKiAgIGNvbnNvbGUubG9nKGIpOyAvLyBcIkRFRlwiXG4gICAqIH0pO1xuICAgKiB2YXIgYm91bmRTb21lRnVuY3Rpb24gPSBSeC5PYnNlcnZhYmxlLmJpbmROb2RlQ2FsbGJhY2soc29tZUZ1bmN0aW9uLCAoYSwgYikgPT4gYSArIGIpO1xuICAgKiBib3VuZFNvbWVGdW5jdGlvbigpXG4gICAqIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgKiAgIGNvbnNvbGUubG9nKHZhbHVlKTsgLy8gXCJhYmNERUZcIlxuICAgKiB9KTtcbiAgICpcbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+VXNlIG9uIGZ1bmN0aW9uIGNhbGxpbmcgY2FsbGJhY2sgaW4gcmVndWxhciBzdHlsZTwvY2FwdGlvbj5cbiAgICogc29tZUZ1bmN0aW9uKGEgPT4ge1xuICAgKiAgIGNvbnNvbGUubG9nKGEpOyAvLyA1XG4gICAqIH0pO1xuICAgKiB2YXIgYm91bmRTb21lRnVuY3Rpb24gPSBSeC5PYnNlcnZhYmxlLmJpbmROb2RlQ2FsbGJhY2soc29tZUZ1bmN0aW9uKTtcbiAgICogYm91bmRTb21lRnVuY3Rpb24oKVxuICAgKiAuc3Vic2NyaWJlKFxuICAgKiAgIHZhbHVlID0+IHt9ICAgICAgICAgICAgIC8vIG5ldmVyIGdldHMgY2FsbGVkXG4gICAqICAgZXJyID0+IGNvbnNvbGUubG9nKGVycikgLy8gNVxuICAgKik7XG4gICAqXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIGJpbmRDYWxsYmFja31cbiAgICogQHNlZSB7QGxpbmsgZnJvbX1cbiAgICogQHNlZSB7QGxpbmsgZnJvbVByb21pc2V9XG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgRnVuY3Rpb24gd2l0aCBhIE5vZGUuanMtc3R5bGUgY2FsbGJhY2sgYXMgdGhlIGxhc3QgcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbc2VsZWN0b3JdIEEgZnVuY3Rpb24gd2hpY2ggdGFrZXMgdGhlIGFyZ3VtZW50cyBmcm9tIHRoZVxuICAgKiBjYWxsYmFjayBhbmQgbWFwcyB0aG9zZSB0byBhIHZhbHVlIHRvIGVtaXQgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICAgKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcl0gVGhlIHNjaGVkdWxlciBvbiB3aGljaCB0byBzY2hlZHVsZSB0aGVcbiAgICogY2FsbGJhY2tzLlxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbiguLi5wYXJhbXM6ICopOiBPYnNlcnZhYmxlfSBBIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgdGhlXG4gICAqIE9ic2VydmFibGUgdGhhdCBkZWxpdmVycyB0aGUgc2FtZSB2YWx1ZXMgdGhlIE5vZGUuanMgY2FsbGJhY2sgd291bGRcbiAgICogZGVsaXZlci5cbiAgICogQHN0YXRpYyB0cnVlXG4gICAqIEBuYW1lIGJpbmROb2RlQ2FsbGJhY2tcbiAgICogQG93bmVyIE9ic2VydmFibGVcbiAgICovXG4gIHN0YXRpYyBjcmVhdGU8VD4oZnVuYzogRnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6IEZ1bmN0aW9uIHwgdm9pZCA9IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogKC4uLmFyZ3M6IGFueVtdKSA9PiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gZnVuY3Rpb24odGhpczogYW55LCAuLi5hcmdzOiBhbnlbXSk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgcmV0dXJuIG5ldyBCb3VuZE5vZGVDYWxsYmFja09ic2VydmFibGU8VD4oZnVuYywgPGFueT5zZWxlY3RvciwgYXJncywgdGhpcywgc2NoZWR1bGVyKTtcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYWxsYmFja0Z1bmM6IEZ1bmN0aW9uLFxuICAgICAgICAgICAgICBwcml2YXRlIHNlbGVjdG9yOiBGdW5jdGlvbixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhcmdzOiBhbnlbXSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjb250ZXh0OiBhbnksXG4gICAgICAgICAgICAgIHB1YmxpYyBzY2hlZHVsZXI6IElTY2hlZHVsZXIpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUIHwgVFtdPik6IFN1YnNjcmlwdGlvbiB7XG4gICAgY29uc3QgY2FsbGJhY2tGdW5jID0gdGhpcy5jYWxsYmFja0Z1bmM7XG4gICAgY29uc3QgYXJncyA9IHRoaXMuYXJncztcbiAgICBjb25zdCBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcbiAgICBsZXQgc3ViamVjdCA9IHRoaXMuc3ViamVjdDtcblxuICAgIGlmICghc2NoZWR1bGVyKSB7XG4gICAgICBpZiAoIXN1YmplY3QpIHtcbiAgICAgICAgc3ViamVjdCA9IHRoaXMuc3ViamVjdCA9IG5ldyBBc3luY1N1YmplY3Q8VD4oKTtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IGZ1bmN0aW9uIGhhbmRsZXJGbih0aGlzOiBhbnksIC4uLmlubmVyQXJnczogYW55W10pIHtcbiAgICAgICAgICBjb25zdCBzb3VyY2UgPSAoPGFueT5oYW5kbGVyRm4pLnNvdXJjZTtcbiAgICAgICAgICBjb25zdCB7IHNlbGVjdG9yLCBzdWJqZWN0IH0gPSBzb3VyY2U7XG4gICAgICAgICAgY29uc3QgZXJyID0gaW5uZXJBcmdzLnNoaWZ0KCk7XG5cbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBzdWJqZWN0LmVycm9yKGVycik7XG4gICAgICAgICAgfSBlbHNlIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdHJ5Q2F0Y2goc2VsZWN0b3IpLmFwcGx5KHRoaXMsIGlubmVyQXJncyk7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICAgICAgICBzdWJqZWN0LmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3ViamVjdC5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgICAgIHN1YmplY3QuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3ViamVjdC5uZXh0KGlubmVyQXJncy5sZW5ndGggPD0gMSA/IGlubmVyQXJnc1swXSA6IGlubmVyQXJncyk7XG4gICAgICAgICAgICBzdWJqZWN0LmNvbXBsZXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvLyB1c2UgbmFtZWQgZnVuY3Rpb24gaW5zdGFuY2UgdG8gYXZvaWQgY2xvc3VyZS5cbiAgICAgICAgKDxhbnk+aGFuZGxlcikuc291cmNlID0gdGhpcztcblxuICAgICAgICBjb25zdCByZXN1bHQgPSB0cnlDYXRjaChjYWxsYmFja0Z1bmMpLmFwcGx5KHRoaXMuY29udGV4dCwgYXJncy5jb25jYXQoaGFuZGxlcikpO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICAgIHN1YmplY3QuZXJyb3IoZXJyb3JPYmplY3QuZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBzdWJqZWN0LnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShkaXNwYXRjaCwgMCwgeyBzb3VyY2U6IHRoaXMsIHN1YnNjcmliZXIsIGNvbnRleHQ6IHRoaXMuY29udGV4dCB9KTtcbiAgICB9XG4gIH1cbn1cblxuaW50ZXJmYWNlIERpc3BhdGNoU3RhdGU8VD4ge1xuICBzb3VyY2U6IEJvdW5kTm9kZUNhbGxiYWNrT2JzZXJ2YWJsZTxUPjtcbiAgc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPjtcbiAgY29udGV4dDogYW55O1xufVxuXG5mdW5jdGlvbiBkaXNwYXRjaDxUPih0aGlzOiBBY3Rpb248RGlzcGF0Y2hTdGF0ZTxUPj4sIHN0YXRlOiBEaXNwYXRjaFN0YXRlPFQ+KSB7XG4gIGNvbnN0IHNlbGYgPSAoPFN1YnNjcmlwdGlvbj4gdGhpcyk7XG4gIGNvbnN0IHsgc291cmNlLCBzdWJzY3JpYmVyLCBjb250ZXh0IH0gPSBzdGF0ZTtcbiAgLy8gWFhYOiBjYXN0IHRvIGBhbnlgIHRvIGFjY2VzcyB0byB0aGUgcHJpdmF0ZSBmaWVsZCBpbiBgc291cmNlYC5cbiAgY29uc3QgeyBjYWxsYmFja0Z1bmMsIGFyZ3MsIHNjaGVkdWxlciB9ID0gc291cmNlIGFzIGFueTtcbiAgbGV0IHN1YmplY3QgPSBzb3VyY2Uuc3ViamVjdDtcblxuICBpZiAoIXN1YmplY3QpIHtcbiAgICBzdWJqZWN0ID0gc291cmNlLnN1YmplY3QgPSBuZXcgQXN5bmNTdWJqZWN0PFQ+KCk7XG5cbiAgICBjb25zdCBoYW5kbGVyID0gZnVuY3Rpb24gaGFuZGxlckZuKHRoaXM6IGFueSwgLi4uaW5uZXJBcmdzOiBhbnlbXSkge1xuICAgICAgY29uc3Qgc291cmNlID0gKDxhbnk+aGFuZGxlckZuKS5zb3VyY2U7XG4gICAgICBjb25zdCB7IHNlbGVjdG9yLCBzdWJqZWN0IH0gPSBzb3VyY2U7XG4gICAgICBjb25zdCBlcnIgPSBpbm5lckFyZ3Muc2hpZnQoKTtcblxuICAgICAgaWYgKGVycikge1xuICAgICAgICBzZWxmLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hFcnJvciwgMCwgeyBlcnIsIHN1YmplY3QgfSkpO1xuICAgICAgfSBlbHNlIGlmIChzZWxlY3Rvcikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0cnlDYXRjaChzZWxlY3RvcikuYXBwbHkodGhpcywgaW5uZXJBcmdzKTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgICAgICBzZWxmLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hFcnJvciwgMCwgeyBlcnI6IGVycm9yT2JqZWN0LmUsIHN1YmplY3QgfSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShkaXNwYXRjaE5leHQsIDAsIHsgdmFsdWU6IHJlc3VsdCwgc3ViamVjdCB9KSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gaW5uZXJBcmdzLmxlbmd0aCA8PSAxID8gaW5uZXJBcmdzWzBdIDogaW5uZXJBcmdzO1xuICAgICAgICBzZWxmLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hOZXh0LCAwLCB7IHZhbHVlLCBzdWJqZWN0IH0pKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIC8vIHVzZSBuYW1lZCBmdW5jdGlvbiB0byBwYXNzIHZhbHVlcyBpbiB3aXRob3V0IGNsb3N1cmVcbiAgICAoPGFueT5oYW5kbGVyKS5zb3VyY2UgPSBzb3VyY2U7XG5cbiAgICBjb25zdCByZXN1bHQgPSB0cnlDYXRjaChjYWxsYmFja0Z1bmMpLmFwcGx5KGNvbnRleHQsIGFyZ3MuY29uY2F0KGhhbmRsZXIpKTtcbiAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iamVjdCkge1xuICAgICAgc2VsZi5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoRXJyb3IsIDAsIHsgZXJyOiBlcnJvck9iamVjdC5lLCBzdWJqZWN0IH0pKTtcbiAgICB9XG4gIH1cblxuICBzZWxmLmFkZChzdWJqZWN0LnN1YnNjcmliZShzdWJzY3JpYmVyKSk7XG59XG5cbmludGVyZmFjZSBEaXNwYXRjaE5leHRBcmc8VD4ge1xuICBzdWJqZWN0OiBBc3luY1N1YmplY3Q8VD47XG4gIHZhbHVlOiBUO1xufVxuZnVuY3Rpb24gZGlzcGF0Y2hOZXh0PFQ+KGFyZzogRGlzcGF0Y2hOZXh0QXJnPFQ+KSB7XG4gIGNvbnN0IHsgdmFsdWUsIHN1YmplY3QgfSA9IGFyZztcbiAgc3ViamVjdC5uZXh0KHZhbHVlKTtcbiAgc3ViamVjdC5jb21wbGV0ZSgpO1xufVxuXG5pbnRlcmZhY2UgRGlzcGF0Y2hFcnJvckFyZzxUPiB7XG4gIHN1YmplY3Q6IEFzeW5jU3ViamVjdDxUPjtcbiAgZXJyOiBhbnk7XG59XG5mdW5jdGlvbiBkaXNwYXRjaEVycm9yPFQ+KGFyZzogRGlzcGF0Y2hFcnJvckFyZzxUPikge1xuICBjb25zdCB7IGVyciwgc3ViamVjdCB9ID0gYXJnO1xuICBzdWJqZWN0LmVycm9yKGVycik7XG59XG4iXX0=