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
var Observable_1 = require("../Observable");
var Subscriber_1 = require("../Subscriber");
var Subscription_1 = require("../Subscription");
var ConnectableObservable = (function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subjectFactory = subjectFactory;
        _this._refCount = 0;
        _this._isComplete = false;
        return _this;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype.connect = function () {
        var connection = this._connection;
        if (!connection) {
            this._isComplete = false;
            connection = this._connection = new Subscription_1.Subscription();
            connection.add(this.source
                .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
            if (connection.closed) {
                this._connection = null;
                connection = Subscription_1.Subscription.EMPTY;
            }
            else {
                this._connection = connection;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return this.lift(new RefCountOperator(this));
    };
    return ConnectableObservable;
}(Observable_1.Observable));
exports.ConnectableObservable = ConnectableObservable;
var connectableProto = ConnectableObservable.prototype;
exports.connectableObservableDescriptor = {
    operator: { value: null },
    _refCount: { value: 0, writable: true },
    _subject: { value: null, writable: true },
    _connection: { value: null, writable: true },
    _subscribe: { value: connectableProto._subscribe },
    _isComplete: { value: connectableProto._isComplete, writable: true },
    getSubject: { value: connectableProto.getSubject },
    connect: { value: connectableProto.connect },
    refCount: { value: connectableProto.refCount }
};
var ConnectableSubscriber = (function (_super) {
    __extends(ConnectableSubscriber, _super);
    function ConnectableSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    ConnectableSubscriber.prototype._error = function (err) {
        this._unsubscribe();
        _super.prototype._error.call(this, err);
    };
    ConnectableSubscriber.prototype._complete = function () {
        this.connectable._isComplete = true;
        this._unsubscribe();
        _super.prototype._complete.call(this);
    };
    ConnectableSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (connectable) {
            this.connectable = null;
            var connection = connectable._connection;
            connectable._refCount = 0;
            connectable._subject = null;
            connectable._connection = null;
            if (connection) {
                connection.unsubscribe();
            }
        }
    };
    return ConnectableSubscriber;
}(Subject_1.SubjectSubscriber));
var RefCountOperator = (function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}());
var RefCountSubscriber = (function (_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29ubmVjdGFibGVPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29ubmVjdGFibGVPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHNDQUF3RDtBQUV4RCw0Q0FBMkM7QUFDM0MsNENBQTJDO0FBQzNDLGdEQUE4RDtBQUs5RDtJQUE4Qyx5Q0FBYTtJQU96RCwrQkFBc0IsTUFBcUIsRUFDckIsY0FBZ0M7UUFEdEQsWUFFRSxpQkFBTyxTQUNSO1FBSHFCLFlBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsb0JBQWMsR0FBZCxjQUFjLENBQWtCO1FBTDVDLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFFaEMsaUJBQVcsR0FBRyxLQUFLLENBQUM7O0lBS3BCLENBQUM7SUFFUywwQ0FBVSxHQUFwQixVQUFxQixVQUF5QjtRQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRVMsMENBQVUsR0FBcEI7UUFDRSxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsdUNBQU8sR0FBUDtRQUNFLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDbEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMkJBQVks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QUFVLFdBQVksQ0FBQyxTQUFTLENBQUM7UUFDL0MsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUVNLFdBQVksQ0FBQyxTQUFTLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUM3QyxFQUFFLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixNQUFNLENBQUM7UUFDVCxDQUFDO1FBeUJPLElBQUEsNEJBQVUsQ0FBVTtRQUM1QixJQUFNLGdCQUFnQixHQUFVLFdBQVksQ0FBQyxXQUFXLENBQUM7UUFDekQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFFdkIsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxDQUFDLFVBQVUsSUFBSSxnQkFBZ0IsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsQ0FBQztJQUNILENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUE3REQsQ0FBb0MsdUJBQVUsR0E2RDdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCwgU3ViamVjdFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJqZWN0JztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuLyoqXG4gKiBAY2xhc3MgQ29ubmVjdGFibGVPYnNlcnZhYmxlPFQ+XG4gKi9cbmV4cG9ydCBjbGFzcyBDb25uZWN0YWJsZU9ic2VydmFibGU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcblxuICBwcm90ZWN0ZWQgX3N1YmplY3Q6IFN1YmplY3Q8VD47XG4gIHByb3RlY3RlZCBfcmVmQ291bnQ6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfY29ubmVjdGlvbjogU3Vic2NyaXB0aW9uO1xuICBfaXNDb21wbGV0ZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzb3VyY2U6IE9ic2VydmFibGU8VD4sXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBzdWJqZWN0RmFjdG9yeTogKCkgPT4gU3ViamVjdDxUPikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U3ViamVjdCgpLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTdWJqZWN0KCk6IFN1YmplY3Q8VD4ge1xuICAgIGNvbnN0IHN1YmplY3QgPSB0aGlzLl9zdWJqZWN0O1xuICAgIGlmICghc3ViamVjdCB8fCBzdWJqZWN0LmlzU3RvcHBlZCkge1xuICAgICAgdGhpcy5fc3ViamVjdCA9IHRoaXMuc3ViamVjdEZhY3RvcnkoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3N1YmplY3Q7XG4gIH1cblxuICBjb25uZWN0KCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgbGV0IGNvbm5lY3Rpb24gPSB0aGlzLl9jb25uZWN0aW9uO1xuICAgIGlmICghY29ubmVjdGlvbikge1xuICAgICAgdGhpcy5faXNDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgY29ubmVjdGlvbiA9IHRoaXMuX2Nvbm5lY3Rpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgICBjb25uZWN0aW9uLmFkZCh0aGlzLnNvdXJjZVxuICAgICAgICAuc3Vic2NyaWJlKG5ldyBDb25uZWN0YWJsZVN1YnNjcmliZXIodGhpcy5nZXRTdWJqZWN0KCksIHRoaXMpKSk7XG4gICAgICBpZiAoY29ubmVjdGlvbi5jbG9zZWQpIHtcbiAgICAgICAgdGhpcy5fY29ubmVjdGlvbiA9IG51bGw7XG4gICAgICAgIGNvbm5lY3Rpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbm5lY3Rpb247XG4gIH1cblxuICByZWZDb3VudCgpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5saWZ0KG5ldyBSZWZDb3VudE9wZXJhdG9yPFQ+KHRoaXMpKTtcbiAgfVxufVxuXG5jb25zdCBjb25uZWN0YWJsZVByb3RvID0gPGFueT5Db25uZWN0YWJsZU9ic2VydmFibGUucHJvdG90eXBlO1xuXG5leHBvcnQgY29uc3QgY29ubmVjdGFibGVPYnNlcnZhYmxlRGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yTWFwID0ge1xuICBvcGVyYXRvcjogeyB2YWx1ZTogbnVsbCB9LFxuICBfcmVmQ291bnQ6IHsgdmFsdWU6IDAsIHdyaXRhYmxlOiB0cnVlIH0sXG4gIF9zdWJqZWN0OiB7IHZhbHVlOiBudWxsLCB3cml0YWJsZTogdHJ1ZSB9LFxuICBfY29ubmVjdGlvbjogeyB2YWx1ZTogbnVsbCwgd3JpdGFibGU6IHRydWUgfSxcbiAgX3N1YnNjcmliZTogeyB2YWx1ZTogY29ubmVjdGFibGVQcm90by5fc3Vic2NyaWJlIH0sXG4gIF9pc0NvbXBsZXRlOiB7IHZhbHVlOiBjb25uZWN0YWJsZVByb3RvLl9pc0NvbXBsZXRlLCB3cml0YWJsZTogdHJ1ZSB9LFxuICBnZXRTdWJqZWN0OiB7IHZhbHVlOiBjb25uZWN0YWJsZVByb3RvLmdldFN1YmplY3QgfSxcbiAgY29ubmVjdDogeyB2YWx1ZTogY29ubmVjdGFibGVQcm90by5jb25uZWN0IH0sXG4gIHJlZkNvdW50OiB7IHZhbHVlOiBjb25uZWN0YWJsZVByb3RvLnJlZkNvdW50IH1cbn07XG5cbmNsYXNzIENvbm5lY3RhYmxlU3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YmplY3RTdWJzY3JpYmVyPFQ+IHtcbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YmplY3Q8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY29ubmVjdGFibGU6IENvbm5lY3RhYmxlT2JzZXJ2YWJsZTxUPikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuICBwcm90ZWN0ZWQgX2Vycm9yKGVycjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fdW5zdWJzY3JpYmUoKTtcbiAgICBzdXBlci5fZXJyb3IoZXJyKTtcbiAgfVxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCk6IHZvaWQge1xuICAgIHRoaXMuY29ubmVjdGFibGUuX2lzQ29tcGxldGUgPSB0cnVlO1xuICAgIHRoaXMuX3Vuc3Vic2NyaWJlKCk7XG4gICAgc3VwZXIuX2NvbXBsZXRlKCk7XG4gIH1cbiAgcHJvdGVjdGVkIF91bnN1YnNjcmliZSgpIHtcbiAgICBjb25zdCBjb25uZWN0YWJsZSA9IDxhbnk+dGhpcy5jb25uZWN0YWJsZTtcbiAgICBpZiAoY29ubmVjdGFibGUpIHtcbiAgICAgIHRoaXMuY29ubmVjdGFibGUgPSBudWxsO1xuICAgICAgY29uc3QgY29ubmVjdGlvbiA9IGNvbm5lY3RhYmxlLl9jb25uZWN0aW9uO1xuICAgICAgY29ubmVjdGFibGUuX3JlZkNvdW50ID0gMDtcbiAgICAgIGNvbm5lY3RhYmxlLl9zdWJqZWN0ID0gbnVsbDtcbiAgICAgIGNvbm5lY3RhYmxlLl9jb25uZWN0aW9uID0gbnVsbDtcbiAgICAgIGlmIChjb25uZWN0aW9uKSB7XG4gICAgICAgIGNvbm5lY3Rpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY2xhc3MgUmVmQ291bnRPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25uZWN0YWJsZTogQ29ubmVjdGFibGVPYnNlcnZhYmxlPFQ+KSB7XG4gIH1cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuXG4gICAgY29uc3QgeyBjb25uZWN0YWJsZSB9ID0gdGhpcztcbiAgICAoPGFueT4gY29ubmVjdGFibGUpLl9yZWZDb3VudCsrO1xuXG4gICAgY29uc3QgcmVmQ291bnRlciA9IG5ldyBSZWZDb3VudFN1YnNjcmliZXIoc3Vic2NyaWJlciwgY29ubmVjdGFibGUpO1xuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHNvdXJjZS5zdWJzY3JpYmUocmVmQ291bnRlcik7XG5cbiAgICBpZiAoIXJlZkNvdW50ZXIuY2xvc2VkKSB7XG4gICAgICAoPGFueT4gcmVmQ291bnRlcikuY29ubmVjdGlvbiA9IGNvbm5lY3RhYmxlLmNvbm5lY3QoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICB9XG59XG5cbmNsYXNzIFJlZkNvdW50U3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuXG4gIHByaXZhdGUgY29ubmVjdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbm5lY3RhYmxlOiBDb25uZWN0YWJsZU9ic2VydmFibGU8VD4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3Vuc3Vic2NyaWJlKCkge1xuXG4gICAgY29uc3QgeyBjb25uZWN0YWJsZSB9ID0gdGhpcztcbiAgICBpZiAoIWNvbm5lY3RhYmxlKSB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29ubmVjdGFibGUgPSBudWxsO1xuICAgIGNvbnN0IHJlZkNvdW50ID0gKDxhbnk+IGNvbm5lY3RhYmxlKS5fcmVmQ291bnQ7XG4gICAgaWYgKHJlZkNvdW50IDw9IDApIHtcbiAgICAgIHRoaXMuY29ubmVjdGlvbiA9IG51bGw7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgKDxhbnk+IGNvbm5lY3RhYmxlKS5fcmVmQ291bnQgPSByZWZDb3VudCAtIDE7XG4gICAgaWYgKHJlZkNvdW50ID4gMSkge1xuICAgICAgdGhpcy5jb25uZWN0aW9uID0gbnVsbDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLyBDb21wYXJlIHRoZSBsb2NhbCBSZWZDb3VudFN1YnNjcmliZXIncyBjb25uZWN0aW9uIFN1YnNjcmlwdGlvbiB0byB0aGVcbiAgICAvLyBjb25uZWN0aW9uIFN1YnNjcmlwdGlvbiBvbiB0aGUgc2hhcmVkIENvbm5lY3RhYmxlT2JzZXJ2YWJsZS4gSW4gY2FzZXNcbiAgICAvLyB3aGVyZSB0aGUgQ29ubmVjdGFibGVPYnNlcnZhYmxlIHNvdXJjZSBzeW5jaHJvbm91c2x5IGVtaXRzIHZhbHVlcywgYW5kXG4gICAgLy8gdGhlIFJlZkNvdW50U3Vic2NyaWJlcidzIGRvd25zdHJlYW0gT2JzZXJ2ZXJzIHN5bmNocm9ub3VzbHkgdW5zdWJzY3JpYmUsXG4gICAgLy8gZXhlY3V0aW9uIGNvbnRpbnVlcyB0byBoZXJlIGJlZm9yZSB0aGUgUmVmQ291bnRPcGVyYXRvciBoYXMgYSBjaGFuY2UgdG9cbiAgICAvLyBzdXBwbHkgdGhlIFJlZkNvdW50U3Vic2NyaWJlciB3aXRoIHRoZSBzaGFyZWQgY29ubmVjdGlvbiBTdWJzY3JpcHRpb24uXG4gICAgLy8gRm9yIGV4YW1wbGU6XG4gICAgLy8gYGBgXG4gICAgLy8gT2JzZXJ2YWJsZS5yYW5nZSgwLCAxMClcbiAgICAvLyAgIC5wdWJsaXNoKClcbiAgICAvLyAgIC5yZWZDb3VudCgpXG4gICAgLy8gICAudGFrZSg1KVxuICAgIC8vICAgLnN1YnNjcmliZSgpO1xuICAgIC8vIGBgYFxuICAgIC8vIEluIG9yZGVyIHRvIGFjY291bnQgZm9yIHRoaXMgY2FzZSwgUmVmQ291bnRTdWJzY3JpYmVyIHNob3VsZCBvbmx5IGRpc3Bvc2VcbiAgICAvLyB0aGUgQ29ubmVjdGFibGVPYnNlcnZhYmxlJ3Mgc2hhcmVkIGNvbm5lY3Rpb24gU3Vic2NyaXB0aW9uIGlmIHRoZVxuICAgIC8vIGNvbm5lY3Rpb24gU3Vic2NyaXB0aW9uIGV4aXN0cywgKmFuZCogZWl0aGVyOlxuICAgIC8vICAgYS4gUmVmQ291bnRTdWJzY3JpYmVyIGRvZXNuJ3QgaGF2ZSBhIHJlZmVyZW5jZSB0byB0aGUgc2hhcmVkIGNvbm5lY3Rpb25cbiAgICAvLyAgICAgIFN1YnNjcmlwdGlvbiB5ZXQsIG9yLFxuICAgIC8vICAgYi4gUmVmQ291bnRTdWJzY3JpYmVyJ3MgY29ubmVjdGlvbiBTdWJzY3JpcHRpb24gcmVmZXJlbmNlIGlzIGlkZW50aWNhbFxuICAgIC8vICAgICAgdG8gdGhlIHNoYXJlZCBjb25uZWN0aW9uIFN1YnNjcmlwdGlvblxuICAgIC8vL1xuICAgIGNvbnN0IHsgY29ubmVjdGlvbiB9ID0gdGhpcztcbiAgICBjb25zdCBzaGFyZWRDb25uZWN0aW9uID0gKDxhbnk+IGNvbm5lY3RhYmxlKS5fY29ubmVjdGlvbjtcbiAgICB0aGlzLmNvbm5lY3Rpb24gPSBudWxsO1xuXG4gICAgaWYgKHNoYXJlZENvbm5lY3Rpb24gJiYgKCFjb25uZWN0aW9uIHx8IHNoYXJlZENvbm5lY3Rpb24gPT09IGNvbm5lY3Rpb24pKSB7XG4gICAgICBzaGFyZWRDb25uZWN0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=