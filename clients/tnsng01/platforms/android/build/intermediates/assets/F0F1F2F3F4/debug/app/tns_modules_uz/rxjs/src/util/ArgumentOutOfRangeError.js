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
var ArgumentOutOfRangeError = (function (_super) {
    __extends(ArgumentOutOfRangeError, _super);
    function ArgumentOutOfRangeError() {
        var _this = this;
        var err = _this = _super.call(this, 'argument out of range') || this;
        _this.name = err.name = 'ArgumentOutOfRangeError';
        _this.stack = err.stack;
        _this.message = err.message;
        return _this;
    }
    return ArgumentOutOfRangeError;
}(Error));
exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJndW1lbnRPdXRPZlJhbmdlRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBcmd1bWVudE91dE9mUmFuZ2VFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFVQTtJQUE2QywyQ0FBSztJQUNoRDtRQUFBLGlCQUtDO1FBSkMsSUFBTSxHQUFHLFdBQVEsa0JBQU0sdUJBQXVCLENBQUMsUUFBQSxDQUFDO1FBQ3pDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyx5QkFBeUIsQ0FBQztRQUNsRCxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDeEIsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDOztJQUNyQyxDQUFDO0lBQ0gsOEJBQUM7QUFBRCxDQUFDLEFBUEQsQ0FBNkMsS0FBSyxHQU9qRDtBQVBZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQW4gZXJyb3IgdGhyb3duIHdoZW4gYW4gZWxlbWVudCB3YXMgcXVlcmllZCBhdCBhIGNlcnRhaW4gaW5kZXggb2YgYW5cbiAqIE9ic2VydmFibGUsIGJ1dCBubyBzdWNoIGluZGV4IG9yIHBvc2l0aW9uIGV4aXN0cyBpbiB0aGF0IHNlcXVlbmNlLlxuICpcbiAqIEBzZWUge0BsaW5rIGVsZW1lbnRBdH1cbiAqIEBzZWUge0BsaW5rIHRha2V9XG4gKiBAc2VlIHtAbGluayB0YWtlTGFzdH1cbiAqXG4gKiBAY2xhc3MgQXJndW1lbnRPdXRPZlJhbmdlRXJyb3JcbiAqL1xuZXhwb3J0IGNsYXNzIEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBlcnI6IGFueSA9IHN1cGVyKCdhcmd1bWVudCBvdXQgb2YgcmFuZ2UnKTtcbiAgICAoPGFueT4gdGhpcykubmFtZSA9IGVyci5uYW1lID0gJ0FyZ3VtZW50T3V0T2ZSYW5nZUVycm9yJztcbiAgICAoPGFueT4gdGhpcykuc3RhY2sgPSBlcnIuc3RhY2s7XG4gICAgKDxhbnk+IHRoaXMpLm1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcbiAgfVxufVxuIl19