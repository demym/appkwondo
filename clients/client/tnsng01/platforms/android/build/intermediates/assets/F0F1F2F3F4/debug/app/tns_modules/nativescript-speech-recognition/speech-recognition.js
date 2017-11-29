"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application = require("tns-core-modules/application");
var utils = require("tns-core-modules/utils/utils");
var SpeechRecognition = (function () {
    function SpeechRecognition() {
        var _this = this;
        this.recognizer = null;
        var self = this;
        application.android.on(application.AndroidApplication.activityRequestPermissionsEvent, function (args) {
            for (var i = 0; i < args.permissions.length; i++) {
                if (args.grantResults[i] === android.content.pm.PackageManager.PERMISSION_DENIED) {
                    if (self.onPermissionRejected) {
                        self.onPermissionRejected("Please allow access to the Microphone and try again.");
                    }
                    else {
                        console.log("Please allow access to the Microphone and try again. (tip: pass in a reject to receive this message in your app)");
                    }
                    return;
                }
            }
            if (self.onPermissionGranted) {
                self.onPermissionGranted();
            }
        });
        application.on(application.suspendEvent, function (args) {
            if (_this.recognizer !== null) {
                _this.stopListening();
            }
        });
    }
    SpeechRecognition.prototype.available = function () {
        return new Promise(function (resolve, reject) {
            resolve(android.speech.SpeechRecognizer.isRecognitionAvailable(application.android.context));
        });
    };
    SpeechRecognition.prototype.requestPermission = function () {
        var _this = this;
        console.log(">> requestPermission");
        return new Promise(function (resolve, reject) {
            _this._requestPermission(function () { return resolve(true); }, function () { return resolve(false); });
        });
    };
    SpeechRecognition.prototype.startListening = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var onPermissionGranted = function () {
                var loopHandler = new android.os.Handler(android.os.Looper.getMainLooper());
                loopHandler.post(new java.lang.Runnable({
                    run: function () {
                        _this.recognizer = android.speech.SpeechRecognizer.createSpeechRecognizer(application.android.context);
                        _this.recognizer.setRecognitionListener(new android.speech.RecognitionListener({
                            onReadyForSpeech: function (params) {
                                resolve(true);
                            },
                            onBeginningOfSpeech: function () {
                            },
                            onRmsChanged: function (rmsdB) {
                            },
                            onBufferReceived: function (buffer) {
                            },
                            onEndOfSpeech: function () {
                            },
                            onError: function (error) {
                                console.log("Error: " + error);
                                reject("Error code: " + error);
                            },
                            onResults: function (results) {
                                this.sendBackResults(results, false);
                            },
                            onPartialResults: function (partialResults) {
                                if (options.returnPartialResults) {
                                    this.sendBackResults(partialResults, true);
                                }
                            },
                            sendBackResults: function (results, partial) {
                                var transcripts = results.getStringArrayList(android.speech.SpeechRecognizer.RESULTS_RECOGNITION);
                                var transcript = null;
                                if (!transcripts.isEmpty()) {
                                    transcript = transcripts.get(0);
                                }
                                options.onResult({
                                    text: transcript,
                                    finished: !partial
                                });
                            },
                            onEvent: function (eventType, params) {
                            }
                        }));
                    }
                }));
                var intent = new android.content.Intent(android.speech.RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
                intent.putExtra(android.speech.RecognizerIntent.EXTRA_LANGUAGE_MODEL, android.speech.RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
                intent.putExtra(android.speech.RecognizerIntent.EXTRA_CALLING_PACKAGE, "voice.recognition.test");
                if (options.locale) {
                    intent.putExtra(android.speech.RecognizerIntent.EXTRA_LANGUAGE, options.locale);
                }
                if (options.returnPartialResults) {
                    intent.putExtra(android.speech.RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
                }
                intent.putExtra(android.speech.RecognizerIntent.EXTRA_MAX_RESULTS, 100);
                loopHandler.post(new java.lang.Runnable({
                    run: function () {
                        _this.recognizer.startListening(intent);
                    }
                }));
            };
            if (!_this.wasPermissionGranted()) {
                _this._requestPermission(onPermissionGranted, reject);
                return;
            }
            onPermissionGranted();
        });
    };
    SpeechRecognition.prototype.stopListening = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.recognizer === null) {
                reject("Not running");
                return;
            }
            var loopHandler = new android.os.Handler(android.os.Looper.getMainLooper());
            loopHandler.post(new java.lang.Runnable({
                run: function () {
                    _this.recognizer.stopListening();
                    _this.recognizer.cancel();
                    _this.recognizer.destroy();
                    _this.recognizer = null;
                    resolve();
                }
            }));
        });
    };
    SpeechRecognition.prototype.wasPermissionGranted = function () {
        var hasPermission = android.os.Build.VERSION.SDK_INT < 23;
        if (!hasPermission) {
            hasPermission = android.content.pm.PackageManager.PERMISSION_GRANTED ===
                android.support.v4.content.ContextCompat.checkSelfPermission(utils.ad.getApplicationContext(), android.Manifest.permission.RECORD_AUDIO);
        }
        return hasPermission;
    };
    SpeechRecognition.prototype._requestPermission = function (onPermissionGranted, reject) {
        this.onPermissionGranted = onPermissionGranted;
        this.onPermissionRejected = reject;
        android.support.v4.app.ActivityCompat.requestPermissions(application.android.foregroundActivity, [android.Manifest.permission.RECORD_AUDIO], 444);
    };
    return SpeechRecognition;
}());
exports.SpeechRecognition = SpeechRecognition;
//# sourceMappingURL=speech-recognition.js.map