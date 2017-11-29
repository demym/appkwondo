"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../common/utils");
var webSocketPatch = require("./websocket");
var globalEventHandlersEventNames = [
    'abort',
    'animationcancel',
    'animationend',
    'animationiteration',
    'auxclick',
    'beforeinput',
    'blur',
    'cancel',
    'canplay',
    'canplaythrough',
    'change',
    'compositionstart',
    'compositionupdate',
    'compositionend',
    'cuechange',
    'click',
    'close',
    'contextmenu',
    'curechange',
    'dblclick',
    'drag',
    'dragend',
    'dragenter',
    'dragexit',
    'dragleave',
    'dragover',
    'drop',
    'durationchange',
    'emptied',
    'ended',
    'error',
    'focus',
    'focusin',
    'focusout',
    'gotpointercapture',
    'input',
    'invalid',
    'keydown',
    'keypress',
    'keyup',
    'load',
    'loadstart',
    'loadeddata',
    'loadedmetadata',
    'lostpointercapture',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'mousewheel',
    'pause',
    'play',
    'playing',
    'pointercancel',
    'pointerdown',
    'pointerenter',
    'pointerleave',
    'pointerlockchange',
    'mozpointerlockchange',
    'webkitpointerlockerchange',
    'pointerlockerror',
    'mozpointerlockerror',
    'webkitpointerlockerror',
    'pointermove',
    'pointout',
    'pointerover',
    'pointerup',
    'progress',
    'ratechange',
    'reset',
    'resize',
    'scroll',
    'seeked',
    'seeking',
    'select',
    'selectionchange',
    'selectstart',
    'show',
    'sort',
    'stalled',
    'submit',
    'suspend',
    'timeupdate',
    'volumechange',
    'touchcancel',
    'touchmove',
    'touchstart',
    'transitioncancel',
    'transitionend',
    'waiting',
    'wheel'
];
var documentEventNames = [
    'afterscriptexecute', 'beforescriptexecute', 'DOMContentLoaded', 'fullscreenchange',
    'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange', 'fullscreenerror',
    'mozfullscreenerror', 'webkitfullscreenerror', 'msfullscreenerror', 'readystatechange'
];
var windowEventNames = [
    'absolutedeviceorientation',
    'afterinput',
    'afterprint',
    'appinstalled',
    'beforeinstallprompt',
    'beforeprint',
    'beforeunload',
    'devicelight',
    'devicemotion',
    'deviceorientation',
    'deviceorientationabsolute',
    'deviceproximity',
    'hashchange',
    'languagechange',
    'message',
    'mozbeforepaint',
    'offline',
    'online',
    'paint',
    'pageshow',
    'pagehide',
    'popstate',
    'rejectionhandled',
    'storage',
    'unhandledrejection',
    'unload',
    'userproximity',
    'vrdisplyconnected',
    'vrdisplaydisconnected',
    'vrdisplaypresentchange'
];
var htmlElementEventNames = [
    'beforecopy', 'beforecut', 'beforepaste', 'copy', 'cut', 'paste', 'dragstart', 'loadend',
    'animationstart', 'search', 'transitionrun', 'transitionstart', 'webkitanimationend',
    'webkitanimationiteration', 'webkitanimationstart', 'webkittransitionend'
];
var mediaElementEventNames = ['encrypted', 'waitingforkey', 'msneedkey', 'mozinterruptbegin', 'mozinterruptend'];
var ieElementEventNames = [
    'activate',
    'afterupdate',
    'ariarequest',
    'beforeactivate',
    'beforedeactivate',
    'beforeeditfocus',
    'beforeupdate',
    'cellchange',
    'controlselect',
    'dataavailable',
    'datasetchanged',
    'datasetcomplete',
    'errorupdate',
    'filterchange',
    'layoutcomplete',
    'losecapture',
    'move',
    'moveend',
    'movestart',
    'propertychange',
    'resizeend',
    'resizestart',
    'rowenter',
    'rowexit',
    'rowsdelete',
    'rowsinserted',
    'command',
    'compassneedscalibration',
    'deactivate',
    'help',
    'mscontentzoom',
    'msmanipulationstatechanged',
    'msgesturechange',
    'msgesturedoubletap',
    'msgestureend',
    'msgesturehold',
    'msgesturestart',
    'msgesturetap',
    'msgotpointercapture',
    'msinertiastart',
    'mslostpointercapture',
    'mspointercancel',
    'mspointerdown',
    'mspointerenter',
    'mspointerhover',
    'mspointerleave',
    'mspointermove',
    'mspointerout',
    'mspointerover',
    'mspointerup',
    'pointerout',
    'mssitemodejumplistitemremoved',
    'msthumbnailclick',
    'stop',
    'storagecommit'
];
var webglEventNames = ['webglcontextrestored', 'webglcontextlost', 'webglcontextcreationerror'];
var formEventNames = ['autocomplete', 'autocompleteerror'];
var detailEventNames = ['toggle'];
var frameEventNames = ['load'];
var frameSetEventNames = ['blur', 'error', 'focus', 'load', 'resize', 'scroll', 'messageerror'];
var marqueeEventNames = ['bounce', 'finish', 'start'];
var XMLHttpRequestEventNames = [
    'loadstart', 'progress', 'abort', 'error', 'load', 'progress', 'timeout', 'loadend',
    'readystatechange'
];
var IDBIndexEventNames = ['upgradeneeded', 'complete', 'abort', 'success', 'error', 'blocked', 'versionchange', 'close'];
var websocketEventNames = ['close', 'error', 'open', 'message'];
exports.eventNames = globalEventHandlersEventNames.concat(webglEventNames, formEventNames, detailEventNames, documentEventNames, windowEventNames, htmlElementEventNames, ieElementEventNames);
function filterProperties(target, onProperties, ignoreProperties) {
    if (!ignoreProperties) {
        return onProperties;
    }
    var tip = ignoreProperties.filter(function (ip) { return ip.target === target; });
    if (!tip || tip.length === 0) {
        return onProperties;
    }
    var targetIgnoreProperties = tip[0].ignoreProperties;
    return onProperties.filter(function (op) { return targetIgnoreProperties.indexOf(op) === -1; });
}
function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
    var filteredProperties = filterProperties(target, onProperties, ignoreProperties);
    utils_1.patchOnProperties(target, filteredProperties, prototype);
}
exports.patchFilteredProperties = patchFilteredProperties;
function propertyDescriptorPatch(api, _global) {
    if (utils_1.isNode && !utils_1.isMix) {
        return;
    }
    var supportsWebSocket = typeof WebSocket !== 'undefined';
    if (canPatchViaPropertyDescriptor()) {
        var ignoreProperties = _global.__Zone_ignore_on_properties;
        if (utils_1.isBrowser) {
            patchFilteredProperties(window, exports.eventNames.concat(['messageerror']), ignoreProperties, Object.getPrototypeOf(window));
            patchFilteredProperties(Document.prototype, exports.eventNames, ignoreProperties);
            if (typeof window['SVGElement'] !== 'undefined') {
                patchFilteredProperties(window['SVGElement'].prototype, exports.eventNames, ignoreProperties);
            }
            patchFilteredProperties(Element.prototype, exports.eventNames, ignoreProperties);
            patchFilteredProperties(HTMLElement.prototype, exports.eventNames, ignoreProperties);
            patchFilteredProperties(HTMLMediaElement.prototype, mediaElementEventNames, ignoreProperties);
            patchFilteredProperties(HTMLFrameSetElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLBodyElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLFrameElement.prototype, frameEventNames, ignoreProperties);
            patchFilteredProperties(HTMLIFrameElement.prototype, frameEventNames, ignoreProperties);
            var HTMLMarqueeElement_1 = window['HTMLMarqueeElement'];
            if (HTMLMarqueeElement_1) {
                patchFilteredProperties(HTMLMarqueeElement_1.prototype, marqueeEventNames, ignoreProperties);
            }
        }
        patchFilteredProperties(XMLHttpRequest.prototype, XMLHttpRequestEventNames, ignoreProperties);
        var XMLHttpRequestEventTarget = _global['XMLHttpRequestEventTarget'];
        if (XMLHttpRequestEventTarget) {
            patchFilteredProperties(XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype, XMLHttpRequestEventNames, ignoreProperties);
        }
        if (typeof IDBIndex !== 'undefined') {
            patchFilteredProperties(IDBIndex.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBOpenDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBDatabase.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBTransaction.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBCursor.prototype, IDBIndexEventNames, ignoreProperties);
        }
        if (supportsWebSocket) {
            patchFilteredProperties(WebSocket.prototype, websocketEventNames, ignoreProperties);
        }
    }
    else {
        patchViaCapturingAllTheEvents();
        utils_1.patchClass('XMLHttpRequest');
        if (supportsWebSocket) {
            webSocketPatch.apply(api, _global);
        }
    }
}
exports.propertyDescriptorPatch = propertyDescriptorPatch;
function canPatchViaPropertyDescriptor() {
    if ((utils_1.isBrowser || utils_1.isMix) && !Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onclick') &&
        typeof Element !== 'undefined') {
        var desc = Object.getOwnPropertyDescriptor(Element.prototype, 'onclick');
        if (desc && !desc.configurable)
            return false;
    }
    var xhrDesc = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, 'onreadystatechange');
    if (xhrDesc) {
        Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {
            enumerable: true,
            configurable: true,
            get: function () {
                return true;
            }
        });
        var req = new XMLHttpRequest();
        var result = !!req.onreadystatechange;
        Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', xhrDesc || {});
        return result;
    }
    else {
        var SYMBOL_FAKE_ONREADYSTATECHANGE_1 = utils_1.zoneSymbol('fakeonreadystatechange');
        Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {
            enumerable: true,
            configurable: true,
            get: function () {
                return this[SYMBOL_FAKE_ONREADYSTATECHANGE_1];
            },
            set: function (value) {
                this[SYMBOL_FAKE_ONREADYSTATECHANGE_1] = value;
            }
        });
        var req = new XMLHttpRequest();
        var detectFunc = function () { };
        req.onreadystatechange = detectFunc;
        var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
        req.onreadystatechange = null;
        return result;
    }
}
;
var unboundKey = utils_1.zoneSymbol('unbound');
function patchViaCapturingAllTheEvents() {
    var _loop_1 = function (i) {
        var property = exports.eventNames[i];
        var onproperty = 'on' + property;
        self.addEventListener(property, function (event) {
            var elt = event.target, bound, source;
            if (elt) {
                source = elt.constructor['name'] + '.' + onproperty;
            }
            else {
                source = 'unknown.' + onproperty;
            }
            while (elt) {
                if (elt[onproperty] && !elt[onproperty][unboundKey]) {
                    bound = Zone.current.wrap(elt[onproperty], source);
                    bound[unboundKey] = elt[onproperty];
                    elt[onproperty] = bound;
                }
                elt = elt.parentElement;
            }
        }, true);
    };
    for (var i = 0; i < exports.eventNames.length; i++) {
        _loop_1(i);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHktZGVzY3JpcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb3BlcnR5LWRlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFZQSx5Q0FBb0c7QUFFcEcsNENBQThDO0FBRTlDLElBQU0sNkJBQTZCLEdBQUc7SUFDcEMsT0FBTztJQUNQLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2Qsb0JBQW9CO0lBQ3BCLFVBQVU7SUFDVixhQUFhO0lBQ2IsTUFBTTtJQUNOLFFBQVE7SUFDUixTQUFTO0lBQ1QsZ0JBQWdCO0lBQ2hCLFFBQVE7SUFDUixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsT0FBTztJQUNQLE9BQU87SUFDUCxhQUFhO0lBQ2IsWUFBWTtJQUNaLFVBQVU7SUFDVixNQUFNO0lBQ04sU0FBUztJQUNULFdBQVc7SUFDWCxVQUFVO0lBQ1YsV0FBVztJQUNYLFVBQVU7SUFDVixNQUFNO0lBQ04sZ0JBQWdCO0lBQ2hCLFNBQVM7SUFDVCxPQUFPO0lBQ1AsT0FBTztJQUNQLE9BQU87SUFDUCxTQUFTO0lBQ1QsVUFBVTtJQUNWLG1CQUFtQjtJQUNuQixPQUFPO0lBQ1AsU0FBUztJQUNULFNBQVM7SUFDVCxVQUFVO0lBQ1YsT0FBTztJQUNQLE1BQU07SUFDTixXQUFXO0lBQ1gsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixvQkFBb0I7SUFDcEIsV0FBVztJQUNYLFlBQVk7SUFDWixZQUFZO0lBQ1osV0FBVztJQUNYLFVBQVU7SUFDVixXQUFXO0lBQ1gsU0FBUztJQUNULFlBQVk7SUFDWixPQUFPO0lBQ1AsTUFBTTtJQUNOLFNBQVM7SUFDVCxlQUFlO0lBQ2YsYUFBYTtJQUNiLGNBQWM7SUFDZCxjQUFjO0lBQ2QsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QiwyQkFBMkI7SUFDM0Isa0JBQWtCO0lBQ2xCLHFCQUFxQjtJQUNyQix3QkFBd0I7SUFDeEIsYUFBYTtJQUNiLFVBQVU7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QyxNQUFNLEVBQUUsQ0FBQyxFQUFFO2dCQUFqQyxDQUFDO0tBbUJUO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8qKlxuICogQGZpbGVvdmVydmlld1xuICogQHN1cHByZXNzIHtnbG9iYWxUaGlzfVxuICovXG5cbmltcG9ydCB7aXNCcm93c2VyLCBpc01peCwgaXNOb2RlLCBwYXRjaENsYXNzLCBwYXRjaE9uUHJvcGVydGllcywgem9uZVN5bWJvbH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcblxuaW1wb3J0ICogYXMgd2ViU29ja2V0UGF0Y2ggZnJvbSAnLi93ZWJzb2NrZXQnO1xuXG5jb25zdCBnbG9iYWxFdmVudEhhbmRsZXJzRXZlbnROYW1lcyA9IFtcbiAgJ2Fib3J0JyxcbiAgJ2FuaW1hdGlvbmNhbmNlbCcsXG4gICdhbmltYXRpb25lbmQnLFxuICAnYW5pbWF0aW9uaXRlcmF0aW9uJyxcbiAgJ2F1eGNsaWNrJyxcbiAgJ2JlZm9yZWlucHV0JyxcbiAgJ2JsdXInLFxuICAnY2FuY2VsJyxcbiAgJ2NhbnBsYXknLFxuICAnY2FucGxheXRocm91Z2gnLFxuICAnY2hhbmdlJyxcbiAgJ2NvbXBvc2l0aW9uc3RhcnQnLFxuICAnY29tcG9zaXRpb251cGRhdGUnLFxuICAnY29tcG9zaXRpb25lbmQnLFxuICAnY3VlY2hhbmdlJyxcbiAgJ2NsaWNrJyxcbiAgJ2Nsb3NlJyxcbiAgJ2NvbnRleHRtZW51JyxcbiAgJ2N1cmVjaGFuZ2UnLFxuICAnZGJsY2xpY2snLFxuICAnZHJhZycsXG4gICdkcmFnZW5kJyxcbiAgJ2RyYWdlbnRlcicsXG4gICdkcmFnZXhpdCcsXG4gICdkcmFnbGVhdmUnLFxuICAnZHJhZ292ZXInLFxuICAnZHJvcCcsXG4gICdkdXJhdGlvbmNoYW5nZScsXG4gICdlbXB0aWVkJyxcbiAgJ2VuZGVkJyxcbiAgJ2Vycm9yJyxcbiAgJ2ZvY3VzJyxcbiAgJ2ZvY3VzaW4nLFxuICAnZm9jdXNvdXQnLFxuICAnZ290cG9pbnRlcmNhcHR1cmUnLFxuICAnaW5wdXQnLFxuICAnaW52YWxpZCcsXG4gICdrZXlkb3duJyxcbiAgJ2tleXByZXNzJyxcbiAgJ2tleXVwJyxcbiAgJ2xvYWQnLFxuICAnbG9hZHN0YXJ0JyxcbiAgJ2xvYWRlZGRhdGEnLFxuICAnbG9hZGVkbWV0YWRhdGEnLFxuICAnbG9zdHBvaW50ZXJjYXB0dXJlJyxcbiAgJ21vdXNlZG93bicsXG4gICdtb3VzZWVudGVyJyxcbiAgJ21vdXNlbGVhdmUnLFxuICAnbW91c2Vtb3ZlJyxcbiAgJ21vdXNlb3V0JyxcbiAgJ21vdXNlb3ZlcicsXG4gICdtb3VzZXVwJyxcbiAgJ21vdXNld2hlZWwnLFxuICAncGF1c2UnLFxuICAncGxheScsXG4gICdwbGF5aW5nJyxcbiAgJ3BvaW50ZXJjYW5jZWwnLFxuICAncG9pbnRlcmRvd24nLFxuICAncG9pbnRlcmVudGVyJyxcbiAgJ3BvaW50ZXJsZWF2ZScsXG4gICdwb2ludGVybG9ja2NoYW5nZScsXG4gICdtb3pwb2ludGVybG9ja2NoYW5nZScsXG4gICd3ZWJraXRwb2ludGVybG9ja2VyY2hhbmdlJyxcbiAgJ3BvaW50ZXJsb2NrZXJyb3InLFxuICAnbW96cG9pbnRlcmxvY2tlcnJvcicsXG4gICd3ZWJraXRwb2ludGVybG9ja2Vycm9yJyxcbiAgJ3BvaW50ZXJtb3ZlJyxcbiAgJ3BvaW50b3V0JyxcbiAgJ3BvaW50ZXJvdmVyJyxcbiAgJ3BvaW50ZXJ1cCcsXG4gICdwcm9ncmVzcycsXG4gICdyYXRlY2hhbmdlJyxcbiAgJ3Jlc2V0JyxcbiAgJ3Jlc2l6ZScsXG4gICdzY3JvbGwnLFxuICAnc2Vla2VkJyxcbiAgJ3NlZWtpbmcnLFxuICAnc2VsZWN0JyxcbiAgJ3NlbGVjdGlvbmNoYW5nZScsXG4gICdzZWxlY3RzdGFydCcsXG4gICdzaG93JyxcbiAgJ3NvcnQnLFxuICAnc3RhbGxlZCcsXG4gICdzdWJtaXQnLFxuICAnc3VzcGVuZCcsXG4gICd0aW1ldXBkYXRlJyxcbiAgJ3ZvbHVtZWNoYW5nZScsXG4gICd0b3VjaGNhbmNlbCcsXG4gICd0b3VjaG1vdmUnLFxuICAndG91Y2hzdGFydCcsXG4gICd0cmFuc2l0aW9uY2FuY2VsJyxcbiAgJ3RyYW5zaXRpb25lbmQnLFxuICAnd2FpdGluZycsXG4gICd3aGVlbCdcbl07XG5jb25zdCBkb2N1bWVudEV2ZW50TmFtZXMgPSBbXG4gICdhZnRlcnNjcmlwdGV4ZWN1dGUnLCAnYmVmb3Jlc2NyaXB0ZXhlY3V0ZScsICdET01Db250ZW50TG9hZGVkJywgJ2Z1bGxzY3JlZW5jaGFuZ2UnLFxuICAnbW96ZnVsbHNjcmVlbmNoYW5nZScsICd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgJ21zZnVsbHNjcmVlbmNoYW5nZScsICdmdWxsc2NyZWVuZXJyb3InLFxuICAnbW96ZnVsbHNjcmVlbmVycm9yJywgJ3dlYmtpdGZ1bGxzY3JlZW5lcnJvcicsICdtc2Z1bGxzY3JlZW5lcnJvcicsICdyZWFkeXN0YXRlY2hhbmdlJ1xuXTtcbmNvbnN0IHdpbmRvd0V2ZW50TmFtZXMgPSBbXG4gICdhYnNvbHV0ZWRldmljZW9yaWVudGF0aW9uJyxcbiAgJ2FmdGVyaW5wdXQnLFxuICAnYWZ0ZXJwcmludCcsXG4gICdhcHBpbnN0YWxsZWQnLFxuICAnYmVmb3JlaW5zdGFsbHByb21wdCcsXG4gICdiZWZvcmVwcmludCcsXG4gICdiZWZvcmV1bmxvYWQnLFxuICAnZGV2aWNlbGlnaHQnLFxuICAnZGV2aWNlbW90aW9uJyxcbiAgJ2RldmljZW9yaWVudGF0aW9uJyxcbiAgJ2RldmljZW9yaWVudGF0aW9uYWJzb2x1dGUnLFxuICAnZGV2aWNlcHJveGltaXR5JyxcbiAgJ2hhc2hjaGFuZ2UnLFxuICAnbGFuZ3VhZ2VjaGFuZ2UnLFxuICAnbWVzc2FnZScsXG4gICdtb3piZWZvcmVwYWludCcsXG4gICdvZmZsaW5lJyxcbiAgJ29ubGluZScsXG4gICdwYWludCcsXG4gICdwYWdlc2hvdycsXG4gICdwYWdlaGlkZScsXG4gICdwb3BzdGF0ZScsXG4gICdyZWplY3Rpb25oYW5kbGVkJyxcbiAgJ3N0b3JhZ2UnLFxuICAndW5oYW5kbGVkcmVqZWN0aW9uJyxcbiAgJ3VubG9hZCcsXG4gICd1c2VycHJveGltaXR5JyxcbiAgJ3ZyZGlzcGx5Y29ubmVjdGVkJyxcbiAgJ3ZyZGlzcGxheWRpc2Nvbm5lY3RlZCcsXG4gICd2cmRpc3BsYXlwcmVzZW50Y2hhbmdlJ1xuXTtcbmNvbnN0IGh0bWxFbGVtZW50RXZlbnROYW1lcyA9IFtcbiAgJ2JlZm9yZWNvcHknLCAnYmVmb3JlY3V0JywgJ2JlZm9yZXBhc3RlJywgJ2NvcHknLCAnY3V0JywgJ3Bhc3RlJywgJ2RyYWdzdGFydCcsICdsb2FkZW5kJyxcbiAgJ2FuaW1hdGlvbnN0YXJ0JywgJ3NlYXJjaCcsICd0cmFuc2l0aW9ucnVuJywgJ3RyYW5zaXRpb25zdGFydCcsICd3ZWJraXRhbmltYXRpb25lbmQnLFxuICAnd2Via2l0YW5pbWF0aW9uaXRlcmF0aW9uJywgJ3dlYmtpdGFuaW1hdGlvbnN0YXJ0JywgJ3dlYmtpdHRyYW5zaXRpb25lbmQnXG5dO1xuY29uc3QgbWVkaWFFbGVtZW50RXZlbnROYW1lcyA9XG4gICAgWydlbmNyeXB0ZWQnLCAnd2FpdGluZ2ZvcmtleScsICdtc25lZWRrZXknLCAnbW96aW50ZXJydXB0YmVnaW4nLCAnbW96aW50ZXJydXB0ZW5kJ107XG5jb25zdCBpZUVsZW1lbnRFdmVudE5hbWVzID0gW1xuICAnYWN0aXZhdGUnLFxuICAnYWZ0ZXJ1cGRhdGUnLFxuICAnYXJpYXJlcXVlc3QnLFxuICAnYmVmb3JlYWN0aXZhdGUnLFxuICAnYmVmb3JlZGVhY3RpdmF0ZScsXG4gICdiZWZvcmVlZGl0Zm9jdXMnLFxuICAnYmVmb3JldXBkYXRlJyxcbiAgJ2NlbGxjaGFuZ2UnLFxuICAnY29udHJvbHNlbGVjdCcsXG4gICdkYXRhYXZhaWxhYmxlJyxcbiAgJ2RhdGFzZXRjaGFuZ2VkJyxcbiAgJ2RhdGFzZXRjb21wbGV0ZScsXG4gICdlcnJvcnVwZGF0ZScsXG4gICdmaWx0ZXJjaGFuZ2UnLFxuICAnbGF5b3V0Y29tcGxldGUnLFxuICAnbG9zZWNhcHR1cmUnLFxuICAnbW92ZScsXG4gICdtb3ZlZW5kJyxcbiAgJ21vdmVzdGFydCcsXG4gICdwcm9wZXJ0eWNoYW5nZScsXG4gICdyZXNpemVlbmQnLFxuICAncmVzaXplc3RhcnQnLFxuICAncm93ZW50ZXInLFxuICAncm93ZXhpdCcsXG4gICdyb3dzZGVsZXRlJyxcbiAgJ3Jvd3NpbnNlcnRlZCcsXG4gICdjb21tYW5kJyxcbiAgJ2NvbXBhc3NuZWVkc2NhbGlicmF0aW9uJyxcbiAgJ2RlYWN0aXZhdGUnLFxuICAnaGVscCcsXG4gICdtc2NvbnRlbnR6b29tJyxcbiAgJ21zbWFuaXB1bGF0aW9uc3RhdGVjaGFuZ2VkJyxcbiAgJ21zZ2VzdHVyZWNoYW5nZScsXG4gICdtc2dlc3R1cmVkb3VibGV0YXAnLFxuICAnbXNnZXN0dXJlZW5kJyxcbiAgJ21zZ2VzdHVyZWhvbGQnLFxuICAnbXNnZXN0dXJlc3RhcnQnLFxuICAnbXNnZXN0dXJldGFwJyxcbiAgJ21zZ290cG9pbnRlcmNhcHR1cmUnLFxuICAnbXNpbmVydGlhc3RhcnQnLFxuICAnbXNsb3N0cG9pbnRlcmNhcHR1cmUnLFxuICAnbXNwb2ludGVyY2FuY2VsJyxcbiAgJ21zcG9pbnRlcmRvd24nLFxuICAnbXNwb2ludGVyZW50ZXInLFxuICAnbXNwb2ludGVyaG92ZXInLFxuICAnbXNwb2ludGVybGVhdmUnLFxuICAnbXNwb2ludGVybW92ZScsXG4gICdtc3BvaW50ZXJvdXQnLFxuICAnbXNwb2ludGVyb3ZlcicsXG4gICdtc3BvaW50ZXJ1cCcsXG4gICdwb2ludGVyb3V0JyxcbiAgJ21zc2l0ZW1vZGVqdW1wbGlzdGl0ZW1yZW1vdmVkJyxcbiAgJ21zdGh1bWJuYWlsY2xpY2snLFxuICAnc3RvcCcsXG4gICdzdG9yYWdlY29tbWl0J1xuXTtcbmNvbnN0IHdlYmdsRXZlbnROYW1lcyA9IFsnd2ViZ2xjb250ZXh0cmVzdG9yZWQnLCAnd2ViZ2xjb250ZXh0bG9zdCcsICd3ZWJnbGNvbnRleHRjcmVhdGlvbmVycm9yJ107XG5jb25zdCBmb3JtRXZlbnROYW1lcyA9IFsnYXV0b2NvbXBsZXRlJywgJ2F1dG9jb21wbGV0ZWVycm9yJ107XG5jb25zdCBkZXRhaWxFdmVudE5hbWVzID0gWyd0b2dnbGUnXTtcbmNvbnN0IGZyYW1lRXZlbnROYW1lcyA9IFsnbG9hZCddO1xuY29uc3QgZnJhbWVTZXRFdmVudE5hbWVzID0gWydibHVyJywgJ2Vycm9yJywgJ2ZvY3VzJywgJ2xvYWQnLCAncmVzaXplJywgJ3Njcm9sbCcsICdtZXNzYWdlZXJyb3InXTtcbmNvbnN0IG1hcnF1ZWVFdmVudE5hbWVzID0gWydib3VuY2UnLCAnZmluaXNoJywgJ3N0YXJ0J107XG5cbmNvbnN0IFhNTEh0dHBSZXF1ZXN0RXZlbnROYW1lcyA9IFtcbiAgJ2xvYWRzdGFydCcsICdwcm9ncmVzcycsICdhYm9ydCcsICdlcnJvcicsICdsb2FkJywgJ3Byb2dyZXNzJywgJ3RpbWVvdXQnLCAnbG9hZGVuZCcsXG4gICdyZWFkeXN0YXRlY2hhbmdlJ1xuXTtcbmNvbnN0IElEQkluZGV4RXZlbnROYW1lcyA9XG4gICAgWyd1cGdyYWRlbmVlZGVkJywgJ2NvbXBsZXRlJywgJ2Fib3J0JywgJ3N1Y2Nlc3MnLCAnZXJyb3InLCAnYmxvY2tlZCcsICd2ZXJzaW9uY2hhbmdlJywgJ2Nsb3NlJ107XG5jb25zdCB3ZWJzb2NrZXRFdmVudE5hbWVzID0gWydjbG9zZScsICdlcnJvcicsICdvcGVuJywgJ21lc3NhZ2UnXTtcblxuZXhwb3J0IGNvbnN0IGV2ZW50TmFtZXMgPSBnbG9iYWxFdmVudEhhbmRsZXJzRXZlbnROYW1lcy5jb25jYXQoXG4gICAgd2ViZ2xFdmVudE5hbWVzLCBmb3JtRXZlbnROYW1lcywgZGV0YWlsRXZlbnROYW1lcywgZG9jdW1lbnRFdmVudE5hbWVzLCB3aW5kb3dFdmVudE5hbWVzLFxuICAgIGh0bWxFbGVtZW50RXZlbnROYW1lcywgaWVFbGVtZW50RXZlbnROYW1lcyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSWdub3JlUHJvcGVydHkge1xuICB0YXJnZXQ6IGFueTtcbiAgaWdub3JlUHJvcGVydGllczogc3RyaW5nW107XG59XG5cbmZ1bmN0aW9uIGZpbHRlclByb3BlcnRpZXMoXG4gICAgdGFyZ2V0OiBhbnksIG9uUHJvcGVydGllczogc3RyaW5nW10sIGlnbm9yZVByb3BlcnRpZXM6IElnbm9yZVByb3BlcnR5W10pOiBzdHJpbmdbXSB7XG4gIGlmICghaWdub3JlUHJvcGVydGllcykge1xuICAgIHJldHVybiBvblByb3BlcnRpZXM7XG4gIH1cblxuICBjb25zdCB0aXA6IElnbm9yZVByb3BlcnR5W10gPSBpZ25vcmVQcm9wZXJ0aWVzLmZpbHRlcihpcCA9PiBpcC50YXJnZXQgPT09IHRhcmdldCk7XG4gIGlmICghdGlwIHx8IHRpcC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb25Qcm9wZXJ0aWVzO1xuICB9XG5cbiAgY29uc3QgdGFyZ2V0SWdub3JlUHJvcGVydGllczogc3RyaW5nW10gPSB0aXBbMF0uaWdub3JlUHJvcGVydGllcztcbiAgcmV0dXJuIG9uUHJvcGVydGllcy5maWx0ZXIob3AgPT4gdGFyZ2V0SWdub3JlUHJvcGVydGllcy5pbmRleE9mKG9wKSA9PT0gLTEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoXG4gICAgdGFyZ2V0OiBhbnksIG9uUHJvcGVydGllczogc3RyaW5nW10sIGlnbm9yZVByb3BlcnRpZXM6IElnbm9yZVByb3BlcnR5W10sIHByb3RvdHlwZT86IGFueSkge1xuICBjb25zdCBmaWx0ZXJlZFByb3BlcnRpZXM6IHN0cmluZ1tdID0gZmlsdGVyUHJvcGVydGllcyh0YXJnZXQsIG9uUHJvcGVydGllcywgaWdub3JlUHJvcGVydGllcyk7XG4gIHBhdGNoT25Qcm9wZXJ0aWVzKHRhcmdldCwgZmlsdGVyZWRQcm9wZXJ0aWVzLCBwcm90b3R5cGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvcGVydHlEZXNjcmlwdG9yUGF0Y2goYXBpOiBfWm9uZVByaXZhdGUsIF9nbG9iYWw6IGFueSkge1xuICBpZiAoaXNOb2RlICYmICFpc01peCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHN1cHBvcnRzV2ViU29ja2V0ID0gdHlwZW9mIFdlYlNvY2tldCAhPT0gJ3VuZGVmaW5lZCc7XG4gIGlmIChjYW5QYXRjaFZpYVByb3BlcnR5RGVzY3JpcHRvcigpKSB7XG4gICAgY29uc3QgaWdub3JlUHJvcGVydGllczogSWdub3JlUHJvcGVydHlbXSA9IF9nbG9iYWwuX19ab25lX2lnbm9yZV9vbl9wcm9wZXJ0aWVzO1xuICAgIC8vIGZvciBicm93c2VycyB0aGF0IHdlIGNhbiBwYXRjaCB0aGUgZGVzY3JpcHRvcjogIENocm9tZSAmIEZpcmVmb3hcbiAgICBpZiAoaXNCcm93c2VyKSB7XG4gICAgICAvLyBpbiBJRS9FZGdlLCBvblByb3Agbm90IGV4aXN0IGluIHdpbmRvdyBvYmplY3QsIGJ1dCBpbiBXaW5kb3dQcm90b3R5cGVcbiAgICAgIC8vIHNvIHdlIG5lZWQgdG8gcGFzcyBXaW5kb3dQcm90b3R5cGUgdG8gY2hlY2sgb25Qcm9wIGV4aXN0IG9yIG5vdFxuICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoXG4gICAgICAgICAgd2luZG93LCBldmVudE5hbWVzLmNvbmNhdChbJ21lc3NhZ2VlcnJvciddKSwgaWdub3JlUHJvcGVydGllcyxcbiAgICAgICAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2Yod2luZG93KSk7XG4gICAgICBwYXRjaEZpbHRlcmVkUHJvcGVydGllcyhEb2N1bWVudC5wcm90b3R5cGUsIGV2ZW50TmFtZXMsIGlnbm9yZVByb3BlcnRpZXMpO1xuXG4gICAgICBpZiAodHlwZW9mKDxhbnk+d2luZG93KVsnU1ZHRWxlbWVudCddICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwYXRjaEZpbHRlcmVkUHJvcGVydGllcyhcbiAgICAgICAgICAgICg8YW55PndpbmRvdylbJ1NWR0VsZW1lbnQnXS5wcm90b3R5cGUsIGV2ZW50TmFtZXMsIGlnbm9yZVByb3BlcnRpZXMpO1xuICAgICAgfVxuICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoRWxlbWVudC5wcm90b3R5cGUsIGV2ZW50TmFtZXMsIGlnbm9yZVByb3BlcnRpZXMpO1xuICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoSFRNTEVsZW1lbnQucHJvdG90eXBlLCBldmVudE5hbWVzLCBpZ25vcmVQcm9wZXJ0aWVzKTtcbiAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKEhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLCBtZWRpYUVsZW1lbnRFdmVudE5hbWVzLCBpZ25vcmVQcm9wZXJ0aWVzKTtcbiAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKFxuICAgICAgICAgIEhUTUxGcmFtZVNldEVsZW1lbnQucHJvdG90eXBlLCB3aW5kb3dFdmVudE5hbWVzLmNvbmNhdChmcmFtZVNldEV2ZW50TmFtZXMpLFxuICAgICAgICAgIGlnbm9yZVByb3BlcnRpZXMpO1xuICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoXG4gICAgICAgICAgSFRNTEJvZHlFbGVtZW50LnByb3RvdHlwZSwgd2luZG93RXZlbnROYW1lcy5jb25jYXQoZnJhbWVTZXRFdmVudE5hbWVzKSwgaWdub3JlUHJvcGVydGllcyk7XG4gICAgICBwYXRjaEZpbHRlcmVkUHJvcGVydGllcyhIVE1MRnJhbWVFbGVtZW50LnByb3RvdHlwZSwgZnJhbWVFdmVudE5hbWVzLCBpZ25vcmVQcm9wZXJ0aWVzKTtcbiAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKEhUTUxJRnJhbWVFbGVtZW50LnByb3RvdHlwZSwgZnJhbWVFdmVudE5hbWVzLCBpZ25vcmVQcm9wZXJ0aWVzKTtcblxuICAgICAgY29uc3QgSFRNTE1hcnF1ZWVFbGVtZW50ID0gKHdpbmRvdyBhcyBhbnkpWydIVE1MTWFycXVlZUVsZW1lbnQnXTtcbiAgICAgIGlmIChIVE1MTWFycXVlZUVsZW1lbnQpIHtcbiAgICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoSFRNTE1hcnF1ZWVFbGVtZW50LnByb3RvdHlwZSwgbWFycXVlZUV2ZW50TmFtZXMsIGlnbm9yZVByb3BlcnRpZXMpO1xuICAgICAgfVxuICAgIH1cbiAgICBwYXRjaEZpbHRlcmVkUHJvcGVydGllcyhYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsIFhNTEh0dHBSZXF1ZXN0RXZlbnROYW1lcywgaWdub3JlUHJvcGVydGllcyk7XG4gICAgY29uc3QgWE1MSHR0cFJlcXVlc3RFdmVudFRhcmdldCA9IF9nbG9iYWxbJ1hNTEh0dHBSZXF1ZXN0RXZlbnRUYXJnZXQnXTtcbiAgICBpZiAoWE1MSHR0cFJlcXVlc3RFdmVudFRhcmdldCkge1xuICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoXG4gICAgICAgICAgWE1MSHR0cFJlcXVlc3RFdmVudFRhcmdldCAmJiBYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0LnByb3RvdHlwZSxcbiAgICAgICAgICBYTUxIdHRwUmVxdWVzdEV2ZW50TmFtZXMsIGlnbm9yZVByb3BlcnRpZXMpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIElEQkluZGV4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoSURCSW5kZXgucHJvdG90eXBlLCBJREJJbmRleEV2ZW50TmFtZXMsIGlnbm9yZVByb3BlcnRpZXMpO1xuICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoSURCUmVxdWVzdC5wcm90b3R5cGUsIElEQkluZGV4RXZlbnROYW1lcywgaWdub3JlUHJvcGVydGllcyk7XG4gICAgICBwYXRjaEZpbHRlcmVkUHJvcGVydGllcyhJREJPcGVuREJSZXF1ZXN0LnByb3RvdHlwZSwgSURCSW5kZXhFdmVudE5hbWVzLCBpZ25vcmVQcm9wZXJ0aWVzKTtcbiAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKElEQkRhdGFiYXNlLnByb3RvdHlwZSwgSURCSW5kZXhFdmVudE5hbWVzLCBpZ25vcmVQcm9wZXJ0aWVzKTtcbiAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKElEQlRyYW5zYWN0aW9uLnByb3RvdHlwZSwgSURCSW5kZXhFdmVudE5hbWVzLCBpZ25vcmVQcm9wZXJ0aWVzKTtcbiAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKElEQkN1cnNvci5wcm90b3R5cGUsIElEQkluZGV4RXZlbnROYW1lcywgaWdub3JlUHJvcGVydGllcyk7XG4gICAgfVxuICAgIGlmIChzdXBwb3J0c1dlYlNvY2tldCkge1xuICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoV2ViU29ja2V0LnByb3RvdHlwZSwgd2Vic29ja2V0RXZlbnROYW1lcywgaWdub3JlUHJvcGVydGllcyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIFNhZmFyaSwgQW5kcm9pZCBicm93c2VycyAoSmVsbHkgQmVhbilcbiAgICBwYXRjaFZpYUNhcHR1cmluZ0FsbFRoZUV2ZW50cygpO1xuICAgIHBhdGNoQ2xhc3MoJ1hNTEh0dHBSZXF1ZXN0Jyk7XG4gICAgaWYgKHN1cHBvcnRzV2ViU29ja2V0KSB7XG4gICAgICB3ZWJTb2NrZXRQYXRjaC5hcHBseShhcGksIF9nbG9iYWwpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjYW5QYXRjaFZpYVByb3BlcnR5RGVzY3JpcHRvcigpIHtcbiAgaWYgKChpc0Jyb3dzZXIgfHwgaXNNaXgpICYmICFPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEhUTUxFbGVtZW50LnByb3RvdHlwZSwgJ29uY2xpY2snKSAmJlxuICAgICAgdHlwZW9mIEVsZW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gV2ViS2l0IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzQzNjRcbiAgICAvLyBJREwgaW50ZXJmYWNlIGF0dHJpYnV0ZXMgYXJlIG5vdCBjb25maWd1cmFibGVcbiAgICBjb25zdCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihFbGVtZW50LnByb3RvdHlwZSwgJ29uY2xpY2snKTtcbiAgICBpZiAoZGVzYyAmJiAhZGVzYy5jb25maWd1cmFibGUpIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHhockRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSwgJ29ucmVhZHlzdGF0ZWNoYW5nZScpO1xuXG4gIC8vIGFkZCBlbnVtZXJhYmxlIGFuZCBjb25maWd1cmFibGUgaGVyZSBiZWNhdXNlIGluIG9wZXJhXG4gIC8vIGJ5IGRlZmF1bHQgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9ucmVhZHlzdGF0ZWNoYW5nZSBpcyB1bmRlZmluZWRcbiAgLy8gd2l0aG91dCBhZGRpbmcgZW51bWVyYWJsZSBhbmQgY29uZmlndXJhYmxlIHdpbGwgY2F1c2Ugb25yZWFkeXN0YXRlY2hhbmdlXG4gIC8vIG5vbi1jb25maWd1cmFibGVcbiAgLy8gYW5kIGlmIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vbnJlYWR5c3RhdGVjaGFuZ2UgaXMgdW5kZWZpbmVkLFxuICAvLyB3ZSBzaG91bGQgc2V0IGEgcmVhbCBkZXNjIGluc3RlYWQgYSBmYWtlIG9uZVxuICBpZiAoeGhyRGVzYykge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsICdvbnJlYWR5c3RhdGVjaGFuZ2UnLCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgY29uc3QgcmVzdWx0ID0gISFyZXEub25yZWFkeXN0YXRlY2hhbmdlO1xuICAgIC8vIHJlc3RvcmUgb3JpZ2luYWwgZGVzY1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsICdvbnJlYWR5c3RhdGVjaGFuZ2UnLCB4aHJEZXNjIHx8IHt9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IFNZTUJPTF9GQUtFX09OUkVBRFlTVEFURUNIQU5HRSA9IHpvbmVTeW1ib2woJ2Zha2VvbnJlYWR5c3RhdGVjaGFuZ2UnKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLCAnb25yZWFkeXN0YXRlY2hhbmdlJywge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzW1NZTUJPTF9GQUtFX09OUkVBRFlTVEFURUNIQU5HRV07XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICB0aGlzW1NZTUJPTF9GQUtFX09OUkVBRFlTVEFURUNIQU5HRV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICBjb25zdCBkZXRlY3RGdW5jID0gKCkgPT4ge307XG4gICAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGRldGVjdEZ1bmM7XG4gICAgY29uc3QgcmVzdWx0ID0gKHJlcSBhcyBhbnkpW1NZTUJPTF9GQUtFX09OUkVBRFlTVEFURUNIQU5HRV0gPT09IGRldGVjdEZ1bmM7XG4gICAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcblxuY29uc3QgdW5ib3VuZEtleSA9IHpvbmVTeW1ib2woJ3VuYm91bmQnKTtcblxuLy8gV2hlbmV2ZXIgYW55IGV2ZW50TGlzdGVuZXIgZmlyZXMsIHdlIGNoZWNrIHRoZSBldmVudExpc3RlbmVyIHRhcmdldCBhbmQgYWxsIHBhcmVudHNcbi8vIGZvciBgb253aGF0ZXZlcmAgcHJvcGVydGllcyBhbmQgcmVwbGFjZSB0aGVtIHdpdGggem9uZS1ib3VuZCBmdW5jdGlvbnNcbi8vIC0gQ2hyb21lIChmb3Igbm93KVxuZnVuY3Rpb24gcGF0Y2hWaWFDYXB0dXJpbmdBbGxUaGVFdmVudHMoKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnROYW1lcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHByb3BlcnR5ID0gZXZlbnROYW1lc1tpXTtcbiAgICBjb25zdCBvbnByb3BlcnR5ID0gJ29uJyArIHByb3BlcnR5O1xuICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcihwcm9wZXJ0eSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGxldCBlbHQ6IGFueSA9IDxOb2RlPmV2ZW50LnRhcmdldCwgYm91bmQsIHNvdXJjZTtcbiAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgc291cmNlID0gZWx0LmNvbnN0cnVjdG9yWyduYW1lJ10gKyAnLicgKyBvbnByb3BlcnR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc291cmNlID0gJ3Vua25vd24uJyArIG9ucHJvcGVydHk7XG4gICAgICB9XG4gICAgICB3aGlsZSAoZWx0KSB7XG4gICAgICAgIGlmIChlbHRbb25wcm9wZXJ0eV0gJiYgIWVsdFtvbnByb3BlcnR5XVt1bmJvdW5kS2V5XSkge1xuICAgICAgICAgIGJvdW5kID0gWm9uZS5jdXJyZW50LndyYXAoZWx0W29ucHJvcGVydHldLCBzb3VyY2UpO1xuICAgICAgICAgIGJvdW5kW3VuYm91bmRLZXldID0gZWx0W29ucHJvcGVydHldO1xuICAgICAgICAgIGVsdFtvbnByb3BlcnR5XSA9IGJvdW5kO1xuICAgICAgICB9XG4gICAgICAgIGVsdCA9IGVsdC5wYXJlbnRFbGVtZW50O1xuICAgICAgfVxuICAgIH0sIHRydWUpO1xuICB9XG59XG4iXX0=