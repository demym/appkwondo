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
var Subject_1 = require("../Subject");
var Subscription_1 = require("../Subscription");
var SubscriptionLoggable_1 = require("./SubscriptionLoggable");
var applyMixins_1 = require("../util/applyMixins");
var HotObservable = (function (_super) {
    __extends(HotObservable, _super);
    function HotObservable(messages, scheduler) {
        var _this = _super.call(this) || this;
        _this.messages = messages;
        _this.subscriptions = [];
        _this.scheduler = scheduler;
        return _this;
    }
    HotObservable.prototype._subscribe = function (subscriber) {
        var subject = this;
        var index = subject.logSubscribedFrame();
        subscriber.add(new Subscription_1.Subscription(function () {
            subject.logUnsubscribedFrame(index);
        }));
        return _super.prototype._subscribe.call(this, subscriber);
    };
    HotObservable.prototype.setup = function () {
        var subject = this;
        var messagesLength = subject.messages.length;
        for (var i = 0; i < messagesLength; i++) {
            (function () {
                var message = subject.messages[i];
                subject.scheduler.schedule(function () { message.notification.observe(subject); }, message.frame);
            })();
        }
    };
    return HotObservable;
}(Subject_1.Subject));
exports.HotObservable = HotObservable;
applyMixins_1.applyMixins(HotObservable, [SubscriptionLoggable_1.SubscriptionLoggable]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSG90T2JzZXJ2YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkhvdE9ic2VydmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXFDO0FBRXJDLGdEQUErQztBQUkvQywrREFBOEQ7QUFDOUQsbURBQWtEO0FBT2xEO0lBQXNDLGlDQUFVO0lBTTlDLHVCQUFtQixRQUF1QixFQUM5QixTQUFvQjtRQURoQyxZQUVFLGlCQUFPLFNBRVI7UUFKa0IsY0FBUSxHQUFSLFFBQVEsQ0FBZTtRQUxuQyxtQkFBYSxHQUFzQixFQUFFLENBQUM7UUFRM0MsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7O0lBQzdCLENBQUM7SUFFUyxrQ0FBVSxHQUFwQixVQUFxQixVQUEyQjtRQUM5QyxJQUFNLE9BQU8sR0FBcUIsSUFBSSxDQUFDO1FBQ3ZDLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzNDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSwyQkFBWSxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ0osTUFBTSxDQUFDLGlCQUFNLFVBQVUsWUFBQyxVQUFVLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsNkJBQUssR0FBTDtRQUNFLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUUvQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3hDLENBQUM7Z0JBQ0MsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFbEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ3hCLGNBQVEsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2hELE9BQU8sQ0FBQyxLQUFLLENBQ2QsQ0FBQztZQUNKLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDUCxDQUFDO0lBQ0gsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQXBDRCxDQUFzQyxpQkFBTyxHQW9DNUM7QUFwQ1ksc0NBQWE7QUFxQzFCLHlCQUFXLENBQUMsYUFBYSxFQUFFLENBQUMsMkNBQW9CLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4uL1N1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IFNjaGVkdWxlciB9IGZyb20gJy4uL1NjaGVkdWxlcic7XG5pbXBvcnQgeyBUZXN0TWVzc2FnZSB9IGZyb20gJy4vVGVzdE1lc3NhZ2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uTG9nIH0gZnJvbSAnLi9TdWJzY3JpcHRpb25Mb2cnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uTG9nZ2FibGUgfSBmcm9tICcuL1N1YnNjcmlwdGlvbkxvZ2dhYmxlJztcbmltcG9ydCB7IGFwcGx5TWl4aW5zIH0gZnJvbSAnLi4vdXRpbC9hcHBseU1peGlucyc7XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5leHBvcnQgY2xhc3MgSG90T2JzZXJ2YWJsZTxUPiBleHRlbmRzIFN1YmplY3Q8VD4gaW1wbGVtZW50cyBTdWJzY3JpcHRpb25Mb2dnYWJsZSB7XG4gIHB1YmxpYyBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25Mb2dbXSA9IFtdO1xuICBzY2hlZHVsZXI6IFNjaGVkdWxlcjtcbiAgbG9nU3Vic2NyaWJlZEZyYW1lOiAoKSA9PiBudW1iZXI7XG4gIGxvZ1Vuc3Vic2NyaWJlZEZyYW1lOiAoaW5kZXg6IG51bWJlcikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbWVzc2FnZXM6IFRlc3RNZXNzYWdlW10sXG4gICAgICAgICAgICAgIHNjaGVkdWxlcjogU2NoZWR1bGVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8YW55Pik6IFN1YnNjcmlwdGlvbiB7XG4gICAgY29uc3Qgc3ViamVjdDogSG90T2JzZXJ2YWJsZTxUPiA9IHRoaXM7XG4gICAgY29uc3QgaW5kZXggPSBzdWJqZWN0LmxvZ1N1YnNjcmliZWRGcmFtZSgpO1xuICAgIHN1YnNjcmliZXIuYWRkKG5ldyBTdWJzY3JpcHRpb24oKCkgPT4ge1xuICAgICAgc3ViamVjdC5sb2dVbnN1YnNjcmliZWRGcmFtZShpbmRleCk7XG4gICAgfSkpO1xuICAgIHJldHVybiBzdXBlci5fc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICB9XG5cbiAgc2V0dXAoKSB7XG4gICAgY29uc3Qgc3ViamVjdCA9IHRoaXM7XG4gICAgY29uc3QgbWVzc2FnZXNMZW5ndGggPSBzdWJqZWN0Lm1lc3NhZ2VzLmxlbmd0aDtcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby12YXIta2V5d29yZCAqL1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWVzc2FnZXNMZW5ndGg7IGkrKykge1xuICAgICAgKCgpID0+IHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBzdWJqZWN0Lm1lc3NhZ2VzW2ldO1xuICAgLyogdHNsaW50OmVuYWJsZSAqL1xuICAgICAgICBzdWJqZWN0LnNjaGVkdWxlci5zY2hlZHVsZShcbiAgICAgICAgICAoKSA9PiB7IG1lc3NhZ2Uubm90aWZpY2F0aW9uLm9ic2VydmUoc3ViamVjdCk7IH0sXG4gICAgICAgICAgbWVzc2FnZS5mcmFtZVxuICAgICAgICApO1xuICAgICAgfSkoKTtcbiAgICB9XG4gIH1cbn1cbmFwcGx5TWl4aW5zKEhvdE9ic2VydmFibGUsIFtTdWJzY3JpcHRpb25Mb2dnYWJsZV0pO1xuIl19