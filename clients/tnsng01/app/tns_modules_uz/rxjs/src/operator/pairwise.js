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
function pairwise() {
    return this.lift(new PairwiseOperator());
}
exports.pairwise = pairwise;
var PairwiseOperator = (function () {
    function PairwiseOperator() {
    }
    PairwiseOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new PairwiseSubscriber(subscriber));
    };
    return PairwiseOperator;
}());
var PairwiseSubscriber = (function (_super) {
    __extends(PairwiseSubscriber, _super);
    function PairwiseSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.hasPrev = false;
        return _this;
    }
    PairwiseSubscriber.prototype._next = function (value) {
        if (this.hasPrev) {
            this.destination.next([this.prev, value]);
        }
        else {
            this.hasPrev = true;
        }
        this.prev = value;
    };
    return PairwiseSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFpcndpc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWlyd2lzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSw0Q0FBMkM7QUFxQzNDO0lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUZELDRCQUVDO0FBRUQ7SUFBQTtJQUlBLENBQUM7SUFIQywrQkFBSSxHQUFKLFVBQUssVUFBOEIsRUFBRSxNQUFXO1FBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQU9EO0lBQW9DLHNDQUFhO0lBSS9DLDRCQUFZLFdBQStCO1FBQTNDLFlBQ0Usa0JBQU0sV0FBVyxDQUFDLFNBQ25CO1FBSk8sYUFBTyxHQUFZLEtBQUssQ0FBQzs7SUFJakMsQ0FBQztJQUVELGtDQUFLLEdBQUwsVUFBTSxLQUFRO1FBQ1osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztRQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFqQkQsQ0FBb0MsdUJBQVUsR0FpQjdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5cbi8qKlxuICogR3JvdXBzIHBhaXJzIG9mIGNvbnNlY3V0aXZlIGVtaXNzaW9ucyB0b2dldGhlciBhbmQgZW1pdHMgdGhlbSBhcyBhbiBhcnJheSBvZlxuICogdHdvIHZhbHVlcy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+UHV0cyB0aGUgY3VycmVudCB2YWx1ZSBhbmQgcHJldmlvdXMgdmFsdWUgdG9nZXRoZXIgYXNcbiAqIGFuIGFycmF5LCBhbmQgZW1pdHMgdGhhdC48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9wYWlyd2lzZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBUaGUgTnRoIGVtaXNzaW9uIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHdpbGwgY2F1c2UgdGhlIG91dHB1dCBPYnNlcnZhYmxlXG4gKiB0byBlbWl0IGFuIGFycmF5IFsoTi0xKXRoLCBOdGhdIG9mIHRoZSBwcmV2aW91cyBhbmQgdGhlIGN1cnJlbnQgdmFsdWUsIGFzIGFcbiAqIHBhaXIuIEZvciB0aGlzIHJlYXNvbiwgYHBhaXJ3aXNlYCBlbWl0cyBvbiB0aGUgc2Vjb25kIGFuZCBzdWJzZXF1ZW50XG4gKiBlbWlzc2lvbnMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUsIGJ1dCBub3Qgb24gdGhlIGZpcnN0IGVtaXNzaW9uLCBiZWNhdXNlXG4gKiB0aGVyZSBpcyBubyBwcmV2aW91cyB2YWx1ZSBpbiB0aGF0IGNhc2UuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+T24gZXZlcnkgY2xpY2sgKHN0YXJ0aW5nIGZyb20gdGhlIHNlY29uZCksIGVtaXQgdGhlIHJlbGF0aXZlIGRpc3RhbmNlIHRvIHRoZSBwcmV2aW91cyBjbGljazwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcGFpcnMgPSBjbGlja3MucGFpcndpc2UoKTtcbiAqIHZhciBkaXN0YW5jZSA9IHBhaXJzLm1hcChwYWlyID0+IHtcbiAqICAgdmFyIHgwID0gcGFpclswXS5jbGllbnRYO1xuICogICB2YXIgeTAgPSBwYWlyWzBdLmNsaWVudFk7XG4gKiAgIHZhciB4MSA9IHBhaXJbMV0uY2xpZW50WDtcbiAqICAgdmFyIHkxID0gcGFpclsxXS5jbGllbnRZO1xuICogICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHgwIC0geDEsIDIpICsgTWF0aC5wb3coeTAgLSB5MSwgMikpO1xuICogfSk7XG4gKiBkaXN0YW5jZS5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgYnVmZmVyfVxuICogQHNlZSB7QGxpbmsgYnVmZmVyQ291bnR9XG4gKlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxBcnJheTxUPj59IEFuIE9ic2VydmFibGUgb2YgcGFpcnMgKGFzIGFycmF5cykgb2ZcbiAqIGNvbnNlY3V0aXZlIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEBtZXRob2QgcGFpcndpc2VcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYWlyd2lzZTxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+KTogT2JzZXJ2YWJsZTxbVCwgVF0+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgUGFpcndpc2VPcGVyYXRvcigpKTtcbn1cblxuY2xhc3MgUGFpcndpc2VPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFtULCBUXT4ge1xuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8W1QsIFRdPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBQYWlyd2lzZVN1YnNjcmliZXIoc3Vic2NyaWJlcikpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBQYWlyd2lzZVN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSBwcmV2OiBUO1xuICBwcml2YXRlIGhhc1ByZXY6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxbVCwgVF0+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5oYXNQcmV2KSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoW3RoaXMucHJldiwgdmFsdWVdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oYXNQcmV2ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLnByZXYgPSB2YWx1ZTtcbiAgfVxufVxuIl19