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
var EmptyError = (function (_super) {
    __extends(EmptyError, _super);
    function EmptyError() {
        var _this = this;
        var err = _this = _super.call(this, 'no elements in sequence') || this;
        _this.name = err.name = 'EmptyError';
        _this.stack = err.stack;
        _this.message = err.message;
        return _this;
    }
    return EmptyError;
}(Error));
exports.EmptyError = EmptyError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1wdHlFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkVtcHR5RXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBVUE7SUFBZ0MsOEJBQUs7SUFDbkM7UUFBQSxpQkFLQztRQUpDLElBQU0sR0FBRyxXQUFRLGtCQUFNLHlCQUF5QixDQUFDLFFBQUEsQ0FBQztRQUMzQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUN4QixLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7O0lBQ3JDLENBQUM7SUFDSCxpQkFBQztBQUFELENBQUMsQUFQRCxDQUFnQyxLQUFLLEdBT3BDO0FBUFksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEFuIGVycm9yIHRocm93biB3aGVuIGFuIE9ic2VydmFibGUgb3IgYSBzZXF1ZW5jZSB3YXMgcXVlcmllZCBidXQgaGFzIG5vXG4gKiBlbGVtZW50cy5cbiAqXG4gKiBAc2VlIHtAbGluayBmaXJzdH1cbiAqIEBzZWUge0BsaW5rIGxhc3R9XG4gKiBAc2VlIHtAbGluayBzaW5nbGV9XG4gKlxuICogQGNsYXNzIEVtcHR5RXJyb3JcbiAqL1xuZXhwb3J0IGNsYXNzIEVtcHR5RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGVycjogYW55ID0gc3VwZXIoJ25vIGVsZW1lbnRzIGluIHNlcXVlbmNlJyk7XG4gICAgKDxhbnk+IHRoaXMpLm5hbWUgPSBlcnIubmFtZSA9ICdFbXB0eUVycm9yJztcbiAgICAoPGFueT4gdGhpcykuc3RhY2sgPSBlcnIuc3RhY2s7XG4gICAgKDxhbnk+IHRoaXMpLm1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcbiAgfVxufVxuIl19