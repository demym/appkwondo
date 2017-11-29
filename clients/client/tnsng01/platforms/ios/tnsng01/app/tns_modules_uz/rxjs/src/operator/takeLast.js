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
var Subscriber_1 = require("../Subscriber");
var ArgumentOutOfRangeError_1 = require("../util/ArgumentOutOfRangeError");
var EmptyObservable_1 = require("../observable/EmptyObservable");
function takeLast(count) {
    if (count === 0) {
        return new EmptyObservable_1.EmptyObservable();
    }
    else {
        return this.lift(new TakeLastOperator(count));
    }
}
exports.takeLast = takeLast;
var TakeLastOperator = (function () {
    function TakeLastOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
    }
    TakeLastOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TakeLastSubscriber(subscriber, this.total));
    };
    return TakeLastOperator;
}());
var TakeLastSubscriber = (function (_super) {
    __extends(TakeLastSubscriber, _super);
    function TakeLastSubscriber(destination, total) {
        var _this = _super.call(this, destination) || this;
        _this.total = total;
        _this.ring = new Array();
        _this.count = 0;
        return _this;
    }
    TakeLastSubscriber.prototype._next = function (value) {
        var ring = this.ring;
        var total = this.total;
        var count = this.count++;
        if (ring.length < total) {
            ring.push(value);
        }
        else {
            var index = count % total;
            ring[index] = value;
        }
    };
    TakeLastSubscriber.prototype._complete = function () {
        var destination = this.destination;
        var count = this.count;
        if (count > 0) {
            var total = this.count >= this.total ? this.total : this.count;
            var ring = this.ring;
            for (var i = 0; i < total; i++) {
                var idx = (count++) % total;
                destination.next(ring[idx]);
            }
        }
        destination.complete();
    };
    return TakeLastSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFrZUxhc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWtlTGFzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSw0Q0FBMkM7QUFDM0MsMkVBQTBFO0FBQzFFLGlFQUFnRTtBQXdDaEUsa0JBQWlELEtBQWE7SUFDNUQsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEIsTUFBTSxDQUFDLElBQUksaUNBQWUsRUFBSyxDQUFDO0lBQ2xDLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0FBQ0gsQ0FBQztBQU5ELDRCQU1DO0FBRUQ7SUFDRSwwQkFBb0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sSUFBSSxpREFBdUIsQ0FBQztRQUNwQyxDQUFDO0lBQ0gsQ0FBQztJQUVELCtCQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7UUFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFPRDtJQUFvQyxzQ0FBYTtJQUkvQyw0QkFBWSxXQUEwQixFQUFVLEtBQWE7UUFBN0QsWUFDRSxrQkFBTSxXQUFXLENBQUMsU0FDbkI7UUFGK0MsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQUhyRCxVQUFJLEdBQWEsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUM3QixXQUFLLEdBQVcsQ0FBQyxDQUFDOztJQUkxQixDQUFDO0lBRVMsa0NBQUssR0FBZixVQUFnQixLQUFRO1FBQ3RCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN6QixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBTSxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLENBQUM7SUFDSCxDQUFDO0lBRVMsc0NBQVMsR0FBbkI7UUFDRSxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3JDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFdkIsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2pFLElBQU0sSUFBSSxHQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFeEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDL0IsSUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDOUIsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM5QixDQUFDO1FBQ0gsQ0FBQztRQUVELFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBckNELENBQW9DLHVCQUFVLEdBcUM3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgQXJndW1lbnRPdXRPZlJhbmdlRXJyb3IgfSBmcm9tICcuLi91dGlsL0FyZ3VtZW50T3V0T2ZSYW5nZUVycm9yJztcbmltcG9ydCB7IEVtcHR5T2JzZXJ2YWJsZSB9IGZyb20gJy4uL29ic2VydmFibGUvRW1wdHlPYnNlcnZhYmxlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuXG4vKipcbiAqIEVtaXRzIG9ubHkgdGhlIGxhc3QgYGNvdW50YCB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPlJlbWVtYmVycyB0aGUgbGF0ZXN0IGBjb3VudGAgdmFsdWVzLCB0aGVuIGVtaXRzIHRob3NlXG4gKiBvbmx5IHdoZW4gdGhlIHNvdXJjZSBjb21wbGV0ZXMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvdGFrZUxhc3QucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYHRha2VMYXN0YCByZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBhdCBtb3N0IHRoZSBsYXN0IGBjb3VudGAgdmFsdWVzXG4gKiBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gSWYgdGhlIHNvdXJjZSBlbWl0cyBmZXdlciB0aGFuIGBjb3VudGBcbiAqIHZhbHVlcyB0aGVuIGFsbCBvZiBpdHMgdmFsdWVzIGFyZSBlbWl0dGVkLiBUaGlzIG9wZXJhdG9yIG11c3Qgd2FpdCB1bnRpbCB0aGVcbiAqIGBjb21wbGV0ZWAgbm90aWZpY2F0aW9uIGVtaXNzaW9uIGZyb20gdGhlIHNvdXJjZSBpbiBvcmRlciB0byBlbWl0IHRoZSBgbmV4dGBcbiAqIHZhbHVlcyBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUsIGJlY2F1c2Ugb3RoZXJ3aXNlIGl0IGlzIGltcG9zc2libGUgdG8ga25vd1xuICogd2hldGhlciBvciBub3QgbW9yZSB2YWx1ZXMgd2lsbCBiZSBlbWl0dGVkIG9uIHRoZSBzb3VyY2UuIEZvciB0aGlzIHJlYXNvbixcbiAqIGFsbCB2YWx1ZXMgYXJlIGVtaXR0ZWQgc3luY2hyb25vdXNseSwgZm9sbG93ZWQgYnkgdGhlIGNvbXBsZXRlIG5vdGlmaWNhdGlvbi5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5UYWtlIHRoZSBsYXN0IDMgdmFsdWVzIG9mIGFuIE9ic2VydmFibGUgd2l0aCBtYW55IHZhbHVlczwvY2FwdGlvbj5cbiAqIHZhciBtYW55ID0gUnguT2JzZXJ2YWJsZS5yYW5nZSgxLCAxMDApO1xuICogdmFyIGxhc3RUaHJlZSA9IG1hbnkudGFrZUxhc3QoMyk7XG4gKiBsYXN0VGhyZWUuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIHRha2V9XG4gKiBAc2VlIHtAbGluayB0YWtlVW50aWx9XG4gKiBAc2VlIHtAbGluayB0YWtlV2hpbGV9XG4gKiBAc2VlIHtAbGluayBza2lwfVxuICpcbiAqIEB0aHJvd3Mge0FyZ3VtZW50T3V0T2ZSYW5nZUVycm9yfSBXaGVuIHVzaW5nIGB0YWtlTGFzdChpKWAsIGl0IGRlbGl2ZXJzIGFuXG4gKiBBcmd1bWVudE91dE9yUmFuZ2VFcnJvciB0byB0aGUgT2JzZXJ2ZXIncyBgZXJyb3JgIGNhbGxiYWNrIGlmIGBpIDwgMGAuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGNvdW50IFRoZSBtYXhpbXVtIG51bWJlciBvZiB2YWx1ZXMgdG8gZW1pdCBmcm9tIHRoZSBlbmQgb2ZcbiAqIHRoZSBzZXF1ZW5jZSBvZiB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYXQgbW9zdCB0aGUgbGFzdCBjb3VudFxuICogdmFsdWVzIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogQG1ldGhvZCB0YWtlTGFzdFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRha2VMYXN0PFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIGNvdW50OiBudW1iZXIpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBFbXB0eU9ic2VydmFibGU8VD4oKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5saWZ0KG5ldyBUYWtlTGFzdE9wZXJhdG9yKGNvdW50KSk7XG4gIH1cbn1cblxuY2xhc3MgVGFrZUxhc3RPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0b3RhbDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMudG90YWwgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXJyb3I7XG4gICAgfVxuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBUYWtlTGFzdFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy50b3RhbCkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBUYWtlTGFzdFN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSByaW5nOiBBcnJheTxUPiA9IG5ldyBBcnJheSgpO1xuICBwcml2YXRlIGNvdW50OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQ+LCBwcml2YXRlIHRvdGFsOiBudW1iZXIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBjb25zdCByaW5nID0gdGhpcy5yaW5nO1xuICAgIGNvbnN0IHRvdGFsID0gdGhpcy50b3RhbDtcbiAgICBjb25zdCBjb3VudCA9IHRoaXMuY291bnQrKztcblxuICAgIGlmIChyaW5nLmxlbmd0aCA8IHRvdGFsKSB7XG4gICAgICByaW5nLnB1c2godmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmRleCA9IGNvdW50ICUgdG90YWw7XG4gICAgICByaW5nW2luZGV4XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKTogdm9pZCB7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uO1xuICAgIGxldCBjb3VudCA9IHRoaXMuY291bnQ7XG5cbiAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICBjb25zdCB0b3RhbCA9IHRoaXMuY291bnQgPj0gdGhpcy50b3RhbCA/IHRoaXMudG90YWwgOiB0aGlzLmNvdW50O1xuICAgICAgY29uc3QgcmluZyAgPSB0aGlzLnJpbmc7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG90YWw7IGkrKykge1xuICAgICAgICBjb25zdCBpZHggPSAoY291bnQrKykgJSB0b3RhbDtcbiAgICAgICAgZGVzdGluYXRpb24ubmV4dChyaW5nW2lkeF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==