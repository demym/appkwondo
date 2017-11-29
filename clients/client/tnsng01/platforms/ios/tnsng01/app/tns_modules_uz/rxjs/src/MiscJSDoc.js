"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("./Observable");
require("./observable/dom/MiscJSDoc");
var ObservableDoc = (function () {
    function ObservableDoc() {
    }
    ObservableDoc.create = function (onSubscription) {
        return new Observable_1.Observable(onSubscription);
    };
    ;
    return ObservableDoc;
}());
exports.ObservableDoc = ObservableDoc;
var ObserverDoc = (function () {
    function ObserverDoc() {
        this.closed = false;
    }
    ObserverDoc.prototype.next = function (value) {
        return void 0;
    };
    ObserverDoc.prototype.error = function (err) {
        return void 0;
    };
    ObserverDoc.prototype.complete = function () {
        return void 0;
    };
    return ObserverDoc;
}());
exports.ObserverDoc = ObserverDoc;
var SubscribableOrPromiseDoc = (function () {
    function SubscribableOrPromiseDoc() {
    }
    return SubscribableOrPromiseDoc;
}());
exports.SubscribableOrPromiseDoc = SubscribableOrPromiseDoc;
var ObservableInputDoc = (function () {
    function ObservableInputDoc() {
    }
    return ObservableInputDoc;
}());
exports.ObservableInputDoc = ObservableInputDoc;
var TeardownLogicDoc = (function () {
    function TeardownLogicDoc() {
    }
    return TeardownLogicDoc;
}());
exports.TeardownLogicDoc = TeardownLogicDoc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlzY0pTRG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTWlzY0pTRG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUUEsMkNBQTBDO0FBQzFDLHNDQUFvQztBQVFwQztJQUFBO0lBMkhBLENBQUM7SUFIUSxvQkFBTSxHQUFiLFVBQWlCLGNBQTJEO1FBQzFFLE1BQU0sQ0FBQyxJQUFJLHVCQUFVLENBQUksY0FBYyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUFBLENBQUM7SUFDSixvQkFBQztBQUFELENBQUMsQUEzSEQsSUEySEM7QUEzSFksc0NBQWE7QUFxSjFCO0lBQUE7UUFNRSxXQUFNLEdBQVksS0FBSyxDQUFDO0lBNkIxQixDQUFDO0lBdEJDLDBCQUFJLEdBQUosVUFBSyxLQUFRO1FBQ1gsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFRRCwyQkFBSyxHQUFMLFVBQU0sR0FBUTtRQUNaLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBT0QsOEJBQVEsR0FBUjtRQUNFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBbkNELElBbUNDO0FBbkNZLGtDQUFXO0FBMkh4QjtJQUFBO0lBRUEsQ0FBQztJQUFELCtCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSw0REFBd0I7QUFnSXJDO0lBQUE7SUFFQSxDQUFDO0lBQUQseUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLGdEQUFrQjtBQStCL0I7SUFBQTtJQUVBLENBQUM7SUFBRCx1QkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFRoaXMgZmlsZSBhbmQgaXRzIGRlZmluaXRpb25zIGFyZSBuZWVkZWQganVzdCBzbyB0aGF0IEVTRG9jIHNlZXMgdGhlc2VcbiAqIEpTRG9jIGRvY3VtZW50YXRpb24gY29tbWVudHMuIE9yaWdpbmFsbHkgdGhleSB3ZXJlIG1lYW50IGZvciBzb21lIFR5cGVTY3JpcHRcbiAqIGludGVyZmFjZXMsIGJ1dCBUeXBlU2NyaXB0IHN0cmlwcyBhd2F5IEpTRG9jIGNvbW1lbnRzIG5lYXIgaW50ZXJmYWNlcy4gSGVuY2UsXG4gKiB3ZSBuZWVkIHRoZXNlIGJvZ3VzIGNsYXNzZXMsIHdoaWNoIGFyZSBub3Qgc3RyaXBwZWQgYXdheS4gVGhpcyBmaWxlIG9uIHRoZVxuICogb3RoZXIgaGFuZCwgaXMgbm90IGluY2x1ZGVkIGluIHRoZSByZWxlYXNlIGJ1bmRsZS5cbiAqL1xuaW1wb3J0IHsgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuL09ic2VydmFibGUnO1xuaW1wb3J0ICcuL29ic2VydmFibGUvZG9tL01pc2NKU0RvYyc7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJy4vT2JzZXJ2ZXInO1xuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIE9ic2VydmFibGVEb2Mge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBPYnNlcnZhYmxlLCB0aGF0IHdpbGwgZXhlY3V0ZSB0aGUgc3BlY2lmaWVkIGZ1bmN0aW9uIHdoZW4gYW5cbiAgICoge0BsaW5rIE9ic2VydmVyfSBzdWJzY3JpYmVzIHRvIGl0LlxuICAgKlxuICAgKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+Q3JlYXRlIGN1c3RvbSBPYnNlcnZhYmxlLCB0aGF0IGRvZXMgd2hhdGV2ZXIgeW91IGxpa2UuPC9zcGFuPlxuICAgKlxuICAgKiA8aW1nIHNyYz1cIi4vaW1nL2NyZWF0ZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAgICpcbiAgICogYGNyZWF0ZWAgY29udmVydHMgYW4gYG9uU3Vic2NyaXB0aW9uYCBmdW5jdGlvbiB0byBhbiBhY3R1YWwgT2JzZXJ2YWJsZS5cbiAgICogV2hlbmV2ZXIgc29tZW9uZSBzdWJzY3JpYmVzIHRvIHRoYXQgT2JzZXJ2YWJsZSwgdGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkXG4gICAqIHdpdGggYW4ge0BsaW5rIE9ic2VydmVyfSBpbnN0YW5jZSBhcyBhIGZpcnN0IGFuZCBvbmx5IHBhcmFtZXRlci4gYG9uU3Vic2NyaXB0aW9uYCBzaG91bGRcbiAgICogdGhlbiBpbnZva2UgdGhlIE9ic2VydmVycyBgbmV4dGAsIGBlcnJvcmAgYW5kIGBjb21wbGV0ZWAgbWV0aG9kcy5cbiAgICpcbiAgICogQ2FsbGluZyBgbmV4dGAgd2l0aCBhIHZhbHVlIHdpbGwgZW1pdCB0aGF0IHZhbHVlIHRvIHRoZSBvYnNlcnZlci4gQ2FsbGluZyBgY29tcGxldGVgXG4gICAqIG1lYW5zIHRoYXQgT2JzZXJ2YWJsZSBmaW5pc2hlZCBlbWl0dGluZyBhbmQgd2lsbCBub3QgZG8gYW55dGhpbmcgZWxzZS5cbiAgICogQ2FsbGluZyBgZXJyb3JgIG1lYW5zIHRoYXQgc29tZXRoaW5nIHdlbnQgd3JvbmcgLSB2YWx1ZSBwYXNzZWQgdG8gYGVycm9yYCBtZXRob2Qgc2hvdWxkXG4gICAqIHByb3ZpZGUgZGV0YWlscyBvbiB3aGF0IGV4YWN0bHkgaGFwcGVuZWQuXG4gICAqXG4gICAqIEEgd2VsbC1mb3JtZWQgT2JzZXJ2YWJsZSBjYW4gZW1pdCBhcyBtYW55IHZhbHVlcyBhcyBpdCBuZWVkcyB2aWEgYG5leHRgIG1ldGhvZCxcbiAgICogYnV0IGBjb21wbGV0ZWAgYW5kIGBlcnJvcmAgbWV0aG9kcyBjYW4gYmUgY2FsbGVkIG9ubHkgb25jZSBhbmQgbm90aGluZyBlbHNlIGNhbiBiZSBjYWxsZWRcbiAgICogdGhlcmVhZnRlci4gSWYgeW91IHRyeSB0byBpbnZva2UgYG5leHRgLCBgY29tcGxldGVgIG9yIGBlcnJvcmAgbWV0aG9kcyBhZnRlciBjcmVhdGVkXG4gICAqIE9ic2VydmFibGUgYWxyZWFkeSBjb21wbGV0ZWQgb3IgZW5kZWQgd2l0aCBhbiBlcnJvciwgdGhlc2UgY2FsbHMgd2lsbCBiZSBpZ25vcmVkIHRvXG4gICAqIHByZXNlcnZlIHNvIGNhbGxlZCAqT2JzZXJ2YWJsZSBDb250cmFjdCouIE5vdGUgdGhhdCB5b3UgYXJlIG5vdCByZXF1aXJlZCB0byBjYWxsXG4gICAqIGBjb21wbGV0ZWAgYXQgYW55IHBvaW50IC0gaXQgaXMgcGVyZmVjdGx5IGZpbmUgdG8gY3JlYXRlIGFuIE9ic2VydmFibGUgdGhhdCBuZXZlciBlbmRzLFxuICAgKiBkZXBlbmRpbmcgb24geW91ciBuZWVkcy5cbiAgICpcbiAgICogYG9uU3Vic2NyaXB0aW9uYCBjYW4gb3B0aW9uYWxseSByZXR1cm4gZWl0aGVyIGEgZnVuY3Rpb24gb3IgYW4gb2JqZWN0IHdpdGhcbiAgICogYHVuc3Vic2NyaWJlYCBtZXRob2QuIEluIGJvdGggY2FzZXMgZnVuY3Rpb24gb3IgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIHdoZW5cbiAgICogc3Vic2NyaXB0aW9uIHRvIE9ic2VydmFibGUgaXMgYmVpbmcgY2FuY2VsbGVkIGFuZCBzaG91bGQgYmUgdXNlZCB0byBjbGVhbiB1cCBhbGxcbiAgICogcmVzb3VyY2VzLiBTbywgZm9yIGV4YW1wbGUsIGlmIHlvdSBhcmUgdXNpbmcgYHNldFRpbWVvdXRgIGluIHlvdXIgY3VzdG9tXG4gICAqIE9ic2VydmFibGUsIHdoZW4gc29tZW9uZSB1bnN1YnNjcmliZXMsIHlvdSBjYW4gY2xlYXIgcGxhbm5lZCB0aW1lb3V0LCBzbyB0aGF0XG4gICAqIGl0IGRvZXMgbm90IGZpcmUgbmVlZGxlc3NseSBhbmQgYnJvd3NlciAob3Igb3RoZXIgZW52aXJvbm1lbnQpIGRvZXMgbm90IHdhc3RlXG4gICAqIGNvbXB1dGluZyBwb3dlciBvbiB0aW1pbmcgZXZlbnQgdGhhdCBubyBvbmUgd2lsbCBsaXN0ZW4gdG8gYW55d2F5cy5cbiAgICpcbiAgICogTW9zdCBvZiB0aGUgdGltZXMgeW91IHNob3VsZCBub3QgbmVlZCB0byB1c2UgYGNyZWF0ZWAsIGJlY2F1c2UgZXhpc3RpbmdcbiAgICogb3BlcmF0b3JzIGFsbG93IHlvdSB0byBjcmVhdGUgYW4gT2JzZXJ2YWJsZSBmb3IgbW9zdCBvZiB0aGUgdXNlIGNhc2VzLlxuICAgKiBUaGF0IGJlaW5nIHNhaWQsIGBjcmVhdGVgIGlzIGxvdy1sZXZlbCBtZWNoYW5pc20gYWxsb3dpbmcgeW91IHRvIGNyZWF0ZVxuICAgKiBhbnkgT2JzZXJ2YWJsZSwgaWYgeW91IGhhdmUgdmVyeSBzcGVjaWZpYyBuZWVkcy5cbiAgICpcbiAgICogKipUeXBlU2NyaXB0IHNpZ25hdHVyZSBpc3N1ZSoqXG4gICAqXG4gICAqIEJlY2F1c2UgT2JzZXJ2YWJsZSBleHRlbmRzIGNsYXNzIHdoaWNoIGFscmVhZHkgaGFzIGRlZmluZWQgc3RhdGljIGBjcmVhdGVgIGZ1bmN0aW9uLFxuICAgKiBidXQgd2l0aCBkaWZmZXJlbnQgdHlwZSBzaWduYXR1cmUsIGl0IHdhcyBpbXBvc3NpYmxlIHRvIGFzc2lnbiBwcm9wZXIgc2lnbmF0dXJlIHRvXG4gICAqIGBPYnNlcnZhYmxlLmNyZWF0ZWAuIEJlY2F1c2Ugb2YgdGhhdCwgaXQgaGFzIHZlcnkgZ2VuZXJhbCB0eXBlIGBGdW5jdGlvbmAgYW5kIHRodXNcbiAgICogZnVuY3Rpb24gcGFzc2VkIHRvIGBjcmVhdGVgIHdpbGwgbm90IGJlIHR5cGUgY2hlY2tlZCwgdW5sZXNzIHlvdSBleHBsaWNpdGx5IHN0YXRlXG4gICAqIHdoYXQgc2lnbmF0dXJlIGl0IHNob3VsZCBoYXZlLlxuICAgKlxuICAgKiBXaGVuIHVzaW5nIFR5cGVTY3JpcHQgd2UgcmVjb21tZW5kIHRvIGRlY2xhcmUgdHlwZSBzaWduYXR1cmUgb2YgZnVuY3Rpb24gcGFzc2VkIHRvXG4gICAqIGBjcmVhdGVgIGFzIGAob2JzZXJ2ZXI6IE9ic2VydmVyKSA9PiBUZWFyZG93bkxvZ2ljYCwgd2hlcmUge0BsaW5rIE9ic2VydmVyfVxuICAgKiBhbmQge0BsaW5rIFRlYXJkb3duTG9naWN9IGFyZSBpbnRlcmZhY2VzIHByb3ZpZGVkIGJ5IHRoZSBsaWJyYXJ5LlxuICAgKlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IHRocmVlIG51bWJlcnMsIHRoZW4gY29tcGxldGUuPC9jYXB0aW9uPlxuICAgKiB2YXIgb2JzZXJ2YWJsZSA9IFJ4Lk9ic2VydmFibGUuY3JlYXRlKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgKiAgIG9ic2VydmVyLm5leHQoMSk7XG4gICAqICAgb2JzZXJ2ZXIubmV4dCgyKTtcbiAgICogICBvYnNlcnZlci5uZXh0KDMpO1xuICAgKiAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAqIH0pO1xuICAgKiBvYnNlcnZhYmxlLnN1YnNjcmliZShcbiAgICogICB2YWx1ZSA9PiBjb25zb2xlLmxvZyh2YWx1ZSksXG4gICAqICAgZXJyID0+IHt9LFxuICAgKiAgICgpID0+IGNvbnNvbGUubG9nKCd0aGlzIGlzIHRoZSBlbmQnKVxuICAgKiApO1xuICAgKlxuICAgKiAvLyBMb2dzXG4gICAqIC8vIDFcbiAgICogLy8gMlxuICAgKiAvLyAzXG4gICAqIC8vIFwidGhpcyBpcyB0aGUgZW5kXCJcbiAgICpcbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCBhbiBlcnJvcjwvY2FwdGlvbj5cbiAgICogY29uc3Qgb2JzZXJ2YWJsZSA9IFJ4Lk9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcikgPT4ge1xuICAgKiAgIG9ic2VydmVyLmVycm9yKCdzb21ldGhpbmcgd2VudCByZWFsbHkgd3JvbmcuLi4nKTtcbiAgICogfSk7XG4gICAqXG4gICAqIG9ic2VydmFibGUuc3Vic2NyaWJlKFxuICAgKiAgIHZhbHVlID0+IGNvbnNvbGUubG9nKHZhbHVlKSwgLy8gd2lsbCBuZXZlciBiZSBjYWxsZWRcbiAgICogICBlcnIgPT4gY29uc29sZS5sb2coZXJyKSxcbiAgICogICAoKSA9PiBjb25zb2xlLmxvZygnY29tcGxldGUnKSAvLyB3aWxsIG5ldmVyIGJlIGNhbGxlZFxuICAgKiApO1xuICAgKlxuICAgKiAvLyBMb2dzXG4gICAqIC8vIFwic29tZXRoaW5nIHdlbnQgcmVhbGx5IHdyb25nLi4uXCJcbiAgICpcbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+UmV0dXJuIHVuc3Vic2NyaWJlIGZ1bmN0aW9uPC9jYXB0aW9uPlxuICAgKlxuICAgKiBjb25zdCBvYnNlcnZhYmxlID0gUnguT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4ge1xuICAgKiAgIGNvbnN0IGlkID0gc2V0VGltZW91dCgoKSA9PiBvYnNlcnZlci5uZXh0KCcuLi4nKSwgNTAwMCk7IC8vIGVtaXQgdmFsdWUgYWZ0ZXIgNXNcbiAgICpcbiAgICogICByZXR1cm4gKCkgPT4geyBjbGVhclRpbWVvdXQoaWQpOyBjb25zb2xlLmxvZygnY2xlYXJlZCEnKTsgfTtcbiAgICogfSk7XG4gICAqXG4gICAqIGNvbnN0IHN1YnNjcmlwdGlvbiA9IG9ic2VydmFibGUuc3Vic2NyaWJlKHZhbHVlID0+IGNvbnNvbGUubG9nKHZhbHVlKSk7XG4gICAqXG4gICAqIHNldFRpbWVvdXQoKCkgPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCksIDMwMDApOyAvLyBjYW5jZWwgc3Vic2NyaXB0aW9uIGFmdGVyIDNzXG4gICAqXG4gICAqIC8vIExvZ3M6XG4gICAqIC8vIFwiY2xlYXJlZCFcIiBhZnRlciAzc1xuICAgKlxuICAgKiAvLyBOZXZlciBsb2dzIFwiLi4uXCJcbiAgICpcbiAgICpcbiAgICogQHNlZSB7QGxpbmsgZW1wdHl9XG4gICAqIEBzZWUge0BsaW5rIG5ldmVyfVxuICAgKiBAc2VlIHtAbGluayBvZn1cbiAgICogQHNlZSB7QGxpbmsgdGhyb3d9XG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24ob2JzZXJ2ZXI6IE9ic2VydmVyKTogVGVhcmRvd25Mb2dpY30gb25TdWJzY3JpcHRpb24gQVxuICAgKiBmdW5jdGlvbiB0aGF0IGFjY2VwdHMgYW4gT2JzZXJ2ZXIsIGFuZCBpbnZva2VzIGl0cyBgbmV4dGAsXG4gICAqIGBlcnJvcmAsIGFuZCBgY29tcGxldGVgIG1ldGhvZHMgYXMgYXBwcm9wcmlhdGUsIGFuZCBvcHRpb25hbGx5IHJldHVybnMgc29tZVxuICAgKiBsb2dpYyBmb3IgY2xlYW5pbmcgdXAgcmVzb3VyY2VzLlxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQsIHdoZW5ldmVyIHN1YnNjcmliZWQsIHdpbGwgZXhlY3V0ZSB0aGVcbiAgICogc3BlY2lmaWVkIGZ1bmN0aW9uLlxuICAgKiBAc3RhdGljIHRydWVcbiAgICogQG5hbWUgY3JlYXRlXG4gICAqIEBvd25lciBPYnNlcnZhYmxlXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlPFQ+KG9uU3Vic2NyaXB0aW9uOiA8Uj4ob2JzZXJ2ZXI6IE9ic2VydmVyPFI+KSA9PiBUZWFyZG93bkxvZ2ljKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFQ+KG9uU3Vic2NyaXB0aW9uKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBBbiBpbnRlcmZhY2UgZm9yIGEgY29uc3VtZXIgb2YgcHVzaC1iYXNlZCBub3RpZmljYXRpb25zIGRlbGl2ZXJlZCBieSBhblxuICoge0BsaW5rIE9ic2VydmFibGV9LlxuICpcbiAqIGBgYHRzXG4gKiBpbnRlcmZhY2UgT2JzZXJ2ZXI8VD4ge1xuICogICBjbG9zZWQ/OiBib29sZWFuO1xuICogICBuZXh0OiAodmFsdWU6IFQpID0+IHZvaWQ7XG4gKiAgIGVycm9yOiAoZXJyOiBhbnkpID0+IHZvaWQ7XG4gKiAgIGNvbXBsZXRlOiAoKSA9PiB2b2lkO1xuICogfVxuICogYGBgXG4gKlxuICogQW4gb2JqZWN0IGNvbmZvcm1pbmcgdG8gdGhlIE9ic2VydmVyIGludGVyZmFjZSBpcyB1c3VhbGx5XG4gKiBnaXZlbiB0byB0aGUgYG9ic2VydmFibGUuc3Vic2NyaWJlKG9ic2VydmVyKWAgbWV0aG9kLCBhbmQgdGhlIE9ic2VydmFibGUgd2lsbFxuICogY2FsbCB0aGUgT2JzZXJ2ZXIncyBgbmV4dCh2YWx1ZSlgIG1ldGhvZCB0byBwcm92aWRlIG5vdGlmaWNhdGlvbnMuIEFcbiAqIHdlbGwtYmVoYXZlZCBPYnNlcnZhYmxlIHdpbGwgY2FsbCBhbiBPYnNlcnZlcidzIGBjb21wbGV0ZSgpYCBtZXRob2QgZXhhY3RseVxuICogb25jZSBvciB0aGUgT2JzZXJ2ZXIncyBgZXJyb3IoZXJyKWAgbWV0aG9kIGV4YWN0bHkgb25jZSwgYXMgdGhlIGxhc3RcbiAqIG5vdGlmaWNhdGlvbiBkZWxpdmVyZWQuXG4gKlxuICogQGludGVyZmFjZVxuICogQG5hbWUgT2JzZXJ2ZXJcbiAqIEBub2ltcG9ydCB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBPYnNlcnZlckRvYzxUPiB7XG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBmbGFnIHRvIGluZGljYXRlIHdoZXRoZXIgdGhpcyBPYnNlcnZlciwgd2hlbiB1c2VkIGFzIGFcbiAgICogc3Vic2NyaWJlciwgaGFzIGFscmVhZHkgYmVlbiB1bnN1YnNjcmliZWQgZnJvbSBpdHMgT2JzZXJ2YWJsZS5cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBjbG9zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqXG4gICAqIFRoZSBjYWxsYmFjayB0byByZWNlaXZlIG5vdGlmaWNhdGlvbnMgb2YgdHlwZSBgbmV4dGAgZnJvbSB0aGUgT2JzZXJ2YWJsZSxcbiAgICogd2l0aCBhIHZhbHVlLiBUaGUgT2JzZXJ2YWJsZSBtYXkgY2FsbCB0aGlzIG1ldGhvZCAwIG9yIG1vcmUgdGltZXMuXG4gICAqIEBwYXJhbSB7VH0gdmFsdWUgVGhlIGBuZXh0YCB2YWx1ZS5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIG5leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICByZXR1cm4gdm9pZCAwO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgY2FsbGJhY2sgdG8gcmVjZWl2ZSBub3RpZmljYXRpb25zIG9mIHR5cGUgYGVycm9yYCBmcm9tIHRoZSBPYnNlcnZhYmxlLFxuICAgKiB3aXRoIGFuIGF0dGFjaGVkIHtAbGluayBFcnJvcn0uIE5vdGlmaWVzIHRoZSBPYnNlcnZlciB0aGF0IHRoZSBPYnNlcnZhYmxlXG4gICAqIGhhcyBleHBlcmllbmNlZCBhbiBlcnJvciBjb25kaXRpb24uXG4gICAqIEBwYXJhbSB7YW55fSBlcnIgVGhlIGBlcnJvcmAgZXhjZXB0aW9uLlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgZXJyb3IoZXJyOiBhbnkpOiB2b2lkIHtcbiAgICByZXR1cm4gdm9pZCAwO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgY2FsbGJhY2sgdG8gcmVjZWl2ZSBhIHZhbHVlbGVzcyBub3RpZmljYXRpb24gb2YgdHlwZSBgY29tcGxldGVgIGZyb21cbiAgICogdGhlIE9ic2VydmFibGUuIE5vdGlmaWVzIHRoZSBPYnNlcnZlciB0aGF0IHRoZSBPYnNlcnZhYmxlIGhhcyBmaW5pc2hlZFxuICAgKiBzZW5kaW5nIHB1c2gtYmFzZWQgbm90aWZpY2F0aW9ucy5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGNvbXBsZXRlKCk6IHZvaWQge1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cbn1cblxuLyoqXG4gKiBgU3Vic2NyaWJhYmxlT3JQcm9taXNlYCBpbnRlcmZhY2UgZGVzY3JpYmVzIHZhbHVlcyB0aGF0IGJlaGF2ZSBsaWtlIGVpdGhlclxuICogT2JzZXJ2YWJsZXMgb3IgUHJvbWlzZXMuIEV2ZXJ5IG9wZXJhdG9yIHRoYXQgYWNjZXB0cyBhcmd1bWVudHMgYW5ub3RhdGVkXG4gKiB3aXRoIHRoaXMgaW50ZXJmYWNlLCBjYW4gYmUgYWxzbyB1c2VkIHdpdGggcGFyYW1ldGVycyB0aGF0IGFyZSBub3QgbmVjZXNzYXJpbHlcbiAqIFJ4SlMgT2JzZXJ2YWJsZXMuXG4gKlxuICogRm9sbG93aW5nIHR5cGVzIG9mIHZhbHVlcyBtaWdodCBiZSBwYXNzZWQgdG8gb3BlcmF0b3JzIGV4cGVjdGluZyB0aGlzIGludGVyZmFjZTpcbiAqXG4gKiAjIyBPYnNlcnZhYmxlXG4gKlxuICogUnhKUyB7QGxpbmsgT2JzZXJ2YWJsZX0gaW5zdGFuY2UuXG4gKlxuICogIyMgT2JzZXJ2YWJsZS1saWtlIChTdWJzY3JpYmFibGUpXG4gKlxuICogVGhpcyBtaWdodCBiZSBhbnkgb2JqZWN0IHRoYXQgaGFzIGBTeW1ib2wub2JzZXJ2YWJsZWAgbWV0aG9kLiBUaGlzIG1ldGhvZCxcbiAqIHdoZW4gY2FsbGVkLCBzaG91bGQgcmV0dXJuIG9iamVjdCB3aXRoIGBzdWJzY3JpYmVgIG1ldGhvZCBvbiBpdCwgd2hpY2ggc2hvdWxkXG4gKiBiZWhhdmUgdGhlIHNhbWUgYXMgUnhKUyBgT2JzZXJ2YWJsZS5zdWJzY3JpYmVgLlxuICpcbiAqIGBTeW1ib2wub2JzZXJ2YWJsZWAgaXMgcGFydCBvZiBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYnNlcnZhYmxlIHByb3Bvc2FsLlxuICogU2luY2UgY3VycmVudGx5IGl0IGlzIG5vdCBzdXBwb3J0ZWQgbmF0aXZlbHksIGFuZCBldmVyeSBzeW1ib2wgaXMgZXF1YWwgb25seSB0byBpdHNlbGYsXG4gKiB5b3Ugc2hvdWxkIHVzZSBodHRwczovL2dpdGh1Yi5jb20vYmxlc2gvc3ltYm9sLW9ic2VydmFibGUgcG9seWZpbGwsIHdoZW4gaW1wbGVtZW50aW5nXG4gKiBjdXN0b20gT2JzZXJ2YWJsZS1saWtlcy5cbiAqXG4gKiAqKlR5cGVTY3JpcHQgU3Vic2NyaWJhYmxlIGludGVyZmFjZSBpc3N1ZSoqXG4gKlxuICogQWx0aG91Z2ggVHlwZVNjcmlwdCBpbnRlcmZhY2UgY2xhaW1zIHRoYXQgU3Vic2NyaWJhYmxlIGlzIGFuIG9iamVjdCB0aGF0IGhhcyBgc3Vic2NyaWJlYFxuICogbWV0aG9kIGRlY2xhcmVkIGRpcmVjdGx5IG9uIGl0LCBwYXNzaW5nIGN1c3RvbSBvYmplY3RzIHRoYXQgaGF2ZSBgc3Vic2NyaWJlYFxuICogbWV0aG9kIGJ1dCBub3QgYFN5bWJvbC5vYnNlcnZhYmxlYCBtZXRob2Qgd2lsbCBmYWlsIGF0IHJ1bnRpbWUuIENvbnZlcnNlbHksIHBhc3NpbmdcbiAqIG9iamVjdHMgd2l0aCBgU3ltYm9sLm9ic2VydmFibGVgIGJ1dCB3aXRob3V0IGBzdWJzY3JpYmVgIHdpbGwgZmFpbCBhdCBjb21waWxlIHRpbWVcbiAqIChpZiB5b3UgdXNlIFR5cGVTY3JpcHQpLlxuICpcbiAqIFR5cGVTY3JpcHQgaGFzIHByb2JsZW0gc3VwcG9ydGluZyBpbnRlcmZhY2VzIHdpdGggbWV0aG9kcyBkZWZpbmVkIGFzIHN5bWJvbFxuICogcHJvcGVydGllcy4gVG8gZ2V0IGFyb3VuZCB0aGF0LCB5b3Ugc2hvdWxkIGltcGxlbWVudCBgc3Vic2NyaWJlYCBkaXJlY3RseSBvblxuICogcGFzc2VkIG9iamVjdCwgYW5kIG1ha2UgYFN5bWJvbC5vYnNlcnZhYmxlYCBtZXRob2Qgc2ltcGx5IHJldHVybiBgdGhpc2AuIFRoYXQgd2F5XG4gKiBldmVyeXRoaW5nIHdpbGwgd29yayBhcyBleHBlY3RlZCwgYW5kIGNvbXBpbGVyIHdpbGwgbm90IGNvbXBsYWluLiBJZiB5b3UgcmVhbGx5XG4gKiBkbyBub3Qgd2FudCB0byBwdXQgYHN1YnNjcmliZWAgZGlyZWN0bHkgb24geW91ciBvYmplY3QsIHlvdSB3aWxsIGhhdmUgdG8gdHlwZSBjYXN0XG4gKiBpdCB0byBgYW55YCwgYmVmb3JlIHBhc3NpbmcgaXQgdG8gYW4gb3BlcmF0b3IuXG4gKlxuICogV2hlbiB0aGlzIGlzc3VlIGlzIHJlc29sdmVkLCBTdWJzY3JpYmFibGUgaW50ZXJmYWNlIHdpbGwgb25seSBwZXJtaXQgT2JzZXJ2YWJsZS1saWtlXG4gKiBvYmplY3RzIHdpdGggYFN5bWJvbC5vYnNlcnZhYmxlYCBkZWZpbmVkLCBubyBtYXR0ZXIgaWYgdGhleSB0aGVtc2VsdmVzIGltcGxlbWVudFxuICogYHN1YnNjcmliZWAgbWV0aG9kIG9yIG5vdC5cbiAqXG4gKiAjIyBFUzYgUHJvbWlzZVxuICpcbiAqIFByb21pc2UgY2FuIGJlIGludGVycHJldGVkIGFzIE9ic2VydmFibGUgdGhhdCBlbWl0cyB2YWx1ZSBhbmQgY29tcGxldGVzXG4gKiB3aGVuIGl0IGlzIHJlc29sdmVkIG9yIGVycm9ycyB3aGVuIGl0IGlzIHJlamVjdGVkLlxuICpcbiAqICMjIFByb21pc2UtbGlrZSAoVGhlbmFibGUpXG4gKlxuICogUHJvbWlzZXMgcGFzc2VkIHRvIG9wZXJhdG9ycyBkbyBub3QgaGF2ZSB0byBiZSBuYXRpdmUgRVM2IFByb21pc2VzLlxuICogVGhleSBjYW4gYmUgaW1wbGVtZW50YXRpb25zIGZyb20gcG9wdWxhciBQcm9taXNlIGxpYnJhcmllcywgcG9seWZpbGxzXG4gKiBvciBldmVuIGN1c3RvbSBvbmVzLiBUaGV5IGp1c3QgbmVlZCB0byBoYXZlIGB0aGVuYCBtZXRob2QgdGhhdCB3b3Jrc1xuICogYXMgdGhlIHNhbWUgYXMgRVM2IFByb21pc2UgYHRoZW5gLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlVzZSBtZXJnZSBhbmQgdGhlbiBtYXAgd2l0aCBub24tUnhKUyBvYnNlcnZhYmxlPC9jYXB0aW9uPlxuICogY29uc3Qgbm9uUnhKU09ic2VydmFibGUgPSB7XG4gKiAgIHN1YnNjcmliZShvYnNlcnZlcikge1xuICogICAgIG9ic2VydmVyLm5leHQoMTAwMCk7XG4gKiAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAqICAgfSxcbiAqICAgW1N5bWJvbC5vYnNlcnZhYmxlXSgpIHtcbiAqICAgICByZXR1cm4gdGhpcztcbiAqICAgfVxuICogfTtcbiAqXG4gKiBSeC5PYnNlcnZhYmxlLm1lcmdlKG5vblJ4SlNPYnNlcnZhYmxlKVxuICogLm1hcCh2YWx1ZSA9PiBcIlRoaXMgdmFsdWUgaXMgXCIgKyB2YWx1ZSlcbiAqIC5zdWJzY3JpYmUocmVzdWx0ID0+IGNvbnNvbGUubG9nKHJlc3VsdCkpOyAvLyBMb2dzIFwiVGhpcyB2YWx1ZSBpcyAxMDAwXCJcbiAqXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+VXNlIGNvbWJpbmVMYXRlc3Qgd2l0aCBFUzYgUHJvbWlzZTwvY2FwdGlvbj5cbiAqIFJ4Lk9ic2VydmFibGUuY29tYmluZUxhdGVzdChQcm9taXNlLnJlc29sdmUoNSksIFByb21pc2UucmVzb2x2ZSgxMCksIFByb21pc2UucmVzb2x2ZSgxNSkpXG4gKiAuc3Vic2NyaWJlKFxuICogICB2YWx1ZSA9PiBjb25zb2xlLmxvZyh2YWx1ZSksXG4gKiAgIGVyciA9PiB7fSxcbiAqICAgKCkgPT4gY29uc29sZS5sb2coJ3RoZSBlbmQhJylcbiAqICk7XG4gKiAvLyBMb2dzXG4gKiAvLyBbNSwgMTAsIDE1XVxuICogLy8gXCJ0aGUgZW5kIVwiXG4gKlxuICpcbiAqIEBpbnRlcmZhY2VcbiAqIEBuYW1lIFN1YnNjcmliYWJsZU9yUHJvbWlzZVxuICogQG5vaW1wb3J0IHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIFN1YnNjcmliYWJsZU9yUHJvbWlzZURvYzxUPiB7XG5cbn1cblxuLyoqXG4gKiBgT2JzZXJ2YWJsZUlucHV0YCBpbnRlcmZhY2UgZGVzY3JpYmVzIGFsbCB2YWx1ZXMgdGhhdCBhcmUgZWl0aGVyIGFuXG4gKiB7QGxpbmsgU3Vic2NyaWJhYmxlT3JQcm9taXNlfSBvciBzb21lIGtpbmQgb2YgY29sbGVjdGlvbiBvZiB2YWx1ZXMgdGhhdFxuICogY2FuIGJlIHRyYW5zZm9ybWVkIHRvIE9ic2VydmFibGUgZW1pdHRpbmcgdGhhdCB2YWx1ZXMuIEV2ZXJ5IG9wZXJhdG9yIHRoYXRcbiAqIGFjY2VwdHMgYXJndW1lbnRzIGFubm90YXRlZCB3aXRoIHRoaXMgaW50ZXJmYWNlLCBjYW4gYmUgYWxzbyB1c2VkIHdpdGhcbiAqIHBhcmFtZXRlcnMgdGhhdCBhcmUgbm90IG5lY2Vzc2FyaWx5IFJ4SlMgT2JzZXJ2YWJsZXMuXG4gKlxuICogYE9ic2VydmFibGVJbnB1dGAgZXh0ZW5kcyB7QGxpbmsgU3Vic2NyaWJhYmxlT3JQcm9taXNlfSB3aXRoIGZvbGxvd2luZyB0eXBlczpcbiAqXG4gKiAjIyBBcnJheVxuICpcbiAqIEFycmF5cyBjYW4gYmUgaW50ZXJwcmV0ZWQgYXMgb2JzZXJ2YWJsZXMgdGhhdCBlbWl0IGFsbCB2YWx1ZXMgaW4gYXJyYXkgb25lIGJ5IG9uZSxcbiAqIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHRoZW4gY29tcGxldGUgaW1tZWRpYXRlbHkuXG4gKlxuICogIyMgQXJyYXktbGlrZVxuICpcbiAqIEFycmF5cyBwYXNzZWQgdG8gb3BlcmF0b3JzIGRvIG5vdCBoYXZlIHRvIGJlIGJ1aWx0LWluIEphdmFTY3JpcHQgQXJyYXlzLiBUaGV5XG4gKiBjYW4gYmUgYWxzbywgZm9yIGV4YW1wbGUsIGBhcmd1bWVudHNgIHByb3BlcnR5IGF2YWlsYWJsZSBpbnNpZGUgZXZlcnkgZnVuY3Rpb24sXG4gKiBbRE9NIE5vZGVMaXN0XShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9wbC9kb2NzL1dlYi9BUEkvTm9kZUxpc3QpLFxuICogb3IsIGFjdHVhbGx5LCBhbnkgb2JqZWN0IHRoYXQgaGFzIGBsZW5ndGhgIHByb3BlcnR5ICh3aGljaCBpcyBhIG51bWJlcilcbiAqIGFuZCBzdG9yZXMgdmFsdWVzIHVuZGVyIG5vbi1uZWdhdGl2ZSAoemVybyBhbmQgdXApIGludGVnZXJzLlxuICpcbiAqICMjIEVTNiBJdGVyYWJsZVxuICpcbiAqIE9wZXJhdG9ycyB3aWxsIGFjY2VwdCBib3RoIGJ1aWx0LWluIGFuZCBjdXN0b20gRVM2IEl0ZXJhYmxlcywgYnkgdHJlYXRpbmcgdGhlbSBhc1xuICogb2JzZXJ2YWJsZXMgdGhhdCBlbWl0IGFsbCBpdHMgdmFsdWVzIGluIG9yZGVyIG9mIGl0ZXJhdGlvbiBhbmQgdGhlbiBjb21wbGV0ZVxuICogd2hlbiBpdGVyYXRpb24gZW5kcy4gTm90ZSB0aGF0IGNvbnRyYXJ5IHRvIGFycmF5cywgSXRlcmFibGVzIGRvIG5vdCBoYXZlIHRvXG4gKiBuZWNlc3NhcmlseSBiZSBmaW5pdGUsIHNvIGNyZWF0aW5nIE9ic2VydmFibGVzIHRoYXQgbmV2ZXIgY29tcGxldGUgaXMgcG9zc2libGUgYXMgd2VsbC5cbiAqXG4gKiBOb3RlIHRoYXQgeW91IGNhbiBtYWtlIGl0ZXJhdG9yIGFuIGluc3RhbmNlIG9mIEl0ZXJhYmxlIGJ5IGhhdmluZyBpdCByZXR1cm4gaXRzZWxmXG4gKiBpbiBgU3ltYm9sLml0ZXJhdG9yYCBtZXRob2QuIEl0IG1lYW5zIHRoYXQgZXZlcnkgb3BlcmF0b3IgYWNjZXB0aW5nIEl0ZXJhYmxlcyBhY2NlcHRzLFxuICogdGhvdWdoIGluZGlyZWN0bHksIGl0ZXJhdG9ycyB0aGVtc2VsdmVzIGFzIHdlbGwuIEFsbCBuYXRpdmUgRVM2IGl0ZXJhdG9ycyBhcmUgaW5zdGFuY2VzXG4gKiBvZiBJdGVyYWJsZSBieSBkZWZhdWx0LCBzbyB5b3UgZG8gbm90IGhhdmUgdG8gaW1wbGVtZW50IHRoZWlyIGBTeW1ib2wuaXRlcmF0b3JgIG1ldGhvZFxuICogeW91cnNlbGYuXG4gKlxuICogKipUeXBlU2NyaXB0IEl0ZXJhYmxlIGludGVyZmFjZSBpc3N1ZSoqXG4gKlxuICogVHlwZVNjcmlwdCBgT2JzZXJ2YWJsZUlucHV0YCBpbnRlcmZhY2UgYWN0dWFsbHkgbGFja3MgdHlwZSBzaWduYXR1cmUgZm9yIEl0ZXJhYmxlcyxcbiAqIGJlY2F1c2Ugb2YgaXNzdWVzIGl0IGNhdXNlZCBpbiBzb21lIHByb2plY3RzIChzZWUgW3RoaXMgaXNzdWVdKGh0dHBzOi8vZ2l0aHViLmNvbS9SZWFjdGl2ZVgvcnhqcy9pc3N1ZXMvMjMwNikpLlxuICogSWYgeW91IHdhbnQgdG8gdXNlIEl0ZXJhYmxlIGFzIGFyZ3VtZW50IGZvciBvcGVyYXRvciwgY2FzdCBpdCB0byBgYW55YCBmaXJzdC5cbiAqIFJlbWVtYmVyIG9mIGNvdXJzZSB0aGF0LCBiZWNhdXNlIG9mIGNhc3RpbmcsIHlvdSBoYXZlIHRvIHlvdXJzZWxmIGVuc3VyZSB0aGF0IHBhc3NlZFxuICogYXJndW1lbnQgcmVhbGx5IGltcGxlbWVudHMgc2FpZCBpbnRlcmZhY2UuXG4gKlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlVzZSBtZXJnZSB3aXRoIGFycmF5czwvY2FwdGlvbj5cbiAqIFJ4Lk9ic2VydmFibGUubWVyZ2UoWzEsIDJdLCBbNF0sIFs1LCA2XSlcbiAqIC5zdWJzY3JpYmUoXG4gKiAgIHZhbHVlID0+IGNvbnNvbGUubG9nKHZhbHVlKSxcbiAqICAgZXJyID0+IHt9LFxuICogICAoKSA9PiBjb25zb2xlLmxvZygndGEgZGFtIScpXG4gKiApO1xuICpcbiAqIC8vIExvZ3NcbiAqIC8vIDFcbiAqIC8vIDJcbiAqIC8vIDNcbiAqIC8vIDRcbiAqIC8vIDVcbiAqIC8vIDZcbiAqIC8vIFwidGEgZGFtIVwiXG4gKlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlVzZSBtZXJnZSB3aXRoIGFycmF5LWxpa2U8L2NhcHRpb24+XG4gKiBSeC5PYnNlcnZhYmxlLm1lcmdlKHswOiAxLCAxOiAyLCBsZW5ndGg6IDJ9LCB7MDogMywgbGVuZ3RoOiAxfSlcbiAqIC5zdWJzY3JpYmUoXG4gKiAgIHZhbHVlID0+IGNvbnNvbGUubG9nKHZhbHVlKSxcbiAqICAgZXJyID0+IHt9LFxuICogICAoKSA9PiBjb25zb2xlLmxvZygnbmljZSwgaHVoPycpXG4gKiApO1xuICpcbiAqIC8vIExvZ3NcbiAqIC8vIDFcbiAqIC8vIDJcbiAqIC8vIDNcbiAqIC8vIFwibmljZSwgaHVoP1wiXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+VXNlIG1lcmdlIHdpdGggYW4gSXRlcmFibGUgKE1hcCk8L2NhcHRpb24+XG4gKiBjb25zdCBmaXJzdE1hcCA9IG5ldyBNYXAoW1sxLCAnYSddLCBbMiwgJ2InXV0pO1xuICogY29uc3Qgc2Vjb25kTWFwID0gbmV3IE1hcChbWzMsICdjJ10sIFs0LCAnZCddXSk7XG4gKlxuICogUnguT2JzZXJ2YWJsZS5tZXJnZShcbiAqICAgZmlyc3RNYXAsICAgICAgICAgIC8vIHBhc3MgSXRlcmFibGVcbiAqICAgc2Vjb25kTWFwLnZhbHVlcygpIC8vIHBhc3MgaXRlcmF0b3IsIHdoaWNoIGlzIGl0c2VsZiBhbiBJdGVyYWJsZVxuICogKS5zdWJzY3JpYmUoXG4gKiAgIHZhbHVlID0+IGNvbnNvbGUubG9nKHZhbHVlKSxcbiAqICAgZXJyID0+IHt9LFxuICogICAoKSA9PiBjb25zb2xlLmxvZygneXVwIScpXG4gKiApO1xuICpcbiAqIC8vIExvZ3NcbiAqIC8vIFsxLCBcImFcIl1cbiAqIC8vIFsyLCBcImJcIl1cbiAqIC8vIFwiY1wiXG4gKiAvLyBcImRcIlxuICogLy8gXCJ5dXAhXCJcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Vc2UgZnJvbSB3aXRoIGdlbmVyYXRvciAocmV0dXJuaW5nIGluZmluaXRlIGl0ZXJhdG9yKTwvY2FwdGlvbj5cbiAqIC8vIGluZmluaXRlIHN0cmVhbSBvZiBpbmNyZW1lbnRpbmcgbnVtYmVyc1xuICogY29uc3QgaW5maW5pdGUgPSBmdW5jdGlvbiogKCkge1xuICogICBsZXQgaSA9IDA7XG4gKlxuICogICB3aGlsZSAodHJ1ZSkge1xuICogICAgIHlpZWxkIGkrKztcbiAqICAgfVxuICogfTtcbiAqXG4gKiBSeC5PYnNlcnZhYmxlLmZyb20oaW5maW5pdGUoKSlcbiAqIC50YWtlKDMpIC8vIG9ubHkgdGFrZSAzLCBjYXVzZSB0aGlzIGlzIGluZmluaXRlXG4gKiAuc3Vic2NyaWJlKFxuICogICB2YWx1ZSA9PiBjb25zb2xlLmxvZyh2YWx1ZSksXG4gKiAgIGVyciA9PiB7fSxcbiAqICAgKCkgPT4gY29uc29sZS5sb2coJ3RhIGRhbSEnKVxuICogKTtcbiAqXG4gKiAvLyBMb2dzXG4gKiAvLyAwXG4gKiAvLyAxXG4gKiAvLyAyXG4gKiAvLyBcInRhIGRhbSFcIlxuICpcbiAqIEBpbnRlcmZhY2VcbiAqIEBuYW1lIE9ic2VydmFibGVJbnB1dFxuICogQG5vaW1wb3J0IHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIE9ic2VydmFibGVJbnB1dERvYzxUPiB7XG5cbn1cblxuLyoqXG4gKlxuICogVGhpcyBpbnRlcmZhY2UgZGVzY3JpYmVzIHdoYXQgc2hvdWxkIGJlIHJldHVybmVkIGJ5IGZ1bmN0aW9uIHBhc3NlZCB0byBPYnNlcnZhYmxlXG4gKiBjb25zdHJ1Y3RvciBvciBzdGF0aWMge0BsaW5rIGNyZWF0ZX0gZnVuY3Rpb24uIFZhbHVlIG9mIHRoYXQgaW50ZXJmYWNlIHdpbGwgYmUgdXNlZFxuICogdG8gY2FuY2VsIHN1YnNjcmlwdGlvbiBmb3IgZ2l2ZW4gT2JzZXJ2YWJsZS5cbiAqXG4gKiBgVGVhcmRvd25Mb2dpY2AgY2FuIGJlOlxuICpcbiAqICMjIEZ1bmN0aW9uXG4gKlxuICogRnVuY3Rpb24gdGhhdCB0YWtlcyBubyBwYXJhbWV0ZXJzLiBXaGVuIGNvbnN1bWVyIG9mIGNyZWF0ZWQgT2JzZXJ2YWJsZSBjYWxscyBgdW5zdWJzY3JpYmVgLFxuICogdGhhdCBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZFxuICpcbiAqICMjIEFub255bW91c1N1YnNjcmlwdGlvblxuICpcbiAqIGBBbm9ueW1vdXNTdWJzY3JpcHRpb25gIGlzIHNpbXBseSBhbiBvYmplY3Qgd2l0aCBgdW5zdWJzY3JpYmVgIG1ldGhvZCBvbiBpdC4gVGhhdCBtZXRob2RcbiAqIHdpbGwgd29yayB0aGUgc2FtZSBhcyBmdW5jdGlvblxuICpcbiAqICMjIHZvaWRcbiAqXG4gKiBJZiBjcmVhdGVkIE9ic2VydmFibGUgZG9lcyBub3QgaGF2ZSBhbnkgcmVzb3VyY2VzIHRvIGNsZWFuIHVwLCBmdW5jdGlvbiBkb2VzIG5vdCBoYXZlIHRvXG4gKiByZXR1cm4gYW55dGhpbmcuXG4gKlxuICogQGludGVyZmFjZVxuICogQG5hbWUgVGVhcmRvd25Mb2dpY1xuICogQG5vaW1wb3J0IHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIFRlYXJkb3duTG9naWNEb2Mge1xuXG59XG4iXX0=