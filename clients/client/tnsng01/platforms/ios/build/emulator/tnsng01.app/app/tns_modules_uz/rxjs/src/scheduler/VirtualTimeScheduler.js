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
var AsyncScheduler_1 = require("./AsyncScheduler");
var VirtualTimeScheduler = (function (_super) {
    __extends(VirtualTimeScheduler, _super);
    function VirtualTimeScheduler(SchedulerAction, maxFrames) {
        if (SchedulerAction === void 0) { SchedulerAction = VirtualAction; }
        if (maxFrames === void 0) { maxFrames = Number.POSITIVE_INFINITY; }
        var _this = _super.call(this, SchedulerAction, function () { return _this.frame; }) || this;
        _this.maxFrames = maxFrames;
        _this.frame = 0;
        _this.index = -1;
        return _this;
    }
    VirtualTimeScheduler.prototype.flush = function () {
        var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
        var error, action;
        while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        }
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    VirtualTimeScheduler.frameTimeFactor = 10;
    return VirtualTimeScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.VirtualTimeScheduler = VirtualTimeScheduler;
var VirtualAction = (function (_super) {
    __extends(VirtualAction, _super);
    function VirtualAction(scheduler, work, index) {
        if (index === void 0) { index = scheduler.index += 1; }
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.index = index;
        _this.active = true;
        _this.index = scheduler.index = index;
        return _this;
    }
    VirtualAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (!this.id) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.active = false;
        var action = new VirtualAction(this.scheduler, this.work);
        this.add(action);
        return action.schedule(state, delay);
    };
    VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        this.delay = scheduler.frame + delay;
        var actions = scheduler.actions;
        actions.push(this);
        actions.sort(VirtualAction.sortActions);
        return true;
    };
    VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return undefined;
    };
    VirtualAction.prototype._execute = function (state, delay) {
        if (this.active === true) {
            return _super.prototype._execute.call(this, state, delay);
        }
    };
    VirtualAction.sortActions = function (a, b) {
        if (a.delay === b.delay) {
            if (a.index === b.index) {
                return 0;
            }
            else if (a.index > b.index) {
                return 1;
            }
            else {
                return -1;
            }
        }
        else if (a.delay > b.delay) {
            return 1;
        }
        else {
            return -1;
        }
    };
    return VirtualAction;
}(AsyncAction_1.AsyncAction));
exports.VirtualAction = VirtualAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlydHVhbFRpbWVTY2hlZHVsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJWaXJ0dWFsVGltZVNjaGVkdWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNEM7QUFFNUMsbURBQWtEO0FBRWxEO0lBQTBDLHdDQUFjO0lBT3RELDhCQUFZLGVBQW1ELEVBQzVDLFNBQTRDO1FBRG5ELGdDQUFBLEVBQUEsK0JBQW1EO1FBQzVDLDBCQUFBLEVBQUEsWUFBb0IsTUFBTSxDQUFDLGlCQUFpQjtRQUQvRCxZQUVFLGtCQUFNLGVBQWUsRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLEtBQUssRUFBVixDQUFVLENBQUMsU0FDekM7UUFGa0IsZUFBUyxHQUFULFNBQVMsQ0FBbUM7UUFKeEQsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixXQUFLLEdBQVcsQ0FBQyxDQUFDLENBQUM7O0lBSzFCLENBQUM7SUFPTSxvQ0FBSyxHQUFaO1FBRVEsSUFBQSxTQUEyQixFQUExQixvQkFBTyxFQUFFLHdCQUFTLENBQVM7UUFDbEMsSUFBSSxLQUFVLEVBQUUsTUFBd0IsQ0FBQztRQUV6QyxPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxFQUFFLENBQUM7WUFDOUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RCxLQUFLLENBQUM7WUFDUixDQUFDO1FBQ0gsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDVixPQUFPLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDaEMsTUFBTSxD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QyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWixDQUFDO1FBQ0gsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWixDQUFDO0lBQ0gsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQTFERCxDQUFzQyx5QkFBVyxHQTBEaEQ7QUExRFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3luY0FjdGlvbiB9IGZyb20gJy4vQXN5bmNBY3Rpb24nO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IEFzeW5jU2NoZWR1bGVyIH0gZnJvbSAnLi9Bc3luY1NjaGVkdWxlcic7XG5cbmV4cG9ydCBjbGFzcyBWaXJ0dWFsVGltZVNjaGVkdWxlciBleHRlbmRzIEFzeW5jU2NoZWR1bGVyIHtcblxuICBwcm90ZWN0ZWQgc3RhdGljIGZyYW1lVGltZUZhY3RvcjogbnVtYmVyID0gMTA7XG5cbiAgcHVibGljIGZyYW1lOiBudW1iZXIgPSAwO1xuICBwdWJsaWMgaW5kZXg6IG51bWJlciA9IC0xO1xuXG4gIGNvbnN0cnVjdG9yKFNjaGVkdWxlckFjdGlvbjogdHlwZW9mIEFzeW5jQWN0aW9uID0gVmlydHVhbEFjdGlvbixcbiAgICAgICAgICAgICAgcHVibGljIG1heEZyYW1lczogbnVtYmVyID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKSB7XG4gICAgc3VwZXIoU2NoZWR1bGVyQWN0aW9uLCAoKSA9PiB0aGlzLmZyYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9tcHQgdGhlIFNjaGVkdWxlciB0byBleGVjdXRlIGFsbCBvZiBpdHMgcXVldWVkIGFjdGlvbnMsIHRoZXJlZm9yZVxuICAgKiBjbGVhcmluZyBpdHMgcXVldWUuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBwdWJsaWMgZmx1c2goKTogdm9pZCB7XG5cbiAgICBjb25zdCB7YWN0aW9ucywgbWF4RnJhbWVzfSA9IHRoaXM7XG4gICAgbGV0IGVycm9yOiBhbnksIGFjdGlvbjogQXN5bmNBY3Rpb248YW55PjtcblxuICAgIHdoaWxlICgoYWN0aW9uID0gYWN0aW9ucy5zaGlmdCgpKSAmJiAodGhpcy5mcmFtZSA9IGFjdGlvbi5kZWxheSkgPD0gbWF4RnJhbWVzKSB7XG4gICAgICBpZiAoZXJyb3IgPSBhY3Rpb24uZXhlY3V0ZShhY3Rpb24uc3RhdGUsIGFjdGlvbi5kZWxheSkpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICB3aGlsZSAoYWN0aW9uID0gYWN0aW9ucy5zaGlmdCgpKSB7XG4gICAgICAgIGFjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5leHBvcnQgY2xhc3MgVmlydHVhbEFjdGlvbjxUPiBleHRlbmRzIEFzeW5jQWN0aW9uPFQ+IHtcblxuICBwcm90ZWN0ZWQgYWN0aXZlOiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgc2NoZWR1bGVyOiBWaXJ0dWFsVGltZVNjaGVkdWxlcixcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIHdvcms6ICh0aGlzOiBWaXJ0dWFsQWN0aW9uPFQ+LCBzdGF0ZT86IFQpID0+IHZvaWQsXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBpbmRleDogbnVtYmVyID0gc2NoZWR1bGVyLmluZGV4ICs9IDEpIHtcbiAgICBzdXBlcihzY2hlZHVsZXIsIHdvcmspO1xuICAgIHRoaXMuaW5kZXggPSBzY2hlZHVsZXIuaW5kZXggPSBpbmRleDtcbiAgfVxuXG4gIHB1YmxpYyBzY2hlZHVsZShzdGF0ZT86IFQsIGRlbGF5OiBudW1iZXIgPSAwKTogU3Vic2NyaXB0aW9uIHtcbiAgICBpZiAoIXRoaXMuaWQpIHtcbiAgICAgIHJldHVybiBzdXBlci5zY2hlZHVsZShzdGF0ZSwgZGVsYXkpO1xuICAgIH1cbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIC8vIElmIGFuIGFjdGlvbiBpcyByZXNjaGVkdWxlZCwgd2Ugc2F2ZSBhbGxvY2F0aW9ucyBieSBtdXRhdGluZyBpdHMgc3RhdGUsXG4gICAgLy8gcHVzaGluZyBpdCB0byB0aGUgZW5kIG9mIHRoZSBzY2hlZHVsZXIgcXVldWUsIGFuZCByZWN5Y2xpbmcgdGhlIGFjdGlvbi5cbiAgICAvLyBCdXQgc2luY2UgdGhlIFZpcnR1YWxUaW1lU2NoZWR1bGVyIGlzIHVzZWQgZm9yIHRlc3RpbmcsIFZpcnR1YWxBY3Rpb25zXG4gICAgLy8gbXVzdCBiZSBpbW11dGFibGUgc28gdGhleSBjYW4gYmUgaW5zcGVjdGVkIGxhdGVyLlxuICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBWaXJ0dWFsQWN0aW9uKHRoaXMuc2NoZWR1bGVyLCB0aGlzLndvcmspO1xuICAgIHRoaXMuYWRkKGFjdGlvbik7XG4gICAgcmV0dXJuIGFjdGlvbi5zY2hlZHVsZShzdGF0ZSwgZGVsYXkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlcXVlc3RBc3luY0lkKHNjaGVkdWxlcjogVmlydHVhbFRpbWVTY2hlZHVsZXIsIGlkPzogYW55LCBkZWxheTogbnVtYmVyID0gMCk6IGFueSB7XG4gICAgdGhpcy5kZWxheSA9IHNjaGVkdWxlci5mcmFtZSArIGRlbGF5O1xuICAgIGNvbnN0IHthY3Rpb25zfSA9IHNjaGVkdWxlcjtcbiAgICBhY3Rpb25zLnB1c2godGhpcyk7XG4gICAgYWN0aW9ucy5zb3J0KFZpcnR1YWxBY3Rpb24uc29ydEFjdGlvbnMpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlY3ljbGVBc3luY0lkKHNjaGVkdWxlcjogVmlydHVhbFRpbWVTY2hlZHVsZXIsIGlkPzogYW55LCBkZWxheTogbnVtYmVyID0gMCk6IGFueSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfZXhlY3V0ZShzdGF0ZTogVCwgZGVsYXk6IG51bWJlcik6IGFueSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gc3VwZXIuX2V4ZWN1dGUoc3RhdGUsIGRlbGF5KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHNvcnRBY3Rpb25zPFQ+KGE6IFZpcnR1YWxBY3Rpb248VD4sIGI6IFZpcnR1YWxBY3Rpb248VD4pIHtcbiAgICBpZiAoYS5kZWxheSA9PT0gYi5kZWxheSkge1xuICAgICAgaWYgKGEuaW5kZXggPT09IGIuaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9IGVsc2UgaWYgKGEuaW5kZXggPiBiLmluZGV4KSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYS5kZWxheSA+IGIuZGVsYXkpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICB9XG59XG4iXX0=