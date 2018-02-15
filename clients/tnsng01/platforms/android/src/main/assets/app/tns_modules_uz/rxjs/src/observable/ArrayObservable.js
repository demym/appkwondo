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
var ScalarObservable_1 = require("./ScalarObservable");
var EmptyObservable_1 = require("./EmptyObservable");
var isScheduler_1 = require("../util/isScheduler");
var ArrayObservable = (function (_super) {
    __extends(ArrayObservable, _super);
    function ArrayObservable(array, scheduler) {
        var _this = _super.call(this) || this;
        _this.array = array;
        _this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            _this._isScalar = true;
            _this.value = array[0];
        }
        return _this;
    }
    ArrayObservable.create = function (array, scheduler) {
        return new ArrayObservable(array, scheduler);
    };
    ArrayObservable.of = function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        var len = array.length;
        if (len > 1) {
            return new ArrayObservable(array, scheduler);
        }
        else if (len === 1) {
            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
        }
        else {
            return new EmptyObservable_1.EmptyObservable(scheduler);
        }
    };
    ArrayObservable.dispatch = function (state) {
        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(array[index]);
        if (subscriber.closed) {
            return;
        }
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var array = this.array;
        var count = array.length;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ArrayObservable.dispatch, 0, {
                array: array, index: index, count: count, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < count && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayObservable;
}(Observable_1.Observable));
exports.ArrayObservable = ArrayObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJyYXlPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXJyYXlPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLDRDQUEyQztBQUMzQyx1REFBc0Q7QUFDdEQscURBQW9EO0FBRXBELG1EQUFrRDtBQVFsRDtJQUF3QyxtQ0FBYTtJQTBGbkQseUJBQW9CLEtBQVUsRUFBVSxTQUFzQjtRQUE5RCxZQUNFLGlCQUFPLFNBS1I7UUFObUIsV0FBSyxHQUFMLEtBQUssQ0FBSztRQUFVLGVBQVMsR0FBVCxTQUFTLENBQWE7UUFFNUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLENBQUM7O0lBQ0gsQ0FBQztJQTlGTSxzQkFBTSxHQUFiLFVBQWlCLEtBQVUsRUFBRSxTQUFzQjtRQUNqRCxNQUFNLENBQUMsSUFBSSxlQUFlLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUE2Q00sa0JBQUUsR0FBVDtRQUFhLGVBQStCO2FBQS9CLFVBQStCLEVBQS9CLHFCQUErQixFQUEvQixJQUErQjtZQUEvQiwwQkFBK0I7O1FBQzFDLElBQUksU0FBUyxHQUFlLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLHlCQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDbkIsQ0FBQztRQUVELElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDekIsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUMsSUFBSSxlQUFlLENBQVMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDLElBQUksbUNBQWdCLENBQVMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLGlDQUFlLENBQUksU0FBUyxDQUFDLENBQUM7UUFDM0MsQ0FBQztJQUNILENBQUM7SUFFTSx3QkFBUSxHQUFmLFVBQWdCLEtBQVU7UUFFaEIsSUFBQSxtQkFBSyxFQUFFLG1CQUFLLEVBQUUsbUJBQUssRUFBRSw2QkFBVSxDQUFXO1FBRWxELEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ25CLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QixNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUU5QixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLElBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQWFTLG9DQUFVLEdBQXBCLFVBQXFCLFVBQXlCO1FBQzVDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRWpDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRTtnQkFDckQsS0FBSyxPQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsVUFBVSxZQUFBO2FBQ2hDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNyRCxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLENBQUM7WUFDRCxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDeEIsQ0FBQztJQUNILENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFuSEQsQ0FBd0MsdUJBQVUsR0FtSGpEO0FBbkhZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNjaGVkdWxlciB9IGZyb20gJy4uL1NjaGVkdWxlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTY2FsYXJPYnNlcnZhYmxlIH0gZnJvbSAnLi9TY2FsYXJPYnNlcnZhYmxlJztcbmltcG9ydCB7IEVtcHR5T2JzZXJ2YWJsZSB9IGZyb20gJy4vRW1wdHlPYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IGlzU2NoZWR1bGVyIH0gZnJvbSAnLi4vdXRpbC9pc1NjaGVkdWxlcic7XG5pbXBvcnQgeyBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKiBAaGlkZSB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBBcnJheU9ic2VydmFibGU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcblxuICBzdGF0aWMgY3JlYXRlPFQ+KGFycmF5OiBUW10sIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gbmV3IEFycmF5T2JzZXJ2YWJsZShhcnJheSwgc2NoZWR1bGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBvZjxUPihpdGVtMTogVCwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6IE9ic2VydmFibGU8VD47XG4gIHN0YXRpYyBvZjxUPihpdGVtMTogVCwgaXRlbTI6IFQsIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPFQ+O1xuICBzdGF0aWMgb2Y8VD4oaXRlbTE6IFQsIGl0ZW0yOiBULCBpdGVtMzogVCwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6IE9ic2VydmFibGU8VD47XG4gIHN0YXRpYyBvZjxUPihpdGVtMTogVCwgaXRlbTI6IFQsIGl0ZW0zOiBULCBpdGVtNDogVCwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6IE9ic2VydmFibGU8VD47XG4gIHN0YXRpYyBvZjxUPihpdGVtMTogVCwgaXRlbTI6IFQsIGl0ZW0zOiBULCBpdGVtNDogVCwgaXRlbTU6IFQsIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPFQ+O1xuICBzdGF0aWMgb2Y8VD4oaXRlbTE6IFQsIGl0ZW0yOiBULCBpdGVtMzogVCwgaXRlbTQ6IFQsIGl0ZW01OiBULCBpdGVtNjogVCwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6IE9ic2VydmFibGU8VD47XG4gIHN0YXRpYyBvZjxUPiguLi5hcnJheTogQXJyYXk8VCB8IElTY2hlZHVsZXI+KTogT2JzZXJ2YWJsZTxUPjtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHNvbWUgdmFsdWVzIHlvdSBzcGVjaWZ5IGFzIGFyZ3VtZW50cyxcbiAgICogaW1tZWRpYXRlbHkgb25lIGFmdGVyIHRoZSBvdGhlciwgYW5kIHRoZW4gZW1pdHMgYSBjb21wbGV0ZSBub3RpZmljYXRpb24uXG4gICAqXG4gICAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5FbWl0cyB0aGUgYXJndW1lbnRzIHlvdSBwcm92aWRlLCB0aGVuIGNvbXBsZXRlcy5cbiAgICogPC9zcGFuPlxuICAgKlxuICAgKiA8aW1nIHNyYz1cIi4vaW1nL29mLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICAgKlxuICAgKiBUaGlzIHN0YXRpYyBvcGVyYXRvciBpcyB1c2VmdWwgZm9yIGNyZWF0aW5nIGEgc2ltcGxlIE9ic2VydmFibGUgdGhhdCBvbmx5XG4gICAqIGVtaXRzIHRoZSBhcmd1bWVudHMgZ2l2ZW4sIGFuZCB0aGUgY29tcGxldGUgbm90aWZpY2F0aW9uIHRoZXJlYWZ0ZXIuIEl0IGNhblxuICAgKiBiZSB1c2VkIGZvciBjb21wb3Npbmcgd2l0aCBvdGhlciBPYnNlcnZhYmxlcywgc3VjaCBhcyB3aXRoIHtAbGluayBjb25jYXR9LlxuICAgKiBCeSBkZWZhdWx0LCBpdCB1c2VzIGEgYG51bGxgIElTY2hlZHVsZXIsIHdoaWNoIG1lYW5zIHRoZSBgbmV4dGBcbiAgICogbm90aWZpY2F0aW9ucyBhcmUgc2VudCBzeW5jaHJvbm91c2x5LCBhbHRob3VnaCB3aXRoIGEgZGlmZmVyZW50IElTY2hlZHVsZXJcbiAgICogaXQgaXMgcG9zc2libGUgdG8gZGV0ZXJtaW5lIHdoZW4gdGhvc2Ugbm90aWZpY2F0aW9ucyB3aWxsIGJlIGRlbGl2ZXJlZC5cbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCAxMCwgMjAsIDMwLCB0aGVuICdhJywgJ2InLCAnYycsIHRoZW4gc3RhcnQgdGlja2luZyBldmVyeSBzZWNvbmQuPC9jYXB0aW9uPlxuICAgKiB2YXIgbnVtYmVycyA9IFJ4Lk9ic2VydmFibGUub2YoMTAsIDIwLCAzMCk7XG4gICAqIHZhciBsZXR0ZXJzID0gUnguT2JzZXJ2YWJsZS5vZignYScsICdiJywgJ2MnKTtcbiAgICogdmFyIGludGVydmFsID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKTtcbiAgICogdmFyIHJlc3VsdCA9IG51bWJlcnMuY29uY2F0KGxldHRlcnMpLmNvbmNhdChpbnRlcnZhbCk7XG4gICAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gICAqXG4gICAqIEBzZWUge0BsaW5rIGNyZWF0ZX1cbiAgICogQHNlZSB7QGxpbmsgZW1wdHl9XG4gICAqIEBzZWUge0BsaW5rIG5ldmVyfVxuICAgKiBAc2VlIHtAbGluayB0aHJvd31cbiAgICpcbiAgICogQHBhcmFtIHsuLi5UfSB2YWx1ZXMgQXJndW1lbnRzIHRoYXQgcmVwcmVzZW50IGBuZXh0YCB2YWx1ZXMgdG8gYmUgZW1pdHRlZC5cbiAgICogQHBhcmFtIHtTY2hlZHVsZXJ9IFtzY2hlZHVsZXJdIEEge0BsaW5rIElTY2hlZHVsZXJ9IHRvIHVzZSBmb3Igc2NoZWR1bGluZ1xuICAgKiB0aGUgZW1pc3Npb25zIG9mIHRoZSBgbmV4dGAgbm90aWZpY2F0aW9ucy5cbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGVhY2ggZ2l2ZW4gaW5wdXQgdmFsdWUuXG4gICAqIEBzdGF0aWMgdHJ1ZVxuICAgKiBAbmFtZSBvZlxuICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgKi9cbiAgc3RhdGljIG9mPFQ+KC4uLmFycmF5OiBBcnJheTxUIHwgSVNjaGVkdWxlcj4pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBsZXQgc2NoZWR1bGVyID0gPElTY2hlZHVsZXI+YXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgaWYgKGlzU2NoZWR1bGVyKHNjaGVkdWxlcikpIHtcbiAgICAgIGFycmF5LnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzY2hlZHVsZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGxlbiA9IGFycmF5Lmxlbmd0aDtcbiAgICBpZiAobGVuID4gMSkge1xuICAgICAgcmV0dXJuIG5ldyBBcnJheU9ic2VydmFibGU8VD4oPGFueT5hcnJheSwgc2NoZWR1bGVyKTtcbiAgICB9IGVsc2UgaWYgKGxlbiA9PT0gMSkge1xuICAgICAgcmV0dXJuIG5ldyBTY2FsYXJPYnNlcnZhYmxlPFQ+KDxhbnk+YXJyYXlbMF0sIHNjaGVkdWxlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgRW1wdHlPYnNlcnZhYmxlPFQ+KHNjaGVkdWxlcik7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRpc3BhdGNoKHN0YXRlOiBhbnkpIHtcblxuICAgIGNvbnN0IHsgYXJyYXksIGluZGV4LCBjb3VudCwgc3Vic2NyaWJlciB9ID0gc3RhdGU7XG5cbiAgICBpZiAoaW5kZXggPj0gY291bnQpIHtcbiAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVyLm5leHQoYXJyYXlbaW5kZXhdKTtcblxuICAgIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN0YXRlLmluZGV4ID0gaW5kZXggKyAxO1xuXG4gICAgKDxhbnk+IHRoaXMpLnNjaGVkdWxlKHN0YXRlKTtcbiAgfVxuXG4gIC8vIHZhbHVlIHVzZWQgaWYgQXJyYXkgaGFzIG9uZSB2YWx1ZSBhbmQgX2lzU2NhbGFyXG4gIHZhbHVlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcnJheTogVFtdLCBwcml2YXRlIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmICghc2NoZWR1bGVyICYmIGFycmF5Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgdGhpcy5faXNTY2FsYXIgPSB0cnVlO1xuICAgICAgdGhpcy52YWx1ZSA9IGFycmF5WzBdO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pOiBUZWFyZG93bkxvZ2ljIHtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIGNvbnN0IGFycmF5ID0gdGhpcy5hcnJheTtcbiAgICBjb25zdCBjb3VudCA9IGFycmF5Lmxlbmd0aDtcbiAgICBjb25zdCBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcblxuICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoQXJyYXlPYnNlcnZhYmxlLmRpc3BhdGNoLCAwLCB7XG4gICAgICAgIGFycmF5LCBpbmRleCwgY291bnQsIHN1YnNjcmliZXJcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50ICYmICFzdWJzY3JpYmVyLmNsb3NlZDsgaSsrKSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChhcnJheVtpXSk7XG4gICAgICB9XG4gICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=