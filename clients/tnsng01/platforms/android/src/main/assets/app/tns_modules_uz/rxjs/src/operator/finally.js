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
var Subscription_1 = require("../Subscription");
function _finally(callback) {
    return this.lift(new FinallyOperator(callback));
}
exports._finally = _finally;
var FinallyOperator = (function () {
    function FinallyOperator(callback) {
        this.callback = callback;
    }
    FinallyOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FinallySubscriber(subscriber, this.callback));
    };
    return FinallyOperator;
}());
var FinallySubscriber = (function (_super) {
    __extends(FinallySubscriber, _super);
    function FinallySubscriber(destination, callback) {
        var _this = _super.call(this, destination) || this;
        _this.add(new Subscription_1.Subscription(callback));
        return _this;
    }
    return FinallySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluYWxseS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbmFsbHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsNENBQTJDO0FBQzNDLGdEQUE4RDtBQVc5RCxrQkFBaUQsUUFBb0I7SUFDbkUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBRkQsNEJBRUM7QUFFRDtJQUNFLHlCQUFvQixRQUFvQjtRQUFwQixhQUFRLEdBQVIsUUFBUSxDQUFZO0lBQ3hDLENBQUM7SUFFRCw4QkFBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksaUJBQWlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBT0Q7SUFBbUMscUNBQWE7SUFDOUMsMkJBQVksV0FBMEIsRUFBRSxRQUFvQjtRQUE1RCxZQUNFLGtCQUFNLFdBQVcsQ0FBQyxTQUVuQjtRQURDLEtBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSwyQkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7O0lBQ3ZDLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFMRCxDQUFtQyx1QkFBVSxHQUs1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcblxuLyoqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBtaXJyb3JzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgYnV0IHdpbGwgY2FsbCBhIHNwZWNpZmllZCBmdW5jdGlvbiB3aGVuXG4gKiB0aGUgc291cmNlIHRlcm1pbmF0ZXMgb24gY29tcGxldGUgb3IgZXJyb3IuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBGdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiBzb3VyY2UgdGVybWluYXRlcy5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBtaXJyb3JzIHRoZSBzb3VyY2UsIGJ1dCB3aWxsIGNhbGwgdGhlIHNwZWNpZmllZCBmdW5jdGlvbiBvbiB0ZXJtaW5hdGlvbi5cbiAqIEBtZXRob2QgZmluYWxseVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9maW5hbGx5PFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IEZpbmFsbHlPcGVyYXRvcihjYWxsYmFjaykpO1xufVxuXG5jbGFzcyBGaW5hbGx5T3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBhbnkpOiBUZWFyZG93bkxvZ2ljIHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgRmluYWxseVN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5jYWxsYmFjaykpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBGaW5hbGx5U3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUPiwgY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgdGhpcy5hZGQobmV3IFN1YnNjcmlwdGlvbihjYWxsYmFjaykpO1xuICB9XG59XG4iXX0=