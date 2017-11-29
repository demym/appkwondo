"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("./root");
var isArrayLike_1 = require("./isArrayLike");
var isPromise_1 = require("./isPromise");
var isObject_1 = require("./isObject");
var Observable_1 = require("../Observable");
var iterator_1 = require("../symbol/iterator");
var InnerSubscriber_1 = require("../InnerSubscriber");
var observable_1 = require("../symbol/observable");
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
        return null;
    }
    if (result instanceof Observable_1.Observable) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return null;
        }
        else {
            return result.subscribe(destination);
        }
    }
    else if (isArrayLike_1.isArrayLike(result)) {
        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
            destination.next(result[i]);
        }
        if (!destination.closed) {
            destination.complete();
        }
    }
    else if (isPromise_1.isPromise(result)) {
        result.then(function (value) {
            if (!destination.closed) {
                destination.next(value);
                destination.complete();
            }
        }, function (err) { return destination.error(err); })
            .then(null, function (err) {
            root_1.root.setTimeout(function () { throw err; });
        });
        return destination;
    }
    else if (result && typeof result[iterator_1.iterator] === 'function') {
        var iterator = result[iterator_1.iterator]();
        do {
            var item = iterator.next();
            if (item.done) {
                destination.complete();
                break;
            }
            destination.next(item.value);
            if (destination.closed) {
                break;
            }
        } while (true);
    }
    else if (result && typeof result[observable_1.observable] === 'function') {
        var obs = result[observable_1.observable]();
        if (typeof obs.subscribe !== 'function') {
            destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));
        }
        else {
            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
    }
    else {
        var value = isObject_1.isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = "You provided " + value + " where a stream was expected."
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        destination.error(new TypeError(msg));
    }
    return null;
}
exports.subscribeToResult = subscribeToResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlVG9SZXN1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWJzY3JpYmVUb1Jlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUE4QjtBQUM5Qiw2Q0FBNEM7QUFDNUMseUNBQXdDO0FBQ3hDLHVDQUFzQztBQUV0Qyw0Q0FBNEQ7QUFDNUQsK0NBQWlFO0FBRWpFLHNEQUFxRDtBQUVyRCxtREFBdUU7QUFNdkUsMkJBQXFDLGVBQTBDLEVBQzFDLE1BQTBCLEVBQzFCLFVBQWMsRUFDZCxVQUFtQjtJQUN0RCxJQUFJLFdBQVcsR0FBb0IsSUFBSSxpQ0FBZSxDQUFDLGVBQWUsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFaEcsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLFlBQVksdUJBQVUsQ0FBQyxDQUFDLENBQUM7UUFDakMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDckIsV0FBVyxDQUFDLElBQUksQ0FBTyxNQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2QyxDQUFDO0lBQ0gsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyx5QkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdB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LEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBbkVELDhDQW1FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJvb3QgfSBmcm9tICcuL3Jvb3QnO1xuaW1wb3J0IHsgaXNBcnJheUxpa2UgfSBmcm9tICcuL2lzQXJyYXlMaWtlJztcbmltcG9ydCB7IGlzUHJvbWlzZSB9IGZyb20gJy4vaXNQcm9taXNlJztcbmltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnLi9pc09iamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZhYmxlSW5wdXQgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGl0ZXJhdG9yIGFzIFN5bWJvbF9pdGVyYXRvciB9IGZyb20gJy4uL3N5bWJvbC9pdGVyYXRvcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgSW5uZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IE91dGVyU3Vic2NyaWJlciB9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBvYnNlcnZhYmxlIGFzIFN5bWJvbF9vYnNlcnZhYmxlIH0gZnJvbSAnLi4vc3ltYm9sL29ic2VydmFibGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gc3Vic2NyaWJlVG9SZXN1bHQ8VCwgUj4ob3V0ZXJTdWJzY3JpYmVyOiBPdXRlclN1YnNjcmliZXI8VCwgUj4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXJWYWx1ZT86IFQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXJJbmRleD86IG51bWJlcik6IFN1YnNjcmlwdGlvbjtcbmV4cG9ydCBmdW5jdGlvbiBzdWJzY3JpYmVUb1Jlc3VsdDxUPihvdXRlclN1YnNjcmliZXI6IE91dGVyU3Vic2NyaWJlcjxhbnksIGFueT4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBPYnNlcnZhYmxlSW5wdXQ8VD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXJWYWx1ZT86IFQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXJJbmRleD86IG51bWJlcik6IFN1YnNjcmlwdGlvbiB7XG4gIGxldCBkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxhbnk+ID0gbmV3IElubmVyU3Vic2NyaWJlcihvdXRlclN1YnNjcmliZXIsIG91dGVyVmFsdWUsIG91dGVySW5kZXgpO1xuXG4gIGlmIChkZXN0aW5hdGlvbi5jbG9zZWQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgaWYgKHJlc3VsdC5faXNTY2FsYXIpIHtcbiAgICAgIGRlc3RpbmF0aW9uLm5leHQoKDxhbnk+cmVzdWx0KS52YWx1ZSk7XG4gICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXN1bHQuc3Vic2NyaWJlKGRlc3RpbmF0aW9uKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNBcnJheUxpa2UocmVzdWx0KSkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSByZXN1bHQubGVuZ3RoOyBpIDwgbGVuICYmICFkZXN0aW5hdGlvbi5jbG9zZWQ7IGkrKykge1xuICAgICAgZGVzdGluYXRpb24ubmV4dChyZXN1bHRbaV0pO1xuICAgIH1cbiAgICBpZiAoIWRlc3RpbmF0aW9uLmNsb3NlZCkge1xuICAgICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNQcm9taXNlKHJlc3VsdCkpIHtcbiAgICByZXN1bHQudGhlbihcbiAgICAgICh2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uLmNsb3NlZCkge1xuICAgICAgICAgIGRlc3RpbmF0aW9uLm5leHQoPGFueT52YWx1ZSk7XG4gICAgICAgICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIChlcnI6IGFueSkgPT4gZGVzdGluYXRpb24uZXJyb3IoZXJyKVxuICAgIClcbiAgICAudGhlbihudWxsLCAoZXJyOiBhbnkpID0+IHtcbiAgICAgIC8vIEVzY2FwaW5nIHRoZSBQcm9taXNlIHRyYXA6IGdsb2JhbGx5IHRocm93IHVuaGFuZGxlZCBlcnJvcnNcbiAgICAgIHJvb3Quc2V0VGltZW91dCgoKSA9PiB7IHRocm93IGVycjsgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xuICB9IGVsc2UgaWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0W1N5bWJvbF9pdGVyYXRvcl0gPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCBpdGVyYXRvciA9IDxhbnk+cmVzdWx0W1N5bWJvbF9pdGVyYXRvcl0oKTtcbiAgICBkbyB7XG4gICAgICBsZXQgaXRlbSA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIGlmIChpdGVtLmRvbmUpIHtcbiAgICAgICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZXN0aW5hdGlvbi5uZXh0KGl0ZW0udmFsdWUpO1xuICAgICAgaWYgKGRlc3RpbmF0aW9uLmNsb3NlZCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IHdoaWxlICh0cnVlKTtcbiAgfSBlbHNlIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdFtTeW1ib2xfb2JzZXJ2YWJsZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCBvYnMgPSByZXN1bHRbU3ltYm9sX29ic2VydmFibGVdKCk7XG4gICAgaWYgKHR5cGVvZiBvYnMuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBkZXN0aW5hdGlvbi5lcnJvcihuZXcgVHlwZUVycm9yKCdQcm92aWRlZCBvYmplY3QgZG9lcyBub3QgY29ycmVjdGx5IGltcGxlbWVudCBTeW1ib2wub2JzZXJ2YWJsZScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9icy5zdWJzY3JpYmUobmV3IElubmVyU3Vic2NyaWJlcihvdXRlclN1YnNjcmliZXIsIG91dGVyVmFsdWUsIG91dGVySW5kZXgpKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgdmFsdWUgPSBpc09iamVjdChyZXN1bHQpID8gJ2FuIGludmFsaWQgb2JqZWN0JyA6IGAnJHtyZXN1bHR9J2A7XG4gICAgY29uc3QgbXNnID0gYFlvdSBwcm92aWRlZCAke3ZhbHVlfSB3aGVyZSBhIHN0cmVhbSB3YXMgZXhwZWN0ZWQuYFxuICAgICAgKyAnIFlvdSBjYW4gcHJvdmlkZSBhbiBPYnNlcnZhYmxlLCBQcm9taXNlLCBBcnJheSwgb3IgSXRlcmFibGUuJztcbiAgICBkZXN0aW5hdGlvbi5lcnJvcihuZXcgVHlwZUVycm9yKG1zZykpO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuIl19