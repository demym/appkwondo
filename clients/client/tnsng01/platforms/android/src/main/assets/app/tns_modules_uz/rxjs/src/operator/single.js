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
var EmptyError_1 = require("../util/EmptyError");
function single(predicate) {
    return this.lift(new SingleOperator(predicate, this));
}
exports.single = single;
var SingleOperator = (function () {
    function SingleOperator(predicate, source) {
        this.predicate = predicate;
        this.source = source;
    }
    SingleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new SingleSubscriber(subscriber, this.predicate, this.source));
    };
    return SingleOperator;
}());
var SingleSubscriber = (function (_super) {
    __extends(SingleSubscriber, _super);
    function SingleSubscriber(destination, predicate, source) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.source = source;
        _this.seenValue = false;
        _this.index = 0;
        return _this;
    }
    SingleSubscriber.prototype.applySingleValue = function (value) {
        if (this.seenValue) {
            this.destination.error('Sequence contains more than one element');
        }
        else {
            this.seenValue = true;
            this.singleValue = value;
        }
    };
    SingleSubscriber.prototype._next = function (value) {
        var index = this.index++;
        if (this.predicate) {
            this.tryNext(value, index);
        }
        else {
            this.applySingleValue(value);
        }
    };
    SingleSubscriber.prototype.tryNext = function (value, index) {
        try {
            if (this.predicate(value, index, this.source)) {
                this.applySingleValue(value);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    };
    SingleSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (this.index > 0) {
            destination.next(this.seenValue ? this.singleValue : undefined);
            destination.complete();
        }
        else {
            destination.error(new EmptyError_1.EmptyError);
        }
    };
    return SingleSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2luZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLDRDQUEyQztBQUUzQyxpREFBZ0Q7QUFtQmhELGdCQUErQyxTQUF1RTtJQUNwSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBRkQsd0JBRUM7QUFFRDtJQUNFLHdCQUFvQixTQUF1RSxFQUN2RSxNQUFzQjtRQUR0QixjQUFTLEdBQVQsU0FBUyxDQUE4RDtRQUN2RSxXQUFNLEdBQU4sTUFBTSxDQUFnQjtJQUMxQyxDQUFDO0lBRUQsNkJBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBT0Q7SUFBa0Msb0NBQWE7SUFLN0MsMEJBQVksV0FBd0IsRUFDaEIsU0FBdUUsRUFDdkUsTUFBc0I7UUFGMUMsWUFHRSxrQkFBTSxXQUFXLENBQUMsU0FDbkI7UUFIbUIsZUFBUyxHQUFULFNBQVMsQ0FBOEQ7UUFDdkUsWUFBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFObEMsZUFBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixXQUFLLEdBQVcsQ0FBQyxDQUFDOztJQU0xQixDQUFDO0lBRU8sMkNBQWdCLEdBQXhCLFVBQXlCLEtBQVE7UUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDO0lBQ0gsQ0FBQztJQUVTLGdDQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUM7SUFDSCxDQUFDO0lBRU8sa0NBQU8sR0FBZixVQUFnQixLQUFRLEVBQUUsS0FBYTtRQUNyQyxJQUFJLENBQUM7WUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLENBQUM7UUFDSCxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFDSCxDQUFDO0lBRVMsb0NBQVMsR0FBbkI7UUFDRSxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRXJDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsQ0FBQztZQUNoRSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLHVCQUFVLENBQUMsQ0FBQztRQUNwQyxDQUFDO0lBQ0gsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQWxERCxDQUFrQyx1QkFBVSxHQWtEM0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAnLi4vT2JzZXJ2ZXInO1xuaW1wb3J0IHsgRW1wdHlFcnJvciB9IGZyb20gJy4uL3V0aWwvRW1wdHlFcnJvcic7XG5pbXBvcnQgeyBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuLyoqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgc2luZ2xlIGl0ZW0gZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgdGhhdCBtYXRjaGVzIGEgc3BlY2lmaWVkXG4gKiBwcmVkaWNhdGUsIGlmIHRoYXQgT2JzZXJ2YWJsZSBlbWl0cyBvbmUgc3VjaCBpdGVtLiBJZiB0aGUgc291cmNlIE9ic2VydmFibGUgZW1pdHMgbW9yZSB0aGFuIG9uZSBzdWNoIGl0ZW0gb3Igbm9cbiAqIHN1Y2ggaXRlbXMsIG5vdGlmeSBvZiBhbiBJbGxlZ2FsQXJndW1lbnRFeGNlcHRpb24gb3IgTm9TdWNoRWxlbWVudEV4Y2VwdGlvbiByZXNwZWN0aXZlbHkuXG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9zaW5nbGUucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogQHRocm93cyB7RW1wdHlFcnJvcn0gRGVsaXZlcnMgYW4gRW1wdHlFcnJvciB0byB0aGUgT2JzZXJ2ZXIncyBgZXJyb3JgXG4gKiBjYWxsYmFjayBpZiB0aGUgT2JzZXJ2YWJsZSBjb21wbGV0ZXMgYmVmb3JlIGFueSBgbmV4dGAgbm90aWZpY2F0aW9uIHdhcyBzZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIC0gQSBwcmVkaWNhdGUgZnVuY3Rpb24gdG8gZXZhbHVhdGUgaXRlbXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHNpbmdsZSBpdGVtIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRoYXQgbWF0Y2hlc1xuICogdGhlIHByZWRpY2F0ZS5cbiAuXG4gKiBAbWV0aG9kIHNpbmdsZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNpbmdsZTxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBwcmVkaWNhdGU/OiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gYm9vbGVhbik6IE9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBTaW5nbGVPcGVyYXRvcihwcmVkaWNhdGUsIHRoaXMpKTtcbn1cblxuY2xhc3MgU2luZ2xlT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJlZGljYXRlPzogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyLCBzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IGJvb2xlYW4sXG4gICAgICAgICAgICAgIHByaXZhdGUgc291cmNlPzogT2JzZXJ2YWJsZTxUPikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBTaW5nbGVTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMucHJlZGljYXRlLCB0aGlzLnNvdXJjZSkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBTaW5nbGVTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIHByaXZhdGUgc2VlblZhbHVlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgc2luZ2xlVmFsdWU6IFQ7XG4gIHByaXZhdGUgaW5kZXg6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IE9ic2VydmVyPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIHByZWRpY2F0ZT86ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBib29sZWFuLFxuICAgICAgICAgICAgICBwcml2YXRlIHNvdXJjZT86IE9ic2VydmFibGU8VD4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5U2luZ2xlVmFsdWUodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZWVuVmFsdWUpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoJ1NlcXVlbmNlIGNvbnRhaW5zIG1vcmUgdGhhbiBvbmUgZWxlbWVudCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlZW5WYWx1ZSA9IHRydWU7XG4gICAgICB0aGlzLnNpbmdsZVZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4Kys7XG5cbiAgICBpZiAodGhpcy5wcmVkaWNhdGUpIHtcbiAgICAgIHRoaXMudHJ5TmV4dCh2YWx1ZSwgaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFwcGx5U2luZ2xlVmFsdWUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJ5TmV4dCh2YWx1ZTogVCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5wcmVkaWNhdGUodmFsdWUsIGluZGV4LCB0aGlzLnNvdXJjZSkpIHtcbiAgICAgICAgdGhpcy5hcHBseVNpbmdsZVZhbHVlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcblxuICAgIGlmICh0aGlzLmluZGV4ID4gMCkge1xuICAgICAgZGVzdGluYXRpb24ubmV4dCh0aGlzLnNlZW5WYWx1ZSA/IHRoaXMuc2luZ2xlVmFsdWUgOiB1bmRlZmluZWQpO1xuICAgICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVzdGluYXRpb24uZXJyb3IobmV3IEVtcHR5RXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19