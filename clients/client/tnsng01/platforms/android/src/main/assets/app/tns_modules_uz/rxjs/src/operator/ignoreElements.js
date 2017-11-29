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
var noop_1 = require("../util/noop");
function ignoreElements() {
    return this.lift(new IgnoreElementsOperator());
}
exports.ignoreElements = ignoreElements;
;
var IgnoreElementsOperator = (function () {
    function IgnoreElementsOperator() {
    }
    IgnoreElementsOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new IgnoreElementsSubscriber(subscriber));
    };
    return IgnoreElementsOperator;
}());
var IgnoreElementsSubscriber = (function (_super) {
    __extends(IgnoreElementsSubscriber, _super);
    function IgnoreElementsSubscriber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IgnoreElementsSubscriber.prototype._next = function (unused) {
        noop_1.noop();
    };
    return IgnoreElementsSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWdub3JlRWxlbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpZ25vcmVFbGVtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSw0Q0FBMkM7QUFDM0MscUNBQW9DO0FBWXBDO0lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxzQkFBc0IsRUFBRSxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUZELHdDQUVDO0FBQUEsQ0FBQztBQUVGO0lBQUE7SUFJQSxDQUFDO0lBSEMscUNBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUNILDZCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFPRDtJQUEwQyw0Q0FBYTtJQUF2RDs7SUFJQSxDQUFDO0lBSFcsd0NBQUssR0FBZixVQUFnQixNQUFTO1FBQ3ZCLFdBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQUNILCtCQUFDO0FBQUQsQ0FBQyxBQUpELENBQTBDLHVCQUFVLEdBSW5EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbC9ub29wJztcblxuLyoqXG4gKiBJZ25vcmVzIGFsbCBpdGVtcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhbmQgb25seSBwYXNzZXMgY2FsbHMgb2YgYGNvbXBsZXRlYCBvciBgZXJyb3JgLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvaWdub3JlRWxlbWVudHMucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gZW1wdHkgT2JzZXJ2YWJsZSB0aGF0IG9ubHkgY2FsbHMgYGNvbXBsZXRlYFxuICogb3IgYGVycm9yYCwgYmFzZWQgb24gd2hpY2ggb25lIGlzIGNhbGxlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIGlnbm9yZUVsZW1lbnRzXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaWdub3JlRWxlbWVudHM8VD4odGhpczogT2JzZXJ2YWJsZTxUPik6IE9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBJZ25vcmVFbGVtZW50c09wZXJhdG9yKCkpO1xufTtcblxuY2xhc3MgSWdub3JlRWxlbWVudHNPcGVyYXRvcjxULCBSPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFI+IHtcbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFI+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IElnbm9yZUVsZW1lbnRzU3Vic2NyaWJlcihzdWJzY3JpYmVyKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIElnbm9yZUVsZW1lbnRzU3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcm90ZWN0ZWQgX25leHQodW51c2VkOiBUKTogdm9pZCB7XG4gICAgbm9vcCgpO1xuICB9XG59XG4iXX0=