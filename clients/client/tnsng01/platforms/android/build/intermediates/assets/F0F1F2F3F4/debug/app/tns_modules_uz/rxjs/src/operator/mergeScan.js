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
var tryCatch_1 = require("../util/tryCatch");
var errorObject_1 = require("../util/errorObject");
var subscribeToResult_1 = require("../util/subscribeToResult");
var OuterSubscriber_1 = require("../OuterSubscriber");
function mergeScan(accumulator, seed, concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return this.lift(new MergeScanOperator(accumulator, seed, concurrent));
}
exports.mergeScan = mergeScan;
var MergeScanOperator = (function () {
    function MergeScanOperator(accumulator, seed, concurrent) {
        this.accumulator = accumulator;
        this.seed = seed;
        this.concurrent = concurrent;
    }
    MergeScanOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MergeScanSubscriber(subscriber, this.accumulator, this.seed, this.concurrent));
    };
    return MergeScanOperator;
}());
exports.MergeScanOperator = MergeScanOperator;
var MergeScanSubscriber = (function (_super) {
    __extends(MergeScanSubscriber, _super);
    function MergeScanSubscriber(destination, accumulator, acc, concurrent) {
        var _this = _super.call(this, destination) || this;
        _this.accumulator = accumulator;
        _this.acc = acc;
        _this.concurrent = concurrent;
        _this.hasValue = false;
        _this.hasCompleted = false;
        _this.buffer = [];
        _this.active = 0;
        _this.index = 0;
        return _this;
    }
    MergeScanSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            var index = this.index++;
            var ish = tryCatch_1.tryCatch(this.accumulator)(this.acc, value);
            var destination = this.destination;
            if (ish === errorObject_1.errorObject) {
                destination.error(errorObject_1.errorObject.e);
            }
            else {
                this.active++;
                this._innerSub(ish, value, index);
            }
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeScanSubscriber.prototype._innerSub = function (ish, value, index) {
        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeScanSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            if (this.hasValue === false) {
                this.destination.next(this.acc);
            }
            this.destination.complete();
        }
    };
    MergeScanSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var destination = this.destination;
        this.acc = innerValue;
        this.hasValue = true;
        destination.next(innerValue);
    };
    MergeScanSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            if (this.hasValue === false) {
                this.destination.next(this.acc);
            }
            this.destination.complete();
        }
    };
    return MergeScanSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.MergeScanSubscriber = MergeScanSubscriber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VTY2FuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVyZ2VTY2FuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUlBLDZDQUE0QztBQUM1QyxtREFBa0Q7QUFDbEQsK0RBQThEO0FBQzlELHNEQUFxRDtBQWtDckQsbUJBQ2dDLFdBQWdELEVBQ2hELElBQU8sRUFDUCxVQUE2QztJQUE3QywyQkFBQSxFQUFBLGFBQXFCLE1BQU0sQ0FBQyxpQkFBaUI7SUFDM0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDekUsQ0FBQztBQUxELDhCQUtDO0FBRUQ7SUFDRSwyQkFBb0IsV0FBZ0QsRUFDaEQsSUFBTyxFQUNQLFVBQWtCO1FBRmxCLGdCQUFXLEdBQVgsV0FBVyxDQUFxQztRQUNoRCxTQUFJLEdBQUosSUFBSSxDQUFHO1FBQ1AsZUFBVSxHQUFWLFVBQVUsQ0FBUTtJQUN0QyxDQUFDO0lBRUQsZ0NBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLG1CQUFtQixDQUM3QyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQ3pELENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFYRCxJQVdDO0FBWFksOENBQWlCO0FBa0I5QjtJQUErQyx1Q0FBcUI7SUFPbEUsNkJBQVksV0FBMEIsRUFDbEIsV0FBZ0QsRUFDaEQsR0FBTSxFQUNOLFVBQWtCO1FBSHRDLFlBSUUsa0JBQU0sV0FBVyxDQUFDLFNBQ25CO1FBSm1CLGlCQUFXLEdBQVgsV0FBVyxDQUFxQztRQUNoRCxTQUFHLEdBQUgsR0FBRyxDQUFHO1FBQ04sZ0JBQVUsR0FBVixVQUFV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LElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDbEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsQ0FBQztZQUNELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUFsRUQsQ0FBK0MsaUNBQWUsR0FrRTdEO0FBbEVZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IHRyeUNhdGNoIH0gZnJvbSAnLi4vdXRpbC90cnlDYXRjaCc7XG5pbXBvcnQgeyBlcnJvck9iamVjdCB9IGZyb20gJy4uL3V0aWwvZXJyb3JPYmplY3QnO1xuaW1wb3J0IHsgc3Vic2NyaWJlVG9SZXN1bHQgfSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0JztcbmltcG9ydCB7IE91dGVyU3Vic2NyaWJlciB9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBJbm5lclN1YnNjcmliZXIgfSBmcm9tICcuLi9Jbm5lclN1YnNjcmliZXInO1xuXG4vKipcbiAqIEFwcGxpZXMgYW4gYWNjdW11bGF0b3IgZnVuY3Rpb24gb3ZlciB0aGUgc291cmNlIE9ic2VydmFibGUgd2hlcmUgdGhlXG4gKiBhY2N1bXVsYXRvciBmdW5jdGlvbiBpdHNlbGYgcmV0dXJucyBhbiBPYnNlcnZhYmxlLCB0aGVuIGVhY2ggaW50ZXJtZWRpYXRlXG4gKiBPYnNlcnZhYmxlIHJldHVybmVkIGlzIG1lcmdlZCBpbnRvIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBsaWtlIHtAbGluayBzY2FufSwgYnV0IHRoZSBPYnNlcnZhYmxlcyByZXR1cm5lZFxuICogYnkgdGhlIGFjY3VtdWxhdG9yIGFyZSBtZXJnZWQgaW50byB0aGUgb3V0ZXIgT2JzZXJ2YWJsZS48L3NwYW4+XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+Q291bnQgdGhlIG51bWJlciBvZiBjbGljayBldmVudHM8L2NhcHRpb24+XG4gKiBjb25zdCBjbGljayQgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiBjb25zdCBvbmUkID0gY2xpY2skLm1hcFRvKDEpO1xuICogY29uc3Qgc2VlZCA9IDA7XG4gKiBjb25zdCBjb3VudCQgPSBvbmUkLm1lcmdlU2NhbigoYWNjLCBvbmUpID0+IFJ4Lk9ic2VydmFibGUub2YoYWNjICsgb25lKSwgc2VlZCk7XG4gKiBjb3VudCQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIC8vIFJlc3VsdHM6XG4gKiAxXG4gKiAyXG4gKiAzXG4gKiA0XG4gKiAvLyAuLi5hbmQgc28gb24gZm9yIGVhY2ggY2xpY2tcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKGFjYzogUiwgdmFsdWU6IFQpOiBPYnNlcnZhYmxlPFI+fSBhY2N1bXVsYXRvclxuICogVGhlIGFjY3VtdWxhdG9yIGZ1bmN0aW9uIGNhbGxlZCBvbiBlYWNoIHNvdXJjZSB2YWx1ZS5cbiAqIEBwYXJhbSBzZWVkIFRoZSBpbml0aWFsIGFjY3VtdWxhdGlvbiB2YWx1ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbY29uY3VycmVudD1OdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFldIE1heGltdW0gbnVtYmVyIG9mXG4gKiBpbnB1dCBPYnNlcnZhYmxlcyBiZWluZyBzdWJzY3JpYmVkIHRvIGNvbmN1cnJlbnRseS5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8Uj59IEFuIG9ic2VydmFibGUgb2YgdGhlIGFjY3VtdWxhdGVkIHZhbHVlcy5cbiAqIEBtZXRob2QgbWVyZ2VTY2FuXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VTY2FuPFQsIFI+KHRoaXM6IE9ic2VydmFibGU8VD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY3VtdWxhdG9yOiAoYWNjOiBSLCB2YWx1ZTogVCkgPT4gT2JzZXJ2YWJsZTxSPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VlZDogUixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uY3VycmVudDogbnVtYmVyID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKTogT2JzZXJ2YWJsZTxSPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IE1lcmdlU2Nhbk9wZXJhdG9yKGFjY3VtdWxhdG9yLCBzZWVkLCBjb25jdXJyZW50KSk7XG59XG5cbmV4cG9ydCBjbGFzcyBNZXJnZVNjYW5PcGVyYXRvcjxULCBSPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFI+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhY2N1bXVsYXRvcjogKGFjYzogUiwgdmFsdWU6IFQpID0+IE9ic2VydmFibGU8Uj4sXG4gICAgICAgICAgICAgIHByaXZhdGUgc2VlZDogUixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjb25jdXJyZW50OiBudW1iZXIpIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxSPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBNZXJnZVNjYW5TdWJzY3JpYmVyKFxuICAgICAgc3Vic2NyaWJlciwgdGhpcy5hY2N1bXVsYXRvciwgdGhpcy5zZWVkLCB0aGlzLmNvbmN1cnJlbnRcbiAgICApKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuZXhwb3J0IGNsYXNzIE1lcmdlU2NhblN1YnNjcmliZXI8VCwgUj4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgUj4ge1xuICBwcml2YXRlIGhhc1ZhbHVlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaGFzQ29tcGxldGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgYnVmZmVyOiBPYnNlcnZhYmxlPGFueT5bXSA9IFtdO1xuICBwcml2YXRlIGFjdGl2ZTogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIGluZGV4OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFI+LFxuICAgICAgICAgICAgICBwcml2YXRlIGFjY3VtdWxhdG9yOiAoYWNjOiBSLCB2YWx1ZTogVCkgPT4gT2JzZXJ2YWJsZTxSPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhY2M6IFIsXG4gICAgICAgICAgICAgIHByaXZhdGUgY29uY3VycmVudDogbnVtYmVyKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hY3RpdmUgPCB0aGlzLmNvbmN1cnJlbnQpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbmRleCsrO1xuICAgICAgY29uc3QgaXNoID0gdHJ5Q2F0Y2godGhpcy5hY2N1bXVsYXRvcikodGhpcy5hY2MsIHZhbHVlKTtcbiAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICAgIGlmIChpc2ggPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgIGRlc3RpbmF0aW9uLmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hY3RpdmUrKztcbiAgICAgICAgdGhpcy5faW5uZXJTdWIoaXNoLCB2YWx1ZSwgaW5kZXgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1ZmZlci5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbm5lclN1Yihpc2g6IGFueSwgdmFsdWU6IFQsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmFkZChzdWJzY3JpYmVUb1Jlc3VsdDxULCBSPih0aGlzLCBpc2gsIHZhbHVlLCBpbmRleCkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmhhc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgaWYgKHRoaXMuYWN0aXZlID09PSAwICYmIHRoaXMuYnVmZmVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaWYgKHRoaXMuaGFzVmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh0aGlzLmFjYyk7XG4gICAgICB9XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgbm90aWZ5TmV4dChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBSLFxuICAgICAgICAgICAgIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgUj4pOiB2b2lkIHtcbiAgICBjb25zdCB7IGRlc3RpbmF0aW9uIH0gPSB0aGlzO1xuICAgIHRoaXMuYWNjID0gaW5uZXJWYWx1ZTtcbiAgICB0aGlzLmhhc1ZhbHVlID0gdHJ1ZTtcbiAgICBkZXN0aW5hdGlvbi5uZXh0KGlubmVyVmFsdWUpO1xuICB9XG5cbiAgbm90aWZ5Q29tcGxldGUoaW5uZXJTdWI6IFN1YnNjcmlwdGlvbik6IHZvaWQge1xuICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIHRoaXMucmVtb3ZlKGlubmVyU3ViKTtcbiAgICB0aGlzLmFjdGl2ZS0tO1xuICAgIGlmIChidWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fbmV4dChidWZmZXIuc2hpZnQoKSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZSA9PT0gMCAmJiB0aGlzLmhhc0NvbXBsZXRlZCkge1xuICAgICAgaWYgKHRoaXMuaGFzVmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh0aGlzLmFjYyk7XG4gICAgICB9XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=