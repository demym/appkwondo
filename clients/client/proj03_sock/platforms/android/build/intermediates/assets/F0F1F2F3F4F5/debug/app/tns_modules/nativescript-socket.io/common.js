"use strict";
var SocketBase = (function () {
    function SocketBase() {
        this._listeners = new WeakMap();
    }
    return SocketBase;
}());
exports.SocketBase = SocketBase;
exports.debugNop = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
};
function debugDefault() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    args = args.map(function (value) {
        if (typeof value === 'object' && value) {
            try {
                value = JSON.stringify(value);
            }
            catch (e) {
                value = value.toString();
            }
        }
        return value;
    });
    args.unshift('nativescript-socket.io');
    console.log.apply(console, args);
}
exports.debugDefault = debugDefault;
var _debug = exports.debugNop;
function debug() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    _debug.apply(null, args);
}
exports.debug = debug;
function enableDebug(debugFn) {
    if (debugFn === void 0) { debugFn = debugDefault; }
    _debug = debugFn;
}
exports.enableDebug = enableDebug;
function disableDebug() {
    _debug = exports.debugNop;
}
exports.disableDebug = disableDebug;
//# sourceMappingURL=common.js.map