'use strict';
var helpers = require("./helpers");
var _Emitter = io.socket.emitter.Emitter;
var _IO = io.socket.client.IO;
var _Socket = io.socket.client.Socket;
var _Ack = io.socket.client.Ack;
function connect(uri, options) {
    var socket = new Socket(uri, options);
    socket.connect();
    return socket;
}
exports.connect = connect;
var debug = function () { };
function defaultDebug() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    args.unshift('nativescript-socket.io');
    console.log.apply(console, args);
}
function enableDebug(debugFn) {
    if (debugFn === void 0) { debugFn = defaultDebug; }
    debug = debugFn;
}
exports.enableDebug = enableDebug;
function disableDebug() {
    debug = function () { };
}
exports.disableDebug = disableDebug;
var Socket = (function () {
    function Socket(uri, options) {
        var _options = new _IO.Options();
        if (options) {
            Object.keys(options).forEach(function (prop) {
                _options[prop] = options[prop];
            });
        }
        this.android = _IO.socket(uri, _options);
    }
    Socket.prototype.connect = function () {
        this.android.connect();
    };
    Socket.prototype.disconnect = function () {
        this.android.disconnect();
    };
    Object.defineProperty(Socket.prototype, "connected", {
        get: function () {
            return this.android && this.android.connected();
        },
        enumerable: true,
        configurable: true
    });
    Socket.prototype.on = function (event, callback) {
        this.android.on(event, new _Emitter.Listener({
            call: function (args) {
                var payload = Array.prototype.slice.call(args);
                var ack = payload.pop();
                if (ack && !(ack.getClass().getName().indexOf(Socket.SOCKET_CLASS) === 0 && ack.call)) {
                    payload.push(ack);
                    ack = null;
                }
                payload = payload.map(helpers.deserialize);
                debug('on', event, payload);
                if (ack) {
                    var _ack = ack;
                    ack = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        debug('on', event, 'ack', args);
                        _ack.call(args.map(helpers.serialize));
                    };
                    payload.push(ack);
                }
                callback.apply(null, payload);
            },
        }));
    };
    Socket.prototype.off = function (event) {
        this.android.off(event);
    };
    Socket.prototype.emit = function (event) {
        var payload = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            payload[_i - 1] = arguments[_i];
        }
        var ack = payload.pop();
        if (ack && typeof ack !== 'function') {
            payload.push(ack);
            ack = null;
        }
        debug('emit', event, payload);
        payload = payload.map(helpers.serialize);
        if (ack) {
            payload.push(new _Ack({
                call: function (args) {
                    args = Array.prototype.slice.call(args).map(helpers.deserialize);
                    debug('emit', event, 'ack', args);
                    ack.apply(null, args);
                },
            }));
        }
        this.android.emit(event, payload);
    };
    Socket.SOCKET_CLASS = 'io.socket.client.Socket';
    return Socket;
}());
exports.Socket = Socket;
//# sourceMappingURL=socket.js.map