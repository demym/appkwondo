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
function dispatch(state) {
    var obj = state.obj, keys = state.keys, length = state.length, index = state.index, subscriber = state.subscriber;
    if (index === length) {
        subscriber.complete();
        return;
    }
    var key = keys[index];
    subscriber.next([key, obj[key]]);
    state.index = index + 1;
    this.schedule(state);
}
var PairsObservable = (function (_super) {
    __extends(PairsObservable, _super);
    function PairsObservable(obj, scheduler) {
        var _this = _super.call(this) || this;
        _this.obj = obj;
        _this.scheduler = scheduler;
        _this.keys = Object.keys(obj);
        return _this;
    }
    PairsObservable.create = function (obj, scheduler) {
        return new PairsObservable(obj, scheduler);
    };
    PairsObservable.prototype._subscribe = function (subscriber) {
        var _a = this, keys = _a.keys, scheduler = _a.scheduler;
        var length = keys.length;
        if (scheduler) {
            return scheduler.schedule(dispatch, 0, {
                obj: this.obj, keys: keys, length: length, index: 0, subscriber: subscriber
            });
        }
        else {
            for (var idx = 0; idx < length; idx++) {
                var key = keys[idx];
                subscriber.next([key, this.obj[key]]);
            }
            subscriber.complete();
        }
    };
    return PairsObservable;
}(Observable_1.Observable));
exports.PairsObservable = PairsObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFpcnNPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUGFpcnNPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLDRDQUEyQztBQVkzQyxrQkFBb0QsS0FBc0I7SUFDakUsSUFBQSxlQUFHLEVBQUUsaUJBQUksRUFBRSxxQkFBTSxFQUFFLG1CQUFLLEVBQUUsNkJBQVUsQ0FBVTtJQUVyRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNyQixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEIsTUFBTSxDQUFDO0lBQ1QsQ0FBQztJQUVELElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFakMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBRXhCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkIsQ0FBQztBQU9EO0lBQXdDLG1DQUE2QjtJQXNDbkUseUJBQW9CLEdBQVcsRUFBVSxTQUFzQjtRQUEvRCxZQUNFLGlCQUFPLFNBRVI7UUFIbUIsU0FBRyxHQUFILEdBQUcsQ0FBUTtRQUFVLGVBQVMsR0FBVCxTQUFTLENBQWE7UUFFN0QsS0FBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztJQUMvQixDQUFDO0lBUE0sc0JBQU0sR0FBYixVQUFpQixHQUFXLEVBQUUsU0FBc0I7UUFDbEQsTUFBTSxDQUFDLElBQUksZUFBZSxDQUFJLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBT1Msb0NBQVUsR0FBcEIsVUFBcUIsVUFBeUM7UUFDdEQsSUFBQSxTQUF3QixFQUF2QixjQUFJLEVBQUUsd0JBQVMsQ0FBUztRQUMvQixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRTNCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFO2dCQUNyQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLE1BQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLFVBQVUsWUFBQTthQUNsRCxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO2dCQUN0QyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsQ0FBQztZQUNELFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QixDQUFDO0lBQ0gsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQTNERCxDQUF3Qyx1QkFBVSxHQTJEakQ7QUEzRFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2NoZWR1bGVyIH0gZnJvbSAnLi4vU2NoZWR1bGVyJztcclxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi4vc2NoZWR1bGVyL0FjdGlvbic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xyXG5pbXBvcnQgeyBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcclxuXHJcbmludGVyZmFjZSBQYWlyc0NvbnRleHQ8VD4ge1xyXG4gIG9iajogT2JqZWN0O1xyXG4gIGtleXM6IEFycmF5PHN0cmluZz47XHJcbiAgbGVuZ3RoOiBudW1iZXI7XHJcbiAgaW5kZXg6IG51bWJlcjtcclxuICBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPEFycmF5PHN0cmluZyB8IFQ+PjtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGF0Y2g8VD4odGhpczogQWN0aW9uPFBhaXJzQ29udGV4dDxUPj4sIHN0YXRlOiBQYWlyc0NvbnRleHQ8VD4pIHtcclxuICBjb25zdCB7b2JqLCBrZXlzLCBsZW5ndGgsIGluZGV4LCBzdWJzY3JpYmVyfSA9IHN0YXRlO1xyXG5cclxuICBpZiAoaW5kZXggPT09IGxlbmd0aCkge1xyXG4gICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qga2V5ID0ga2V5c1tpbmRleF07XHJcbiAgc3Vic2NyaWJlci5uZXh0KFtrZXksIG9ialtrZXldXSk7XHJcblxyXG4gIHN0YXRlLmluZGV4ID0gaW5kZXggKyAxO1xyXG5cclxuICB0aGlzLnNjaGVkdWxlKHN0YXRlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXHJcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxyXG4gKiBAaGlkZSB0cnVlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUGFpcnNPYnNlcnZhYmxlPFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZTxBcnJheTxzdHJpbmcgfCBUPj4ge1xyXG4gIHByaXZhdGUga2V5czogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29udmVydCBhbiBvYmplY3QgaW50byBhbiBvYnNlcnZhYmxlIHNlcXVlbmNlIG9mIFtrZXksIHZhbHVlXSBwYWlyc1xyXG4gICAqIHVzaW5nIGFuIG9wdGlvbmFsIElTY2hlZHVsZXIgdG8gZW51bWVyYXRlIHRoZSBvYmplY3QuXHJcbiAgICpcclxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db252ZXJ0cyBhIGphdmFzY3JpcHQgb2JqZWN0IHRvIGFuIE9ic2VydmFibGU8L2NhcHRpb24+XHJcbiAgICogdmFyIG9iaiA9IHtcclxuICAgKiAgIGZvbzogNDIsXHJcbiAgICogICBiYXI6IDU2LFxyXG4gICAqICAgYmF6OiA3OFxyXG4gICAqIH07XHJcbiAgICpcclxuICAgKiB2YXIgc291cmNlID0gUnguT2JzZXJ2YWJsZS5wYWlycyhvYmopO1xyXG4gICAqXHJcbiAgICogdmFyIHN1YnNjcmlwdGlvbiA9IHNvdXJjZS5zdWJzY3JpYmUoXHJcbiAgICogICBmdW5jdGlvbiAoeCkge1xyXG4gICAqICAgICBjb25zb2xlLmxvZygnTmV4dDogJXMnLCB4KTtcclxuICAgKiAgIH0sXHJcbiAgICogICBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICogICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJXMnLCBlcnIpO1xyXG4gICAqICAgfSxcclxuICAgKiAgIGZ1bmN0aW9uICgpIHtcclxuICAgKiAgICAgY29uc29sZS5sb2coJ0NvbXBsZXRlZCcpO1xyXG4gICAqICAgfSk7XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gaW5zcGVjdCBhbmQgdHVybiBpbnRvIGFuXHJcbiAgICogT2JzZXJ2YWJsZSBzZXF1ZW5jZS5cclxuICAgKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcl0gQW4gb3B0aW9uYWwgSVNjaGVkdWxlciB0byBydW4gdGhlXHJcbiAgICogZW51bWVyYXRpb24gb2YgdGhlIGlucHV0IHNlcXVlbmNlIG9uLlxyXG4gICAqIEByZXR1cm5zIHsoT2JzZXJ2YWJsZTxBcnJheTxzdHJpbmcgfCBUPj4pfSBBbiBvYnNlcnZhYmxlIHNlcXVlbmNlIG9mXHJcbiAgICogW2tleSwgdmFsdWVdIHBhaXJzIGZyb20gdGhlIG9iamVjdC5cclxuICAgKi9cclxuICBzdGF0aWMgY3JlYXRlPFQ+KG9iajogT2JqZWN0LCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxBcnJheTxzdHJpbmcgfCBUPj4ge1xyXG4gICAgcmV0dXJuIG5ldyBQYWlyc09ic2VydmFibGU8VD4ob2JqLCBzY2hlZHVsZXIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvYmo6IE9iamVjdCwgcHJpdmF0ZSBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5rZXlzID0gT2JqZWN0LmtleXMob2JqKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8QXJyYXk8c3RyaW5nIHwgVD4+KTogVGVhcmRvd25Mb2dpYyB7XHJcbiAgICBjb25zdCB7a2V5cywgc2NoZWR1bGVyfSA9IHRoaXM7XHJcbiAgICBjb25zdCBsZW5ndGggPSBrZXlzLmxlbmd0aDtcclxuXHJcbiAgICBpZiAoc2NoZWR1bGVyKSB7XHJcbiAgICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2gsIDAsIHtcclxuICAgICAgICBvYmo6IHRoaXMub2JqLCBrZXlzLCBsZW5ndGgsIGluZGV4OiAwLCBzdWJzY3JpYmVyXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgbGVuZ3RoOyBpZHgrKykge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGtleXNbaWR4XTtcclxuICAgICAgICBzdWJzY3JpYmVyLm5leHQoW2tleSwgdGhpcy5vYmpba2V5XV0pO1xyXG4gICAgICB9XHJcbiAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcclxuICAgIH1cclxuICB9XHJcbn0iXX0=