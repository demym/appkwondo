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
var async_1 = require("../scheduler/async");
function timeInterval(scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new TimeIntervalOperator(scheduler));
}
exports.timeInterval = timeInterval;
var TimeInterval = (function () {
    function TimeInterval(value, interval) {
        this.value = value;
        this.interval = interval;
    }
    return TimeInterval;
}());
exports.TimeInterval = TimeInterval;
;
var TimeIntervalOperator = (function () {
    function TimeIntervalOperator(scheduler) {
        this.scheduler = scheduler;
    }
    TimeIntervalOperator.prototype.call = function (observer, source) {
        return source.subscribe(new TimeIntervalSubscriber(observer, this.scheduler));
    };
    return TimeIntervalOperator;
}());
var TimeIntervalSubscriber = (function (_super) {
    __extends(TimeIntervalSubscriber, _super);
    function TimeIntervalSubscriber(destination, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.scheduler = scheduler;
        _this.lastTime = 0;
        _this.lastTime = scheduler.now();
        return _this;
    }
    TimeIntervalSubscriber.prototype._next = function (value) {
        var now = this.scheduler.now();
        var span = now - this.lastTime;
        this.lastTime = now;
        this.destination.next(new TimeInterval(value, span));
    };
    return TimeIntervalSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZUludGVydmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGltZUludGVydmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLDRDQUEyQztBQUUzQyw0Q0FBMkM7QUFRM0Msc0JBQXFELFNBQTZCO0lBQTdCLDBCQUFBLEVBQUEsWUFBd0IsYUFBSztJQUNoRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUZELG9DQUVDO0FBRUQ7SUFDRSxzQkFBbUIsS0FBUSxFQUFTLFFBQWdCO1FBQWpDLFVBQUssR0FBTCxLQUFLLENBQUc7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFRO0lBRXBELENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSlksb0NBQVk7QUFJeEIsQ0FBQztBQUVGO0lBQ0UsOEJBQW9CLFNBQXFCO1FBQXJCLGNBQVMsR0FBVCxTQUFTLENBQVk7SUFFekMsQ0FBQztJQUVELG1DQUFJLEdBQUosVUFBSyxRQUFxQyxFQUFFLE1BQVc7UUFDckQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFPRDtJQUF3QywwQ0FBYTtJQUduRCxnQ0FBWSxXQUF3QyxFQUFVLFNBQXFCO1FBQW5GLFlBQ0Usa0JBQU0sV0FBVyxDQUFDLFNBR25CO1FBSjZELGVBQVMsR0FBVCxTQUFTLENBQVk7UUFGM0UsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUszQixLQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7SUFDbEMsQ0FBQztJQUVTLHNDQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQy9CLElBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBRXBCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDSCw2QkFBQztBQUFELENBQUMsQUFoQkQsQ0FBd0MsdUJBQVUsR0FnQmpEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBJU2NoZWR1bGVyIH0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7IGFzeW5jIH0gZnJvbSAnLi4vc2NoZWR1bGVyL2FzeW5jJztcblxuLyoqXG4gKiBAcGFyYW0gc2NoZWR1bGVyXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFRpbWVJbnRlcnZhbDxhbnk+PnxXZWJTb2NrZXRTdWJqZWN0PFQ+fE9ic2VydmFibGU8VD59XG4gKiBAbWV0aG9kIHRpbWVJbnRlcnZhbFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRpbWVJbnRlcnZhbDxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBzY2hlZHVsZXI6IElTY2hlZHVsZXIgPSBhc3luYyk6IE9ic2VydmFibGU8VGltZUludGVydmFsPFQ+PiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IFRpbWVJbnRlcnZhbE9wZXJhdG9yKHNjaGVkdWxlcikpO1xufVxuXG5leHBvcnQgY2xhc3MgVGltZUludGVydmFsPFQ+IHtcbiAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBULCBwdWJsaWMgaW50ZXJ2YWw6IG51bWJlcikge1xuXG4gIH1cbn07XG5cbmNsYXNzIFRpbWVJbnRlcnZhbE9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVGltZUludGVydmFsPFQ+PiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2NoZWR1bGVyOiBJU2NoZWR1bGVyKSB7XG5cbiAgfVxuXG4gIGNhbGwob2JzZXJ2ZXI6IFN1YnNjcmliZXI8VGltZUludGVydmFsPFQ+Piwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBUaW1lSW50ZXJ2YWxTdWJzY3JpYmVyKG9ic2VydmVyLCB0aGlzLnNjaGVkdWxlcikpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBUaW1lSW50ZXJ2YWxTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIHByaXZhdGUgbGFzdFRpbWU6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VGltZUludGVydmFsPFQ+PiwgcHJpdmF0ZSBzY2hlZHVsZXI6IElTY2hlZHVsZXIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG5cbiAgICB0aGlzLmxhc3RUaW1lID0gc2NoZWR1bGVyLm5vdygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKSB7XG4gICAgbGV0IG5vdyA9IHRoaXMuc2NoZWR1bGVyLm5vdygpO1xuICAgIGxldCBzcGFuID0gbm93IC0gdGhpcy5sYXN0VGltZTtcbiAgICB0aGlzLmxhc3RUaW1lID0gbm93O1xuXG4gICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KG5ldyBUaW1lSW50ZXJ2YWwodmFsdWUsIHNwYW4pKTtcbiAgfVxufVxuIl19