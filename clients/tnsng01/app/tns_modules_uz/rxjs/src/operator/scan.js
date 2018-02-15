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
function scan(accumulator, seed) {
    var hasSeed = false;
    if (arguments.length >= 2) {
        hasSeed = true;
    }
    return this.lift(new ScanOperator(accumulator, seed, hasSeed));
}
exports.scan = scan;
var ScanOperator = (function () {
    function ScanOperator(accumulator, seed, hasSeed) {
        if (hasSeed === void 0) { hasSeed = false; }
        this.accumulator = accumulator;
        this.seed = seed;
        this.hasSeed = hasSeed;
    }
    ScanOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
    };
    return ScanOperator;
}());
var ScanSubscriber = (function (_super) {
    __extends(ScanSubscriber, _super);
    function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
        var _this = _super.call(this, destination) || this;
        _this.accumulator = accumulator;
        _this._seed = _seed;
        _this.hasSeed = hasSeed;
        _this.index = 0;
        return _this;
    }
    Object.defineProperty(ScanSubscriber.prototype, "seed", {
        get: function () {
            return this._seed;
        },
        set: function (value) {
            this.hasSeed = true;
            this._seed = value;
        },
        enumerable: true,
        configurable: true
    });
    ScanSubscriber.prototype._next = function (value) {
        if (!this.hasSeed) {
            this.seed = value;
            this.destination.next(value);
        }
        else {
            return this._tryNext(value);
        }
    };
    ScanSubscriber.prototype._tryNext = function (value) {
        var index = this.index++;
        var result;
        try {
            result = this.accumulator(this.seed, value, index);
        }
        catch (err) {
            this.destination.error(err);
        }
        this.seed = result;
        this.destination.next(result);
    };
    return ScanSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNjYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEsNENBQTJDO0FBNkMzQyxjQUFnRCxXQUFtRCxFQUFFLElBQVk7SUFDL0csSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBTXBCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDakUsQ0FBQztBQVpELG9CQVlDO0FBRUQ7SUFDRSxzQkFBb0IsV0FBbUQsRUFBVSxJQUFZLEVBQVUsT0FBd0I7UUFBeEIsd0JBQUEsRUFBQSxlQUF3QjtRQUEzRyxnQkFBVyxHQUFYLFdBQVcsQ0FBd0M7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7SUFBRyxDQUFDO0lBRW5JLDJCQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7UUFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNyRyxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQU9EO0lBQW1DLGtDQUFhO0lBWTlDLHdCQUFZLFdBQTBCLEVBQVUsV0FBbUQsRUFBVSxLQUFZLEVBQ3JHLE9BQWdCO1FBRHBDLFlBRUUsa0JBQU0sV0FBVyxDQUFDLFNBQ25CO1FBSCtDLGlCQUFXLEdBQVgsV0FBVyxDQUF3QztRQUFVLFdBQUssR0FBTCxLQUFLLENBQU87UUFDckcsYUFBTyxHQUFQLE9BQU8sQ0FBUztRQVo1QixXQUFLLEdBQVcsQ0FBQyxDQUFDOztJQWMxQixDQUFDO0lBWkQsc0JBQUksZ0NBQUk7YUFBUjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7YUFFRCxVQUFTLEtBQVk7WUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQzs7O09BTEE7SUFZUyw4QkFBSyxHQUFmLFVBQWdCLEtBQVE7UUFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDO0lBQ0gsQ0FBQztJQUVPLGlDQUFRLEdBQWhCLFVBQWlCLEtBQVE7UUFDdkIsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLElBQUksTUFBVyxDQUFDO1FBQ2hCLElBQUksQ0FBQztZQUNILE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFyQ0QsQ0FBbUMsdUJBQVUsR0FxQzVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5cbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjYW48VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgYWNjdW11bGF0b3I6IChhY2M6IFQsIHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBULCBzZWVkPzogVCk6IE9ic2VydmFibGU8VD47XG5leHBvcnQgZnVuY3Rpb24gc2NhbjxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBhY2N1bXVsYXRvcjogKGFjYzogVFtdLCB2YWx1ZTogVCwgaW5kZXg6IG51bWJlcikgPT4gVFtdLCBzZWVkPzogVFtdKTogT2JzZXJ2YWJsZTxUW10+O1xuZXhwb3J0IGZ1bmN0aW9uIHNjYW48VCwgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgYWNjdW11bGF0b3I6IChhY2M6IFIsIHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBSLCBzZWVkPzogUik6IE9ic2VydmFibGU8Uj47XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuXG4vKipcbiAqIEFwcGxpZXMgYW4gYWNjdW11bGF0b3IgZnVuY3Rpb24gb3ZlciB0aGUgc291cmNlIE9ic2VydmFibGUsIGFuZCByZXR1cm5zIGVhY2hcbiAqIGludGVybWVkaWF0ZSByZXN1bHQsIHdpdGggYW4gb3B0aW9uYWwgc2VlZCB2YWx1ZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBsaWtlIHtAbGluayByZWR1Y2V9LCBidXQgZW1pdHMgdGhlIGN1cnJlbnRcbiAqIGFjY3VtdWxhdGlvbiB3aGVuZXZlciB0aGUgc291cmNlIGVtaXRzIGEgdmFsdWUuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvc2Nhbi5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBDb21iaW5lcyB0b2dldGhlciBhbGwgdmFsdWVzIGVtaXR0ZWQgb24gdGhlIHNvdXJjZSwgdXNpbmcgYW4gYWNjdW11bGF0b3JcbiAqIGZ1bmN0aW9uIHRoYXQga25vd3MgaG93IHRvIGpvaW4gYSBuZXcgc291cmNlIHZhbHVlIGludG8gdGhlIGFjY3VtdWxhdGlvbiBmcm9tXG4gKiB0aGUgcGFzdC4gSXMgc2ltaWxhciB0byB7QGxpbmsgcmVkdWNlfSwgYnV0IGVtaXRzIHRoZSBpbnRlcm1lZGlhdGVcbiAqIGFjY3VtdWxhdGlvbnMuXG4gKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgYXBwbGllcyBhIHNwZWNpZmllZCBgYWNjdW11bGF0b3JgIGZ1bmN0aW9uIHRvIGVhY2hcbiAqIGl0ZW0gZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuIElmIGEgYHNlZWRgIHZhbHVlIGlzIHNwZWNpZmllZCwgdGhlblxuICogdGhhdCB2YWx1ZSB3aWxsIGJlIHVzZWQgYXMgdGhlIGluaXRpYWwgdmFsdWUgZm9yIHRoZSBhY2N1bXVsYXRvci4gSWYgbm8gc2VlZFxuICogdmFsdWUgaXMgc3BlY2lmaWVkLCB0aGUgZmlyc3QgaXRlbSBvZiB0aGUgc291cmNlIGlzIHVzZWQgYXMgdGhlIHNlZWQuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+Q291bnQgdGhlIG51bWJlciBvZiBjbGljayBldmVudHM8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIG9uZXMgPSBjbGlja3MubWFwVG8oMSk7XG4gKiB2YXIgc2VlZCA9IDA7XG4gKiB2YXIgY291bnQgPSBvbmVzLnNjYW4oKGFjYywgb25lKSA9PiBhY2MgKyBvbmUsIHNlZWQpO1xuICogY291bnQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGV4cGFuZH1cbiAqIEBzZWUge0BsaW5rIG1lcmdlU2Nhbn1cbiAqIEBzZWUge0BsaW5rIHJlZHVjZX1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKGFjYzogUiwgdmFsdWU6IFQsIGluZGV4OiBudW1iZXIpOiBSfSBhY2N1bXVsYXRvclxuICogVGhlIGFjY3VtdWxhdG9yIGZ1bmN0aW9uIGNhbGxlZCBvbiBlYWNoIHNvdXJjZSB2YWx1ZS5cbiAqIEBwYXJhbSB7VHxSfSBbc2VlZF0gVGhlIGluaXRpYWwgYWNjdW11bGF0aW9uIHZhbHVlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxSPn0gQW4gb2JzZXJ2YWJsZSBvZiB0aGUgYWNjdW11bGF0ZWQgdmFsdWVzLlxuICogQG1ldGhvZCBzY2FuXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2NhbjxULCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBhY2N1bXVsYXRvcjogKGFjYzogUiwgdmFsdWU6IFQsIGluZGV4OiBudW1iZXIpID0+IFIsIHNlZWQ/OiBUIHwgUik6IE9ic2VydmFibGU8Uj4ge1xuICBsZXQgaGFzU2VlZCA9IGZhbHNlO1xuICAvLyBwcm92aWRpbmcgYSBzZWVkIG9mIGB1bmRlZmluZWRgICpzaG91bGQqIGJlIHZhbGlkIGFuZCB0cmlnZ2VyXG4gIC8vIGhhc1NlZWQhIHNvIGRvbid0IHVzZSBgc2VlZCAhPT0gdW5kZWZpbmVkYCBjaGVja3MhXG4gIC8vIEZvciB0aGlzIHJlYXNvbiwgd2UgaGF2ZSB0byBjaGVjayBpdCBoZXJlIGF0IHRoZSBvcmlnaW5hbCBjYWxsIHNpdGVcbiAgLy8gb3RoZXJ3aXNlIGluc2lkZSBPcGVyYXRvci9TdWJzY3JpYmVyIHdlIHdvbid0IGtub3cgaWYgYHVuZGVmaW5lZGBcbiAgLy8gbWVhbnMgdGhleSBkaWRuJ3QgcHJvdmlkZSBhbnl0aGluZyBvciBpZiB0aGV5IGxpdGVyYWxseSBwcm92aWRlZCBgdW5kZWZpbmVkYFxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSB7XG4gICAgaGFzU2VlZCA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBTY2FuT3BlcmF0b3IoYWNjdW11bGF0b3IsIHNlZWQsIGhhc1NlZWQpKTtcbn1cblxuY2xhc3MgU2Nhbk9wZXJhdG9yPFQsIFI+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgUj4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjY3VtdWxhdG9yOiAoYWNjOiBSLCB2YWx1ZTogVCwgaW5kZXg6IG51bWJlcikgPT4gUiwgcHJpdmF0ZSBzZWVkPzogVCB8IFIsIHByaXZhdGUgaGFzU2VlZDogYm9vbGVhbiA9IGZhbHNlKSB7fVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxSPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBTY2FuU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLmFjY3VtdWxhdG9yLCB0aGlzLnNlZWQsIHRoaXMuaGFzU2VlZCkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBTY2FuU3Vic2NyaWJlcjxULCBSPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcml2YXRlIGluZGV4OiBudW1iZXIgPSAwO1xuXG4gIGdldCBzZWVkKCk6IFQgfCBSIHtcbiAgICByZXR1cm4gdGhpcy5fc2VlZDtcbiAgfVxuXG4gIHNldCBzZWVkKHZhbHVlOiBUIHwgUikge1xuICAgIHRoaXMuaGFzU2VlZCA9IHRydWU7XG4gICAgdGhpcy5fc2VlZCA9IHZhbHVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8Uj4sIHByaXZhdGUgYWNjdW11bGF0b3I6IChhY2M6IFIsIHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBSLCBwcml2YXRlIF9zZWVkOiBUIHwgUixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBoYXNTZWVkOiBib29sZWFuKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmhhc1NlZWQpIHtcbiAgICAgIHRoaXMuc2VlZCA9IHZhbHVlO1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX3RyeU5leHQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3RyeU5leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5kZXgrKztcbiAgICBsZXQgcmVzdWx0OiBhbnk7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuYWNjdW11bGF0b3IoPFI+dGhpcy5zZWVkLCB2YWx1ZSwgaW5kZXgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgIH1cbiAgICB0aGlzLnNlZWQgPSByZXN1bHQ7XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHJlc3VsdCk7XG4gIH1cbn1cbiJdfQ==