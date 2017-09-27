"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("utils/types");
var fs = require("file-system");
var TNSPlayer = (function () {
    function TNSPlayer() {
    }
    Object.defineProperty(TNSPlayer.prototype, "android", {
        get: function () {
            return this.player;
        },
        enumerable: true,
        configurable: true
    });
    TNSPlayer.prototype.initFromFile = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            options.autoPlay = false;
            _this.playFromFile(options).then(resolve, reject);
        });
    };
    TNSPlayer.prototype.playFromFile = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (options.autoPlay !== false)
                options.autoPlay = true;
            try {
                var MediaPlayer = android.media.MediaPlayer;
                var audioPath = void 0;
                var fileName = types_1.isString(options.audioFile) ? options.audioFile.trim() : "";
                if (fileName.indexOf("~/") === 0) {
                    fileName = fs.path.join(fs.knownFolders.currentApp().path, fileName.replace("~/", ""));
                    audioPath = fileName;
                }
                else {
                    audioPath = fileName;
                }
                _this.player = new MediaPlayer();
                _this.player.setAudioStreamType(android.media.AudioManager.STREAM_MUSIC);
                _this.player.setDataSource(audioPath);
                _this.player.prepareAsync();
                if (options.completeCallback) {
                    _this.player.setOnCompletionListener(new MediaPlayer.OnCompletionListener({
                        onCompletion: function (mp) {
                            if (options.loop === true) {
                                mp.seekTo(5);
                                mp.start();
                            }
                            options.completeCallback({ mp: mp });
                        }
                    }));
                }
                if (options.errorCallback) {
                    _this.player.setOnErrorListener(new MediaPlayer.OnErrorListener({
                        onError: function (mp, what, extra) {
                            options.errorCallback({ mp: mp, what: what, extra: extra });
                            return true;
                        }
                    }));
                }
                if (options.infoCallback) {
                    _this.player.setOnInfoListener(new MediaPlayer.OnInfoListener({
                        onInfo: function (mp, what, extra) {
                            options.infoCallback({ mp: mp, what: what, extra: extra });
                            return true;
                        }
                    }));
                }
                _this.player.setOnPreparedListener(new MediaPlayer.OnPreparedListener({
                    onPrepared: function (mp) {
                        if (options.autoPlay)
                            mp.start();
                        resolve();
                    }
                }));
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
    TNSPlayer.prototype.initFromUrl = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            options.autoPlay = false;
            _this.playFromUrl(options).then(resolve, reject);
        });
    };
    TNSPlayer.prototype.playFromUrl = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (options.autoPlay !== false)
                options.autoPlay = true;
            try {
                var MediaPlayer = android.media.MediaPlayer;
                _this.player = new MediaPlayer();
                _this.player.setAudioStreamType(android.media.AudioManager.STREAM_MUSIC);
                _this.player.setDataSource(options.audioFile);
                _this.player.prepareAsync();
                if (options.completeCallback) {
                    _this.player.setOnCompletionListener(new MediaPlayer.OnCompletionListener({
                        onCompletion: function (mp) {
                            if (options.loop === true) {
                                mp.seekTo(5);
                                mp.start();
                            }
                            options.completeCallback({ mp: mp });
                        }
                    }));
                }
                if (options.errorCallback) {
                    _this.player.setOnErrorListener(new MediaPlayer.OnErrorListener({
                        onError: function (mp, what, extra) {
                            options.errorCallback({ mp: mp, what: what, extra: extra });
                            return true;
                        }
                    }));
                }
                if (options.infoCallback) {
                    _this.player.setOnInfoListener(new MediaPlayer.OnInfoListener({
                        onInfo: function (mp, what, extra) {
                            options.infoCallback({ mp: mp, what: what, extra: extra });
                            return true;
                        }
                    }));
                }
                _this.player.setOnPreparedListener(new MediaPlayer.OnPreparedListener({
                    onPrepared: function (mp) {
                        if (options.autoPlay)
                            mp.start();
                        resolve();
                    }
                }));
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
    TNSPlayer.prototype.pause = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                if (_this.player.isPlaying()) {
                    _this.player.pause();
                    resolve(true);
                }
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
    TNSPlayer.prototype.play = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                if (!_this.player.isPlaying()) {
                    _this.player.start();
                    resolve(true);
                }
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
    TNSPlayer.prototype.resume = function () {
        this.player.start();
    };
    TNSPlayer.prototype.seekTo = function (time) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                if (_this.player) {
                    _this.player.seekTo(time);
                    resolve(true);
                }
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
    TNSPlayer.prototype.dispose = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.player.release();
                resolve();
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
    TNSPlayer.prototype.isAudioPlaying = function () {
        return this.player.isPlaying();
    };
    TNSPlayer.prototype.getAudioTrackDuration = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var duration = _this.player.getDuration();
                resolve(duration.toString());
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
    Object.defineProperty(TNSPlayer.prototype, "currentTime", {
        get: function () {
            return this.player ? this.player.getCurrentPosition() : 0;
        },
        enumerable: true,
        configurable: true
    });
    return TNSPlayer;
}());
exports.TNSPlayer = TNSPlayer;
//# sourceMappingURL=player.js.map