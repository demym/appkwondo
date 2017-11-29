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
function elementAt(index, defaultValue) {
    return this.lift(new ElementAtOperator(index, defaultValue));
}
exports.elementAt = elementAt;
var ElementAtOperator = (function () {
    function ElementAtOperator(index, defaultValue) {
        this.index = index;
        this.defaultValue = defaultValue;
        if (index < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
    }
    ElementAtOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ElementAtSubscriber(subscriber, this.index, this.defaultValue));
    };
    return ElementAtOperator;
}());
var ElementAtSubscriber = (function (_super) {
    __extends(ElementAtSubscriber, _super);
    function ElementAtSubscriber(destination, index, defaultValue) {
        var _this = _super.call(this, destination) || this;
        _this.index = index;
        _this.defaultValue = defaultValue;
        return _this;
    }
    ElementAtSubscriber.prototype._next = function (x) {
        if (this.index-- === 0) {
            this.destination.next(x);
            this.destination.complete();
        }
    };
    ElementAtSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (this.index >= 0) {
            if (typeof this.defaultValue !== 'undefined') {
                destination.next(this.defaultValue);
            }
            else {
                destination.error(new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError);
            }
        }
        destination.complete();
    };
    return ElementAtSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudEF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWxlbWVudEF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLDRDQUEyQztBQUMzQywyRUFBMEU7QUE4QzFFLG1CQUFrRCxLQUFhLEVBQUUsWUFBZ0I7SUFDL0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztBQUMvRCxDQUFDO0FBRkQsOEJBRUM7QUFFRDtJQUVFLDJCQUFvQixLQUFhLEVBQVUsWUFBZ0I7UUFBdkMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFJO1FBQ3pELEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxJQUFJLGlEQUF1QixDQUFDO1FBQ3BDLENBQUM7SUFDSCxDQUFDO0lBRUQsZ0NBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFYRCxJQVdDO0FBT0Q7SUFBcUMsdUNBQWE7SUFFaEQsNkJBQVksV0FBMEIsRUFBVSxLQUFhLEVBQVUsWUFBZ0I7UUFBdkYsWUFDRSxrQkFBTSxXQUFXLENBQUMsU0FDbkI7UUFGK0MsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQUFVLGtCQUFZLEdBQVosWUFBWSxDQUFJOztJQUV2RixDQUFDO0lBRVMsbUNBQUssR0FBZixVQUFnQixDQUFJO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7SUFFUyx1Q0FBUyxHQUFuQjtRQUNFLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFlBQVksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN0QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLGlEQUF1QixDQUFDLENBQUM7WUFDakQsQ0FBQztRQUNILENBQUM7UUFDRCxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQXhCRCxDQUFxQyx1QkFBVSxHQXdCOUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yIH0gZnJvbSAnLi4vdXRpbC9Bcmd1bWVudE91dE9mUmFuZ2VFcnJvcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuLyoqXG4gKiBFbWl0cyB0aGUgc2luZ2xlIHZhbHVlIGF0IHRoZSBzcGVjaWZpZWQgYGluZGV4YCBpbiBhIHNlcXVlbmNlIG9mIGVtaXNzaW9uc1xuICogZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkVtaXRzIG9ubHkgdGhlIGktdGggdmFsdWUsIHRoZW4gY29tcGxldGVzLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2VsZW1lbnRBdC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgZWxlbWVudEF0YCByZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgaXRlbSBhdCB0aGUgc3BlY2lmaWVkXG4gKiBgaW5kZXhgIGluIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgb3IgYSBkZWZhdWx0IHZhbHVlIGlmIHRoYXQgYGluZGV4YCBpcyBvdXRcbiAqIG9mIHJhbmdlIGFuZCB0aGUgYGRlZmF1bHRgIGFyZ3VtZW50IGlzIHByb3ZpZGVkLiBJZiB0aGUgYGRlZmF1bHRgIGFyZ3VtZW50IGlzXG4gKiBub3QgZ2l2ZW4gYW5kIHRoZSBgaW5kZXhgIGlzIG91dCBvZiByYW5nZSwgdGhlIG91dHB1dCBPYnNlcnZhYmxlIHdpbGwgZW1pdCBhblxuICogYEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yYCBlcnJvci5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IG9ubHkgdGhlIHRoaXJkIGNsaWNrIGV2ZW50PC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciByZXN1bHQgPSBjbGlja3MuZWxlbWVudEF0KDIpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiAvLyBSZXN1bHRzIGluOlxuICogLy8gY2xpY2sgMSA9IG5vdGhpbmdcbiAqIC8vIGNsaWNrIDIgPSBub3RoaW5nXG4gKiAvLyBjbGljayAzID0gTW91c2VFdmVudCBvYmplY3QgbG9nZ2VkIHRvIGNvbnNvbGVcbiAqXG4gKiBAc2VlIHtAbGluayBmaXJzdH1cbiAqIEBzZWUge0BsaW5rIGxhc3R9XG4gKiBAc2VlIHtAbGluayBza2lwfVxuICogQHNlZSB7QGxpbmsgc2luZ2xlfVxuICogQHNlZSB7QGxpbmsgdGFrZX1cbiAqXG4gKiBAdGhyb3dzIHtBcmd1bWVudE91dE9mUmFuZ2VFcnJvcn0gV2hlbiB1c2luZyBgZWxlbWVudEF0KGkpYCwgaXQgZGVsaXZlcnMgYW5cbiAqIEFyZ3VtZW50T3V0T3JSYW5nZUVycm9yIHRvIHRoZSBPYnNlcnZlcidzIGBlcnJvcmAgY2FsbGJhY2sgaWYgYGkgPCAwYCBvciB0aGVcbiAqIE9ic2VydmFibGUgaGFzIGNvbXBsZXRlZCBiZWZvcmUgZW1pdHRpbmcgdGhlIGktdGggYG5leHRgIG5vdGlmaWNhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSXMgdGhlIG51bWJlciBgaWAgZm9yIHRoZSBpLXRoIHNvdXJjZSBlbWlzc2lvbiB0aGF0IGhhc1xuICogaGFwcGVuZWQgc2luY2UgdGhlIHN1YnNjcmlwdGlvbiwgc3RhcnRpbmcgZnJvbSB0aGUgbnVtYmVyIGAwYC5cbiAqIEBwYXJhbSB7VH0gW2RlZmF1bHRWYWx1ZV0gVGhlIGRlZmF1bHQgdmFsdWUgcmV0dXJuZWQgZm9yIG1pc3NpbmcgaW5kaWNlcy5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBhIHNpbmdsZSBpdGVtLCBpZiBpdCBpcyBmb3VuZC5cbiAqIE90aGVyd2lzZSwgd2lsbCBlbWl0IHRoZSBkZWZhdWx0IHZhbHVlIGlmIGdpdmVuLiBJZiBub3QsIHRoZW4gZW1pdHMgYW4gZXJyb3IuXG4gKiBAbWV0aG9kIGVsZW1lbnRBdFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRBdDxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBpbmRleDogbnVtYmVyLCBkZWZhdWx0VmFsdWU/OiBUKTogT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IEVsZW1lbnRBdE9wZXJhdG9yKGluZGV4LCBkZWZhdWx0VmFsdWUpKTtcbn1cblxuY2xhc3MgRWxlbWVudEF0T3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmRleDogbnVtYmVyLCBwcml2YXRlIGRlZmF1bHRWYWx1ZT86IFQpIHtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXJyb3I7XG4gICAgfVxuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBFbGVtZW50QXRTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuaW5kZXgsIHRoaXMuZGVmYXVsdFZhbHVlKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIEVsZW1lbnRBdFN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUPiwgcHJpdmF0ZSBpbmRleDogbnVtYmVyLCBwcml2YXRlIGRlZmF1bHRWYWx1ZT86IFQpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQoeDogVCkge1xuICAgIGlmICh0aGlzLmluZGV4LS0gPT09IDApIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh4KTtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCkge1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICBpZiAodGhpcy5pbmRleCA+PSAwKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuZGVmYXVsdFZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBkZXN0aW5hdGlvbi5uZXh0KHRoaXMuZGVmYXVsdFZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlc3RpbmF0aW9uLmVycm9yKG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFcnJvcik7XG4gICAgICB9XG4gICAgfVxuICAgIGRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==