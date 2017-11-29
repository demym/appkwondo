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
function skip(count) {
    return this.lift(new SkipOperator(count));
}
exports.skip = skip;
var SkipOperator = (function () {
    function SkipOperator(total) {
        this.total = total;
    }
    SkipOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new SkipSubscriber(subscriber, this.total));
    };
    return SkipOperator;
}());
var SkipSubscriber = (function (_super) {
    __extends(SkipSubscriber, _super);
    function SkipSubscriber(destination, total) {
        var _this = _super.call(this, destination) || this;
        _this.total = total;
        _this.count = 0;
        return _this;
    }
    SkipSubscriber.prototype._next = function (x) {
        if (++this.count > this.total) {
            this.destination.next(x);
        }
    };
    return SkipSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNraXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsNENBQTJDO0FBZTNDLGNBQTZDLEtBQWE7SUFDeEQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBRkQsb0JBRUM7QUFFRDtJQUNFLHNCQUFvQixLQUFhO1FBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUNqQyxDQUFDO0lBRUQsMkJBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFPRDtJQUFnQyxrQ0FBYTtJQUczQyx3QkFBWSxXQUEwQixFQUFVLEtBQWE7UUFBN0QsWUFDRSxrQkFBTSxXQUFXLENBQUMsU0FDbkI7UUFGK0MsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQUY3RCxXQUFLLEdBQVcsQ0FBQyxDQUFDOztJQUlsQixDQUFDO0lBRVMsOEJBQUssR0FBZixVQUFnQixDQUFJO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixDQUFDO0lBQ0gsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQVpELENBQWdDLHVCQUFVLEdBWXpDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuLyoqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBza2lwcyB0aGUgZmlyc3QgYGNvdW50YCBpdGVtcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3NraXAucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IC0gVGhlIG51bWJlciBvZiB0aW1lcywgaXRlbXMgZW1pdHRlZCBieSBzb3VyY2UgT2JzZXJ2YWJsZSBzaG91bGQgYmUgc2tpcHBlZC5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBza2lwcyB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKlxuICogQG1ldGhvZCBza2lwXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2tpcDxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBjb3VudDogbnVtYmVyKTogT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IFNraXBPcGVyYXRvcihjb3VudCkpO1xufVxuXG5jbGFzcyBTa2lwT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdG90YWw6IG51bWJlcikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBTa2lwU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLnRvdGFsKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFNraXBTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIGNvdW50OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQ+LCBwcml2YXRlIHRvdGFsOiBudW1iZXIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQoeDogVCkge1xuICAgIGlmICgrK3RoaXMuY291bnQgPiB0aGlzLnRvdGFsKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoeCk7XG4gICAgfVxuICB9XG59XG4iXX0=