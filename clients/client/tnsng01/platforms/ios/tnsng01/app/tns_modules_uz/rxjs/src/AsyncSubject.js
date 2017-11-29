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
var Subject_1 = require("./Subject");
var Subscription_1 = require("./Subscription");
var AsyncSubject = (function (_super) {
    __extends(AsyncSubject, _super);
    function AsyncSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = null;
        _this.hasNext = false;
        _this.hasCompleted = false;
        return _this;
    }
    AsyncSubject.prototype._subscribe = function (subscriber) {
        if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
        }
        else if (this.hasCompleted && this.hasNext) {
            subscriber.next(this.value);
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
        }
        return _super.prototype._subscribe.call(this, subscriber);
    };
    AsyncSubject.prototype.next = function (value) {
        if (!this.hasCompleted) {
            this.value = value;
            this.hasNext = true;
        }
    };
    AsyncSubject.prototype.error = function (error) {
        if (!this.hasCompleted) {
            _super.prototype.error.call(this, error);
        }
    };
    AsyncSubject.prototype.complete = function () {
        this.hasCompleted = true;
        if (this.hasNext) {
            _super.prototype.next.call(this, this.value);
        }
        _super.prototype.complete.call(this);
    };
    return AsyncSubject;
}(Subject_1.Subject));
exports.AsyncSubject = AsyncSubject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXN5bmNTdWJqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXN5bmNTdWJqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFvQztBQUVwQywrQ0FBOEM7QUFLOUM7SUFBcUMsZ0NBQVU7SUFBL0M7UUFBQSxxRUFxQ0M7UUFwQ1MsV0FBSyxHQUFNLElBQUksQ0FBQztRQUNoQixhQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGtCQUFZLEdBQVksS0FBSyxDQUFDOztJQWtDeEMsQ0FBQztJQWhDVyxpQ0FBVSxHQUFwQixVQUFxQixVQUEyQjtRQUM5QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsMkJBQVksQ0FBQyxLQUFLLENBQUM7UUFDNUIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzdDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QixNQUFNLENBQUMsMkJBQVksQ0FBQyxLQUFLLENBQUM7UUFDNUIsQ0FBQztRQUNELE1BQU0sQ0FBQyxpQkFBTSxVQUFVLFlBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELDJCQUFJLEdBQUosVUFBSyxLQUFRO1FBQ1gsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDO0lBQ0gsQ0FBQztJQUVELDRCQUFLLEdBQUwsVUFBTSxLQUFVO1FBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN2QixpQkFBTSxLQUFLLFlBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsQ0FBQztJQUNILENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsaUJBQU0sSUFBSSxZQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBQ0QsaUJBQU0sUUFBUSxXQUFFLENBQUM7SUFDbkIsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQXJDRCxDQUFxQyxpQkFBTyxHQXFDM0M7QUFyQ1ksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAnLi9TdWJqZWN0JztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi9TdWJzY3JpcHRpb24nO1xuXG4vKipcbiAqIEBjbGFzcyBBc3luY1N1YmplY3Q8VD5cbiAqL1xuZXhwb3J0IGNsYXNzIEFzeW5jU3ViamVjdDxUPiBleHRlbmRzIFN1YmplY3Q8VD4ge1xuICBwcml2YXRlIHZhbHVlOiBUID0gbnVsbDtcbiAgcHJpdmF0ZSBoYXNOZXh0OiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaGFzQ29tcGxldGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxhbnk+KTogU3Vic2NyaXB0aW9uIHtcbiAgICBpZiAodGhpcy5oYXNFcnJvcikge1xuICAgICAgc3Vic2NyaWJlci5lcnJvcih0aGlzLnRocm93bkVycm9yKTtcbiAgICAgIHJldHVybiBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhhc0NvbXBsZXRlZCAmJiB0aGlzLmhhc05leHQpIHtcbiAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLnZhbHVlKTtcbiAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgIHJldHVybiBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgfVxuICAgIHJldHVybiBzdXBlci5fc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICB9XG5cbiAgbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5oYXNDb21wbGV0ZWQpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuaGFzTmV4dCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZXJyb3IoZXJyb3I6IGFueSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5oYXNDb21wbGV0ZWQpIHtcbiAgICAgIHN1cGVyLmVycm9yKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBjb21wbGV0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmhhc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgaWYgKHRoaXMuaGFzTmV4dCkge1xuICAgICAgc3VwZXIubmV4dCh0aGlzLnZhbHVlKTtcbiAgICB9XG4gICAgc3VwZXIuY29tcGxldGUoKTtcbiAgfVxufVxuIl19