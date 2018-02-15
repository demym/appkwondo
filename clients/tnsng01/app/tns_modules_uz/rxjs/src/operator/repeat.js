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
var EmptyObservable_1 = require("../observable/EmptyObservable");
function repeat(count) {
    if (count === void 0) { count = -1; }
    if (count === 0) {
        return new EmptyObservable_1.EmptyObservable();
    }
    else if (count < 0) {
        return this.lift(new RepeatOperator(-1, this));
    }
    else {
        return this.lift(new RepeatOperator(count - 1, this));
    }
}
exports.repeat = repeat;
var RepeatOperator = (function () {
    function RepeatOperator(count, source) {
        this.count = count;
        this.source = source;
    }
    RepeatOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new RepeatSubscriber(subscriber, this.count, this.source));
    };
    return RepeatOperator;
}());
var RepeatSubscriber = (function (_super) {
    __extends(RepeatSubscriber, _super);
    function RepeatSubscriber(destination, count, source) {
        var _this = _super.call(this, destination) || this;
        _this.count = count;
        _this.source = source;
        return _this;
    }
    RepeatSubscriber.prototype.complete = function () {
        if (!this.isStopped) {
            var _a = this, source = _a.source, count = _a.count;
            if (count === 0) {
                return _super.prototype.complete.call(this);
            }
            else if (count > -1) {
                this.count = count - 1;
            }
            source.subscribe(this._unsubscribeAndRecycle());
        }
    };
    return RepeatSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwZWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVwZWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLDRDQUEyQztBQUUzQyxpRUFBZ0U7QUFlaEUsZ0JBQStDLEtBQWtCO0lBQWxCLHNCQUFBLEVBQUEsU0FBaUIsQ0FBQztJQUMvRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQixNQUFNLENBQUMsSUFBSSxpQ0FBZSxFQUFLLENBQUM7SUFDbEMsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksY0FBYyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0FBQ0gsQ0FBQztBQVJELHdCQVFDO0FBRUQ7SUFDRSx3QkFBb0IsS0FBYSxFQUNiLE1BQXFCO1FBRHJCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixXQUFNLEdBQU4sTUFBTSxDQUFlO0lBQ3pDLENBQUM7SUFDRCw2QkFBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFPRDtJQUFrQyxvQ0FBYTtJQUM3QywwQkFBWSxXQUE0QixFQUNwQixLQUFhLEVBQ2IsTUFBcUI7UUFGekMsWUFHRSxrQkFBTSxXQUFXLENBQUMsU0FDbkI7UUFIbUIsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLFlBQU0sR0FBTixNQUFNLENBQWU7O0lBRXpDLENBQUM7SUFDRCxtQ0FBUSxHQUFSO1FBQ0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUEsU0FBd0IsRUFBdEIsa0JBQU0sRUFBRSxnQkFBSyxDQUFVO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixNQUFNLENBQUMsaUJBQU0sUUFBUSxXQUFFLENBQUM7WUFDMUIsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDekIsQ0FBQztZQUNELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztRQUNsRCxDQUFDO0lBQ0gsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQWpCRCxDQUFrQyx1QkFBVSxHQWlCM0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEVtcHR5T2JzZXJ2YWJsZSB9IGZyb20gJy4uL29ic2VydmFibGUvRW1wdHlPYnNlcnZhYmxlJztcbmltcG9ydCB7IFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuXG4vKipcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IHJlcGVhdHMgdGhlIHN0cmVhbSBvZiBpdGVtcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhdCBtb3N0IGNvdW50IHRpbWVzLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvcmVwZWF0LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbY291bnRdIFRoZSBudW1iZXIgb2YgdGltZXMgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGl0ZW1zIGFyZSByZXBlYXRlZCwgYSBjb3VudCBvZiAwIHdpbGwgeWllbGRcbiAqIGFuIGVtcHR5IE9ic2VydmFibGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgcmVwZWF0cyB0aGUgc3RyZWFtIG9mIGl0ZW1zIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGF0IG1vc3RcbiAqIGNvdW50IHRpbWVzLlxuICogQG1ldGhvZCByZXBlYXRcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXBlYXQ8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgY291bnQ6IG51bWJlciA9IC0xKTogT2JzZXJ2YWJsZTxUPiB7XG4gIGlmIChjb3VudCA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgRW1wdHlPYnNlcnZhYmxlPFQ+KCk7XG4gIH0gZWxzZSBpZiAoY291bnQgPCAwKSB7XG4gICAgcmV0dXJuIHRoaXMubGlmdChuZXcgUmVwZWF0T3BlcmF0b3IoLTEsIHRoaXMpKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5saWZ0KG5ldyBSZXBlYXRPcGVyYXRvcihjb3VudCAtIDEsIHRoaXMpKTtcbiAgfVxufVxuXG5jbGFzcyBSZXBlYXRPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb3VudDogbnVtYmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikge1xuICB9XG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBhbnkpOiBUZWFyZG93bkxvZ2ljIHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgUmVwZWF0U3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLmNvdW50LCB0aGlzLnNvdXJjZSkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBSZXBlYXRTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPGFueT4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY291bnQ6IG51bWJlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzb3VyY2U6IE9ic2VydmFibGU8VD4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cbiAgY29tcGxldGUoKSB7XG4gICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgY29uc3QgeyBzb3VyY2UsIGNvdW50IH0gPSB0aGlzO1xuICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5jb21wbGV0ZSgpO1xuICAgICAgfSBlbHNlIGlmIChjb3VudCA+IC0xKSB7XG4gICAgICAgIHRoaXMuY291bnQgPSBjb3VudCAtIDE7XG4gICAgICB9XG4gICAgICBzb3VyY2Uuc3Vic2NyaWJlKHRoaXMuX3Vuc3Vic2NyaWJlQW5kUmVjeWNsZSgpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==