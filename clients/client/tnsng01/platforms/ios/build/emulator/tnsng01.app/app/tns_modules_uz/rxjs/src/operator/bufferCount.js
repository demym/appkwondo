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
function bufferCount(bufferSize, startBufferEvery) {
    if (startBufferEvery === void 0) { startBufferEvery = null; }
    return this.lift(new BufferCountOperator(bufferSize, startBufferEvery));
}
exports.bufferCount = bufferCount;
var BufferCountOperator = (function () {
    function BufferCountOperator(bufferSize, startBufferEvery) {
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
        if (!startBufferEvery || bufferSize === startBufferEvery) {
            this.subscriberClass = BufferCountSubscriber;
        }
        else {
            this.subscriberClass = BufferSkipCountSubscriber;
        }
    }
    BufferCountOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new this.subscriberClass(subscriber, this.bufferSize, this.startBufferEvery));
    };
    return BufferCountOperator;
}());
var BufferCountSubscriber = (function (_super) {
    __extends(BufferCountSubscriber, _super);
    function BufferCountSubscriber(destination, bufferSize) {
        var _this = _super.call(this, destination) || this;
        _this.bufferSize = bufferSize;
        _this.buffer = [];
        return _this;
    }
    BufferCountSubscriber.prototype._next = function (value) {
        var buffer = this.buffer;
        buffer.push(value);
        if (buffer.length == this.bufferSize) {
            this.destination.next(buffer);
            this.buffer = [];
        }
    };
    BufferCountSubscriber.prototype._complete = function () {
        var buffer = this.buffer;
        if (buffer.length > 0) {
            this.destination.next(buffer);
        }
        _super.prototype._complete.call(this);
    };
    return BufferCountSubscriber;
}(Subscriber_1.Subscriber));
var BufferSkipCountSubscriber = (function (_super) {
    __extends(BufferSkipCountSubscriber, _super);
    function BufferSkipCountSubscriber(destination, bufferSize, startBufferEvery) {
        var _this = _super.call(this, destination) || this;
        _this.bufferSize = bufferSize;
        _this.startBufferEvery = startBufferEvery;
        _this.buffers = [];
        _this.count = 0;
        return _this;
    }
    BufferSkipCountSubscriber.prototype._next = function (value) {
        var _a = this, bufferSize = _a.bufferSize, startBufferEvery = _a.startBufferEvery, buffers = _a.buffers, count = _a.count;
        this.count++;
        if (count % startBufferEvery === 0) {
            buffers.push([]);
        }
        for (var i = buffers.length; i--;) {
            var buffer = buffers[i];
            buffer.push(value);
            if (buffer.length === bufferSize) {
                buffers.splice(i, 1);
                this.destination.next(buffer);
            }
        }
    };
    BufferSkipCountSubscriber.prototype._complete = function () {
        var _a = this, buffers = _a.buffers, destination = _a.destination;
        while (buffers.length > 0) {
            var buffer = buffers.shift();
            if (buffer.length > 0) {
                destination.next(buffer);
            }
        }
        _super.prototype._complete.call(this);
    };
    return BufferSkipCountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVmZmVyQ291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidWZmZXJDb3VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSw0Q0FBMkM7QUE2QzNDLHFCQUFvRCxVQUFrQixFQUFFLGdCQUErQjtJQUEvQixpQ0FBQSxFQUFBLHVCQUErQjtJQUNyRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLG1CQUFtQixDQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7QUFDN0UsQ0FBQztBQUZELGtDQUVDO0FBRUQ7SUFHRSw2QkFBb0IsVUFBa0IsRUFBVSxnQkFBd0I7UUFBcEQsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUTtRQUN0RSxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLFVBQVUsS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLGVBQWUsR0FBRyxxQkFBcUIsQ0FBQztRQUMvQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsZUFBZSxHQUFHLHlCQUF5QixDQUFDO1FBQ25ELENBQUM7SUFDSCxDQUFDO0lBRUQsa0NBQUksR0FBSixVQUFLLFVBQTJCLEVBQUUsTUFBVztRQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUN4RyxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQztBQU9EO0lBQXVDLHlDQUFhO0lBR2xELCtCQUFZLFdBQTRCLEVBQVUsVUFBa0I7UUFBcEUsWUFDRSxrQkFBTSxXQUFXLENBQUMsU0FDbkI7UUFGaUQsZ0JBQVUsR0FBVixVQUFVLENBQVE7UUFGNUQsWUFBTSxH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YXRvcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuLyoqXG4gKiBCdWZmZXJzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB2YWx1ZXMgdW50aWwgdGhlIHNpemUgaGl0cyB0aGUgbWF4aW11bVxuICogYGJ1ZmZlclNpemVgIGdpdmVuLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5Db2xsZWN0cyB2YWx1ZXMgZnJvbSB0aGUgcGFzdCBhcyBhbiBhcnJheSwgYW5kIGVtaXRzXG4gKiB0aGF0IGFycmF5IG9ubHkgd2hlbiBpdHMgc2l6ZSByZWFjaGVzIGBidWZmZXJTaXplYC48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9idWZmZXJDb3VudC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBCdWZmZXJzIGEgbnVtYmVyIG9mIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBieSBgYnVmZmVyU2l6ZWAgdGhlblxuICogZW1pdHMgdGhlIGJ1ZmZlciBhbmQgY2xlYXJzIGl0LCBhbmQgc3RhcnRzIGEgbmV3IGJ1ZmZlciBlYWNoXG4gKiBgc3RhcnRCdWZmZXJFdmVyeWAgdmFsdWVzLiBJZiBgc3RhcnRCdWZmZXJFdmVyeWAgaXMgbm90IHByb3ZpZGVkIG9yIGlzXG4gKiBgbnVsbGAsIHRoZW4gbmV3IGJ1ZmZlcnMgYXJlIHN0YXJ0ZWQgaW1tZWRpYXRlbHkgYXQgdGhlIHN0YXJ0IG9mIHRoZSBzb3VyY2VcbiAqIGFuZCB3aGVuIGVhY2ggYnVmZmVyIGNsb3NlcyBhbmQgaXMgZW1pdHRlZC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IHRoZSBsYXN0IHR3byBjbGljayBldmVudHMgYXMgYW4gYXJyYXk8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIGJ1ZmZlcmVkID0gY2xpY2tzLmJ1ZmZlckNvdW50KDIpO1xuICogYnVmZmVyZWQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk9uIGV2ZXJ5IGNsaWNrLCBlbWl0IHRoZSBsYXN0IHR3byBjbGljayBldmVudHMgYXMgYW4gYXJyYXk8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIGJ1ZmZlcmVkID0gY2xpY2tzLmJ1ZmZlckNvdW50KDIsIDEpO1xuICogYnVmZmVyZWQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGJ1ZmZlcn1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlclRpbWV9XG4gKiBAc2VlIHtAbGluayBidWZmZXJUb2dnbGV9XG4gKiBAc2VlIHtAbGluayBidWZmZXJXaGVufVxuICogQHNlZSB7QGxpbmsgcGFpcndpc2V9XG4gKiBAc2VlIHtAbGluayB3aW5kb3dDb3VudH1cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gYnVmZmVyU2l6ZSBUaGUgbWF4aW11bSBzaXplIG9mIHRoZSBidWZmZXIgZW1pdHRlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnRCdWZmZXJFdmVyeV0gSW50ZXJ2YWwgYXQgd2hpY2ggdG8gc3RhcnQgYSBuZXcgYnVmZmVyLlxuICogRm9yIGV4YW1wbGUgaWYgYHN0YXJ0QnVmZmVyRXZlcnlgIGlzIGAyYCwgdGhlbiBhIG5ldyBidWZmZXIgd2lsbCBiZSBzdGFydGVkXG4gKiBvbiBldmVyeSBvdGhlciB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UuIEEgbmV3IGJ1ZmZlciBpcyBzdGFydGVkIGF0IHRoZVxuICogYmVnaW5uaW5nIG9mIHRoZSBzb3VyY2UgYnkgZGVmYXVsdC5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VFtdPn0gQW4gT2JzZXJ2YWJsZSBvZiBhcnJheXMgb2YgYnVmZmVyZWQgdmFsdWVzLlxuICogQG1ldGhvZCBidWZmZXJDb3VudFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1ZmZlckNvdW50PFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIGJ1ZmZlclNpemU6IG51bWJlciwgc3RhcnRCdWZmZXJFdmVyeTogbnVtYmVyID0gbnVsbCk6IE9ic2VydmFibGU8VFtdPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IEJ1ZmZlckNvdW50T3BlcmF0b3I8VD4oYnVmZmVyU2l6ZSwgc3RhcnRCdWZmZXJFdmVyeSkpO1xufVxuXG5jbGFzcyBCdWZmZXJDb3VudE9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVFtdPiB7XG4gIHByaXZhdGUgc3Vic2NyaWJlckNsYXNzOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBidWZmZXJTaXplOiBudW1iZXIsIHByaXZhdGUgc3RhcnRCdWZmZXJFdmVyeTogbnVtYmVyKSB7XG4gICAgaWYgKCFzdGFydEJ1ZmZlckV2ZXJ5IHx8IGJ1ZmZlclNpemUgPT09IHN0YXJ0QnVmZmVyRXZlcnkpIHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlckNsYXNzID0gQnVmZmVyQ291bnRTdWJzY3JpYmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN1YnNjcmliZXJDbGFzcyA9IEJ1ZmZlclNraXBDb3VudFN1YnNjcmliZXI7XG4gICAgfVxuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFRbXT4sIHNvdXJjZTogYW55KTogVGVhcmRvd25Mb2dpYyB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IHRoaXMuc3Vic2NyaWJlckNsYXNzKHN1YnNjcmliZXIsIHRoaXMuYnVmZmVyU2l6ZSwgdGhpcy5zdGFydEJ1ZmZlckV2ZXJ5KSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIEJ1ZmZlckNvdW50U3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcml2YXRlIGJ1ZmZlcjogVFtdID0gW107XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VFtdPiwgcHJpdmF0ZSBidWZmZXJTaXplOiBudW1iZXIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcblxuICAgIGJ1ZmZlci5wdXNoKHZhbHVlKTtcblxuICAgIGlmIChidWZmZXIubGVuZ3RoID09IHRoaXMuYnVmZmVyU2l6ZSkge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KGJ1ZmZlcik7XG4gICAgICB0aGlzLmJ1ZmZlciA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKTogdm9pZCB7XG4gICAgY29uc3QgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgaWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoYnVmZmVyKTtcbiAgICB9XG4gICAgc3VwZXIuX2NvbXBsZXRlKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIEJ1ZmZlclNraXBDb3VudFN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSBidWZmZXJzOiBBcnJheTxUW10+ID0gW107XG4gIHByaXZhdGUgY291bnQ6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VFtdPiwgcHJpdmF0ZSBidWZmZXJTaXplOiBudW1iZXIsIHByaXZhdGUgc3RhcnRCdWZmZXJFdmVyeTogbnVtYmVyKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgY29uc3QgeyBidWZmZXJTaXplLCBzdGFydEJ1ZmZlckV2ZXJ5LCBidWZmZXJzLCBjb3VudCB9ID0gdGhpcztcblxuICAgIHRoaXMuY291bnQrKztcbiAgICBpZiAoY291bnQgJSBzdGFydEJ1ZmZlckV2ZXJ5ID09PSAwKSB7XG4gICAgICBidWZmZXJzLnB1c2goW10pO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSBidWZmZXJzLmxlbmd0aDsgaS0tOyApIHtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IGJ1ZmZlcnNbaV07XG4gICAgICBidWZmZXIucHVzaCh2YWx1ZSk7XG4gICAgICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gYnVmZmVyU2l6ZSkge1xuICAgICAgICBidWZmZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KGJ1ZmZlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCB7IGJ1ZmZlcnMsIGRlc3RpbmF0aW9uIH0gPSB0aGlzO1xuXG4gICAgd2hpbGUgKGJ1ZmZlcnMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IGJ1ZmZlciA9IGJ1ZmZlcnMuc2hpZnQoKTtcbiAgICAgIGlmIChidWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICBkZXN0aW5hdGlvbi5uZXh0KGJ1ZmZlcik7XG4gICAgICB9XG4gICAgfVxuICAgIHN1cGVyLl9jb21wbGV0ZSgpO1xuICB9XG5cbn1cbiJdfQ==