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
var ArrayObservable_1 = require("../observable/ArrayObservable");
var isArray_1 = require("../util/isArray");
var Subscriber_1 = require("../Subscriber");
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
var iterator_1 = require("../symbol/iterator");
function zipProto() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    return this.lift.call(zipStatic.apply(void 0, [this].concat(observables)));
}
exports.zipProto = zipProto;
function zipStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var project = observables[observables.length - 1];
    if (typeof project === 'function') {
        observables.pop();
    }
    return new ArrayObservable_1.ArrayObservable(observables).lift(new ZipOperator(project));
}
exports.zipStatic = zipStatic;
var ZipOperator = (function () {
    function ZipOperator(project) {
        this.project = project;
    }
    ZipOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ZipSubscriber(subscriber, this.project));
    };
    return ZipOperator;
}());
exports.ZipOperator = ZipOperator;
var ZipSubscriber = (function (_super) {
    __extends(ZipSubscriber, _super);
    function ZipSubscriber(destination, project, values) {
        if (values === void 0) { values = Object.create(null); }
        var _this = _super.call(this, destination) || this;
        _this.iterators = [];
        _this.active = 0;
        _this.project = (typeof project === 'function') ? project : null;
        _this.values = values;
        return _this;
    }
    ZipSubscriber.prototype._next = function (value) {
        var iterators = this.iterators;
        if (isArray_1.isArray(value)) {
            iterators.push(new StaticArrayIterator(value));
        }
        else if (typeof value[iterator_1.iterator] === 'function') {
            iterators.push(new StaticIterator(value[iterator_1.iterator]()));
        }
        else {
            iterators.push(new ZipBufferIterator(this.destination, this, value));
        }
    };
    ZipSubscriber.prototype._complete = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        if (len === 0) {
            this.destination.complete();
            return;
        }
        this.active = len;
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (iterator.stillUnsubscribed) {
                this.add(iterator.subscribe(iterator, i));
            }
            else {
                this.active--;
            }
        }
    };
    ZipSubscriber.prototype.notifyInactive = function () {
        this.active--;
        if (this.active === 0) {
            this.destination.complete();
        }
    };
    ZipSubscriber.prototype.checkIterators = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        var destination = this.destination;
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
                return;
            }
        }
        var shouldComplete = false;
        var args = [];
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            var result = iterator.next();
            if (iterator.hasCompleted()) {
                shouldComplete = true;
            }
            if (result.done) {
                destination.complete();
                return;
            }
            args.push(result.value);
        }
        if (this.project) {
            this._tryProject(args);
        }
        else {
            destination.next(args);
        }
        if (shouldComplete) {
            destination.complete();
        }
    };
    ZipSubscriber.prototype._tryProject = function (args) {
        var result;
        try {
            result = this.project.apply(this, args);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return ZipSubscriber;
}(Subscriber_1.Subscriber));
exports.ZipSubscriber = ZipSubscriber;
var StaticIterator = (function () {
    function StaticIterator(iterator) {
        this.iterator = iterator;
        this.nextResult = iterator.next();
    }
    StaticIterator.prototype.hasValue = function () {
        return true;
    };
    StaticIterator.prototype.next = function () {
        var result = this.nextResult;
        this.nextResult = this.iterator.next();
        return result;
    };
    StaticIterator.prototype.hasCompleted = function () {
        var nextResult = this.nextResult;
        return nextResult && nextResult.done;
    };
    return StaticIterator;
}());
var StaticArrayIterator = (function () {
    function StaticArrayIterator(array) {
        this.array = array;
        this.index = 0;
        this.length = 0;
        this.length = array.length;
    }
    StaticArrayIterator.prototype[iterator_1.iterator] = function () {
        return this;
    };
    StaticArrayIterator.prototype.next = function (value) {
        var i = this.index++;
        var array = this.array;
        return i < this.length ? { value: array[i], done: false } : { value: null, done: true };
    };
    StaticArrayIterator.prototype.hasValue = function () {
        return this.array.length > this.index;
    };
    StaticArrayIterator.prototype.hasCompleted = function () {
        return this.array.length === this.index;
    };
    return StaticArrayIterator;
}());
var ZipBufferIterator = (function (_super) {
    __extends(ZipBufferIterator, _super);
    function ZipBufferIterator(destination, parent, observable) {
        var _this = _super.call(this, destination) || this;
        _this.parent = parent;
        _this.observable = observable;
        _this.stillUnsubscribed = true;
        _this.buffer = [];
        _this.isComplete = false;
        return _this;
    }
    ZipBufferIterator.prototype[iterator_1.iterator] = function () {
        return this;
    };
    ZipBufferIterator.prototype.next = function () {
        var buffer = this.buffer;
        if (buffer.length === 0 && this.isComplete) {
            return { value: null, done: true };
        }
        else {
            return { value: buffer.shift(), done: false };
        }
    };
    ZipBufferIterator.prototype.hasValue = function () {
        return this.buffer.length > 0;
    };
    ZipBufferIterator.prototype.hasCompleted = function () {
        return this.buffer.length === 0 && this.isComplete;
    };
    ZipBufferIterator.prototype.notifyComplete = function () {
        if (this.buffer.length > 0) {
            this.isComplete = true;
            this.parent.notifyInactive();
        }
        else {
            this.destination.complete();
        }
    };
    ZipBufferIterator.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.buffer.push(innerValue);
        this.parent.checkIterators();
    };
    ZipBufferIterator.prototype.subscribe = function (value, index) {
        return subscribeToResult_1.subscribeToResult(this, this.observable, this, index);
    };
    return ZipBufferIterator;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiemlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLGlFQUFnRTtBQUNoRSwyQ0FBMEM7QUFHMUMsNENBQTJDO0FBQzNDLHNEQUFxRDtBQUVyRCwrREFBOEQ7QUFDOUQsK0NBQWlFO0FBeUJqRTtJQUFvRCxxQkFBNEU7U0FBNUUsVUFBNEUsRUFBNUUscUJBQTRFLEVBQTVFLElBQTRFO1FBQTVFLGdDQUE0RTs7SUFDOUgsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsZ0JBQUksSUFBSSxTQUFLLFdBQVcsR0FBRSxDQUFDO0FBQzVELENBQUM7QUFGRCw0QkFFQztBQXlERDtJQUFnQyxxQkFBNEU7U0FBNUUsVUFBNEUsRUFBNUUscUJBQTRFLEVBQTVFLElBQTRFO1FBQTVFLGdDQUE0RTs7SUFDMUcsSUFBTSxPQUFPLEdBQWdDLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDRCxNQUFNLENBQUMsSUFBSSxpQ0FBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ3pFLENBQUM7QUFORCw4QkFNQztBQUVEO0lBSUUscUJBQVksT0FBc0M7UUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVELDBCQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7UUFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lB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QUFDLENBQUM7WUFDTixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlCLENBQUM7SUFDSCxDQUFDO0lBRUQsc0NBQVUsR0FBVixVQUFXLFVBQWEsRUFBRSxVQUFlLEVBQzlCLFVBQWtCLEVBQUUsVUFBa0IsRUFDdEMsUUFBK0I7UUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQscUNBQVMsR0FBVCxVQUFVLEtBQVUsRUFBRSxLQUFhO1FBQ2pDLE1BQU0sQ0FBQyxxQ0FBaUIsQ0FBVyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQXJERCxDQUFzQyxpQ0FBZSxHQXFEcEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZhYmxlSW5wdXQgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEFycmF5T2JzZXJ2YWJsZSB9IGZyb20gJy4uL29ic2VydmFibGUvQXJyYXlPYnNlcnZhYmxlJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi91dGlsL2lzQXJyYXknO1xuaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBQYXJ0aWFsT2JzZXJ2ZXIgfSBmcm9tICcuLi9PYnNlcnZlcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgSW5uZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5pbXBvcnQgeyBpdGVyYXRvciBhcyBTeW1ib2xfaXRlcmF0b3IgfSBmcm9tICcuLi9zeW1ib2wvaXRlcmF0b3InO1xuXG4vKiB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbmV4cG9ydCBmdW5jdGlvbiB6aXBQcm90bzxULCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBwcm9qZWN0OiAodjE6IFQpID0+IFIpOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFByb3RvPFQsIFQyLCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgcHJvamVjdDogKHYxOiBULCB2MjogVDIpID0+IFIpOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFByb3RvPFQsIFQyLCBUMywgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCBwcm9qZWN0OiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzKSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiB6aXBQcm90bzxULCBUMiwgVDMsIFQ0LCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+LCBwcm9qZWN0OiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQpID0+IFIpOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFByb3RvPFQsIFQyLCBUMywgVDQsIFQ1LCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+LCB2NTogT2JzZXJ2YWJsZUlucHV0PFQ1PiwgcHJvamVjdDogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCB2NTogVDUpID0+IFIpOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFByb3RvPFQsIFQyLCBUMywgVDQsIFQ1LCBUNiwgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHY2OiBPYnNlcnZhYmxlSW5wdXQ8VDY+LCBwcm9qZWN0OiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSwgdjY6IFQ2KSA9PiBSKTogT2JzZXJ2YWJsZTxSPiA7XG5leHBvcnQgZnVuY3Rpb24gemlwUHJvdG88VCwgVDI+KHRoaXM6IE9ic2VydmFibGU8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+KTogT2JzZXJ2YWJsZTxbVCwgVDJdPjtcbmV4cG9ydCBmdW5jdGlvbiB6aXBQcm90bzxULCBUMiwgVDM+KHRoaXM6IE9ic2VydmFibGU8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPik6IE9ic2VydmFibGU8W1QsIFQyLCBUM10+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFByb3RvPFQsIFQyLCBUMywgVDQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4pOiBPYnNlcnZhYmxlPFtULCBUMiwgVDMsIFQ0XT47XG5leHBvcnQgZnVuY3Rpb24gemlwUHJvdG88VCwgVDIsIFQzLCBUNCwgVDU+KHRoaXM6IE9ic2VydmFibGU8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+KTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzLCBUNCwgVDVdPjtcbmV4cG9ydCBmdW5jdGlvbiB6aXBQcm90bzxULCBUMiwgVDMsIFQ0LCBUNSwgVDY+KHRoaXM6IE9ic2VydmFibGU8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+LCB2NjogT2JzZXJ2YWJsZUlucHV0PFQ2Pik6IE9ic2VydmFibGU8W1QsIFQyLCBUMywgVDQsIFQ1LCBUNl0+IDtcbmV4cG9ydCBmdW5jdGlvbiB6aXBQcm90bzxULCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCAuLi5vYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PFQ+IHwgKCguLi52YWx1ZXM6IEFycmF5PFQ+KSA9PiBSKT4pOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFByb3RvPFQsIFI+KHRoaXM6IE9ic2VydmFibGU8VD4sIGFycmF5OiBBcnJheTxPYnNlcnZhYmxlSW5wdXQ8VD4+KTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiB6aXBQcm90bzxULCBUT3RoZXIsIFI+KHRoaXM6IE9ic2VydmFibGU8VD4sIGFycmF5OiBBcnJheTxPYnNlcnZhYmxlSW5wdXQ8VE90aGVyPj4sIHByb2plY3Q6ICh2MTogVCwgLi4udmFsdWVzOiBBcnJheTxUT3RoZXI+KSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbi8qKlxuICogQHBhcmFtIG9ic2VydmFibGVzXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFI+fVxuICogQG1ldGhvZCB6aXBcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB6aXBQcm90bzxULCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCAuLi5vYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PGFueT4gfCAoKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUik+KTogT2JzZXJ2YWJsZTxSPiB7XG4gIHJldHVybiB0aGlzLmxpZnQuY2FsbCh6aXBTdGF0aWM8Uj4odGhpcywgLi4ub2JzZXJ2YWJsZXMpKTtcbn1cblxuLyogdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFQyPih2MTogT2JzZXJ2YWJsZUlucHV0PFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPik6IE9ic2VydmFibGU8W1QsIFQyXT47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFQyLCBUMz4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+KTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzXT47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFQyLCBUMywgVDQ+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4pOiBPYnNlcnZhYmxlPFtULCBUMiwgVDMsIFQ0XT47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFQyLCBUMywgVDQsIFQ1Pih2MTogT2JzZXJ2YWJsZUlucHV0PFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+LCB2NTogT2JzZXJ2YWJsZUlucHV0PFQ1Pik6IE9ic2VydmFibGU8W1QsIFQyLCBUMywgVDQsIFQ1XT47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFQyLCBUMywgVDQsIFQ1LCBUNj4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHY2OiBPYnNlcnZhYmxlSW5wdXQ8VDY+KTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzLCBUNCwgVDUsIFQ2XT47XG5cbmV4cG9ydCBmdW5jdGlvbiB6aXBTdGF0aWM8VCwgUj4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgcHJvamVjdDogKHYxOiBUKSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiB6aXBTdGF0aWM8VCwgVDIsIFI+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCBwcm9qZWN0OiAodjE6IFQsIHYyOiBUMikgPT4gUik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFQyLCBUMywgUj4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCBwcm9qZWN0OiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzKSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiB6aXBTdGF0aWM8VCwgVDIsIFQzLCBUNCwgUj4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgcHJvamVjdDogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0KSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiB6aXBTdGF0aWM8VCwgVDIsIFQzLCBUNCwgVDUsIFI+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+LCBwcm9qZWN0OiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSkgPT4gUik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFQyLCBUMywgVDQsIFQ1LCBUNiwgUj4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHY2OiBPYnNlcnZhYmxlSW5wdXQ8VDY+LCBwcm9qZWN0OiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSwgdjY6IFQ2KSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcblxuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxUPihhcnJheTogT2JzZXJ2YWJsZUlucHV0PFQ+W10pOiBPYnNlcnZhYmxlPFRbXT47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFI+KGFycmF5OiBPYnNlcnZhYmxlSW5wdXQ8YW55PltdKTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiB6aXBTdGF0aWM8VCwgUj4oYXJyYXk6IE9ic2VydmFibGVJbnB1dDxUPltdLCBwcm9qZWN0OiAoLi4udmFsdWVzOiBBcnJheTxUPikgPT4gUik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFI+KGFycmF5OiBPYnNlcnZhYmxlSW5wdXQ8YW55PltdLCBwcm9qZWN0OiAoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcblxuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxUPiguLi5vYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PFQ+Pik6IE9ic2VydmFibGU8VFtdPjtcbmV4cG9ydCBmdW5jdGlvbiB6aXBTdGF0aWM8VCwgUj4oLi4ub2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGVJbnB1dDxUPiB8ICgoLi4udmFsdWVzOiBBcnJheTxUPikgPT4gUik+KTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiB6aXBTdGF0aWM8Uj4oLi4ub2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGVJbnB1dDxhbnk+IHwgKCguLi52YWx1ZXM6IEFycmF5PGFueT4pID0+IFIpPik6IE9ic2VydmFibGU8Uj47XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuXG4vKipcbiAqIENvbWJpbmVzIG11bHRpcGxlIE9ic2VydmFibGVzIHRvIGNyZWF0ZSBhbiBPYnNlcnZhYmxlIHdob3NlIHZhbHVlcyBhcmUgY2FsY3VsYXRlZCBmcm9tIHRoZSB2YWx1ZXMsIGluIG9yZGVyLCBvZiBlYWNoXG4gKiBvZiBpdHMgaW5wdXQgT2JzZXJ2YWJsZXMuXG4gKlxuICogSWYgdGhlIGxhdGVzdCBwYXJhbWV0ZXIgaXMgYSBmdW5jdGlvbiwgdGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGNvbXB1dGUgdGhlIGNyZWF0ZWQgdmFsdWUgZnJvbSB0aGUgaW5wdXQgdmFsdWVzLlxuICogT3RoZXJ3aXNlLCBhbiBhcnJheSBvZiB0aGUgaW5wdXQgdmFsdWVzIGlzIHJldHVybmVkLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNvbWJpbmUgYWdlIGFuZCBuYW1lIGZyb20gZGlmZmVyZW50IHNvdXJjZXM8L2NhcHRpb24+XG4gKlxuICogbGV0IGFnZSQgPSBPYnNlcnZhYmxlLm9mPG51bWJlcj4oMjcsIDI1LCAyOSk7XG4gKiBsZXQgbmFtZSQgPSBPYnNlcnZhYmxlLm9mPHN0cmluZz4oJ0ZvbycsICdCYXInLCAnQmVlcicpO1xuICogbGV0IGlzRGV2JCA9IE9ic2VydmFibGUub2Y8Ym9vbGVhbj4odHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xuICpcbiAqIE9ic2VydmFibGVcbiAqICAgICAuemlwKGFnZSQsXG4gKiAgICAgICAgICBuYW1lJCxcbiAqICAgICAgICAgIGlzRGV2JCxcbiAqICAgICAgICAgIChhZ2U6IG51bWJlciwgbmFtZTogc3RyaW5nLCBpc0RldjogYm9vbGVhbikgPT4gKHsgYWdlLCBuYW1lLCBpc0RldiB9KSlcbiAqICAgICAuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIC8vIG91dHB1dHNcbiAqIC8vIHsgYWdlOiAyNywgbmFtZTogJ0ZvbycsIGlzRGV2OiB0cnVlIH1cbiAqIC8vIHsgYWdlOiAyNSwgbmFtZTogJ0JhcicsIGlzRGV2OiB0cnVlIH1cbiAqIC8vIHsgYWdlOiAyOSwgbmFtZTogJ0JlZXInLCBpc0RldjogZmFsc2UgfVxuICpcbiAqIEBwYXJhbSBvYnNlcnZhYmxlc1xuICogQHJldHVybiB7T2JzZXJ2YWJsZTxSPn1cbiAqIEBzdGF0aWMgdHJ1ZVxuICogQG5hbWUgemlwXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFI+KC4uLm9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlSW5wdXQ8YW55PiB8ICgoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSKT4pOiBPYnNlcnZhYmxlPFI+IHtcbiAgY29uc3QgcHJvamVjdCA9IDwoKC4uLnlzOiBBcnJheTxhbnk+KSA9PiBSKT4gb2JzZXJ2YWJsZXNbb2JzZXJ2YWJsZXMubGVuZ3RoIC0gMV07XG4gIGlmICh0eXBlb2YgcHJvamVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9ic2VydmFibGVzLnBvcCgpO1xuICB9XG4gIHJldHVybiBuZXcgQXJyYXlPYnNlcnZhYmxlKG9ic2VydmFibGVzKS5saWZ0KG5ldyBaaXBPcGVyYXRvcihwcm9qZWN0KSk7XG59XG5cbmV4cG9ydCBjbGFzcyBaaXBPcGVyYXRvcjxULCBSPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFI+IHtcblxuICBwcm9qZWN0OiAoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSO1xuXG4gIGNvbnN0cnVjdG9yKHByb2plY3Q/OiAoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSKSB7XG4gICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxSPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBaaXBTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMucHJvamVjdCkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5leHBvcnQgY2xhc3MgWmlwU3Vic2NyaWJlcjxULCBSPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcml2YXRlIHZhbHVlczogYW55O1xuICBwcml2YXRlIHByb2plY3Q6ICguLi52YWx1ZXM6IEFycmF5PGFueT4pID0+IFI7XG4gIHByaXZhdGUgaXRlcmF0b3JzOiBMb29rQWhlYWRJdGVyYXRvcjxhbnk+W10gPSBbXTtcbiAgcHJpdmF0ZSBhY3RpdmUgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFI+LFxuICAgICAgICAgICAgICBwcm9qZWN0PzogKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUixcbiAgICAgICAgICAgICAgdmFsdWVzOiBhbnkgPSBPYmplY3QuY3JlYXRlKG51bGwpKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIHRoaXMucHJvamVjdCA9ICh0eXBlb2YgcHJvamVjdCA9PT0gJ2Z1bmN0aW9uJykgPyBwcm9qZWN0IDogbnVsbDtcbiAgICB0aGlzLnZhbHVlcyA9IHZhbHVlcztcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogYW55KSB7XG4gICAgY29uc3QgaXRlcmF0b3JzID0gdGhpcy5pdGVyYXRvcnM7XG4gICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBpdGVyYXRvcnMucHVzaChuZXcgU3RhdGljQXJyYXlJdGVyYXRvcih2YWx1ZSkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlW1N5bWJvbF9pdGVyYXRvcl0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGl0ZXJhdG9ycy5wdXNoKG5ldyBTdGF0aWNJdGVyYXRvcih2YWx1ZVtTeW1ib2xfaXRlcmF0b3JdKCkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaXRlcmF0b3JzLnB1c2gobmV3IFppcEJ1ZmZlckl0ZXJhdG9yKHRoaXMuZGVzdGluYXRpb24sIHRoaXMsIHZhbHVlKSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpIHtcbiAgICBjb25zdCBpdGVyYXRvcnMgPSB0aGlzLml0ZXJhdG9ycztcbiAgICBjb25zdCBsZW4gPSBpdGVyYXRvcnMubGVuZ3RoO1xuXG4gICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlID0gbGVuO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxldCBpdGVyYXRvcjogWmlwQnVmZmVySXRlcmF0b3I8YW55LCBhbnk+ID0gPGFueT5pdGVyYXRvcnNbaV07XG4gICAgICBpZiAoaXRlcmF0b3Iuc3RpbGxVbnN1YnNjcmliZWQpIHtcbiAgICAgICAgdGhpcy5hZGQoaXRlcmF0b3Iuc3Vic2NyaWJlKGl0ZXJhdG9yLCBpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFjdGl2ZS0tOyAvLyBub3QgYW4gb2JzZXJ2YWJsZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5vdGlmeUluYWN0aXZlKCkge1xuICAgIHRoaXMuYWN0aXZlLS07XG4gICAgaWYgKHRoaXMuYWN0aXZlID09PSAwKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tJdGVyYXRvcnMoKSB7XG4gICAgY29uc3QgaXRlcmF0b3JzID0gdGhpcy5pdGVyYXRvcnM7XG4gICAgY29uc3QgbGVuID0gaXRlcmF0b3JzLmxlbmd0aDtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG5cbiAgICAvLyBhYm9ydCBpZiBub3QgYWxsIG9mIHRoZW0gaGF2ZSB2YWx1ZXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgaXRlcmF0b3IgPSBpdGVyYXRvcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGl0ZXJhdG9yLmhhc1ZhbHVlID09PSAnZnVuY3Rpb24nICYmICFpdGVyYXRvci5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgc2hvdWxkQ29tcGxldGUgPSBmYWxzZTtcbiAgICBjb25zdCBhcmdzOiBhbnlbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxldCBpdGVyYXRvciA9IGl0ZXJhdG9yc1tpXTtcbiAgICAgIGxldCByZXN1bHQgPSBpdGVyYXRvci5uZXh0KCk7XG5cbiAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiBpdCdzIGNvbXBsZXRlZCBub3cgdGhhdCB5b3UndmUgZ290dGVuXG4gICAgICAvLyB0aGUgbmV4dCB2YWx1ZS5cbiAgICAgIGlmIChpdGVyYXRvci5oYXNDb21wbGV0ZWQoKSkge1xuICAgICAgICBzaG91bGRDb21wbGV0ZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN1bHQuZG9uZSkge1xuICAgICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFyZ3MucHVzaChyZXN1bHQudmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb2plY3QpIHtcbiAgICAgIHRoaXMuX3RyeVByb2plY3QoYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3RpbmF0aW9uLm5leHQoYXJncyk7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZENvbXBsZXRlKSB7XG4gICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfdHJ5UHJvamVjdChhcmdzOiBhbnlbXSkge1xuICAgIGxldCByZXN1bHQ6IGFueTtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5wcm9qZWN0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQocmVzdWx0KTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgTG9va0FoZWFkSXRlcmF0b3I8VD4gZXh0ZW5kcyBJdGVyYXRvcjxUPiB7XG4gIGhhc1ZhbHVlKCk6IGJvb2xlYW47XG4gIGhhc0NvbXBsZXRlZCgpOiBib29sZWFuO1xufVxuXG5jbGFzcyBTdGF0aWNJdGVyYXRvcjxUPiBpbXBsZW1lbnRzIExvb2tBaGVhZEl0ZXJhdG9yPFQ+IHtcbiAgcHJpdmF0ZSBuZXh0UmVzdWx0OiBJdGVyYXRvclJlc3VsdDxUPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGl0ZXJhdG9yOiBJdGVyYXRvcjxUPikge1xuICAgIHRoaXMubmV4dFJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgfVxuXG4gIGhhc1ZhbHVlKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgbmV4dCgpOiBJdGVyYXRvclJlc3VsdDxUPiB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5uZXh0UmVzdWx0O1xuICAgIHRoaXMubmV4dFJlc3VsdCA9IHRoaXMuaXRlcmF0b3IubmV4dCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBoYXNDb21wbGV0ZWQoKSB7XG4gICAgY29uc3QgbmV4dFJlc3VsdCA9IHRoaXMubmV4dFJlc3VsdDtcbiAgICByZXR1cm4gbmV4dFJlc3VsdCAmJiBuZXh0UmVzdWx0LmRvbmU7XG4gIH1cbn1cblxuY2xhc3MgU3RhdGljQXJyYXlJdGVyYXRvcjxUPiBpbXBsZW1lbnRzIExvb2tBaGVhZEl0ZXJhdG9yPFQ+IHtcbiAgcHJpdmF0ZSBpbmRleCA9IDA7XG4gIHByaXZhdGUgbGVuZ3RoID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFycmF5OiBUW10pIHtcbiAgICB0aGlzLmxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgfVxuXG4gIFtTeW1ib2xfaXRlcmF0b3JdKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbmV4dCh2YWx1ZT86IGFueSk6IEl0ZXJhdG9yUmVzdWx0PFQ+IHtcbiAgICBjb25zdCBpID0gdGhpcy5pbmRleCsrO1xuICAgIGNvbnN0IGFycmF5ID0gdGhpcy5hcnJheTtcbiAgICByZXR1cm4gaSA8IHRoaXMubGVuZ3RoID8geyB2YWx1ZTogYXJyYXlbaV0sIGRvbmU6IGZhbHNlIH0gOiB7IHZhbHVlOiBudWxsLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBoYXNWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5hcnJheS5sZW5ndGggPiB0aGlzLmluZGV4O1xuICB9XG5cbiAgaGFzQ29tcGxldGVkKCkge1xuICAgIHJldHVybiB0aGlzLmFycmF5Lmxlbmd0aCA9PT0gdGhpcy5pbmRleDtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgWmlwQnVmZmVySXRlcmF0b3I8VCwgUj4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgUj4gaW1wbGVtZW50cyBMb29rQWhlYWRJdGVyYXRvcjxUPiB7XG4gIHN0aWxsVW5zdWJzY3JpYmVkID0gdHJ1ZTtcbiAgYnVmZmVyOiBUW10gPSBbXTtcbiAgaXNDb21wbGV0ZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBQYXJ0aWFsT2JzZXJ2ZXI8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcGFyZW50OiBaaXBTdWJzY3JpYmVyPFQsIFI+LFxuICAgICAgICAgICAgICBwcml2YXRlIG9ic2VydmFibGU6IE9ic2VydmFibGU8VD4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBbU3ltYm9sX2l0ZXJhdG9yXSgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIE5PVEU6IHRoZXJlIGlzIGFjdHVhbGx5IGEgbmFtZSBjb2xsaXNpb24gaGVyZSB3aXRoIFN1YnNjcmliZXIubmV4dCBhbmQgSXRlcmF0b3IubmV4dFxuICAvLyAgICB0aGlzIGlzIGxlZ2l0IGJlY2F1c2UgYG5leHQoKWAgd2lsbCBuZXZlciBiZSBjYWxsZWQgYnkgYSBzdWJzY3JpcHRpb24gaW4gdGhpcyBjYXNlLlxuICBuZXh0KCk6IEl0ZXJhdG9yUmVzdWx0PFQ+IHtcbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmlzQ29tcGxldGUpIHtcbiAgICAgIHJldHVybiB7IHZhbHVlOiBudWxsLCBkb25lOiB0cnVlIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7IHZhbHVlOiBidWZmZXIuc2hpZnQoKSwgZG9uZTogZmFsc2UgfTtcbiAgICB9XG4gIH1cblxuICBoYXNWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5idWZmZXIubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGhhc0NvbXBsZXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5idWZmZXIubGVuZ3RoID09PSAwICYmIHRoaXMuaXNDb21wbGV0ZTtcbiAgfVxuXG4gIG5vdGlmeUNvbXBsZXRlKCkge1xuICAgIGlmICh0aGlzLmJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmlzQ29tcGxldGUgPSB0cnVlO1xuICAgICAgdGhpcy5wYXJlbnQubm90aWZ5SW5hY3RpdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5vdGlmeU5leHQob3V0ZXJWYWx1ZTogVCwgaW5uZXJWYWx1ZTogYW55LFxuICAgICAgICAgICAgIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgUj4pOiB2b2lkIHtcbiAgICB0aGlzLmJ1ZmZlci5wdXNoKGlubmVyVmFsdWUpO1xuICAgIHRoaXMucGFyZW50LmNoZWNrSXRlcmF0b3JzKCk7XG4gIH1cblxuICBzdWJzY3JpYmUodmFsdWU6IGFueSwgaW5kZXg6IG51bWJlcikge1xuICAgIHJldHVybiBzdWJzY3JpYmVUb1Jlc3VsdDxhbnksIGFueT4odGhpcywgdGhpcy5vYnNlcnZhYmxlLCB0aGlzLCBpbmRleCk7XG4gIH1cbn1cbiJdfQ==