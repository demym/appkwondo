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
var isArrayLike_1 = require("../util/isArrayLike");
var isPromise_1 = require("../util/isPromise");
var PromiseObservable_1 = require("./PromiseObservable");
var IteratorObservable_1 = require("./IteratorObservable");
var ArrayObservable_1 = require("./ArrayObservable");
var ArrayLikeObservable_1 = require("./ArrayLikeObservable");
var iterator_1 = require("../symbol/iterator");
var Observable_1 = require("../Observable");
var observeOn_1 = require("../operator/observeOn");
var observable_1 = require("../symbol/observable");
var FromObservable = (function (_super) {
    __extends(FromObservable, _super);
    function FromObservable(ish, scheduler) {
        var _this = _super.call(this, null) || this;
        _this.ish = ish;
        _this.scheduler = scheduler;
        return _this;
    }
    FromObservable.create = function (ish, scheduler) {
        if (ish != null) {
            if (typeof ish[observable_1.observable] === 'function') {
                if (ish instanceof Observable_1.Observable && !scheduler) {
                    return ish;
                }
                return new FromObservable(ish, scheduler);
            }
            else if (isArray_1.isArray(ish)) {
                return new ArrayObservable_1.ArrayObservable(ish, scheduler);
            }
            else if (isPromise_1.isPromise(ish)) {
                return new PromiseObservable_1.PromiseObservable(ish, scheduler);
            }
            else if (typeof ish[iterator_1.iterator] === 'function' || typeof ish === 'string') {
                return new IteratorObservable_1.IteratorObservable(ish, scheduler);
            }
            else if (isArrayLike_1.isArrayLike(ish)) {
                return new ArrayLikeObservable_1.ArrayLikeObservable(ish, scheduler);
            }
        }
        throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
    };
    FromObservable.prototype._subscribe = function (subscriber) {
        var ish = this.ish;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            return ish[observable_1.observable]().subscribe(subscriber);
        }
        else {
            return ish[observable_1.observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
        }
    };
    return FromObservable;
}(Observable_1.Observable));
exports.FromObservable = FromObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnJvbU9ic2VydmFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGcm9tT2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMEM7QUFDMUMsbURBQWtEO0FBQ2xELCtDQUE4QztBQUM5Qyx5REFBd0Q7QUFDeEQsMkRBQXlEO0FBQ3pELHFEQUFvRDtBQUNwRCw2REFBNEQ7QUFHNUQsK0NBQWlFO0FBQ2pFLDRDQUE0RDtBQUU1RCxtREFBNEQ7QUFDNUQsbURBQXVFO0FBT3ZFO0lBQXVDLGtDQUFhO0lBQ2xELHdCQUFvQixHQUF1QixFQUFVLFNBQXNCO1FBQTNFLFlBQ0Usa0JBQU0sSUFBSSxDQUFDLFNBQ1o7UUFGbUIsU0FBRyxHQUFILEdBQUcsQ0FBb0I7UUFBVSxlQUFTLEdBQVQsU0FBUyxDQUFhOztJQUUzRSxDQUFDO0lBNkRNLHFCQUFNLEdBQWIsVUFBaUIsR0FBdUIsRUFBRSxTQUFzQjtRQUM5RCxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNoQixFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyx1QkFBaUIsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELEVBQUUsQ0FBQyxDQUFDLEdBQUcsWUFBWSx1QkFBVSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDNUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDYixDQUFDO2dCQUNELE1BQU0sQ0FBQyxJQUFJLGNBQWMsQ0FBSSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDL0MsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsTUFBTSxDQUFDLElBQUksaUNBQWUsQ0FBSSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDaEQsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxxQkFBUyxDQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxDQUFDLElBQUkscUNBQWlCLENBQUksR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2xELENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsbUJBQWUsQ0FBQyxLQUFLLFVBQVUsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNqRixNQUFNLENBQUMsSUFBSSx1Q0FBa0IsQ0FBSSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDbkQsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyx5QkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLElBQUkseUNBQW1CLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2pELENBQUM7UUFDSCxDQUFDO1FBRUQsTUFBTSxJQUFJLFNBQVMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLElBQUksT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsb0JBQW9CLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRVMsbUNBQVUsR0FBcEIsVUFBcUIsVUFBeUI7UUFDNUMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNyQixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxHQUFHLENBQUMsdUJBQWlCLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUFpQixDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSwrQkFBbUIsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0YsQ0FBQztJQUNILENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUE5RkQsQ0FBdUMsdUJBQVUsR0E4RmhEO0FBOUZZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJy4uL3V0aWwvaXNBcnJheSc7XG5pbXBvcnQgeyBpc0FycmF5TGlrZSB9IGZyb20gJy4uL3V0aWwvaXNBcnJheUxpa2UnO1xuaW1wb3J0IHsgaXNQcm9taXNlIH0gZnJvbSAnLi4vdXRpbC9pc1Byb21pc2UnO1xuaW1wb3J0IHsgUHJvbWlzZU9ic2VydmFibGUgfSBmcm9tICcuL1Byb21pc2VPYnNlcnZhYmxlJztcbmltcG9ydCB7IEl0ZXJhdG9yT2JzZXJ2YWJsZSB9IGZyb20nLi9JdGVyYXRvck9ic2VydmFibGUnO1xuaW1wb3J0IHsgQXJyYXlPYnNlcnZhYmxlIH0gZnJvbSAnLi9BcnJheU9ic2VydmFibGUnO1xuaW1wb3J0IHsgQXJyYXlMaWtlT2JzZXJ2YWJsZSB9IGZyb20gJy4vQXJyYXlMaWtlT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IElTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHsgaXRlcmF0b3IgYXMgU3ltYm9sX2l0ZXJhdG9yIH0gZnJvbSAnLi4vc3ltYm9sL2l0ZXJhdG9yJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmFibGVJbnB1dCB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2ZU9uU3Vic2NyaWJlciB9IGZyb20gJy4uL29wZXJhdG9yL29ic2VydmVPbic7XG5pbXBvcnQgeyBvYnNlcnZhYmxlIGFzIFN5bWJvbF9vYnNlcnZhYmxlIH0gZnJvbSAnLi4vc3ltYm9sL29ic2VydmFibGUnO1xuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIEZyb21PYnNlcnZhYmxlPFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaXNoOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHByaXZhdGUgc2NoZWR1bGVyPzogSVNjaGVkdWxlcikge1xuICAgIHN1cGVyKG51bGwpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZTxUPihpc2g6IE9ic2VydmFibGVJbnB1dDxUPiwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6IE9ic2VydmFibGU8VD47XG4gIHN0YXRpYyBjcmVhdGU8VCwgUj4oaXNoOiBBcnJheUxpa2U8VD4sIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPFI+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIE9ic2VydmFibGUgZnJvbSBhbiBBcnJheSwgYW4gYXJyYXktbGlrZSBvYmplY3QsIGEgUHJvbWlzZSwgYW5cbiAgICogaXRlcmFibGUgb2JqZWN0LCBvciBhbiBPYnNlcnZhYmxlLWxpa2Ugb2JqZWN0LlxuICAgKlxuICAgKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+Q29udmVydHMgYWxtb3N0IGFueXRoaW5nIHRvIGFuIE9ic2VydmFibGUuPC9zcGFuPlxuICAgKlxuICAgKiA8aW1nIHNyYz1cIi4vaW1nL2Zyb20ucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAqXG4gICAqIENvbnZlcnQgdmFyaW91cyBvdGhlciBvYmplY3RzIGFuZCBkYXRhIHR5cGVzIGludG8gT2JzZXJ2YWJsZXMuIGBmcm9tYFxuICAgKiBjb252ZXJ0cyBhIFByb21pc2Ugb3IgYW4gYXJyYXktbGlrZSBvciBhblxuICAgKiBbaXRlcmFibGVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0l0ZXJhdGlvbl9wcm90b2NvbHMjaXRlcmFibGUpXG4gICAqIG9iamVjdCBpbnRvIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgaXRlbXMgaW4gdGhhdCBwcm9taXNlIG9yIGFycmF5IG9yXG4gICAqIGl0ZXJhYmxlLiBBIFN0cmluZywgaW4gdGhpcyBjb250ZXh0LCBpcyB0cmVhdGVkIGFzIGFuIGFycmF5IG9mIGNoYXJhY3RlcnMuXG4gICAqIE9ic2VydmFibGUtbGlrZSBvYmplY3RzIChjb250YWlucyBhIGZ1bmN0aW9uIG5hbWVkIHdpdGggdGhlIEVTMjAxNSBTeW1ib2xcbiAgICogZm9yIE9ic2VydmFibGUpIGNhbiBhbHNvIGJlIGNvbnZlcnRlZCB0aHJvdWdoIHRoaXMgb3BlcmF0b3IuXG4gICAqXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPkNvbnZlcnRzIGFuIGFycmF5IHRvIGFuIE9ic2VydmFibGU8L2NhcHRpb24+XG4gICAqIHZhciBhcnJheSA9IFsxMCwgMjAsIDMwXTtcbiAgICogdmFyIHJlc3VsdCA9IFJ4Lk9ic2VydmFibGUuZnJvbShhcnJheSk7XG4gICAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gICAqXG4gICAqIC8vIFJlc3VsdHMgaW4gdGhlIGZvbGxvd2luZzpcbiAgICogLy8gMTAgMjAgMzBcbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+Q29udmVydCBhbiBpbmZpbml0ZSBpdGVyYWJsZSAoZnJvbSBhIGdlbmVyYXRvcikgdG8gYW4gT2JzZXJ2YWJsZTwvY2FwdGlvbj5cbiAgICogZnVuY3Rpb24qIGdlbmVyYXRlRG91YmxlcyhzZWVkKSB7XG4gICAqICAgdmFyIGkgPSBzZWVkO1xuICAgKiAgIHdoaWxlICh0cnVlKSB7XG4gICAqICAgICB5aWVsZCBpO1xuICAgKiAgICAgaSA9IDIgKiBpOyAvLyBkb3VibGUgaXRcbiAgICogICB9XG4gICAqIH1cbiAgICpcbiAgICogdmFyIGl0ZXJhdG9yID0gZ2VuZXJhdGVEb3VibGVzKDMpO1xuICAgKiB2YXIgcmVzdWx0ID0gUnguT2JzZXJ2YWJsZS5mcm9tKGl0ZXJhdG9yKS50YWtlKDEwKTtcbiAgICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAgICpcbiAgICogLy8gUmVzdWx0cyBpbiB0aGUgZm9sbG93aW5nOlxuICAgKiAvLyAzIDYgMTIgMjQgNDggOTYgMTkyIDM4NCA3NjggMTUzNlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBjcmVhdGV9XG4gICAqIEBzZWUge0BsaW5rIGZyb21FdmVudH1cbiAgICogQHNlZSB7QGxpbmsgZnJvbUV2ZW50UGF0dGVybn1cbiAgICogQHNlZSB7QGxpbmsgZnJvbVByb21pc2V9XG4gICAqXG4gICAqIEBwYXJhbSB7T2JzZXJ2YWJsZUlucHV0PFQ+fSBpc2ggQSBzdWJzY3JpYmFibGUgb2JqZWN0LCBhIFByb21pc2UsIGFuXG4gICAqIE9ic2VydmFibGUtbGlrZSwgYW4gQXJyYXksIGFuIGl0ZXJhYmxlIG9yIGFuIGFycmF5LWxpa2Ugb2JqZWN0IHRvIGJlXG4gICAqIGNvbnZlcnRlZC5cbiAgICogQHBhcmFtIHtTY2hlZHVsZXJ9IFtzY2hlZHVsZXJdIFRoZSBzY2hlZHVsZXIgb24gd2hpY2ggdG8gc2NoZWR1bGUgdGhlXG4gICAqIGVtaXNzaW9ucyBvZiB2YWx1ZXMuXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IFRoZSBPYnNlcnZhYmxlIHdob3NlIHZhbHVlcyBhcmUgb3JpZ2luYWxseSBmcm9tIHRoZVxuICAgKiBpbnB1dCBvYmplY3QgdGhhdCB3YXMgY29udmVydGVkLlxuICAgKiBAc3RhdGljIHRydWVcbiAgICogQG5hbWUgZnJvbVxuICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZTxUPihpc2g6IE9ic2VydmFibGVJbnB1dDxUPiwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6IE9ic2VydmFibGU8VD4ge1xuICAgIGlmIChpc2ggIT0gbnVsbCkge1xuICAgICAgaWYgKHR5cGVvZiBpc2hbU3ltYm9sX29ic2VydmFibGVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmIChpc2ggaW5zdGFuY2VvZiBPYnNlcnZhYmxlICYmICFzY2hlZHVsZXIpIHtcbiAgICAgICAgICByZXR1cm4gaXNoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgRnJvbU9ic2VydmFibGU8VD4oaXNoLCBzY2hlZHVsZXIpO1xuICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGlzaCkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheU9ic2VydmFibGU8VD4oaXNoLCBzY2hlZHVsZXIpO1xuICAgICAgfSBlbHNlIGlmIChpc1Byb21pc2U8VD4oaXNoKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VPYnNlcnZhYmxlPFQ+KGlzaCwgc2NoZWR1bGVyKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGlzaFtTeW1ib2xfaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBpc2ggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBuZXcgSXRlcmF0b3JPYnNlcnZhYmxlPFQ+KGlzaCwgc2NoZWR1bGVyKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheUxpa2UoaXNoKSkge1xuICAgICAgICByZXR1cm4gbmV3IEFycmF5TGlrZU9ic2VydmFibGUoaXNoLCBzY2hlZHVsZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKGlzaCAhPT0gbnVsbCAmJiB0eXBlb2YgaXNoIHx8IGlzaCkgKyAnIGlzIG5vdCBvYnNlcnZhYmxlJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+KSB7XG4gICAgY29uc3QgaXNoID0gdGhpcy5pc2g7XG4gICAgY29uc3Qgc2NoZWR1bGVyID0gdGhpcy5zY2hlZHVsZXI7XG4gICAgaWYgKHNjaGVkdWxlciA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gaXNoW1N5bWJvbF9vYnNlcnZhYmxlXSgpLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGlzaFtTeW1ib2xfb2JzZXJ2YWJsZV0oKS5zdWJzY3JpYmUobmV3IE9ic2VydmVPblN1YnNjcmliZXIoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCAwKSk7XG4gICAgfVxuICB9XG59XG4iXX0=