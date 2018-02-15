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
var ObjectUnsubscribedError = (function (_super) {
    __extends(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var _this = this;
        var err = _this = _super.call(this, 'object unsubscribed') || this;
        _this.name = err.name = 'ObjectUnsubscribedError';
        _this.stack = err.stack;
        _this.message = err.message;
        return _this;
    }
    return ObjectUnsubscribedError;
}(Error));
exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJPYmplY3RVbnN1YnNjcmliZWRFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFTQTtJQUE2QywyQ0FBSztJQUNoRDtRQUFBLGlCQUtDO1FBSkMsSUFBTSxHQUFHLFdBQVEsa0JBQU0scUJBQXFCLENBQUMsUUFBQSxDQUFDO1FBQ3ZDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyx5QkFBeUIsQ0FBQztRQUNsRCxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDeEIsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDOztJQUNyQyxDQUFDO0lBQ0gsOEJBQUM7QUFBRCxDQUFDLEFBUEQsQ0FBNkMsS0FBSyxHQU9qRDtBQVBZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQW4gZXJyb3IgdGhyb3duIHdoZW4gYW4gYWN0aW9uIGlzIGludmFsaWQgYmVjYXVzZSB0aGUgb2JqZWN0IGhhcyBiZWVuXG4gKiB1bnN1YnNjcmliZWQuXG4gKlxuICogQHNlZSB7QGxpbmsgU3ViamVjdH1cbiAqIEBzZWUge0BsaW5rIEJlaGF2aW9yU3ViamVjdH1cbiAqXG4gKiBAY2xhc3MgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JcbiAqL1xuZXhwb3J0IGNsYXNzIE9iamVjdFVuc3Vic2NyaWJlZEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBlcnI6IGFueSA9IHN1cGVyKCdvYmplY3QgdW5zdWJzY3JpYmVkJyk7XG4gICAgKDxhbnk+IHRoaXMpLm5hbWUgPSBlcnIubmFtZSA9ICdPYmplY3RVbnN1YnNjcmliZWRFcnJvcic7XG4gICAgKDxhbnk+IHRoaXMpLnN0YWNrID0gZXJyLnN0YWNrO1xuICAgICg8YW55PiB0aGlzKS5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gIH1cbn1cbiJdfQ==