"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../util/root");
function toPromise(PromiseCtor) {
    var _this = this;
    if (!PromiseCtor) {
        if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
            PromiseCtor = root_1.root.Rx.config.Promise;
        }
        else if (root_1.root.Promise) {
            PromiseCtor = root_1.root.Promise;
        }
    }
    if (!PromiseCtor) {
        throw new Error('no Promise impl found');
    }
    return new PromiseCtor(function (resolve, reject) {
        var value;
        _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
    });
}
exports.toPromise = toPromise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9Qcm9taXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG9Qcm9taXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EscUNBQW9DO0FBd0RwQyxtQkFBa0QsV0FBNEI7SUFBOUUsaUJBaUJDO0lBaEJDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNqQixFQUFFLENBQUMsQ0FBQyxXQUFJLENBQUMsRUFBRSxJQUFJLFdBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLFdBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDeEQsV0FBVyxHQUFHLFdBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUN2QyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLFdBQVcsR0FBRyxXQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLENBQUM7SUFDSCxDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksV0FBVyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07UUFDckMsSUFBSSxLQUFVLENBQUM7UUFDZixLQUFJLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBSSxJQUFLLE9BQUEsS0FBSyxHQUFHLENBQUMsRUFBVCxDQUFTLEVBQUUsVUFBQyxHQUFRLElBQUssT0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQVgsQ0FBVyxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQWQsQ0FBYyxDQUFDLENBQUM7SUFDdkYsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBakJELDhCQWlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IHJvb3QgfSBmcm9tICcuLi91dGlsL3Jvb3QnO1xuXG4vKiB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbmV4cG9ydCBmdW5jdGlvbiB0b1Byb21pc2U8VD4odGhpczogT2JzZXJ2YWJsZTxUPik6IFByb21pc2U8VD47XG5leHBvcnQgZnVuY3Rpb24gdG9Qcm9taXNlPFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIFByb21pc2VDdG9yOiB0eXBlb2YgUHJvbWlzZSk6IFByb21pc2U8VD47XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuXG4vKipcbiAqIENvbnZlcnRzIGFuIE9ic2VydmFibGUgc2VxdWVuY2UgdG8gYSBFUzIwMTUgY29tcGxpYW50IHByb21pc2UuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFVzaW5nIG5vcm1hbCBFUzIwMTVcbiAqIGxldCBzb3VyY2UgPSBSeC5PYnNlcnZhYmxlXG4gKiAgIC5vZig0MilcbiAqICAgLnRvUHJvbWlzZSgpO1xuICpcbiAqIHNvdXJjZS50aGVuKCh2YWx1ZSkgPT4gY29uc29sZS5sb2coJ1ZhbHVlOiAlcycsIHZhbHVlKSk7XG4gKiAvLyA9PiBWYWx1ZTogNDJcbiAqXG4gKiAvLyBSZWplY3RlZCBQcm9taXNlXG4gKiAvLyBVc2luZyBub3JtYWwgRVMyMDE1XG4gKiBsZXQgc291cmNlID0gUnguT2JzZXJ2YWJsZVxuICogICAudGhyb3cobmV3IEVycm9yKCd3b29wcycpKVxuICogICAudG9Qcm9taXNlKCk7XG4gKlxuICogc291cmNlXG4gKiAgIC50aGVuKCh2YWx1ZSkgPT4gY29uc29sZS5sb2coJ1ZhbHVlOiAlcycsIHZhbHVlKSlcbiAqICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKCdFcnJvcjogJXMnLCBlcnIpKTtcbiAqIC8vID0+IEVycm9yOiBFcnJvcjogd29vcHNcbiAqXG4gKiAvLyBTZXR0aW5nIHZpYSB0aGUgY29uZmlnXG4gKiBSeC5jb25maWcuUHJvbWlzZSA9IFJTVlAuUHJvbWlzZTtcbiAqXG4gKiBsZXQgc291cmNlID0gUnguT2JzZXJ2YWJsZVxuICogICAub2YoNDIpXG4gKiAgIC50b1Byb21pc2UoKTtcbiAqXG4gKiBzb3VyY2UudGhlbigodmFsdWUpID0+IGNvbnNvbGUubG9nKCdWYWx1ZTogJXMnLCB2YWx1ZSkpO1xuICogLy8gPT4gVmFsdWU6IDQyXG4gKlxuICogLy8gU2V0dGluZyB2aWEgdGhlIG1ldGhvZFxuICogbGV0IHNvdXJjZSA9IFJ4Lk9ic2VydmFibGVcbiAqICAgLm9mKDQyKVxuICogICAudG9Qcm9taXNlKFJTVlAuUHJvbWlzZSk7XG4gKlxuICogc291cmNlLnRoZW4oKHZhbHVlKSA9PiBjb25zb2xlLmxvZygnVmFsdWU6ICVzJywgdmFsdWUpKTtcbiAqIC8vID0+IFZhbHVlOiA0MlxuICpcbiAqIEBwYXJhbSB7UHJvbWlzZUNvbnN0cnVjdG9yfSBbUHJvbWlzZUN0b3JdIFRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgcHJvbWlzZS4gSWYgbm90IHByb3ZpZGVkLFxuICogaXQgd2lsbCBsb29rIGZvciBhIGNvbnN0cnVjdG9yIGZpcnN0IGluIFJ4LmNvbmZpZy5Qcm9taXNlIHRoZW4gZmFsbCBiYWNrIHRvXG4gKiB0aGUgbmF0aXZlIFByb21pc2UgY29uc3RydWN0b3IgaWYgYXZhaWxhYmxlLlxuICogQHJldHVybiB7UHJvbWlzZTxUPn0gQW4gRVMyMDE1IGNvbXBhdGlibGUgcHJvbWlzZSB3aXRoIHRoZSBsYXN0IHZhbHVlIGZyb21cbiAqIHRoZSBvYnNlcnZhYmxlIHNlcXVlbmNlLlxuICogQG1ldGhvZCB0b1Byb21pc2VcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b1Byb21pc2U8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgUHJvbWlzZUN0b3I/OiB0eXBlb2YgUHJvbWlzZSk6IFByb21pc2U8VD4ge1xuICBpZiAoIVByb21pc2VDdG9yKSB7XG4gICAgaWYgKHJvb3QuUnggJiYgcm9vdC5SeC5jb25maWcgJiYgcm9vdC5SeC5jb25maWcuUHJvbWlzZSkge1xuICAgICAgUHJvbWlzZUN0b3IgPSByb290LlJ4LmNvbmZpZy5Qcm9taXNlO1xuICAgIH0gZWxzZSBpZiAocm9vdC5Qcm9taXNlKSB7XG4gICAgICBQcm9taXNlQ3RvciA9IHJvb3QuUHJvbWlzZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIVByb21pc2VDdG9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdubyBQcm9taXNlIGltcGwgZm91bmQnKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZUN0b3IoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCB2YWx1ZTogYW55O1xuICAgIHRoaXMuc3Vic2NyaWJlKCh4OiBUKSA9PiB2YWx1ZSA9IHgsIChlcnI6IGFueSkgPT4gcmVqZWN0KGVyciksICgpID0+IHJlc29sdmUodmFsdWUpKTtcbiAgfSk7XG59XG4iXX0=