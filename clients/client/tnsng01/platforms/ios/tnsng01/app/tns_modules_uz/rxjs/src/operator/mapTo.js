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
function mapTo(value) {
    return this.lift(new MapToOperator(value));
}
exports.mapTo = mapTo;
var MapToOperator = (function () {
    function MapToOperator(value) {
        this.value = value;
    }
    MapToOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapToSubscriber(subscriber, this.value));
    };
    return MapToOperator;
}());
var MapToSubscriber = (function (_super) {
    __extends(MapToSubscriber, _super);
    function MapToSubscriber(destination, value) {
        var _this = _super.call(this, destination) || this;
        _this.value = value;
        return _this;
    }
    MapToSubscriber.prototype._next = function (x) {
        this.destination.next(this.value);
    };
    return MapToSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwVG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXBUby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSw0Q0FBMkM7QUE2QjNDLGVBQWlELEtBQVE7SUFDdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBRkQsc0JBRUM7QUFFRDtJQUlFLHVCQUFZLEtBQVE7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVELDRCQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7UUFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxlQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUFYRCxJQVdDO0FBT0Q7SUFBb0MsbUNBQWE7SUFJL0MseUJBQVksV0FBMEIsRUFBRSxLQUFRO1FBQWhELFlBQ0Usa0JBQU0sV0FBVyxDQUFDLFNBRW5CO1FBREMsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O0lBQ3JCLENBQUM7SUFFUywrQkFBSyxHQUFmLFVBQWdCLENBQUk7UUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFaRCxDQUFvQyx1QkFBVSxHQVk3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuXG4vKipcbiAqIEVtaXRzIHRoZSBnaXZlbiBjb25zdGFudCB2YWx1ZSBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUgZXZlcnkgdGltZSB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlIGVtaXRzIGEgdmFsdWUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkxpa2Uge0BsaW5rIG1hcH0sIGJ1dCBpdCBtYXBzIGV2ZXJ5IHNvdXJjZSB2YWx1ZSB0b1xuICogdGhlIHNhbWUgb3V0cHV0IHZhbHVlIGV2ZXJ5IHRpbWUuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvbWFwVG8ucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogVGFrZXMgYSBjb25zdGFudCBgdmFsdWVgIGFzIGFyZ3VtZW50LCBhbmQgZW1pdHMgdGhhdCB3aGVuZXZlciB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlIGVtaXRzIGEgdmFsdWUuIEluIG90aGVyIHdvcmRzLCBpZ25vcmVzIHRoZSBhY3R1YWwgc291cmNlIHZhbHVlLFxuICogYW5kIHNpbXBseSB1c2VzIHRoZSBlbWlzc2lvbiBtb21lbnQgdG8ga25vdyB3aGVuIHRvIGVtaXQgdGhlIGdpdmVuIGB2YWx1ZWAuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+TWFwIGV2ZXJ5IGNsaWNrIHRvIHRoZSBzdHJpbmcgJ0hpJzwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgZ3JlZXRpbmdzID0gY2xpY2tzLm1hcFRvKCdIaScpO1xuICogZ3JlZXRpbmdzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBtYXB9XG4gKlxuICogQHBhcmFtIHthbnl9IHZhbHVlIFRoZSB2YWx1ZSB0byBtYXAgZWFjaCBzb3VyY2UgdmFsdWUgdG8uXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIGdpdmVuIGB2YWx1ZWAgZXZlcnkgdGltZVxuICogdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGVtaXRzIHNvbWV0aGluZy5cbiAqIEBtZXRob2QgbWFwVG9cbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXBUbzxULCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCB2YWx1ZTogUik6IE9ic2VydmFibGU8Uj4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBNYXBUb09wZXJhdG9yKHZhbHVlKSk7XG59XG5cbmNsYXNzIE1hcFRvT3BlcmF0b3I8VCwgUj4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBSPiB7XG5cbiAgdmFsdWU6IFI7XG5cbiAgY29uc3RydWN0b3IodmFsdWU6IFIpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Uj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgTWFwVG9TdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMudmFsdWUpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgTWFwVG9TdWJzY3JpYmVyPFQsIFI+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG5cbiAgdmFsdWU6IFI7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8Uj4sIHZhbHVlOiBSKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh4OiBUKSB7XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHRoaXMudmFsdWUpO1xuICB9XG59XG4iXX0=