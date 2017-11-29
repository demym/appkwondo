"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/observable/bindCallback");
require("rxjs/add/observable/bindNodeCallback");
require("rxjs/add/observable/defer");
require("rxjs/add/observable/forkJoin");
require("rxjs/add/observable/fromEventPattern");
require("rxjs/add/operator/multicast");
var Observable_1 = require("rxjs/Observable");
var asap_1 = require("rxjs/scheduler/asap");
var Subscriber_1 = require("rxjs/Subscriber");
var Subscription_1 = require("rxjs/Subscription");
var rxSubscriber_1 = require("rxjs/symbol/rxSubscriber");
Zone.__load_patch('rxjs', function (global, Zone, api) {
    var symbol = Zone.__symbol__;
    var subscribeSource = 'rxjs.subscribe';
    var nextSource = 'rxjs.Subscriber.next';
    var errorSource = 'rxjs.Subscriber.error';
    var completeSource = 'rxjs.Subscriber.complete';
    var unsubscribeSource = 'rxjs.Subscriber.unsubscribe';
    var teardownSource = 'rxjs.Subscriber.teardownLogic';
    var empty = {
        closed: true,
        next: function (value) { },
        error: function (err) { throw err; },
        complete: function () { }
    };
    function toSubscriber(nextOrObserver, error, complete) {
        if (nextOrObserver) {
            if (nextOrObserver instanceof Subscriber_1.Subscriber) {
                return nextOrObserver;
            }
            if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
                return nextOrObserver[rxSubscriber_1.rxSubscriber]();
            }
        }
        if (!nextOrObserver && !error && !complete) {
            return new Subscriber_1.Subscriber(empty);
        }
        return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
    }
    var patchObservable = function () {
        var ObservablePrototype = Observable_1.Observable.prototype;
        var symbolSubscribe = symbol('subscribe');
        var _symbolSubscribe = symbol('_subscribe');
        var _subscribe = ObservablePrototype[_symbolSubscribe] = ObservablePrototype._subscribe;
        var subscribe = ObservablePrototype[symbolSubscribe] = ObservablePrototype.subscribe;
        Object.defineProperties(Observable_1.Observable.prototype, {
            _zone: { value: null, writable: true, configurable: true },
            _zoneSource: { value: null, writable: true, configurable: true },
            _zoneSubscribe: { value: null, writable: true, configurable: true },
            source: {
                configurable: true,
                get: function () {
                    return this._zoneSource;
                },
                set: function (source) {
                    this._zone = Zone.current;
                    this._zoneSource = source;
                }
            },
            _subscribe: {
                configurable: true,
                get: function () {
                    if (this._zoneSubscribe) {
                        return this._zoneSubscribe;
                    }
                    else if (this.constructor === Observable_1.Observable) {
                        return _subscribe;
                    }
                    var proto = Object.getPrototypeOf(this);
                    return proto && proto._subscribe;
                },
                set: function (subscribe) {
                    this._zone = Zone.current;
                    this._zoneSubscribe = subscribe;
                }
            },
            subscribe: {
                writable: true,
                configurable: true,
                value: function (observerOrNext, error, complete) {
                    var _zone = this._zone;
                    if (_zone && _zone !== Zone.current) {
                        return _zone.run(subscribe, this, [toSubscriber(observerOrNext, error, complete)]);
                    }
                    return subscribe.call(this, observerOrNext, error, complete);
                }
            }
        });
    };
    var patchSubscription = function () {
        var unsubscribeSymbol = symbol('unsubscribe');
        var unsubscribe = Subscription_1.Subscription.prototype[unsubscribeSymbol] =
            Subscription_1.Subscription.prototype.unsubscribe;
        Object.defineProperties(Subscription_1.Subscription.prototype, {
            _zone: { value: null, writable: true, configurable: true },
            _zoneUnsubscribe: { value: null, writable: true, configurable: true },
            _unsubscribe: {
                get: function () {
                    if (this._zoneUnsubscribe) {
                        return this._zoneUnsubscribe;
                    }
                    var proto = Object.getPrototypeOf(this);
                    return proto && proto._unsubscribe;
                },
                set: function (unsubscribe) {
                    this._zone = Zone.current;
                    this._zoneUnsubscribe = unsubscribe;
                }
            },
            unsubscribe: {
                writable: true,
                configurable: true,
                value: function () {
                    var _zone = this._zone;
                    if (_zone && _zone !== Zone.current) {
                        _zone.run(unsubscribe, this);
                    }
                    else {
                        unsubscribe.apply(this);
                    }
                }
            }
        });
    };
    var patchSubscriber = function () {
        var next = Subscriber_1.Subscriber.prototype.next;
        var error = Subscriber_1.Subscriber.prototype.error;
        var complete = Subscriber_1.Subscriber.prototype.complete;
        Object.defineProperty(Subscriber_1.Subscriber.prototype, 'destination', {
            configurable: true,
            get: function () {
                return this._zoneDestination;
            },
            set: function (destination) {
                this._zone = Zone.current;
                this._zoneDestination = destination;
            }
        });
        Subscriber_1.Subscriber.prototype.next = function () {
            var currentZone = Zone.current;
            var subscriptionZone = this._zone;
            if (subscriptionZone && subscriptionZone !== currentZone) {
                return subscriptionZone.run(next, this, arguments, nextSource);
            }
            else {
                return next.apply(this, arguments);
            }
        };
        Subscriber_1.Subscriber.prototype.error = function () {
            var currentZone = Zone.current;
            var subscriptionZone = this._zone;
            if (subscriptionZone && subscriptionZone !== currentZone) {
                return subscriptionZone.run(error, this, arguments, errorSource);
            }
            else {
                return error.apply(this, arguments);
            }
        };
        Subscriber_1.Subscriber.prototype.complete = function () {
            var currentZone = Zone.current;
            var subscriptionZone = this._zone;
            if (subscriptionZone && subscriptionZone !== currentZone) {
                return subscriptionZone.run(complete, this, arguments, completeSource);
            }
            else {
                return complete.apply(this, arguments);
            }
        };
    };
    var patchObservableInstance = function (observable) {
        observable._zone = Zone.current;
    };
    var patchObservableFactoryCreator = function (obj, factoryName) {
        var symbolFactory = symbol(factoryName);
        if (obj[symbolFactory]) {
            return;
        }
        var factoryCreator = obj[symbolFactory] = obj[factoryName];
        if (!factoryCreator) {
            return;
        }
        obj[factoryName] = function () {
            var factory = factoryCreator.apply(this, arguments);
            return function () {
                var observable = factory.apply(this, arguments);
                patchObservableInstance(observable);
                return observable;
            };
        };
    };
    var patchObservableFactory = function (obj, factoryName) {
        var symbolFactory = symbol(factoryName);
        if (obj[symbolFactory]) {
            return;
        }
        var factory = obj[symbolFactory] = obj[factoryName];
        if (!factory) {
            return;
        }
        obj[factoryName] = function () {
            var observable = factory.apply(this, arguments);
            patchObservableInstance(observable);
            return observable;
        };
    };
    var patchObservableFactoryArgs = function (obj, factoryName) {
        var symbolFactory = symbol(factoryName);
        if (obj[symbolFactory]) {
            return;
        }
        var factory = obj[symbolFactory] = obj[factoryName];
        if (!factory) {
            return;
        }
        obj[factoryName] = function () {
            var initZone = Zone.current;
            var args = Array.prototype.slice.call(arguments);
            var _loop_1 = function (i) {
                var arg = args[i];
                if (typeof arg === 'function') {
                    args[i] = function () {
                        var argArgs = Array.prototype.slice.call(arguments);
                        var runningZone = Zone.current;
                        if (initZone && runningZone && initZone !== runningZone) {
                            return initZone.run(arg, this, argArgs);
                        }
                        else {
                            return arg.apply(this, argArgs);
                        }
                    };
                }
            };
            for (var i = 0; i < args.length; i++) {
                _loop_1(i);
            }
            var observable = factory.apply(this, args);
            patchObservableInstance(observable);
            return observable;
        };
    };
    var patchMulticast = function () {
        var obj = Observable_1.Observable.prototype;
        var factoryName = 'multicast';
        var symbolFactory = symbol(factoryName);
        if (obj[symbolFactory]) {
            return;
        }
        var factory = obj[symbolFactory] = obj[factoryName];
        if (!factory) {
            return;
        }
        obj[factoryName] = function () {
            var _zone = Zone.current;
            var args = Array.prototype.slice.call(arguments);
            var subjectOrSubjectFactory = args.length > 0 ? args[0] : undefined;
            if (typeof subjectOrSubjectFactory !== 'function') {
                var originalFactory_1 = subjectOrSubjectFactory;
                subjectOrSubjectFactory = function () {
                    return originalFactory_1;
                };
            }
            args[0] = function () {
                var subject;
                if (_zone && _zone !== Zone.current) {
                    subject = _zone.run(subjectOrSubjectFactory, this, arguments);
                }
                else {
                    subject = subjectOrSubjectFactory.apply(this, arguments);
                }
                if (subject && _zone) {
                    subject._zone = _zone;
                }
                return subject;
            };
            var observable = factory.apply(this, args);
            patchObservableInstance(observable);
            return observable;
        };
    };
    var patchImmediate = function (asap) {
        if (!asap) {
            return;
        }
        var scheduleSymbol = symbol('scheduleSymbol');
        var flushSymbol = symbol('flushSymbol');
        var zoneSymbol = symbol('zone');
        if (asap[scheduleSymbol]) {
            return;
        }
        var schedule = asap[scheduleSymbol] = asap.schedule;
        asap.schedule = function () {
            var args = Array.prototype.slice.call(arguments);
            var work = args.length > 0 ? args[0] : undefined;
            var delay = args.length > 1 ? args[1] : 0;
            var state = (args.length > 2 ? args[2] : undefined) || {};
            state[zoneSymbol] = Zone.current;
            var patchedWork = function () {
                var workArgs = Array.prototype.slice.call(arguments);
                var action = workArgs.length > 0 ? workArgs[0] : undefined;
                var scheduleZone = action && action[zoneSymbol];
                if (scheduleZone && scheduleZone !== Zone.current) {
                    return scheduleZone.runGuarded(work, this, arguments);
                }
                else {
                    return work.apply(this, arguments);
                }
            };
            return schedule.apply(this, [patchedWork, delay, state]);
        };
    };
    patchObservable();
    patchSubscription();
    patchSubscriber();
    patchObservableFactoryCreator(Observable_1.Observable, 'bindCallback');
    patchObservableFactoryCreator(Observable_1.Observable, 'bindNodeCallback');
    patchObservableFactory(Observable_1.Observable, 'defer');
    patchObservableFactory(Observable_1.Observable, 'forkJoin');
    patchObservableFactoryArgs(Observable_1.Observable, 'fromEventPattern');
    patchMulticast();
    patchImmediate(asap_1.asap);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnhqcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJ4anMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSw0Q0FBMEM7QUFDMUMsZ0RBQThDO0FBQzlDLHFDQUFtQztBQUNuQyx3Q0FBc0M7QUFDdEMsZ0RBQThDO0FBQzlDLHVDQUFxQztBQUVyQyw4Q0FBMkM7QUFDM0MsNENBQXlDO0FBQ3pDLDhDQUEyQztBQUMzQyxrREFBK0M7QUFDL0MseURBQXNEO0FBRXJELElBQVksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFVBQUMsTUFBVyxFQUFFLElBQWMsRUFBRSxHQUFRO0lBQ3ZFLElBQU0sTUFBTSxHQUFzQyxJQUFZLENBQUMsVUFBVSxDQUFDO0lBQzFFLElBQU0sZUFBZSxHQUFHLGdCQUFnQixDQUFDO0lBQ3pDLElBQU0sVUFBVSxHQUFHLHNCQUFzQixDQUFDO0lBQzFDLElBQU0sV0FBVyxHQUFHLHVCQUF1QixDQUFDO0lBQzVDLElBQU0sY0FBYyxHQUFHLDBCQUEwQixDQUFDO0lBQ2xELElBQU0saUJBQWlCLEdBQUcsNkJBQTZCLENBQUM7SUFDeEQsSUFBTSxjQUFjLEdBQUcsK0JBQStCLENBQUM7SUFFdkQsSUFBTSxLQUFLLEdBQUc7UUFDWixNQUFNLEVBQUUsSUFBSTtRQUNaLElBQUksRUFBSixVQUFLLEtBQVUsSUFBUSxDQUFDO1FBQ3hCLEtBQUssRUFBTCxVQUFNLEdBQVEsSUFBUSxNQUFNLEdBQUcsQ0FBQyxDQUFBLENBQUM7UUFDakMsUUFBUSxFQUFSLGNBQWlCLENBQUM7S0FDbkIsQ0FBQztJQUVGLHNCQUNJLGNBQW9CLEVBQUUsS0FBNEIsRUFBRSxRQUFxQjtRQUMzRSxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLGNBQWMsWUFBWSx1QkFBVSxDQUFDLENBQUMsQ0FBQztnQkFDekMsTUFBTSxDQUFpQixjQUFlLENBQUM7WUFDekMsQ0FBQztZQUVELEVBQUUsQ0FBQyxD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QUFTLENBQUMsQ0FBQztnQkFDeEQsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7WUFDSCxDQUFDLENBQUM7WUFDRixNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0lBRUYsZUFBZSxFQUFFLENBQUM7SUFDbEIsaUJBQWlCLEVBQUUsQ0FBQztJQUNwQixlQUFlLEVBQUUsQ0FBQztJQUNsQiw2QkFBNkIsQ0FBQyx1QkFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzFELDZCQUE2QixDQUFDLHVCQUFVLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUM5RCxzQkFBc0IsQ0FBQyx1QkFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLHNCQUFzQixDQUFDLHVCQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDL0MsMEJBQTBCLENBQUMsdUJBQVUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBQzNELGNBQWMsRUFBRSxDQUFDO0lBQ2pCLGNBQWMsQ0FBQyxXQUFJLENBQUMsQ0FBQztBQUN2QixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2JpbmRDYWxsYmFjayc7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvYmluZE5vZGVDYWxsYmFjayc7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvZGVmZXInO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2ZvcmtKb2luJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9mcm9tRXZlbnRQYXR0ZXJuJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbXVsdGljYXN0JztcblxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHthc2FwfSBmcm9tICdyeGpzL3NjaGVkdWxlci9hc2FwJztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAncnhqcy9TdWJzY3JpYmVyJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQge3J4U3Vic2NyaWJlcn0gZnJvbSAncnhqcy9zeW1ib2wvcnhTdWJzY3JpYmVyJztcblxuKFpvbmUgYXMgYW55KS5fX2xvYWRfcGF0Y2goJ3J4anMnLCAoZ2xvYmFsOiBhbnksIFpvbmU6IFpvbmVUeXBlLCBhcGk6IGFueSkgPT4ge1xuICBjb25zdCBzeW1ib2w6IChzeW1ib2xTdHJpbmc6IHN0cmluZykgPT4gc3RyaW5nID0gKFpvbmUgYXMgYW55KS5fX3N5bWJvbF9fO1xuICBjb25zdCBzdWJzY3JpYmVTb3VyY2UgPSAncnhqcy5zdWJzY3JpYmUnO1xuICBjb25zdCBuZXh0U291cmNlID0gJ3J4anMuU3Vic2NyaWJlci5uZXh0JztcbiAgY29uc3QgZXJyb3JTb3VyY2UgPSAncnhqcy5TdWJzY3JpYmVyLmVycm9yJztcbiAgY29uc3QgY29tcGxldGVTb3VyY2UgPSAncnhqcy5TdWJzY3JpYmVyLmNvbXBsZXRlJztcbiAgY29uc3QgdW5zdWJzY3JpYmVTb3VyY2UgPSAncnhqcy5TdWJzY3JpYmVyLnVuc3Vic2NyaWJlJztcbiAgY29uc3QgdGVhcmRvd25Tb3VyY2UgPSAncnhqcy5TdWJzY3JpYmVyLnRlYXJkb3duTG9naWMnO1xuXG4gIGNvbnN0IGVtcHR5ID0ge1xuICAgIGNsb3NlZDogdHJ1ZSxcbiAgICBuZXh0KHZhbHVlOiBhbnkpOiB2b2lke30sXG4gICAgZXJyb3IoZXJyOiBhbnkpOiB2b2lke3Rocm93IGVycjt9LFxuICAgIGNvbXBsZXRlKCk6IHZvaWR7fVxuICB9O1xuXG4gIGZ1bmN0aW9uIHRvU3Vic2NyaWJlcjxUPihcbiAgICAgIG5leHRPck9ic2VydmVyPzogYW55LCBlcnJvcj86IChlcnJvcjogYW55KSA9PiB2b2lkLCBjb21wbGV0ZT86ICgpID0+IHZvaWQpOiBTdWJzY3JpYmVyPFQ+IHtcbiAgICBpZiAobmV4dE9yT2JzZXJ2ZXIpIHtcbiAgICAgIGlmIChuZXh0T3JPYnNlcnZlciBpbnN0YW5jZW9mIFN1YnNjcmliZXIpIHtcbiAgICAgICAgcmV0dXJuICg8U3Vic2NyaWJlcjxUPj5uZXh0T3JPYnNlcnZlcik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXh0T3JPYnNlcnZlcltyeFN1YnNjcmliZXJdKSB7XG4gICAgICAgIHJldHVybiBuZXh0T3JPYnNlcnZlcltyeFN1YnNjcmliZXJdKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFuZXh0T3JPYnNlcnZlciAmJiAhZXJyb3IgJiYgIWNvbXBsZXRlKSB7XG4gICAgICByZXR1cm4gbmV3IFN1YnNjcmliZXIoZW1wdHkpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgU3Vic2NyaWJlcihuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgfVxuXG4gIGNvbnN0IHBhdGNoT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IE9ic2VydmFibGVQcm90b3R5cGU6IGFueSA9IE9ic2VydmFibGUucHJvdG90eXBlO1xuICAgIGNvbnN0IHN5bWJvbFN1YnNjcmliZSA9IHN5bWJvbCgnc3Vic2NyaWJlJyk7XG4gICAgY29uc3QgX3N5bWJvbFN1YnNjcmliZSA9IHN5bWJvbCgnX3N1YnNjcmliZScpO1xuICAgIGNvbnN0IF9zdWJzY3JpYmUgPSBPYnNlcnZhYmxlUHJvdG90eXBlW19zeW1ib2xTdWJzY3JpYmVdID0gT2JzZXJ2YWJsZVByb3RvdHlwZS5fc3Vic2NyaWJlO1xuICAgIGNvbnN0IHN1YnNjcmliZSA9IE9ic2VydmFibGVQcm90b3R5cGVbc3ltYm9sU3Vic2NyaWJlXSA9IE9ic2VydmFibGVQcm90b3R5cGUuc3Vic2NyaWJlO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoT2JzZXJ2YWJsZS5wcm90b3R5cGUsIHtcbiAgICAgIF96b25lOiB7dmFsdWU6IG51bGwsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWV9LFxuICAgICAgX3pvbmVTb3VyY2U6IHt2YWx1ZTogbnVsbCwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZX0sXG4gICAgICBfem9uZVN1YnNjcmliZToge3ZhbHVlOiBudWxsLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlfSxcbiAgICAgIHNvdXJjZToge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogZnVuY3Rpb24odGhpczogT2JzZXJ2YWJsZTxhbnk+KSB7XG4gICAgICAgICAgcmV0dXJuICh0aGlzIGFzIGFueSkuX3pvbmVTb3VyY2U7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24odGhpczogT2JzZXJ2YWJsZTxhbnk+LCBzb3VyY2U6IGFueSkge1xuICAgICAgICAgICh0aGlzIGFzIGFueSkuX3pvbmUgPSBab25lLmN1cnJlbnQ7XG4gICAgICAgICAgKHRoaXMgYXMgYW55KS5fem9uZVNvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIF9zdWJzY3JpYmU6IHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKHRoaXM6IE9ic2VydmFibGU8YW55Pikge1xuICAgICAgICAgIGlmICgodGhpcyBhcyBhbnkpLl96b25lU3Vic2NyaWJlKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMgYXMgYW55KS5fem9uZVN1YnNjcmliZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29uc3RydWN0b3IgPT09IE9ic2VydmFibGUpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3Vic2NyaWJlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKTtcbiAgICAgICAgICByZXR1cm4gcHJvdG8gJiYgcHJvdG8uX3N1YnNjcmliZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbih0aGlzOiBPYnNlcnZhYmxlPGFueT4sIHN1YnNjcmliZTogYW55KSB7XG4gICAgICAgICAgKHRoaXMgYXMgYW55KS5fem9uZSA9IFpvbmUuY3VycmVudDtcbiAgICAgICAgICAodGhpcyBhcyBhbnkpLl96b25lU3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc3Vic2NyaWJlOiB7XG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbih0aGlzOiBPYnNlcnZhYmxlPGFueT4sIG9ic2VydmVyT3JOZXh0OiBhbnksIGVycm9yOiBhbnksIGNvbXBsZXRlOiBhbnkpIHtcbiAgICAgICAgICAvLyBPbmx5IGdyYWIgYSB6b25lIGlmIHdlIFpvbmUgZXhpc3RzIGFuZCBpdCBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgY3VycmVudCB6b25lLlxuICAgICAgICAgIGNvbnN0IF96b25lID0gKHRoaXMgYXMgYW55KS5fem9uZTtcbiAgICAgICAgICBpZiAoX3pvbmUgJiYgX3pvbmUgIT09IFpvbmUuY3VycmVudCkge1xuICAgICAgICAgICAgLy8gQ3VycmVudCBab25lIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBpbnRlbmRlZCB6b25lLlxuICAgICAgICAgICAgLy8gUmVzdG9yZSB0aGUgem9uZSBiZWZvcmUgaW52b2tpbmcgdGhlIHN1YnNjcmliZSBjYWxsYmFjay5cbiAgICAgICAgICAgIHJldHVybiBfem9uZS5ydW4oc3Vic2NyaWJlLCB0aGlzLCBbdG9TdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdWJzY3JpYmUuY2FsbCh0aGlzLCBvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHBhdGNoU3Vic2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgdW5zdWJzY3JpYmVTeW1ib2wgPSBzeW1ib2woJ3Vuc3Vic2NyaWJlJyk7XG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSAoU3Vic2NyaXB0aW9uLnByb3RvdHlwZSBhcyBhbnkpW3Vuc3Vic2NyaWJlU3ltYm9sXSA9XG4gICAgICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUudW5zdWJzY3JpYmU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoU3Vic2NyaXB0aW9uLnByb3RvdHlwZSwge1xuICAgICAgX3pvbmU6IHt2YWx1ZTogbnVsbCwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZX0sXG4gICAgICBfem9uZVVuc3Vic2NyaWJlOiB7dmFsdWU6IG51bGwsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWV9LFxuICAgICAgX3Vuc3Vic2NyaWJlOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24odGhpczogU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgaWYgKCh0aGlzIGFzIGFueSkuX3pvbmVVbnN1YnNjcmliZSkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzIGFzIGFueSkuX3pvbmVVbnN1YnNjcmliZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcyk7XG4gICAgICAgICAgcmV0dXJuIHByb3RvICYmIHByb3RvLl91bnN1YnNjcmliZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbih0aGlzOiBTdWJzY3JpcHRpb24sIHVuc3Vic2NyaWJlOiBhbnkpIHtcbiAgICAgICAgICAodGhpcyBhcyBhbnkpLl96b25lID0gWm9uZS5jdXJyZW50O1xuICAgICAgICAgICh0aGlzIGFzIGFueSkuX3pvbmVVbnN1YnNjcmliZSA9IHVuc3Vic2NyaWJlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdW5zdWJzY3JpYmU6IHtcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKHRoaXM6IFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgIC8vIE9ubHkgZ3JhYiBhIHpvbmUgaWYgd2UgWm9uZSBleGlzdHMgYW5kIGl0IGlzIGRpZmZlcmVudCBmcm9tIHRoZSBjdXJyZW50IHpvbmUuXG4gICAgICAgICAgY29uc3QgX3pvbmU6IFpvbmUgPSAodGhpcyBhcyBhbnkpLl96b25lO1xuICAgICAgICAgIGlmIChfem9uZSAmJiBfem9uZSAhPT0gWm9uZS5jdXJyZW50KSB7XG4gICAgICAgICAgICAvLyBDdXJyZW50IFpvbmUgaXMgZGlmZmVyZW50IGZyb20gdGhlIGludGVuZGVkIHpvbmUuXG4gICAgICAgICAgICAvLyBSZXN0b3JlIHRoZSB6b25lIGJlZm9yZSBpbnZva2luZyB0aGUgc3Vic2NyaWJlIGNhbGxiYWNrLlxuICAgICAgICAgICAgX3pvbmUucnVuKHVuc3Vic2NyaWJlLCB0aGlzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUuYXBwbHkodGhpcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcGF0Y2hTdWJzY3JpYmVyID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgbmV4dCA9IFN1YnNjcmliZXIucHJvdG90eXBlLm5leHQ7XG4gICAgY29uc3QgZXJyb3IgPSBTdWJzY3JpYmVyLnByb3RvdHlwZS5lcnJvcjtcbiAgICBjb25zdCBjb21wbGV0ZSA9IFN1YnNjcmliZXIucHJvdG90eXBlLmNvbXBsZXRlO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFN1YnNjcmliZXIucHJvdG90eXBlLCAnZGVzdGluYXRpb24nLCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uKHRoaXM6IFN1YnNjcmliZXI8YW55Pikge1xuICAgICAgICByZXR1cm4gKHRoaXMgYXMgYW55KS5fem9uZURlc3RpbmF0aW9uO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24odGhpczogU3Vic2NyaWJlcjxhbnk+LCBkZXN0aW5hdGlvbjogYW55KSB7XG4gICAgICAgICh0aGlzIGFzIGFueSkuX3pvbmUgPSBab25lLmN1cnJlbnQ7XG4gICAgICAgICh0aGlzIGFzIGFueSkuX3pvbmVEZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gcGF0Y2ggU3Vic2NyaWJlci5uZXh0IHRvIG1ha2Ugc3VyZSBpdCBydW5cbiAgICAvLyBpbnRvIFN1YnNjcmlwdGlvblpvbmVcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBjdXJyZW50Wm9uZSA9IFpvbmUuY3VycmVudDtcbiAgICAgIGNvbnN0IHN1YnNjcmlwdGlvblpvbmUgPSB0aGlzLl96b25lO1xuXG4gICAgICAvLyBmb3IgcGVyZm9ybWFuY2UgY29uY2VybiwgY2hlY2sgWm9uZS5jdXJyZW50XG4gICAgICAvLyBlcXVhbCB3aXRoIHRoaXMuX3pvbmUoU3Vic2NyaXB0aW9uWm9uZSkgb3Igbm90XG4gICAgICBpZiAoc3Vic2NyaXB0aW9uWm9uZSAmJiBzdWJzY3JpcHRpb25ab25lICE9PSBjdXJyZW50Wm9uZSkge1xuICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uWm9uZS5ydW4obmV4dCwgdGhpcywgYXJndW1lbnRzLCBuZXh0U291cmNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXh0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBjdXJyZW50Wm9uZSA9IFpvbmUuY3VycmVudDtcbiAgICAgIGNvbnN0IHN1YnNjcmlwdGlvblpvbmUgPSB0aGlzLl96b25lO1xuXG4gICAgICAvLyBmb3IgcGVyZm9ybWFuY2UgY29uY2VybiwgY2hlY2sgWm9uZS5jdXJyZW50XG4gICAgICAvLyBlcXVhbCB3aXRoIHRoaXMuX3pvbmUoU3Vic2NyaXB0aW9uWm9uZSkgb3Igbm90XG4gICAgICBpZiAoc3Vic2NyaXB0aW9uWm9uZSAmJiBzdWJzY3JpcHRpb25ab25lICE9PSBjdXJyZW50Wm9uZSkge1xuICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uWm9uZS5ydW4oZXJyb3IsIHRoaXMsIGFyZ3VtZW50cywgZXJyb3JTb3VyY2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGVycm9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBjdXJyZW50Wm9uZSA9IFpvbmUuY3VycmVudDtcbiAgICAgIGNvbnN0IHN1YnNjcmlwdGlvblpvbmUgPSB0aGlzLl96b25lO1xuXG4gICAgICAvLyBmb3IgcGVyZm9ybWFuY2UgY29uY2VybiwgY2hlY2sgWm9uZS5jdXJyZW50XG4gICAgICAvLyBlcXVhbCB3aXRoIHRoaXMuX3pvbmUoU3Vic2NyaXB0aW9uWm9uZSkgb3Igbm90XG4gICAgICBpZiAoc3Vic2NyaXB0aW9uWm9uZSAmJiBzdWJzY3JpcHRpb25ab25lICE9PSBjdXJyZW50Wm9uZSkge1xuICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uWm9uZS5ydW4oY29tcGxldGUsIHRoaXMsIGFyZ3VtZW50cywgY29tcGxldGVTb3VyY2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvbXBsZXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBwYXRjaE9ic2VydmFibGVJbnN0YW5jZSA9IGZ1bmN0aW9uKG9ic2VydmFibGU6IGFueSkge1xuICAgIG9ic2VydmFibGUuX3pvbmUgPSBab25lLmN1cnJlbnQ7XG4gIH07XG5cbiAgY29uc3QgcGF0Y2hPYnNlcnZhYmxlRmFjdG9yeUNyZWF0b3IgPSBmdW5jdGlvbihvYmo6IGFueSwgZmFjdG9yeU5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IHN5bWJvbEZhY3Rvcnk6IHN0cmluZyA9IHN5bWJvbChmYWN0b3J5TmFtZSk7XG4gICAgaWYgKG9ialtzeW1ib2xGYWN0b3J5XSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmYWN0b3J5Q3JlYXRvcjogYW55ID0gb2JqW3N5bWJvbEZhY3RvcnldID0gb2JqW2ZhY3RvcnlOYW1lXTtcbiAgICBpZiAoIWZhY3RvcnlDcmVhdG9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9ialtmYWN0b3J5TmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IGZhY3Rvcnk6IGFueSA9IGZhY3RvcnlDcmVhdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSBmYWN0b3J5LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIHBhdGNoT2JzZXJ2YWJsZUluc3RhbmNlKG9ic2VydmFibGUpO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICAgIH07XG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBwYXRjaE9ic2VydmFibGVGYWN0b3J5ID0gZnVuY3Rpb24ob2JqOiBhbnksIGZhY3RvcnlOYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzeW1ib2xGYWN0b3J5OiBzdHJpbmcgPSBzeW1ib2woZmFjdG9yeU5hbWUpO1xuICAgIGlmIChvYmpbc3ltYm9sRmFjdG9yeV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZmFjdG9yeTogYW55ID0gb2JqW3N5bWJvbEZhY3RvcnldID0gb2JqW2ZhY3RvcnlOYW1lXTtcbiAgICBpZiAoIWZhY3RvcnkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb2JqW2ZhY3RvcnlOYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IGZhY3RvcnkuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHBhdGNoT2JzZXJ2YWJsZUluc3RhbmNlKG9ic2VydmFibGUpO1xuICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBwYXRjaE9ic2VydmFibGVGYWN0b3J5QXJncyA9IGZ1bmN0aW9uKG9iajogYW55LCBmYWN0b3J5TmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3Qgc3ltYm9sRmFjdG9yeTogc3RyaW5nID0gc3ltYm9sKGZhY3RvcnlOYW1lKTtcbiAgICBpZiAob2JqW3N5bWJvbEZhY3RvcnldKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGZhY3Rvcnk6IGFueSA9IG9ialtzeW1ib2xGYWN0b3J5XSA9IG9ialtmYWN0b3J5TmFtZV07XG4gICAgaWYgKCFmYWN0b3J5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9ialtmYWN0b3J5TmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IGluaXRab25lID0gWm9uZS5jdXJyZW50O1xuICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgYXJnID0gYXJnc1tpXTtcbiAgICAgICAgaWYgKHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBhcmdzW2ldID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBhcmdBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGNvbnN0IHJ1bm5pbmdab25lID0gWm9uZS5jdXJyZW50O1xuICAgICAgICAgICAgaWYgKGluaXRab25lICYmIHJ1bm5pbmdab25lICYmIGluaXRab25lICE9PSBydW5uaW5nWm9uZSkge1xuICAgICAgICAgICAgICByZXR1cm4gaW5pdFpvbmUucnVuKGFyZywgdGhpcywgYXJnQXJncyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gYXJnLmFwcGx5KHRoaXMsIGFyZ0FyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IGZhY3RvcnkuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICBwYXRjaE9ic2VydmFibGVJbnN0YW5jZShvYnNlcnZhYmxlKTtcbiAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH07XG4gIH07XG5cbiAgY29uc3QgcGF0Y2hNdWx0aWNhc3QgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBvYmo6IGFueSA9IE9ic2VydmFibGUucHJvdG90eXBlO1xuICAgIGNvbnN0IGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnbXVsdGljYXN0JztcbiAgICBjb25zdCBzeW1ib2xGYWN0b3J5OiBzdHJpbmcgPSBzeW1ib2woZmFjdG9yeU5hbWUpO1xuICAgIGlmIChvYmpbc3ltYm9sRmFjdG9yeV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZmFjdG9yeTogYW55ID0gb2JqW3N5bWJvbEZhY3RvcnldID0gb2JqW2ZhY3RvcnlOYW1lXTtcbiAgICBpZiAoIWZhY3RvcnkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb2JqW2ZhY3RvcnlOYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgX3pvbmU6IGFueSA9IFpvbmUuY3VycmVudDtcbiAgICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgbGV0IHN1YmplY3RPclN1YmplY3RGYWN0b3J5OiBhbnkgPSBhcmdzLmxlbmd0aCA+IDAgPyBhcmdzWzBdIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKHR5cGVvZiBzdWJqZWN0T3JTdWJqZWN0RmFjdG9yeSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zdCBvcmlnaW5hbEZhY3Rvcnk6IGFueSA9IHN1YmplY3RPclN1YmplY3RGYWN0b3J5O1xuICAgICAgICBzdWJqZWN0T3JTdWJqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBvcmlnaW5hbEZhY3Rvcnk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBhcmdzWzBdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBzdWJqZWN0OiBhbnk7XG4gICAgICAgIGlmIChfem9uZSAmJiBfem9uZSAhPT0gWm9uZS5jdXJyZW50KSB7XG4gICAgICAgICAgc3ViamVjdCA9IF96b25lLnJ1bihzdWJqZWN0T3JTdWJqZWN0RmFjdG9yeSwgdGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWJqZWN0ID0gc3ViamVjdE9yU3ViamVjdEZhY3RvcnkuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3ViamVjdCAmJiBfem9uZSkge1xuICAgICAgICAgIHN1YmplY3QuX3pvbmUgPSBfem9uZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3ViamVjdDtcbiAgICAgIH07XG4gICAgICBjb25zdCBvYnNlcnZhYmxlID0gZmFjdG9yeS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIHBhdGNoT2JzZXJ2YWJsZUluc3RhbmNlKG9ic2VydmFibGUpO1xuICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBwYXRjaEltbWVkaWF0ZSA9IGZ1bmN0aW9uKGFzYXA6IGFueSkge1xuICAgIGlmICghYXNhcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVkdWxlU3ltYm9sID0gc3ltYm9sKCdzY2hlZHVsZVN5bWJvbCcpO1xuICAgIGNvbnN0IGZsdXNoU3ltYm9sID0gc3ltYm9sKCdmbHVzaFN5bWJvbCcpO1xuICAgIGNvbnN0IHpvbmVTeW1ib2wgPSBzeW1ib2woJ3pvbmUnKTtcbiAgICBpZiAoYXNhcFtzY2hlZHVsZVN5bWJvbF0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlZHVsZSA9IGFzYXBbc2NoZWR1bGVTeW1ib2xdID0gYXNhcC5zY2hlZHVsZTtcbiAgICBhc2FwLnNjaGVkdWxlID0gZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIGNvbnN0IHdvcmsgPSBhcmdzLmxlbmd0aCA+IDAgPyBhcmdzWzBdIDogdW5kZWZpbmVkO1xuICAgICAgY29uc3QgZGVsYXkgPSBhcmdzLmxlbmd0aCA+IDEgPyBhcmdzWzFdIDogMDtcbiAgICAgIGNvbnN0IHN0YXRlID0gKGFyZ3MubGVuZ3RoID4gMiA/IGFyZ3NbMl0gOiB1bmRlZmluZWQpIHx8IHt9O1xuICAgICAgc3RhdGVbem9uZVN5bWJvbF0gPSBab25lLmN1cnJlbnQ7XG5cbiAgICAgIGNvbnN0IHBhdGNoZWRXb3JrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHdvcmtBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gd29ya0FyZ3MubGVuZ3RoID4gMCA/IHdvcmtBcmdzWzBdIDogdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBzY2hlZHVsZVpvbmUgPSBhY3Rpb24gJiYgYWN0aW9uW3pvbmVTeW1ib2xdO1xuICAgICAgICBpZiAoc2NoZWR1bGVab25lICYmIHNjaGVkdWxlWm9uZSAhPT0gWm9uZS5jdXJyZW50KSB7XG4gICAgICAgICAgcmV0dXJuIHNjaGVkdWxlWm9uZS5ydW5HdWFyZGVkKHdvcmssIHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHdvcmsuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiBzY2hlZHVsZS5hcHBseSh0aGlzLCBbcGF0Y2hlZFdvcmssIGRlbGF5LCBzdGF0ZV0pO1xuICAgIH07XG4gIH07XG5cbiAgcGF0Y2hPYnNlcnZhYmxlKCk7XG4gIHBhdGNoU3Vic2NyaXB0aW9uKCk7XG4gIHBhdGNoU3Vic2NyaWJlcigpO1xuICBwYXRjaE9ic2VydmFibGVGYWN0b3J5Q3JlYXRvcihPYnNlcnZhYmxlLCAnYmluZENhbGxiYWNrJyk7XG4gIHBhdGNoT2JzZXJ2YWJsZUZhY3RvcnlDcmVhdG9yKE9ic2VydmFibGUsICdiaW5kTm9kZUNhbGxiYWNrJyk7XG4gIHBhdGNoT2JzZXJ2YWJsZUZhY3RvcnkoT2JzZXJ2YWJsZSwgJ2RlZmVyJyk7XG4gIHBhdGNoT2JzZXJ2YWJsZUZhY3RvcnkoT2JzZXJ2YWJsZSwgJ2ZvcmtKb2luJyk7XG4gIHBhdGNoT2JzZXJ2YWJsZUZhY3RvcnlBcmdzKE9ic2VydmFibGUsICdmcm9tRXZlbnRQYXR0ZXJuJyk7XG4gIHBhdGNoTXVsdGljYXN0KCk7XG4gIHBhdGNoSW1tZWRpYXRlKGFzYXApO1xufSk7Il19