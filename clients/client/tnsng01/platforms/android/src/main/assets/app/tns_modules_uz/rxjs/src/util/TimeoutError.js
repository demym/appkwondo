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
var TimeoutError = (function (_super) {
    __extends(TimeoutError, _super);
    function TimeoutError() {
        var _this = this;
        var err = _this = _super.call(this, 'Timeout has occurred') || this;
        _this.name = err.name = 'TimeoutError';
        _this.stack = err.stack;
        _this.message = err.message;
        return _this;
    }
    return TimeoutError;
}(Error));
exports.TimeoutError = TimeoutError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZW91dEVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGltZW91dEVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQU9BO0lBQWtDLGdDQUFLO0lBQ3JDO1FBQUEsaUJBS0M7UUFKQyxJQUFNLEdBQUcsV0FBUSxrQkFBTSxzQkFBc0IsQ0FBQyxRQUFBLENBQUM7UUFDeEMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQztRQUN2QyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDeEIsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDOztJQUNyQyxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBUEQsQ0FBa0MsS0FBSyxHQU90QztBQVBZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEFuIGVycm9yIHRocm93biB3aGVuIGR1ZXRpbWUgZWxhcHNlcy5cclxuICpcclxuICogQHNlZSB7QGxpbmsgdGltZW91dH1cclxuICpcclxuICogQGNsYXNzIFRpbWVvdXRFcnJvclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRpbWVvdXRFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGNvbnN0IGVycjogYW55ID0gc3VwZXIoJ1RpbWVvdXQgaGFzIG9jY3VycmVkJyk7XHJcbiAgICAoPGFueT4gdGhpcykubmFtZSA9IGVyci5uYW1lID0gJ1RpbWVvdXRFcnJvcic7XHJcbiAgICAoPGFueT4gdGhpcykuc3RhY2sgPSBlcnIuc3RhY2s7XHJcbiAgICAoPGFueT4gdGhpcykubWVzc2FnZSA9IGVyci5tZXNzYWdlO1xyXG4gIH1cclxufVxyXG4iXX0=