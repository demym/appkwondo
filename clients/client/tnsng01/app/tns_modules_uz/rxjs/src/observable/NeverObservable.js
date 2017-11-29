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
var Observable_1 = require("../Observable");
var noop_1 = require("../util/noop");
var NeverObservable = (function (_super) {
    __extends(NeverObservable, _super);
    function NeverObservable() {
        return _super.call(this) || this;
    }
    NeverObservable.create = function () {
        return new NeverObservable();
    };
    NeverObservable.prototype._subscribe = function (subscriber) {
        noop_1.noop();
    };
    return NeverObservable;
}(Observable_1.Observable));
exports.NeverObservable = NeverObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmV2ZXJPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTmV2ZXJPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDRDQUEyQztBQUUzQyxxQ0FBb0M7QUFPcEM7SUFBd0MsbUNBQWE7SUFvQ25EO2VBQ0UsaUJBQU87SUFDVCxDQUFDO0lBTk0sc0JBQU0sR0FBYjtRQUNFLE1BQU0sQ0FBQyxJQUFJLGVBQWUsRUFBSyxDQUFDO0lBQ2xDLENBQUM7SUFNUyxvQ0FBVSxHQUFwQixVQUFxQixVQUF5QjtRQUM1QyxXQUFJLEVBQUUsQ0FBQztJQUNULENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUEzQ0QsQ0FBd0MsdUJBQVUsR0EyQ2pEO0FBM0NZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWwvbm9vcCc7XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgTmV2ZXJPYnNlcnZhYmxlPFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBubyBpdGVtcyB0byB0aGUgT2JzZXJ2ZXIuXG4gICAqXG4gICAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5BbiBPYnNlcnZhYmxlIHRoYXQgbmV2ZXIgZW1pdHMgYW55dGhpbmcuPC9zcGFuPlxuICAgKlxuICAgKiA8aW1nIHNyYz1cIi4vaW1nL25ldmVyLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICAgKlxuICAgKiBUaGlzIHN0YXRpYyBvcGVyYXRvciBpcyB1c2VmdWwgZm9yIGNyZWF0aW5nIGEgc2ltcGxlIE9ic2VydmFibGUgdGhhdCBlbWl0c1xuICAgKiBuZWl0aGVyIHZhbHVlcyBub3IgZXJyb3JzIG5vciB0aGUgY29tcGxldGlvbiBub3RpZmljYXRpb24uIEl0IGNhbiBiZSB1c2VkXG4gICAqIGZvciB0ZXN0aW5nIHB1cnBvc2VzIG9yIGZvciBjb21wb3Npbmcgd2l0aCBvdGhlciBPYnNlcnZhYmxlcy4gUGxlYXNlIG5vdGVcbiAgICogdGhhdCBieSBuZXZlciBlbWl0dGluZyBhIGNvbXBsZXRlIG5vdGlmaWNhdGlvbiwgdGhpcyBPYnNlcnZhYmxlIGtlZXBzIHRoZVxuICAgKiBzdWJzY3JpcHRpb24gZnJvbSBiZWluZyBkaXNwb3NlZCBhdXRvbWF0aWNhbGx5LiBTdWJzY3JpcHRpb25zIG5lZWQgdG8gYmVcbiAgICogbWFudWFsbHkgZGlzcG9zZWQuXG4gICAqXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPkVtaXQgdGhlIG51bWJlciA3LCB0aGVuIG5ldmVyIGVtaXQgYW55dGhpbmcgZWxzZSAobm90IGV2ZW4gY29tcGxldGUpLjwvY2FwdGlvbj5cbiAgICogZnVuY3Rpb24gaW5mbygpIHtcbiAgICogICBjb25zb2xlLmxvZygnV2lsbCBub3QgYmUgY2FsbGVkJyk7XG4gICAqIH1cbiAgICogdmFyIHJlc3VsdCA9IFJ4Lk9ic2VydmFibGUubmV2ZXIoKS5zdGFydFdpdGgoNyk7XG4gICAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSwgaW5mbywgaW5mbyk7XG4gICAqXG4gICAqIEBzZWUge0BsaW5rIGNyZWF0ZX1cbiAgICogQHNlZSB7QGxpbmsgZW1wdHl9XG4gICAqIEBzZWUge0BsaW5rIG9mfVxuICAgKiBAc2VlIHtAbGluayB0aHJvd31cbiAgICpcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQSBcIm5ldmVyXCIgT2JzZXJ2YWJsZTogbmV2ZXIgZW1pdHMgYW55dGhpbmcuXG4gICAqIEBzdGF0aWMgdHJ1ZVxuICAgKiBAbmFtZSBuZXZlclxuICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZTxUPigpIHtcbiAgICByZXR1cm4gbmV3IE5ldmVyT2JzZXJ2YWJsZTxUPigpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pOiB2b2lkIHtcbiAgICBub29wKCk7XG4gIH1cbn1cbiJdfQ==