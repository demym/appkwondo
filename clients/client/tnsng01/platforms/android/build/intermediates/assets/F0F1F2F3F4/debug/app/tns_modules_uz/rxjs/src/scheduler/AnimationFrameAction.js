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
var AsyncAction_1 = require("./AsyncAction");
var AnimationFrame_1 = require("../util/AnimationFrame");
var AnimationFrameAction = (function (_super) {
    __extends(AnimationFrameAction, _super);
    function AnimationFrameAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler.scheduled || (scheduler.scheduled = AnimationFrame_1.AnimationFrame.requestAnimationFrame(scheduler.flush.bind(scheduler, null)));
    };
    AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
            AnimationFrame_1.AnimationFrame.cancelAnimationFrame(id);
            scheduler.scheduled = undefined;
        }
        return undefined;
    };
    return AnimationFrameAction;
}(AsyncAction_1.AsyncAction));
exports.AnimationFrameAction = AnimationFrameAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5pbWF0aW9uRnJhbWVBY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBbmltYXRpb25GcmFtZUFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNEM7QUFDNUMseURBQXdEO0FBUXhEO0lBQTZDLHdDQUFjO0lBRXpELDhCQUFzQixTQUFrQyxFQUNsQyxJQUF3RDtRQUQ5RSxZQUVFLGtCQUFNLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FDdkI7UUFIcUIsZUFBUyxHQUFULFNBQVMsQ0FBeUI7UUFDbEMsVUFBSSxHQUFKLElBQUksQ0FBb0Q7O0lBRTlFLENBQUM7SUFFUyw2Q0FBYyxHQUF4QixVQUF5QixTQUFrQyxFQUFFLEVBQVEsRUFBRSxLQUFpQjtRQUFqQixzQkFBQSxFQUFBLFNBQWlCO1FBRXRGLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDLGlCQUFNLGNBQWMsWUFBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFFRCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUk3QixNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsK0JBQWMsQ0FBQyxxQkFBcUIsQ0FDdkYsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUN0QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ1MsNkNBQWMsR0FBeEIsVUFBeUIsU0FBa0MsRUFBRSxFQUFRLEVBQUUsS0FBaUI7UUFBakIsc0JBQUEsRUFBQSxTQUFpQjtRQUl0RixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RSxNQUFNLENBQUMsaUJBQU0sY0FBYyxZQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUlELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsK0JBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4QyxTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUNsQyxDQUFDO1FBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBdENELENBQTZDLHlCQUFXLEdBc0N2RDtBQXRDWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3luY0FjdGlvbiB9IGZyb20gJy4vQXN5bmNBY3Rpb24nO1xuaW1wb3J0IHsgQW5pbWF0aW9uRnJhbWUgfSBmcm9tICcuLi91dGlsL0FuaW1hdGlvbkZyYW1lJztcbmltcG9ydCB7IEFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyIH0gZnJvbSAnLi9BbmltYXRpb25GcmFtZVNjaGVkdWxlcic7XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uRnJhbWVBY3Rpb248VD4gZXh0ZW5kcyBBc3luY0FjdGlvbjxUPiB7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHNjaGVkdWxlcjogQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIsXG4gICAgICAgICAgICAgIHByb3RlY3RlZCB3b3JrOiAodGhpczogQW5pbWF0aW9uRnJhbWVBY3Rpb248VD4sIHN0YXRlPzogVCkgPT4gdm9pZCkge1xuICAgIHN1cGVyKHNjaGVkdWxlciwgd29yayk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVxdWVzdEFzeW5jSWQoc2NoZWR1bGVyOiBBbmltYXRpb25GcmFtZVNjaGVkdWxlciwgaWQ/OiBhbnksIGRlbGF5OiBudW1iZXIgPSAwKTogYW55IHtcbiAgICAvLyBJZiBkZWxheSBpcyBncmVhdGVyIHRoYW4gMCwgcmVxdWVzdCBhcyBhbiBhc3luYyBhY3Rpb24uXG4gICAgaWYgKGRlbGF5ICE9PSBudWxsICYmIGRlbGF5ID4gMCkge1xuICAgICAgcmV0dXJuIHN1cGVyLnJlcXVlc3RBc3luY0lkKHNjaGVkdWxlciwgaWQsIGRlbGF5KTtcbiAgICB9XG4gICAgLy8gUHVzaCB0aGUgYWN0aW9uIHRvIHRoZSBlbmQgb2YgdGhlIHNjaGVkdWxlciBxdWV1ZS5cbiAgICBzY2hlZHVsZXIuYWN0aW9ucy5wdXNoKHRoaXMpO1xuICAgIC8vIElmIGFuIGFuaW1hdGlvbiBmcmFtZSBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZCwgZG9uJ3QgcmVxdWVzdCBhbm90aGVyXG4gICAgLy8gb25lLiBJZiBhbiBhbmltYXRpb24gZnJhbWUgaGFzbid0IGJlZW4gcmVxdWVzdGVkIHlldCwgcmVxdWVzdCBvbmUuIFJldHVyblxuICAgIC8vIHRoZSBjdXJyZW50IGFuaW1hdGlvbiBmcmFtZSByZXF1ZXN0IGlkLlxuICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGVkIHx8IChzY2hlZHVsZXIuc2NoZWR1bGVkID0gQW5pbWF0aW9uRnJhbWUucmVxdWVzdEFuaW1hdGlvbkZyYW1lKFxuICAgICAgc2NoZWR1bGVyLmZsdXNoLmJpbmQoc2NoZWR1bGVyLCBudWxsKVxuICAgICkpO1xuICB9XG4gIHByb3RlY3RlZCByZWN5Y2xlQXN5bmNJZChzY2hlZHVsZXI6IEFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyLCBpZD86IGFueSwgZGVsYXk6IG51bWJlciA9IDApOiBhbnkge1xuICAgIC8vIElmIGRlbGF5IGV4aXN0cyBhbmQgaXMgZ3JlYXRlciB0aGFuIDAsIG9yIGlmIHRoZSBkZWxheSBpcyBudWxsICh0aGVcbiAgICAvLyBhY3Rpb24gd2Fzbid0IHJlc2NoZWR1bGVkKSBidXQgd2FzIG9yaWdpbmFsbHkgc2NoZWR1bGVkIGFzIGFuIGFzeW5jXG4gICAgLy8gYWN0aW9uLCB0aGVuIHJlY3ljbGUgYXMgYW4gYXN5bmMgYWN0aW9uLlxuICAgIGlmICgoZGVsYXkgIT09IG51bGwgJiYgZGVsYXkgPiAwKSB8fCAoZGVsYXkgPT09IG51bGwgJiYgdGhpcy5kZWxheSA+IDApKSB7XG4gICAgICByZXR1cm4gc3VwZXIucmVjeWNsZUFzeW5jSWQoc2NoZWR1bGVyLCBpZCwgZGVsYXkpO1xuICAgIH1cbiAgICAvLyBJZiB0aGUgc2NoZWR1bGVyIHF1ZXVlIGlzIGVtcHR5LCBjYW5jZWwgdGhlIHJlcXVlc3RlZCBhbmltYXRpb24gZnJhbWUgYW5kXG4gICAgLy8gc2V0IHRoZSBzY2hlZHVsZWQgZmxhZyB0byB1bmRlZmluZWQgc28gdGhlIG5leHQgQW5pbWF0aW9uRnJhbWVBY3Rpb24gd2lsbFxuICAgIC8vIHJlcXVlc3QgaXRzIG93bi5cbiAgICBpZiAoc2NoZWR1bGVyLmFjdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICBBbmltYXRpb25GcmFtZS5jYW5jZWxBbmltYXRpb25GcmFtZShpZCk7XG4gICAgICBzY2hlZHVsZXIuc2NoZWR1bGVkID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gdW5kZWZpbmVkIHNvIHRoZSBhY3Rpb24ga25vd3MgdG8gcmVxdWVzdCBhIG5ldyBhc3luYyBpZCBpZiBpdCdzIHJlc2NoZWR1bGVkLlxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiJdfQ==