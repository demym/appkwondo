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
function count(predicate) {
    return this.lift(new CountOperator(predicate, this));
}
exports.count = count;
var CountOperator = (function () {
    function CountOperator(predicate, source) {
        this.predicate = predicate;
        this.source = source;
    }
    CountOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new CountSubscriber(subscriber, this.predicate, this.source));
    };
    return CountOperator;
}());
var CountSubscriber = (function (_super) {
    __extends(CountSubscriber, _super);
    function CountSubscriber(destination, predicate, source) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.source = source;
        _this.count = 0;
        _this.index = 0;
        return _this;
    }
    CountSubscriber.prototype._next = function (value) {
        if (this.predicate) {
            this._tryPredicate(value);
        }
        else {
            this.count++;
        }
    };
    CountSubscriber.prototype._tryPredicate = function (value) {
        var result;
        try {
            result = this.predicate(value, this.index++, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.count++;
        }
    };
    CountSubscriber.prototype._complete = function () {
        this.destination.next(this.count);
        this.destination.complete();
    };
    return CountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFHQSw0Q0FBMkM7QUFrRDNDLGVBQThDLFNBQXVFO0lBQ25ILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFGRCxzQkFFQztBQUVEO0lBQ0UsdUJBQW9CLFNBQXVFLEVBQ3ZFLE1BQXNCO1FBRHRCLGNBQVMsR0FBVCxTQUFTLENBQThEO1FBQ3ZFLFdBQU0sR0FBTixNQUFNLENBQWdCO0lBQzFDLENBQUM7SUFFRCw0QkFBSSxHQUFKLFVBQUssVUFBOEIsRUFBRSxNQUFXO1FBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksZUFBZSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBT0Q7SUFBaUMsbUNBQWE7SUFJNUMseUJBQVksV0FBNkIsRUFDckIsU0FBdUUsRUFDdkUsTUFBc0I7UUFGMUMsWUFHRSxrQkFBTSxXQUFXLENBQUMsU0FDbkI7UUFIbUIsZUFBUyxHQUFULFNBQVMsQ0FBOEQ7UUFDdkUsWUFBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFMbEMsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixXQUFLLEdBQVcsQ0FBQyxDQUFDOztJQU0xQixDQUFDO0lBRVMsK0JBQUssR0FBZixVQUFnQixLQUFRO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7SUFFTyx1Q0FBYSxHQUFyQixVQUFzQixLQUFRO1FBQzVCLElBQUksTUFBVyxDQUFDO1FBRWhCLElBQUksQ0FBQztZQUNILE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztJQUVTLG1DQUFTLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQXJDRCxDQUFpQyx1QkFBVSxHQXFDMUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAnLi4vT2JzZXJ2ZXInO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuXG4vKipcbiAqIENvdW50cyB0aGUgbnVtYmVyIG9mIGVtaXNzaW9ucyBvbiB0aGUgc291cmNlIGFuZCBlbWl0cyB0aGF0IG51bWJlciB3aGVuIHRoZVxuICogc291cmNlIGNvbXBsZXRlcy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+VGVsbHMgaG93IG1hbnkgdmFsdWVzIHdlcmUgZW1pdHRlZCwgd2hlbiB0aGUgc291cmNlXG4gKiBjb21wbGV0ZXMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvY291bnQucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYGNvdW50YCB0cmFuc2Zvcm1zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB2YWx1ZXMgaW50byBhbiBPYnNlcnZhYmxlIHRoYXRcbiAqIGVtaXRzIGEgc2luZ2xlIHZhbHVlIHRoYXQgcmVwcmVzZW50cyB0aGUgbnVtYmVyIG9mIHZhbHVlcyBlbWl0dGVkIGJ5IHRoZVxuICogc291cmNlIE9ic2VydmFibGUuIElmIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB0ZXJtaW5hdGVzIHdpdGggYW4gZXJyb3IsIGBjb3VudGBcbiAqIHdpbGwgcGFzcyB0aGlzIGVycm9yIG5vdGlmaWNhdGlvbiBhbG9uZyB3aXRob3V0IGVtaXR0aW5nIGEgdmFsdWUgZmlyc3QuIElmXG4gKiB0aGUgc291cmNlIE9ic2VydmFibGUgZG9lcyBub3QgdGVybWluYXRlIGF0IGFsbCwgYGNvdW50YCB3aWxsIG5laXRoZXIgZW1pdFxuICogYSB2YWx1ZSBub3IgdGVybWluYXRlLiBUaGlzIG9wZXJhdG9yIHRha2VzIGFuIG9wdGlvbmFsIGBwcmVkaWNhdGVgIGZ1bmN0aW9uXG4gKiBhcyBhcmd1bWVudCwgaW4gd2hpY2ggY2FzZSB0aGUgb3V0cHV0IGVtaXNzaW9uIHdpbGwgcmVwcmVzZW50IHRoZSBudW1iZXIgb2ZcbiAqIHNvdXJjZSB2YWx1ZXMgdGhhdCBtYXRjaGVkIGB0cnVlYCB3aXRoIHRoZSBgcHJlZGljYXRlYC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db3VudHMgaG93IG1hbnkgc2Vjb25kcyBoYXZlIHBhc3NlZCBiZWZvcmUgdGhlIGZpcnN0IGNsaWNrIGhhcHBlbmVkPC9jYXB0aW9uPlxuICogdmFyIHNlY29uZHMgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBzZWNvbmRzQmVmb3JlQ2xpY2sgPSBzZWNvbmRzLnRha2VVbnRpbChjbGlja3MpO1xuICogdmFyIHJlc3VsdCA9IHNlY29uZHNCZWZvcmVDbGljay5jb3VudCgpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db3VudHMgaG93IG1hbnkgb2RkIG51bWJlcnMgYXJlIHRoZXJlIGJldHdlZW4gMSBhbmQgNzwvY2FwdGlvbj5cbiAqIHZhciBudW1iZXJzID0gUnguT2JzZXJ2YWJsZS5yYW5nZSgxLCA3KTtcbiAqIHZhciByZXN1bHQgPSBudW1iZXJzLmNvdW50KGkgPT4gaSAlIDIgPT09IDEpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiAvLyBSZXN1bHRzIGluOlxuICogLy8gNFxuICpcbiAqIEBzZWUge0BsaW5rIG1heH1cbiAqIEBzZWUge0BsaW5rIG1pbn1cbiAqIEBzZWUge0BsaW5rIHJlZHVjZX1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBULCBpOiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPik6IGJvb2xlYW59IFtwcmVkaWNhdGVdIEFcbiAqIGJvb2xlYW4gZnVuY3Rpb24gdG8gc2VsZWN0IHdoYXQgdmFsdWVzIGFyZSB0byBiZSBjb3VudGVkLiBJdCBpcyBwcm92aWRlZCB3aXRoXG4gKiBhcmd1bWVudHMgb2Y6XG4gKiAtIGB2YWx1ZWA6IHRoZSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIC0gYGluZGV4YDogdGhlICh6ZXJvLWJhc2VkKSBcImluZGV4XCIgb2YgdGhlIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogLSBgc291cmNlYDogdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGluc3RhbmNlIGl0c2VsZi5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgb2Ygb25lIG51bWJlciB0aGF0IHJlcHJlc2VudHMgdGhlIGNvdW50IGFzXG4gKiBkZXNjcmliZWQgYWJvdmUuXG4gKiBAbWV0aG9kIGNvdW50XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY291bnQ8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgcHJlZGljYXRlPzogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyLCBzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IGJvb2xlYW4pOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBDb3VudE9wZXJhdG9yKHByZWRpY2F0ZSwgdGhpcykpO1xufVxuXG5jbGFzcyBDb3VudE9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgbnVtYmVyPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJlZGljYXRlPzogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyLCBzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IGJvb2xlYW4sXG4gICAgICAgICAgICAgIHByaXZhdGUgc291cmNlPzogT2JzZXJ2YWJsZTxUPikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPG51bWJlcj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgQ291bnRTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMucHJlZGljYXRlLCB0aGlzLnNvdXJjZSkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBDb3VudFN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSBjb3VudDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBpbmRleDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogT2JzZXJ2ZXI8bnVtYmVyPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwcmVkaWNhdGU/OiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gYm9vbGVhbixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzb3VyY2U/OiBPYnNlcnZhYmxlPFQ+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucHJlZGljYXRlKSB7XG4gICAgICB0aGlzLl90cnlQcmVkaWNhdGUodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvdW50Kys7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdHJ5UHJlZGljYXRlKHZhbHVlOiBUKSB7XG4gICAgbGV0IHJlc3VsdDogYW55O1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IHRoaXMucHJlZGljYXRlKHZhbHVlLCB0aGlzLmluZGV4KyssIHRoaXMuc291cmNlKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICB0aGlzLmNvdW50Kys7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodGhpcy5jb3VudCk7XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=