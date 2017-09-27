"use strict";
var contentView = require("ui/content-view");
var dependencyObservable = require("ui/core/dependency-observable");
var view = require("ui/core/view");
var proxy = require("ui/core/proxy");
var PullToRefresh = (function (_super) {
    __extends(PullToRefresh, _super);
    function PullToRefresh(options) {
        return _super.call(this, options) || this;
    }
    Object.defineProperty(PullToRefresh.prototype, "refreshing", {
        get: function () {
            return this._getValue(PullToRefresh.refreshingProperty);
        },
        set: function (value) {
            this._setValue(PullToRefresh.refreshingProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    PullToRefresh.prototype._addChildFromBuilder = function (name, value) {
        var originalColor = value.style.color || null;
        if (value instanceof view.View) {
            this.content = value;
        }
        value.style.color = originalColor;
    };
    return PullToRefresh;
}(contentView.ContentView));
PullToRefresh.refreshEvent = "refresh";
PullToRefresh.refreshingProperty = new dependencyObservable.Property("refreshing", "PullToRefresh", new proxy.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None));
exports.PullToRefresh = PullToRefresh;
//# sourceMappingURL=pulltorefresh-common.js.map