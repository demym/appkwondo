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
var isArray_1 = require("../util/isArray");
var ArrayObservable_1 = require("../observable/ArrayObservable");
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
function race() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0];
    }
    return this.lift.call(raceStatic.apply(void 0, [this].concat(observables)));
}
exports.race = race;
function raceStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    if (observables.length === 1) {
        if (isArray_1.isArray(observables[0])) {
            observables = observables[0];
        }
        else {
            return observables[0];
        }
    }
    return new ArrayObservable_1.ArrayObservable(observables).lift(new RaceOperator());
}
exports.raceStatic = raceStatic;
var RaceOperator = (function () {
    function RaceOperator() {
    }
    RaceOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new RaceSubscriber(subscriber));
    };
    return RaceOperator;
}());
exports.RaceOperator = RaceOperator;
var RaceSubscriber = (function (_super) {
    __extends(RaceSubscriber, _super);
    function RaceSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.hasFirst = false;
        _this.observables = [];
        _this.subscriptions = [];
        return _this;
    }
    RaceSubscriber.prototype._next = function (observable) {
        this.observables.push(observable);
    };
    RaceSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            for (var i = 0; i < len && !this.hasFirst; i++) {
                var observable = observables[i];
                var subscription = subscribeToResult_1.subscribeToResult(this, observable, observable, i);
                if (this.subscriptions) {
                    this.subscriptions.push(subscription);
                }
                this.add(subscription);
            }
            this.observables = null;
        }
    };
    RaceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (!this.hasFirst) {
            this.hasFirst = true;
            for (var i = 0; i < this.subscriptions.length; i++) {
                if (i !== outerIndex) {
                    var subscription = this.subscriptions[i];
                    subscription.unsubscribe();
                    this.remove(subscription);
                }
            }
            this.subscriptions = null;
        }
        this.destination.next(innerValue);
    };
    return RaceSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.RaceSubscriber = RaceSubscriber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsMkNBQTBDO0FBQzFDLGlFQUFnRTtBQUloRSxzREFBcUQ7QUFFckQsK0RBQThEO0FBaUI5RDtJQUE2QyxxQkFBMkQ7U0FBM0QsVUFBMkQsRUFBM0QscUJBQTJELEVBQTNELElBQTJEO1FBQTNELGdDQUEyRDs7SUFHdEcsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksaUJBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEQsV0FBVyxHQUF5QixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLGdCQUFJLElBQUksU0FBSyxXQUFXLEdBQUUsQ0FBQztBQUM3RCxDQUFDO0FBUkQsb0JBUUM7QUFhRDtJQUE4QixxQkFBK0Q7U0FBL0QsVUFBK0QsRUFBL0QscUJBQStELEVBQS9ELElBQStEO1FBQS9ELGdDQUErRDs7SUFHM0YsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLGlCQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLFdBQVcsR0FBMkIsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBa0IsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksaUNBQWUsQ0FBUyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLEVBQUssQ0FBQyxDQUFD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dCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi91dGlsL2lzQXJyYXknO1xuaW1wb3J0IHsgQXJyYXlPYnNlcnZhYmxlIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9BcnJheU9ic2VydmFibGUnO1xuaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgT3V0ZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IElubmVyU3Vic2NyaWJlciB9IGZyb20gJy4uL0lubmVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Jlc3VsdCB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuXG4vKiB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbmV4cG9ydCBmdW5jdGlvbiByYWNlPFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIG9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlPFQ+Pik6IE9ic2VydmFibGU8VD47XG5leHBvcnQgZnVuY3Rpb24gcmFjZTxULCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBvYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZTxUPj4pOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIHJhY2U8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgLi4ub2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGU8VD4gfCBBcnJheTxPYnNlcnZhYmxlPFQ+Pj4pOiBPYnNlcnZhYmxlPFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIHJhY2U8VCwgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgLi4ub2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGU8YW55PiB8IEFycmF5PE9ic2VydmFibGU8YW55Pj4+KTogT2JzZXJ2YWJsZTxSPjtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgbWlycm9ycyB0aGUgZmlyc3Qgc291cmNlIE9ic2VydmFibGUgdG8gZW1pdCBhbiBpdGVtXG4gKiBmcm9tIHRoZSBjb21iaW5hdGlvbiBvZiB0aGlzIE9ic2VydmFibGUgYW5kIHN1cHBsaWVkIE9ic2VydmFibGVzLlxuICogQHBhcmFtIHsuLi5PYnNlcnZhYmxlc30gLi4ub2JzZXJ2YWJsZXMgU291cmNlcyB1c2VkIHRvIHJhY2UgZm9yIHdoaWNoIE9ic2VydmFibGUgZW1pdHMgZmlyc3QuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgbWlycm9ycyB0aGUgb3V0cHV0IG9mIHRoZSBmaXJzdCBPYnNlcnZhYmxlIHRvIGVtaXQgYW4gaXRlbS5cbiAqIEBtZXRob2QgcmFjZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhY2U8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgLi4ub2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGU8VD4gfCBBcnJheTxPYnNlcnZhYmxlPFQ+Pj4pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgLy8gaWYgdGhlIG9ubHkgYXJndW1lbnQgaXMgYW4gYXJyYXksIGl0IHdhcyBtb3N0IGxpa2VseSBjYWxsZWQgd2l0aFxuICAvLyBgcGFpcihbb2JzMSwgb2JzMiwgLi4uXSlgXG4gIGlmIChvYnNlcnZhYmxlcy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShvYnNlcnZhYmxlc1swXSkpIHtcbiAgICBvYnNlcnZhYmxlcyA9IDxBcnJheTxPYnNlcnZhYmxlPFQ+Pj5vYnNlcnZhYmxlc1swXTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmxpZnQuY2FsbChyYWNlU3RhdGljPFQ+KHRoaXMsIC4uLm9ic2VydmFibGVzKSk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgbWlycm9ycyB0aGUgZmlyc3Qgc291cmNlIE9ic2VydmFibGUgdG8gZW1pdCBhbiBpdGVtLlxuICogQHBhcmFtIHsuLi5PYnNlcnZhYmxlc30gLi4ub2JzZXJ2YWJsZXMgc291cmNlcyB1c2VkIHRvIHJhY2UgZm9yIHdoaWNoIE9ic2VydmFibGUgZW1pdHMgZmlyc3QuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBhbiBPYnNlcnZhYmxlIHRoYXQgbWlycm9ycyB0aGUgb3V0cHV0IG9mIHRoZSBmaXJzdCBPYnNlcnZhYmxlIHRvIGVtaXQgYW4gaXRlbS5cbiAqIEBzdGF0aWMgdHJ1ZVxuICogQG5hbWUgcmFjZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhY2VTdGF0aWM8VD4ob2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGU8VD4+KTogT2JzZXJ2YWJsZTxUPjtcbmV4cG9ydCBmdW5jdGlvbiByYWNlU3RhdGljPFQ+KG9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlPGFueT4+KTogT2JzZXJ2YWJsZTxUPjtcbmV4cG9ydCBmdW5jdGlvbiByYWNlU3RhdGljPFQ+KC4uLm9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlPFQ+IHwgQXJyYXk8T2JzZXJ2YWJsZTxUPj4+KTogT2JzZXJ2YWJsZTxUPjtcbmV4cG9ydCBmdW5jdGlvbiByYWNlU3RhdGljPFQ+KC4uLm9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlPGFueT4gfCBBcnJheTxPYnNlcnZhYmxlPGFueT4+Pik6IE9ic2VydmFibGU8VD4ge1xuICAvLyBpZiB0aGUgb25seSBhcmd1bWVudCBpcyBhbiBhcnJheSwgaXQgd2FzIG1vc3QgbGlrZWx5IGNhbGxlZCB3aXRoXG4gIC8vIGByYWNlKFtvYnMxLCBvYnMyLCAuLi5dKWBcbiAgaWYgKG9ic2VydmFibGVzLmxlbmd0aCA9PT0gMSkge1xuICAgIGlmIChpc0FycmF5KG9ic2VydmFibGVzWzBdKSkge1xuICAgICAgb2JzZXJ2YWJsZXMgPSA8QXJyYXk8T2JzZXJ2YWJsZTxhbnk+Pj5vYnNlcnZhYmxlc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDxPYnNlcnZhYmxlPGFueT4+b2JzZXJ2YWJsZXNbMF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBBcnJheU9ic2VydmFibGU8VD4oPGFueT5vYnNlcnZhYmxlcykubGlmdChuZXcgUmFjZU9wZXJhdG9yPFQ+KCkpO1xufVxuXG5leHBvcnQgY2xhc3MgUmFjZU9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4sIHNvdXJjZTogYW55KTogVGVhcmRvd25Mb2dpYyB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IFJhY2VTdWJzY3JpYmVyKHN1YnNjcmliZXIpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuZXhwb3J0IGNsYXNzIFJhY2VTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgT3V0ZXJTdWJzY3JpYmVyPFQsIFQ+IHtcbiAgcHJpdmF0ZSBoYXNGaXJzdDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIG9ic2VydmFibGVzOiBPYnNlcnZhYmxlPGFueT5bXSA9IFtdO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQob2JzZXJ2YWJsZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vYnNlcnZhYmxlcy5wdXNoKG9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpIHtcbiAgICBjb25zdCBvYnNlcnZhYmxlcyA9IHRoaXMub2JzZXJ2YWJsZXM7XG4gICAgY29uc3QgbGVuID0gb2JzZXJ2YWJsZXMubGVuZ3RoO1xuXG4gICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbiAmJiAhdGhpcy5oYXNGaXJzdDsgaSsrKSB7XG4gICAgICAgIGxldCBvYnNlcnZhYmxlID0gb2JzZXJ2YWJsZXNbaV07XG4gICAgICAgIGxldCBzdWJzY3JpcHRpb24gPSBzdWJzY3JpYmVUb1Jlc3VsdCh0aGlzLCBvYnNlcnZhYmxlLCBvYnNlcnZhYmxlLCBpKTtcblxuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zKSB7XG4gICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZChzdWJzY3JpcHRpb24pO1xuICAgICAgfVxuICAgICAgdGhpcy5vYnNlcnZhYmxlcyA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgbm90aWZ5TmV4dChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBULFxuICAgICAgICAgICAgIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgVD4pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaGFzRmlyc3QpIHtcbiAgICAgIHRoaXMuaGFzRmlyc3QgPSB0cnVlO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3Vic2NyaXB0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaSAhPT0gb3V0ZXJJbmRleCkge1xuICAgICAgICAgIGxldCBzdWJzY3JpcHRpb24gPSB0aGlzLnN1YnNjcmlwdGlvbnNbaV07XG5cbiAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB0aGlzLnJlbW92ZShzdWJzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KGlubmVyVmFsdWUpO1xuICB9XG59XG4iXX0=