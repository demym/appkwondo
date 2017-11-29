'use strict';
(function (context) {
    var Mocha = context.Mocha;
    if (typeof Mocha === 'undefined') {
        throw new Error('Missing Mocha.js');
    }
    if (typeof Zone === 'undefined') {
        throw new Error('Missing Zone.js');
    }
    var ProxyZoneSpec = Zone['ProxyZoneSpec'];
    var SyncTestZoneSpec = Zone['SyncTestZoneSpec'];
    if (!ProxyZoneSpec) {
        throw new Error('Missing ProxyZoneSpec');
    }
    if (Mocha['__zone_patch__']) {
        throw new Error('"Mocha" has already been patched with "Zone".');
    }
    Mocha['__zone_patch__'] = true;
    var rootZone = Zone.current;
    var syncZone = rootZone.fork(new SyncTestZoneSpec('Mocha.describe'));
    var testZone = null;
    var suiteZone = rootZone.fork(new ProxyZoneSpec());
    var mochaOriginal = {
        after: Mocha.after,
        afterEach: Mocha.afterEach,
        before: Mocha.before,
        beforeEach: Mocha.beforeEach,
        describe: Mocha.describe,
        it: Mocha.it
    };
    function modifyArguments(args, syncTest, asyncTest) {
        var _loop_1 = function (i) {
            var arg = args[i];
            if (typeof arg === 'function') {
                args[i] = (arg.length === 0) ? syncTest(arg) : asyncTest(arg);
                args[i].toString = function () {
                    return arg.toString();
                };
            }
        };
        for (var i = 0; i < args.length; i++) {
            _loop_1(i);
        }
        return args;
    }
    function wrapDescribeInZone(args) {
        var syncTest = function (fn) {
            return function () {
                return syncZone.run(fn, this, arguments);
            };
        };
        return modifyArguments(args, syncTest);
    }
    function wrapTestInZone(args) {
        var asyncTest = function (fn) {
            return function (done) {
                return testZone.run(fn, this, [done]);
            };
        };
        var syncTest = function (fn) {
            return function () {
                return testZone.run(fn, this);
            };
        };
        return modifyArguments(args, syncTest, asyncTest);
    }
    function wrapSuiteInZone(args) {
        var asyncTest = function (fn) {
            return function (done) {
                return suiteZone.run(fn, this, [done]);
            };
        };
        var syncTest = function (fn) {
            return function () {
                return suiteZone.run(fn, this);
            };
        };
        return modifyArguments(args, syncTest, asyncTest);
    }
    context.describe = context.suite = Mocha.describe = function () {
        return mochaOriginal.describe.apply(this, wrapDescribeInZone(arguments));
    };
    context.xdescribe = context.suite.skip = Mocha.describe.skip = function () {
        return mochaOriginal.describe.skip.apply(this, wrapDescribeInZone(arguments));
    };
    context.describe.only = context.suite.only = Mocha.describe.only = function () {
        return mochaOriginal.describe.only.apply(this, wrapDescribeInZone(arguments));
    };
    context.it = context.specify = context.test = Mocha.it = function () {
        return mochaOriginal.it.apply(this, wrapTestInZone(arguments));
    };
    context.xit = context.xspecify = Mocha.it.skip = function () {
        return mochaOriginal.it.skip.apply(this, wrapTestInZone(arguments));
    };
    context.it.only = context.test.only = Mocha.it.only = function () {
        return mochaOriginal.it.only.apply(this, wrapTestInZone(arguments));
    };
    context.after = context.suiteTeardown = Mocha.after = function () {
        return mochaOriginal.after.apply(this, wrapSuiteInZone(arguments));
    };
    context.afterEach = context.teardown = Mocha.afterEach = function () {
        return mochaOriginal.afterEach.apply(this, wrapTestInZone(arguments));
    };
    context.before = context.suiteSetup = Mocha.before = function () {
        return mochaOriginal.before.apply(this, wrapSuiteInZone(arguments));
    };
    context.beforeEach = context.setup = Mocha.beforeEach = function () {
        return mochaOriginal.beforeEach.apply(this, wrapTestInZone(arguments));
    };
    (function (originalRunTest, originalRun) {
        Mocha.Runner.prototype.runTest = function (fn) {
            var _this = this;
            Zone.current.scheduleMicroTask('mocha.forceTask', function () {
                originalRunTest.call(_this, fn);
            });
        };
        Mocha.Runner.prototype.run = function (fn) {
            this.on('test', function (e) {
                if (Zone.current !== rootZone) {
                    throw new Error('Unexpected zone: ' + Zone.current.name);
                }
                testZone = rootZone.fork(new ProxyZoneSpec());
            });
            return originalRun.call(this, fn);
        };
    })(Mocha.Runner.prototype.runTest, Mocha.Runner.prototype.run);
})(window);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jaGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2NoYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxZQUFZLENBQUM7QUFFYixDQUFDLFVBQUMsT0FBWTtJQUNaLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFFNUIsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDaEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFNLGFBQWEsR0FBSSxJQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDckQsSUFBTSxnQkFBZ0IsR0FBSSxJQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUUzRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLENBQUM7SUFFL0IsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUM5QixJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLElBQUksUUFBUSxHQUFTLElBQUksQ0FBQztJQUMxQixJQUFNLFNB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QWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuKChjb250ZXh0OiBhbnkpID0+IHtcbiAgY29uc3QgTW9jaGEgPSBjb250ZXh0Lk1vY2hhO1xuXG4gIGlmICh0eXBlb2YgTW9jaGEgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIE1vY2hhLmpzJyk7XG4gIH1cblxuICBpZiAodHlwZW9mIFpvbmUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIFpvbmUuanMnKTtcbiAgfVxuXG4gIGNvbnN0IFByb3h5Wm9uZVNwZWMgPSAoWm9uZSBhcyBhbnkpWydQcm94eVpvbmVTcGVjJ107XG4gIGNvbnN0IFN5bmNUZXN0Wm9uZVNwZWMgPSAoWm9uZSBhcyBhbnkpWydTeW5jVGVzdFpvbmVTcGVjJ107XG5cbiAgaWYgKCFQcm94eVpvbmVTcGVjKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIFByb3h5Wm9uZVNwZWMnKTtcbiAgfVxuXG4gIGlmIChNb2NoYVsnX196b25lX3BhdGNoX18nXSkge1xuICAgIHRocm93IG5ldyBFcnJvcignXCJNb2NoYVwiIGhhcyBhbHJlYWR5IGJlZW4gcGF0Y2hlZCB3aXRoIFwiWm9uZVwiLicpO1xuICB9XG5cbiAgTW9jaGFbJ19fem9uZV9wYXRjaF9fJ10gPSB0cnVlO1xuXG4gIGNvbnN0IHJvb3Rab25lID0gWm9uZS5jdXJyZW50O1xuICBjb25zdCBzeW5jWm9uZSA9IHJvb3Rab25lLmZvcmsobmV3IFN5bmNUZXN0Wm9uZVNwZWMoJ01vY2hhLmRlc2NyaWJlJykpO1xuICBsZXQgdGVzdFpvbmU6IFpvbmUgPSBudWxsO1xuICBjb25zdCBzdWl0ZVpvbmUgPSByb290Wm9uZS5mb3JrKG5ldyBQcm94eVpvbmVTcGVjKCkpO1xuXG4gIGNvbnN0IG1vY2hhT3JpZ2luYWwgPSB7XG4gICAgYWZ0ZXI6IE1vY2hhLmFmdGVyLFxuICAgIGFmdGVyRWFjaDogTW9jaGEuYWZ0ZXJFYWNoLFxuICAgIGJlZm9yZTogTW9jaGEuYmVmb3JlLFxuICAgIGJlZm9yZUVhY2g6IE1vY2hhLmJlZm9yZUVhY2gsXG4gICAgZGVzY3JpYmU6IE1vY2hhLmRlc2NyaWJlLFxuICAgIGl0OiBNb2NoYS5pdFxuICB9O1xuXG4gIGZ1bmN0aW9uIG1vZGlmeUFyZ3VtZW50cyhhcmdzOiBJQXJndW1lbnRzLCBzeW5jVGVzdDogRnVuY3Rpb24sIGFzeW5jVGVzdD86IEZ1bmN0aW9uKTogYW55W10ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGFyZyA9IGFyZ3NbaV07XG4gICAgICBpZiAodHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBUaGUgYGRvbmVgIGNhbGxiYWNrIGlzIG9ubHkgcGFzc2VkIHRocm91Z2ggaWYgdGhlIGZ1bmN0aW9uIGV4cGVjdHMgYXRcbiAgICAgICAgLy8gbGVhc3Qgb25lIGFyZ3VtZW50LlxuICAgICAgICAvLyBOb3RlIHdlIGhhdmUgdG8gbWFrZSBhIGZ1bmN0aW9uIHdpdGggY29ycmVjdCBudW1iZXIgb2YgYXJndW1lbnRzLFxuICAgICAgICAvLyBvdGhlcndpc2UgbW9jaGEgd2lsbFxuICAgICAgICAvLyB0aGluayB0aGF0IGFsbCBmdW5jdGlvbnMgYXJlIHN5bmMgb3IgYXN5bmMuXG4gICAgICAgIGFyZ3NbaV0gPSAoYXJnLmxlbmd0aCA9PT0gMCkgPyBzeW5jVGVzdChhcmcpIDogYXN5bmNUZXN0KGFyZyk7XG4gICAgICAgIC8vIE1vY2hhIHVzZXMgdG9TdHJpbmcgdG8gdmlldyB0aGUgdGVzdCBib2R5IGluIHRoZSByZXN1bHQgbGlzdCwgbWFrZSBzdXJlIHdlIHJldHVybiB0aGVcbiAgICAgICAgLy8gY29ycmVjdCBmdW5jdGlvbiBib2R5XG4gICAgICAgIGFyZ3NbaV0udG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYXJnLnRvU3RyaW5nKCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyZ3MgYXMgYW55O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcERlc2NyaWJlSW5ab25lKGFyZ3M6IElBcmd1bWVudHMpOiBhbnlbXSB7XG4gICAgY29uc3Qgc3luY1Rlc3Q6IGFueSA9IGZ1bmN0aW9uKGZuOiBGdW5jdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc3luY1pvbmUucnVuKGZuLCB0aGlzLCBhcmd1bWVudHMgYXMgYW55IGFzIGFueVtdKTtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHJldHVybiBtb2RpZnlBcmd1bWVudHMoYXJncywgc3luY1Rlc3QpO1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcFRlc3RJblpvbmUoYXJnczogSUFyZ3VtZW50cyk6IGFueVtdIHtcbiAgICBjb25zdCBhc3luY1Rlc3QgPSBmdW5jdGlvbihmbjogRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihkb25lOiBGdW5jdGlvbikge1xuICAgICAgICByZXR1cm4gdGVzdFpvbmUucnVuKGZuLCB0aGlzLCBbZG9uZV0pO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc3luY1Rlc3Q6IGFueSA9IGZ1bmN0aW9uKGZuOiBGdW5jdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGVzdFpvbmUucnVuKGZuLCB0aGlzKTtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHJldHVybiBtb2RpZnlBcmd1bWVudHMoYXJncywgc3luY1Rlc3QsIGFzeW5jVGVzdCk7XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwU3VpdGVJblpvbmUoYXJnczogSUFyZ3VtZW50cyk6IGFueVtdIHtcbiAgICBjb25zdCBhc3luY1Rlc3QgPSBmdW5jdGlvbihmbjogRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihkb25lOiBGdW5jdGlvbikge1xuICAgICAgICByZXR1cm4gc3VpdGVab25lLnJ1bihmbiwgdGhpcywgW2RvbmVdKTtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IHN5bmNUZXN0OiBhbnkgPSBmdW5jdGlvbihmbjogRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHN1aXRlWm9uZS5ydW4oZm4sIHRoaXMpO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIG1vZGlmeUFyZ3VtZW50cyhhcmdzLCBzeW5jVGVzdCwgYXN5bmNUZXN0KTtcbiAgfVxuXG4gIGNvbnRleHQuZGVzY3JpYmUgPSBjb250ZXh0LnN1aXRlID0gTW9jaGEuZGVzY3JpYmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbW9jaGFPcmlnaW5hbC5kZXNjcmliZS5hcHBseSh0aGlzLCB3cmFwRGVzY3JpYmVJblpvbmUoYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgY29udGV4dC54ZGVzY3JpYmUgPSBjb250ZXh0LnN1aXRlLnNraXAgPSBNb2NoYS5kZXNjcmliZS5za2lwID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1vY2hhT3JpZ2luYWwuZGVzY3JpYmUuc2tpcC5hcHBseSh0aGlzLCB3cmFwRGVzY3JpYmVJblpvbmUoYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgY29udGV4dC5kZXNjcmliZS5vbmx5ID0gY29udGV4dC5zdWl0ZS5vbmx5ID0gTW9jaGEuZGVzY3JpYmUub25seSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtb2NoYU9yaWdpbmFsLmRlc2NyaWJlLm9ubHkuYXBwbHkodGhpcywgd3JhcERlc2NyaWJlSW5ab25lKGFyZ3VtZW50cykpO1xuICB9O1xuXG4gIGNvbnRleHQuaXQgPSBjb250ZXh0LnNwZWNpZnkgPSBjb250ZXh0LnRlc3QgPSBNb2NoYS5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtb2NoYU9yaWdpbmFsLml0LmFwcGx5KHRoaXMsIHdyYXBUZXN0SW5ab25lKGFyZ3VtZW50cykpO1xuICB9O1xuXG4gIGNvbnRleHQueGl0ID0gY29udGV4dC54c3BlY2lmeSA9IE1vY2hhLml0LnNraXAgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbW9jaGFPcmlnaW5hbC5pdC5za2lwLmFwcGx5KHRoaXMsIHdyYXBUZXN0SW5ab25lKGFyZ3VtZW50cykpO1xuICB9O1xuXG4gIGNvbnRleHQuaXQub25seSA9IGNvbnRleHQudGVzdC5vbmx5ID0gTW9jaGEuaXQub25seSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtb2NoYU9yaWdpbmFsLml0Lm9ubHkuYXBwbHkodGhpcywgd3JhcFRlc3RJblpvbmUoYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgY29udGV4dC5hZnRlciA9IGNvbnRleHQuc3VpdGVUZWFyZG93biA9IE1vY2hhLmFmdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1vY2hhT3JpZ2luYWwuYWZ0ZXIuYXBwbHkodGhpcywgd3JhcFN1aXRlSW5ab25lKGFyZ3VtZW50cykpO1xuICB9O1xuXG4gIGNvbnRleHQuYWZ0ZXJFYWNoID0gY29udGV4dC50ZWFyZG93biA9IE1vY2hhLmFmdGVyRWFjaCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtb2NoYU9yaWdpbmFsLmFmdGVyRWFjaC5hcHBseSh0aGlzLCB3cmFwVGVzdEluWm9uZShhcmd1bWVudHMpKTtcbiAgfTtcblxuICBjb250ZXh0LmJlZm9yZSA9IGNvbnRleHQuc3VpdGVTZXR1cCA9IE1vY2hhLmJlZm9yZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtb2NoYU9yaWdpbmFsLmJlZm9yZS5hcHBseSh0aGlzLCB3cmFwU3VpdGVJblpvbmUoYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgY29udGV4dC5iZWZvcmVFYWNoID0gY29udGV4dC5zZXR1cCA9IE1vY2hhLmJlZm9yZUVhY2ggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbW9jaGFPcmlnaW5hbC5iZWZvcmVFYWNoLmFwcGx5KHRoaXMsIHdyYXBUZXN0SW5ab25lKGFyZ3VtZW50cykpO1xuICB9O1xuXG4gICgob3JpZ2luYWxSdW5UZXN0LCBvcmlnaW5hbFJ1bikgPT4ge1xuICAgIE1vY2hhLlJ1bm5lci5wcm90b3R5cGUucnVuVGVzdCA9IGZ1bmN0aW9uKGZuOiBGdW5jdGlvbikge1xuICAgICAgWm9uZS5jdXJyZW50LnNjaGVkdWxlTWljcm9UYXNrKCdtb2NoYS5mb3JjZVRhc2snLCAoKSA9PiB7XG4gICAgICAgIG9yaWdpbmFsUnVuVGVzdC5jYWxsKHRoaXMsIGZuKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBNb2NoYS5SdW5uZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uKGZuOiBGdW5jdGlvbikge1xuICAgICAgdGhpcy5vbigndGVzdCcsIChlOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKFpvbmUuY3VycmVudCAhPT0gcm9vdFpvbmUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgem9uZTogJyArIFpvbmUuY3VycmVudC5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgICB0ZXN0Wm9uZSA9IHJvb3Rab25lLmZvcmsobmV3IFByb3h5Wm9uZVNwZWMoKSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG9yaWdpbmFsUnVuLmNhbGwodGhpcywgZm4pO1xuICAgIH07XG5cblxuICB9KShNb2NoYS5SdW5uZXIucHJvdG90eXBlLnJ1blRlc3QsIE1vY2hhLlJ1bm5lci5wcm90b3R5cGUucnVuKTtcblxufSkod2luZG93KTsiXX0=