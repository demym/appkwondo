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
var isFunction_1 = require("../util/isFunction");
var Observable_1 = require("../Observable");
var Subscription_1 = require("../Subscription");
var FromEventPatternObservable = (function (_super) {
    __extends(FromEventPatternObservable, _super);
    function FromEventPatternObservable(addHandler, removeHandler, selector) {
        var _this = _super.call(this) || this;
        _this.addHandler = addHandler;
        _this.removeHandler = removeHandler;
        _this.selector = selector;
        return _this;
    }
    FromEventPatternObservable.create = function (addHandler, removeHandler, selector) {
        return new FromEventPatternObservable(addHandler, removeHandler, selector);
    };
    FromEventPatternObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        var removeHandler = this.removeHandler;
        var handler = !!this.selector ? function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this._callSelector(subscriber, args);
        } : function (e) { subscriber.next(e); };
        var retValue = this._callAddHandler(handler, subscriber);
        if (!isFunction_1.isFunction(removeHandler)) {
            return;
        }
        subscriber.add(new Subscription_1.Subscription(function () {
            removeHandler(handler, retValue);
        }));
    };
    FromEventPatternObservable.prototype._callSelector = function (subscriber, args) {
        try {
            var result = this.selector.apply(this, args);
            subscriber.next(result);
        }
        catch (e) {
            subscriber.error(e);
        }
    };
    FromEventPatternObservable.prototype._callAddHandler = function (handler, errorSubscriber) {
        try {
            return this.addHandler(handler) || null;
        }
        catch (e) {
            errorSubscriber.error(e);
        }
    };
    return FromEventPatternObservable;
}(Observable_1.Observable));
exports.FromEventPatternObservable = FromEventPatternObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnJvbUV2ZW50UGF0dGVybk9ic2VydmFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGcm9tRXZlbnRQYXR0ZXJuT2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQsNENBQTJDO0FBQzNDLGdEQUErQztBQVEvQztJQUFtRCw4Q0FBYTtJQXdEOUQsb0NBQW9CLFVBQXNDLEVBQ3RDLGFBQXlELEVBQ3pELFFBQXFDO1FBRnpELFlBR0UsaUJBQU8sU0FDUjtRQUptQixnQkFBVSxHQUFWLFVBQVUsQ0FBNEI7UUFDdEMsbUJBQWEsR0FBYixhQUFhLENBQTRDO1FBQ3pELGNBQVEsR0FBUixRQUFRLENBQTZCOztJQUV6RCxDQUFDO0lBVk0saUNBQU0sR0FBYixVQUFpQixVQUFzQyxFQUN0QyxhQUF5RCxFQUN6RCxRQUFxQztRQUNwRCxNQUFNLENBQUMsSUFBSSwwQkFBMEIsQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFRUywrQ0FBVSxHQUFwQixVQUFxQixVQUF5QjtRQUE5QyxpQkFpQkM7UUFoQkMsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUV6QyxJQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUFDLGNBQW1CO2lCQUFuQixVQUFtQixFQUFuQixxQkFBbUIsRUFBbkIsSUFBbUI7Z0JBQW5CLHlCQUFtQjs7WUFDcEQsS0FBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxHQUFHLFVBQVMsQ0FBTSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0MsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFM0QsRUFBRSxDQUFDLENBQUMsQ0FBQyx1QkFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLDJCQUFZLENBQUM7WUFFOUIsYUFBYSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBRTtRQUNwQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVPLGtEQUFhLEdBQXJCLFVBQXNCLFVBQXlCLEVBQUUsSUFBZ0I7UUFDL0QsSUFBSSxDQUFDO1lBQ0gsSUFBTSxNQUFNLEdBQU0sSUFBSSxDQUFDLFFBQVEsT0FBYixJQUFJLEVBQWEsSUFBSSxDQUFDLENBQUM7WUFDekMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsQ0FBQztJQUNILENBQUM7SUFFTyxvREFBZSxHQUF2QixVQUF3QixPQUF5QixFQUFFLGVBQThCO1FBQy9FLElBQUksQ0FBQztZQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQztRQUMxQyxDQUFDO1FBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsQ0FBQztJQUNILENBQUM7SUFDSCxpQ0FBQztBQUFELENBQUMsQUFuR0QsQ0FBbUQsdUJBQVUsR0FtRzVEO0FBbkdZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKiBAaGlkZSB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBGcm9tRXZlbnRQYXR0ZXJuT2JzZXJ2YWJsZTxUPiBleHRlbmRzIE9ic2VydmFibGU8VD4ge1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIE9ic2VydmFibGUgZnJvbSBhbiBBUEkgYmFzZWQgb24gYWRkSGFuZGxlci9yZW1vdmVIYW5kbGVyXG4gICAqIGZ1bmN0aW9ucy5cbiAgICpcbiAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkNvbnZlcnRzIGFueSBhZGRIYW5kbGVyL3JlbW92ZUhhbmRsZXIgQVBJIHRvIGFuXG4gICAqIE9ic2VydmFibGUuPC9zcGFuPlxuICAgKlxuICAgKiA8aW1nIHNyYz1cIi4vaW1nL2Zyb21FdmVudFBhdHRlcm4ucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAqXG4gICAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSBieSB1c2luZyB0aGUgYGFkZEhhbmRsZXJgIGFuZCBgcmVtb3ZlSGFuZGxlcmBcbiAgICogZnVuY3Rpb25zIHRvIGFkZCBhbmQgcmVtb3ZlIHRoZSBoYW5kbGVycywgd2l0aCBhbiBvcHRpb25hbCBzZWxlY3RvclxuICAgKiBmdW5jdGlvbiB0byBwcm9qZWN0IHRoZSBldmVudCBhcmd1bWVudHMgdG8gYSByZXN1bHQuIFRoZSBgYWRkSGFuZGxlcmAgaXNcbiAgICogY2FsbGVkIHdoZW4gdGhlIG91dHB1dCBPYnNlcnZhYmxlIGlzIHN1YnNjcmliZWQsIGFuZCBgcmVtb3ZlSGFuZGxlcmAgaXNcbiAgICogY2FsbGVkIHdoZW4gdGhlIFN1YnNjcmlwdGlvbiBpcyB1bnN1YnNjcmliZWQuXG4gICAqXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPkVtaXRzIGNsaWNrcyBoYXBwZW5pbmcgb24gdGhlIERPTSBkb2N1bWVudDwvY2FwdGlvbj5cbiAgICogZnVuY3Rpb24gYWRkQ2xpY2tIYW5kbGVyKGhhbmRsZXIpIHtcbiAgICogICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIpO1xuICAgKiB9XG4gICAqXG4gICAqIGZ1bmN0aW9uIHJlbW92ZUNsaWNrSGFuZGxlcihoYW5kbGVyKSB7XG4gICAqICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyKTtcbiAgICogfVxuICAgKlxuICAgKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnRQYXR0ZXJuKFxuICAgKiAgIGFkZENsaWNrSGFuZGxlcixcbiAgICogICByZW1vdmVDbGlja0hhbmRsZXJcbiAgICogKTtcbiAgICogY2xpY2tzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAgICpcbiAgICogQHNlZSB7QGxpbmsgZnJvbX1cbiAgICogQHNlZSB7QGxpbmsgZnJvbUV2ZW50fVxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKGhhbmRsZXI6IEZ1bmN0aW9uKTogYW55fSBhZGRIYW5kbGVyIEEgZnVuY3Rpb24gdGhhdCB0YWtlc1xuICAgKiBhIGBoYW5kbGVyYCBmdW5jdGlvbiBhcyBhcmd1bWVudCBhbmQgYXR0YWNoZXMgaXQgc29tZWhvdyB0byB0aGUgYWN0dWFsXG4gICAqIHNvdXJjZSBvZiBldmVudHMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oaGFuZGxlcjogRnVuY3Rpb24sIHNpZ25hbD86IGFueSk6IHZvaWR9IFtyZW1vdmVIYW5kbGVyXSBBbiBvcHRpb25hbCBmdW5jdGlvbiB0aGF0XG4gICAqIHRha2VzIGEgYGhhbmRsZXJgIGZ1bmN0aW9uIGFzIGFyZ3VtZW50IGFuZCByZW1vdmVzIGl0IGluIGNhc2UgaXQgd2FzXG4gICAqIHByZXZpb3VzbHkgYXR0YWNoZWQgdXNpbmcgYGFkZEhhbmRsZXJgLiBpZiBhZGRIYW5kbGVyIHJldHVybnMgc2lnbmFsIHRvIHRlYXJkb3duIHdoZW4gcmVtb3ZlLFxuICAgKiByZW1vdmVIYW5kbGVyIGZ1bmN0aW9uIHdpbGwgZm9yd2FyZCBpdC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbiguLi5hcmdzOiBhbnkpOiBUfSBbc2VsZWN0b3JdIEFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvXG4gICAqIHBvc3QtcHJvY2VzcyByZXN1bHRzLiBJdCB0YWtlcyB0aGUgYXJndW1lbnRzIGZyb20gdGhlIGV2ZW50IGhhbmRsZXIgYW5kXG4gICAqIHNob3VsZCByZXR1cm4gYSBzaW5nbGUgdmFsdWUuXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICAqIEBzdGF0aWMgdHJ1ZVxuICAgKiBAbmFtZSBmcm9tRXZlbnRQYXR0ZXJuXG4gICAqIEBvd25lciBPYnNlcnZhYmxlXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlPFQ+KGFkZEhhbmRsZXI6IChoYW5kbGVyOiBGdW5jdGlvbikgPT4gYW55LFxuICAgICAgICAgICAgICAgICAgIHJlbW92ZUhhbmRsZXI/OiAoaGFuZGxlcjogRnVuY3Rpb24sIHNpZ25hbD86IGFueSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgICAgICBzZWxlY3Rvcj86ICguLi5hcmdzOiBBcnJheTxhbnk+KSA9PiBUKSB7XG4gICAgcmV0dXJuIG5ldyBGcm9tRXZlbnRQYXR0ZXJuT2JzZXJ2YWJsZShhZGRIYW5kbGVyLCByZW1vdmVIYW5kbGVyLCBzZWxlY3Rvcik7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFkZEhhbmRsZXI6IChoYW5kbGVyOiBGdW5jdGlvbikgPT4gYW55LFxuICAgICAgICAgICAgICBwcml2YXRlIHJlbW92ZUhhbmRsZXI/OiAoaGFuZGxlcjogRnVuY3Rpb24sIHNpZ25hbD86IGFueSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzZWxlY3Rvcj86ICguLi5hcmdzOiBBcnJheTxhbnk+KSA9PiBUKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pIHtcbiAgICBjb25zdCByZW1vdmVIYW5kbGVyID0gdGhpcy5yZW1vdmVIYW5kbGVyO1xuXG4gICAgY29uc3QgaGFuZGxlciA9ICEhdGhpcy5zZWxlY3RvciA/ICguLi5hcmdzOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICB0aGlzLl9jYWxsU2VsZWN0b3Ioc3Vic2NyaWJlciwgYXJncyk7XG4gICAgfSA6IGZ1bmN0aW9uKGU6IGFueSkgeyBzdWJzY3JpYmVyLm5leHQoZSk7IH07XG5cbiAgICBjb25zdCByZXRWYWx1ZSA9IHRoaXMuX2NhbGxBZGRIYW5kbGVyKGhhbmRsZXIsIHN1YnNjcmliZXIpO1xuXG4gICAgaWYgKCFpc0Z1bmN0aW9uKHJlbW92ZUhhbmRsZXIpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlci5hZGQobmV3IFN1YnNjcmlwdGlvbigoKSA9PiB7XG4gICAgICAvL1RPRE86IGRldGVybWluZSB3aGV0aGVyIG9yIG5vdCB0byBmb3J3YXJkIHRvIGVycm9yIGhhbmRsZXJcbiAgICAgIHJlbW92ZUhhbmRsZXIoaGFuZGxlciwgcmV0VmFsdWUpIDtcbiAgICB9KSk7XG4gIH1cblxuICBwcml2YXRlIF9jYWxsU2VsZWN0b3Ioc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgYXJnczogQXJyYXk8YW55Pik6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQ6IFQgPSB0aGlzLnNlbGVjdG9yKC4uLmFyZ3MpO1xuICAgICAgc3Vic2NyaWJlci5uZXh0KHJlc3VsdCk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICBzdWJzY3JpYmVyLmVycm9yKGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NhbGxBZGRIYW5kbGVyKGhhbmRsZXI6IChlOiBhbnkpID0+IHZvaWQsIGVycm9yU3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPik6IGFueSB8IG51bGwge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRIYW5kbGVyKGhhbmRsZXIpIHx8IG51bGw7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICBlcnJvclN1YnNjcmliZXIuZXJyb3IoZSk7XG4gICAgfVxuICB9XG59Il19