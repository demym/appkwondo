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
import { Injectable } from '@angular/core';
import { WebAudioTrack } from './ionic-audio-web-track';
import { CordovaAudioTrack } from './ionic-audio-cordova-track';
/**
 * Creates an audio provider based on the environment.
 * If running from within a browser, then defaults to HTML5 Audio. If running on a device, it will check for Cordova and Media plugins and use
 * a native audio player, otherwise falls back to HTML5 audio.
 *
 * @method factory
 * @static
 * @return {IAudioProvider} An IAudioProvider instance
 */
export function defaultAudioProviderFactory() {
    return window.hasOwnProperty('cordova') && window.hasOwnProperty('Media') ? new CordovaMediaProvider() : new WebAudioProvider();
}
/**
 * Base class for audio providers
 *
 * @export
 * @abstract
 * @class AudioProvider
 * @implements {IAudioProvider}
 */
var AudioProvider = (function () {
    function AudioProvider() {
    }
    /**
     * Creates an IAudioTrack instance from a JSON object.
     * Not implemented in base class.
     *
     * @method create
     * @param {ITrackConstraint} track A JSON object containing at least a src property
     * @return null
     */
    AudioProvider.prototype.create = function (track) {
        console.error('Not implemented in base class');
        return null;
    };
    /**
     * Replaces track with a new one
     * @param oldAudioTrack
     * @param newTrack
     */
    AudioProvider.prototype.replace = function (oldAudioTrack, newTrack) {
        console.error('Not implemented in base class');
        return null;
    };
    /**
     * Adds an existing IAudioTrack instance to the array of managed tracks.
     *
     * @method add
     * @param {IAudioTrack} audioTrack An instance of IAudioTrack
     */
    AudioProvider.prototype.add = function (audioTrack) {
        AudioProvider.tracks.push(audioTrack);
    };
    ;
    /**
     * Plays a given track.
     *
     * @method play
     * @param {number} index The track id
     */
    AudioProvider.prototype.play = function (index) {
        if (index === undefined || index > AudioProvider.tracks.length - 1)
            return;
        this._current = index;
        AudioProvider.tracks[index].play();
    };
    ;
    /**
     * Pauses a given track.
     *
     * @method pause
     * @param {number} [index] The track id, or if undefined it will pause whichever track currently playing
     */
    AudioProvider.prototype.pause = function (index) {
        if (this._current === undefined || index > AudioProvider.tracks.length - 1)
            return;
        index = index || this._current;
        AudioProvider.tracks[index].pause();
    };
    ;
    /**
     * Stops a given track.
     *
     * @method stop
     * @param {number} [index] The track id, or if undefined it will stop whichever track currently playing
     */
    AudioProvider.prototype.stop = function (index) {
        if (this._current === undefined || index > AudioProvider.tracks.length - 1)
            return;
        index = index || this._current;
        AudioProvider.tracks[index].stop();
        this._current = undefined;
    };
    ;
    Object.defineProperty(AudioProvider.prototype, "tracks", {
        /**
         * Gets an array of tracks managed by this provider
         *
         * @property tracks
         * @readonly
         * @type {IAudioTrack[]}
         */
        get: function () {
            return AudioProvider.tracks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioProvider.prototype, "current", {
        /**
         * Gets current track id
         *
         * @property current
         * @type {number}
         */
        get: function () {
            return this._current;
        },
        /**
         * Sets current track id
         *
         * @property current
         */
        set: function (v) {
            this._current = v;
        },
        enumerable: true,
        configurable: true
    });
    return AudioProvider;
}());
export { AudioProvider };
AudioProvider.tracks = [];
AudioProvider.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AudioProvider.ctorParameters = function () { return []; };
/**
 * Creates an HTML5 audio provider
 *
 * @export
 * @class WebAudioProvider
 * @constructor
 * @extends {AudioProvider}
 */
var WebAudioProvider = (function (_super) {
    __extends(WebAudioProvider, _super);
    function WebAudioProvider() {
        var _this = _super.call(this) || this;
        console.log('Using Web Audio provider');
        return _this;
    }
    WebAudioProvider.prototype.create = function (track) {
        var audioTrack = new WebAudioTrack(track.src, track.preload);
        Object.assign(audioTrack, track);
        var trackId = WebAudioProvider.tracks.push(audioTrack);
        audioTrack.id = trackId - 1;
        return audioTrack;
    };
    WebAudioProvider.prototype.replace = function (oldAudioTrack, newTrack) {
        //WebAudioProvider.tracks.pop();
        var index = WebAudioProvider.tracks.findIndex(function (track) { return Object.is(oldAudioTrack, track); });
        var newAudioTrack = newTrack instanceof WebAudioTrack ? newTrack : new WebAudioTrack(newTrack.src, newTrack.preload);
        Object.assign(newAudioTrack, newTrack);
        if (index > -1) {
            WebAudioProvider.tracks.splice(index, 1, newAudioTrack);
        }
        else {
            var trackId = WebAudioProvider.tracks.push(newAudioTrack);
            newAudioTrack.id = trackId - 1;
        }
        console.log("Replaced audio track", oldAudioTrack, newAudioTrack);
        console.log("Current track list", WebAudioProvider.tracks);
        return newAudioTrack;
    };
    return WebAudioProvider;
}(AudioProvider));
export { WebAudioProvider };
WebAudioProvider.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WebAudioProvider.ctorParameters = function () { return []; };
/**
 * Creates a Cordova audio provider
 *
 * @export
 * @class CordovaMediaProvider
 * @constructor
 * @extends {AudioProvider}
 */
var CordovaMediaProvider = (function (_super) {
    __extends(CordovaMediaProvider, _super);
    function CordovaMediaProvider() {
        var _this = _super.call(this) || this;
        console.log('Using Cordova Media provider');
        return _this;
    }
    CordovaMediaProvider.prototype.create = function (track) {
        var audioTrack = new CordovaAudioTrack(track.src);
        Object.assign(audioTrack, track);
        var trackId = CordovaMediaProvider.tracks.push(audioTrack);
        audioTrack.id = trackId - 1;
        return audioTrack;
    };
    CordovaMediaProvider.prototype.replace = function (oldTrack, newTrack) {
        return null;
    };
    return CordovaMediaProvider;
}(AudioProvider));
export { CordovaMediaProvider };
CordovaMediaProvider.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CordovaMediaProvider.ctorParameters = function () { return []; };
//# sourceMappingURL=ionic-audio-providers.js.map