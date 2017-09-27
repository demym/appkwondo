"use strict";
var common = require("./pulltorefresh-common");
var style = require("ui/styling/style");
function refreshingPropertyChanged(data) {
    var pullRefresh = data.object;
    if (!pullRefresh.android) {
        return;
    }
    pullRefresh.android.setRefreshing(data.newValue);
}
common.PullToRefresh.refreshingProperty.metadata.onSetNativeValue = refreshingPropertyChanged;
global.moduleMerge(common, exports);
var PullToRefresh = (function (_super) {
    __extends(PullToRefresh, _super);
    function PullToRefresh() {
        return _super.call(this) || this;
    }
    Object.defineProperty(PullToRefresh.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PullToRefresh.prototype, "_nativeView", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    PullToRefresh.prototype._createUI = function () {
        var that = new WeakRef(this);
        this._android = new android.support.v4.widget.SwipeRefreshLayout(this._context);
        if (!this._androidViewId) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._android.setId(this._androidViewId);
        this._android.setOnRefreshListener(new android.support.v4.widget.SwipeRefreshLayout.OnRefreshListener({
            get owner() {
                return that.get();
            },
            onRefresh: function (v) {
                var owner = that.get();
                if (owner) {
                    owner.refreshing = true;
                    owner._emit(common.PullToRefresh.refreshEvent);
                }
            }
        }));
    };
    return PullToRefresh;
}(common.PullToRefresh));
exports.PullToRefresh = PullToRefresh;
var PullToRefreshStyler = (function () {
    function PullToRefreshStyler() {
    }
    PullToRefreshStyler.setBackgroundColor = function (pullToRefresh, value) {
        var native = pullToRefresh._nativeView;
        native.setProgressBackgroundColorSchemeColor(value);
    };
    PullToRefreshStyler.resetBackgroundColor = function (pullToRefresh, value) {
        var native = pullToRefresh._nativeView;
        native.setProgressBackgroundColorSchemeColor(value);
    };
    PullToRefreshStyler.setColor = function (pullToRefresh, value) {
        var native = pullToRefresh._nativeView;
        native.setColorSchemeColors([value]);
    };
    PullToRefreshStyler.resetColor = function (pullToRefresh, value) {
        var native = pullToRefresh._nativeView;
        native.setColorSchemeColors([value]);
    };
    PullToRefreshStyler.registerHandlers = function () {
        style.registerHandler(style.backgroundColorProperty, new style.StylePropertyChangedHandler(PullToRefreshStyler.setBackgroundColor, PullToRefreshStyler.resetBackgroundColor), "PullToRefresh");
        style.registerHandler(style.backgroundInternalProperty, style.ignorePropertyHandler, "PullToRefresh");
        style.registerHandler(style.colorProperty, new style.StylePropertyChangedHandler(PullToRefreshStyler.setColor, PullToRefreshStyler.resetColor), "PullToRefresh");
    };
    return PullToRefreshStyler;
}());
exports.PullToRefreshStyler = PullToRefreshStyler;
PullToRefreshStyler.registerHandlers();
//# sourceMappingURL=pulltorefresh.js.map