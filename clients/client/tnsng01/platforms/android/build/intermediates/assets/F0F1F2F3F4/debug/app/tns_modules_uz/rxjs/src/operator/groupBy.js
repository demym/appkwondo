"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
var Subscription_1 = require("../Subscription");
var Observable_1 = require("../Observable");
var Subject_1 = require("../Subject");
var Map_1 = require("../util/Map");
var FastMap_1 = require("../util/FastMap");
function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
    return this.lift(new GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector));
}
exports.groupBy = groupBy;
var GroupByOperator = (function () {
    function GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector) {
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.subjectSelector = subjectSelector;
    }
    GroupByOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
    };
    return GroupByOperator;
}());
var GroupBySubscriber = (function (_super) {
    __extends(GroupBySubscriber, _super);
    function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
        var _this = _super.call(this, destination) || this;
        _this.keySelector = keySelector;
        _this.elementSelector = elementSelector;
        _this.durationSelector = durationSelector;
        _this.subjectSelector = subjectSelector;
        _this.groups = null;
        _this.attemptedToUnsubscribe = false;
        _this.count = 0;
        return _this;
    }
    GroupBySubscriber.prototype._next = function (value) {
        var key;
        try {
            key = this.keySelector(value);
        }
        catch (err) {
            this.error(err);
            return;
        }
        this._group(value, key);
    };
    GroupBySubscriber.prototype._group = function (value, key) {
        var groups = this.groups;
        if (!groups) {
            groups = this.groups = typeof key === 'string' ? new FastMap_1.FastMap() : new Map_1.Map();
        }
        var group = groups.get(key);
        var element;
        if (this.elementSelector) {
            try {
                element = this.elementSelector(value);
            }
            catch (err) {
                this.error(err);
            }
        }
        else {
            element = value;
        }
        if (!group) {
            group = this.subjectSelector ? this.subjectSelector() : new Subject_1.Subject();
            groups.set(key, group);
            var groupedObservable = new GroupedObservable(key, group, this);
            this.destination.next(groupedObservable);
            if (this.durationSelector) {
                var duration = void 0;
                try {
                    duration = this.durationSelector(new GroupedObservable(key, group));
                }
                catch (err) {
                    this.error(err);
                    return;
                }
                this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
            }
        }
        if (!group.closed) {
            group.next(element);
        }
    };
    GroupBySubscriber.prototype._error = function (err) {
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.error(err);
            });
            groups.clear();
        }
        this.destination.error(err);
    };
    GroupBySubscriber.prototype._complete = function () {
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.complete();
            });
            groups.clear();
        }
        this.destination.complete();
    };
    GroupBySubscriber.prototype.removeGroup = function (key) {
        this.groups.delete(key);
    };
    GroupBySubscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.attemptedToUnsubscribe = true;
            if (this.count === 0) {
                _super.prototype.unsubscribe.call(this);
            }
        }
    };
    return GroupBySubscriber;
}(Subscriber_1.Subscriber));
var GroupDurationSubscriber = (function (_super) {
    __extends(GroupDurationSubscriber, _super);
    function GroupDurationSubscriber(key, group, parent) {
        var _this = _super.call(this, group) || this;
        _this.key = key;
        _this.group = group;
        _this.parent = parent;
        return _this;
    }
    GroupDurationSubscriber.prototype._next = function (value) {
        this.complete();
    };
    GroupDurationSubscriber.prototype._unsubscribe = function () {
        var _a = this, parent = _a.parent, key = _a.key;
        this.key = this.parent = null;
        if (parent) {
            parent.removeGroup(key);
        }
    };
    return GroupDurationSubscriber;
}(Subscriber_1.Subscriber));
var GroupedObservable = (function (_super) {
    __extends(GroupedObservable, _super);
    function GroupedObservable(key, groupSubject, refCountSubscription) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.groupSubject = groupSubject;
        _this.refCountSubscription = refCountSubscription;
        return _this;
    }
    GroupedObservable.prototype._subscribe = function (subscriber) {
        var subscription = new Subscription_1.Subscription();
        var _a = this, refCountSubscription = _a.refCountSubscription, groupSubject = _a.groupSubject;
        if (refCountSubscription && !refCountSubscription.closed) {
            subscription.add(new InnerRefCountSubscription(refCountSubscription));
        }
        subscription.add(groupSubject.subscribe(subscriber));
        return subscription;
    };
    return GroupedObservable;
}(Observable_1.Observable));
exports.GroupedObservable = GroupedObservable;
var InnerRefCountSubscription = (function (_super) {
    __extends(InnerRefCountSubscription, _super);
    function InnerRefCountSubscription(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        parent.count++;
        return _this;
    }
    InnerRefCountSubscription.prototype.unsubscribe = function () {
        var parent = this.parent;
        if (!parent.closed && !this.closed) {
            _super.prototype.unsubscribe.call(this);
            parent.count -= 1;
            if (parent.count === 0 && parent.attemptedToUnsubscribe) {
                parent.unsubscribe();
            }
        }
    };
    return InnerRefCountSubscription;
}(Subscription_1.Subscription));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBCeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdyb3VwQnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTJDO0FBQzNDLGdEQUErQztBQUMvQyw0Q0FBMkM7QUFFM0Msc0NBQXFDO0FBQ3JDLG1DQUFrQztBQUNsQywyQ0FBMEM7QUE0RTFDLGlCQUFzRCxXQUE0QixFQUNqRCxlQUEwQyxFQUMxQyxnQkFBd0UsRUFDeEUsZUFBa0M7SUFDakUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsV0FBVyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQ3pHLENBQUM7QUFMRCwwQkFLQztBQVNEO0lBQ0UseUJBQW9CLFdBQTRCLEVBQzVCLGVBQTBDLEVBQzFDLGdCQUF3RSxFQUN4RSxlQUFrQztRQUhsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7UUFDNUIsb0JBQWUsR0FBZixlQUFlLENBQTJCO1FBQzFDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBd0Q7UUFDeEUsb0JBQWUsR0FBZixlQUFlLENBQW1CO0lBQ3RELENBQUM7SUFFRCw4QkFBSSxHQUFKLFVBQUssVUFBK0MsRUFBRSxNQUFXO1FBQy9ELE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksaUJBQWlCLENBQzNDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxlQUFlLENBQ2hHLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFaRCxJQVlDO0FBT0Q7SUFBeUMscUNBQWE7SUFLcEQsMkJBQVksV0FBZ0QsRUFDeEMsV0FBNEIsRUFDNUIsZUFBMEMsRUFDMUMsZ0JBQXdFLEVBQ3hFLGVBQWtDO1FBSnRELFlBS0Usa0JBQU0sV0FBVyxDQUFDLFNBQ25CO1FBTG1CLGlCQUFXLEdBQVgsV0FBVyxDQUFpQjtRQUM1QixxQkFBZSxHQUFmLGVBQWUsQ0FBMkI7UUFDMUMsc0JBQWdCLEdBQWhCLGdCQUFnQixDQUF3RDtRQUN4RSxxQkFBZSxHQUFmLGVBQWUsQ0FBbUI7UUFSOUMsWUFBTSxHQUF5QixJQUFJLENBQUM7UUFDckMsNEJBQXNCLEdBQVksS0FBSyxDQUFDO1FBQ3hDLFdBQUssR0FBVyxDQUFDLENBQUM7O0lBUXpCLENBQUM7SUFFUyxpQ0FBSyxHQUFmLFVBQWdCLEtBQVE7UUFDdEIsSUFBSSxHQUFNLENBQUM7UUFDWCxJQUFJLENBQUM7WUFDSCxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTyxrQ0FBTSxHQUFkLFVBQWUsS0FBUSxFQUFFLEdBQU07UUFDN0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUV6QixFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLEdBQUcsS0FBSyxRQUFRLEdBQUcsSUFBSSxpQkFBTyxFQUFFLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztRQUM3RSxDQUFDO1FBRUQsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU1QixJQUFJLE9BQVUsQ0FBQztRQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQztnQkFDSCxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QyxDQUFDO1lBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDYixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLENBQUM7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixPQUFPLEdBQVEsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWCxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLEdBQUcsSUFBSSxpQkFBTyxFQUFLLENBQUM7WUFDekUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdkIsSUFBTSxpQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN6QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLFFBQVEsU0FBSyxDQUFDO2dCQUNsQixJQUFJLENBQUM7b0JBQ0gsUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLGlCQUFpQixDQUFPLEdBQUcsRUFBYyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN4RixDQUFDO2dCQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsTUFBTSxDQUFDO2dCQUNULENBQUM7Z0JBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksdUJBQXVCLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUUsQ0FBQztRQUNILENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsQ0FBQztJQUNILENBQUM7SUFFUyxrQ0FBTSxHQUFoQixVQUFpQixHQUFRO1FBQ3ZCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRztnQkFDeEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVTLHFDQUFTLEdBQW5CO1FBQ0UsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBRSxHQUFHO2dCQUN4QixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELHVDQUFXLEdBQVgsVUFBWSxHQUFNO1FBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCx1Q0FBVyxHQUFYO1FBQ0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsaUJBQU0sV0FBVyxXQUFFLENBQUM7WUFDdEIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBdkdELENBQXlDLHVCQUFVLEdBdUdsRDtBQU9EO0lBQTRDLDJDQUFhO0lBQ3ZELGlDQUFvQixHQUFNLEVBQ04sS0FBaUIsRUFDakIsTUFBb0M7UUFGeEQsWUFHRSxrQkFBTSxLQUFLLENBQUMsU0FDYjtRQUptQixTQUFHLEdBQUgsR0FBRyxDQUFHO1FBQ04sV0FBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixZQUFNLEdBQU4sTUFBTSxDQUE4Qjs7SUFFeEQsQ0FBQztJQUVTLHVDQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVTLDhDQUFZLEdBQXRCO1FBQ1EsSUFBQSxTQUFzQixFQUFwQixrQkFBTSxFQUFFLFlBQUcsQ0FBVTtRQUM3QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLENBQUM7SUFDSCxDQUFDO0lBQ0gsOEJBQUM7QUFBRCxDQUFDLEFBbEJELENBQTRDLHVCQUFVLEdBa0JyRDtBQVVEO0lBQTZDLHFDQUFhO0lBQ3hELDJCQUFtQixHQUFNLEVBQ0wsWUFBd0IsRUFDeEIsb0JBQTJDO1FBRi9ELFlBR0UsaUJBQU8sU0FDUjtRQUprQixTQUFHLEdBQUgsR0FBRyxDQUFHO1FBQ0wsa0JBQVksR0FBWixZQUFZLENBQVk7UUFDeEIsMEJBQW9CLEdBQXBCLG9CQUFvQixDQUF1Qjs7SUFFL0QsQ0FBQztJQUVTLHNDQUFVLEdBQXBCLFVBQXFCLFVBQXlCO1FBQzVDLElBQU0sWUFBWSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQ2xDLElBQUEsU0FBMkMsRUFBMUMsOENBQW9CLEVBQUUsOEJBQVksQ0FBUztRQUNsRCxFQUFFLENBQUMsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekQsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLHlCQUF5QixDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztRQUN4RSxDQUFDO1FBQ0QsWUFBWSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBaEJELENBQTZDLHVCQUFVLEdBZ0J0RDtBQWhCWSw4Q0FBaUI7QUF1QjlCO0lBQXdDLDZDQUFZO0lBQ2xELG1DQUFvQixNQUE0QjtRQUFoRCxZQUNFLGlCQUFPLFNBRVI7UUFIbUIsWUFBTSxHQUFOLE1BQU0sQ0FBc0I7UUFFOUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDOztJQUNqQixDQUFDO0lBRUQsK0NBQVcsR0FBWDtRQUNFLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkMsaUJBQU0sV0FBVyxXQUFFLENBQUM7WUFDcEIsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7WUFDbEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztnQkFDeEQsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUNILGdDQUFDO0FBQUQsQ0FBQyxBQWhCRCxDQUF3QywyQkFBWSxHQWdCbkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAnLi4vU3ViamVjdCc7XG5pbXBvcnQgeyBNYXAgfSBmcm9tICcuLi91dGlsL01hcCc7XG5pbXBvcnQgeyBGYXN0TWFwIH0gZnJvbSAnLi4vdXRpbC9GYXN0TWFwJztcblxuLyogdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5leHBvcnQgZnVuY3Rpb24gZ3JvdXBCeTxULCBLPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBrZXlTZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBLKTogT2JzZXJ2YWJsZTxHcm91cGVkT2JzZXJ2YWJsZTxLLCBUPj47XG5leHBvcnQgZnVuY3Rpb24gZ3JvdXBCeTxULCBLPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBrZXlTZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBLLCBlbGVtZW50U2VsZWN0b3I6IHZvaWQsIGR1cmF0aW9uU2VsZWN0b3I6IChncm91cGVkOiBHcm91cGVkT2JzZXJ2YWJsZTxLLCBUPikgPT4gT2JzZXJ2YWJsZTxhbnk+KTogT2JzZXJ2YWJsZTxHcm91cGVkT2JzZXJ2YWJsZTxLLCBUPj47XG5leHBvcnQgZnVuY3Rpb24gZ3JvdXBCeTxULCBLLCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBrZXlTZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBLLCBlbGVtZW50U2VsZWN0b3I/OiAodmFsdWU6IFQpID0+IFIsIGR1cmF0aW9uU2VsZWN0b3I/OiAoZ3JvdXBlZDogR3JvdXBlZE9ic2VydmFibGU8SywgUj4pID0+IE9ic2VydmFibGU8YW55Pik6IE9ic2VydmFibGU8R3JvdXBlZE9ic2VydmFibGU8SywgUj4+O1xuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwQnk8VCwgSywgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwga2V5U2VsZWN0b3I6ICh2YWx1ZTogVCkgPT4gSywgZWxlbWVudFNlbGVjdG9yPzogKHZhbHVlOiBUKSA9PiBSLCBkdXJhdGlvblNlbGVjdG9yPzogKGdyb3VwZWQ6IEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+KSA9PiBPYnNlcnZhYmxlPGFueT4sIHN1YmplY3RTZWxlY3Rvcj86ICgpID0+IFN1YmplY3Q8Uj4pOiBPYnNlcnZhYmxlPEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+Pjtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbi8qKlxuICogR3JvdXBzIHRoZSBpdGVtcyBlbWl0dGVkIGJ5IGFuIE9ic2VydmFibGUgYWNjb3JkaW5nIHRvIGEgc3BlY2lmaWVkIGNyaXRlcmlvbixcbiAqIGFuZCBlbWl0cyB0aGVzZSBncm91cGVkIGl0ZW1zIGFzIGBHcm91cGVkT2JzZXJ2YWJsZXNgLCBvbmVcbiAqIHtAbGluayBHcm91cGVkT2JzZXJ2YWJsZX0gcGVyIGdyb3VwLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvZ3JvdXBCeS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Hcm91cCBvYmplY3RzIGJ5IGlkIGFuZCByZXR1cm4gYXMgYXJyYXk8L2NhcHRpb24+XG4gKiBPYnNlcnZhYmxlLm9mPE9iaj4oe2lkOiAxLCBuYW1lOiAnYXplMSd9LFxuICogICAgICAgICAgICAgICAgICAgIHtpZDogMiwgbmFtZTogJ3NmMid9LFxuICogICAgICAgICAgICAgICAgICAgIHtpZDogMiwgbmFtZTogJ2RnMid9LFxuICogICAgICAgICAgICAgICAgICAgIHtpZDogMSwgbmFtZTogJ2VyZzEnfSxcbiAqICAgICAgICAgICAgICAgICAgICB7aWQ6IDEsIG5hbWU6ICdkZjEnfSxcbiAqICAgICAgICAgICAgICAgICAgICB7aWQ6IDIsIG5hbWU6ICdzZnFmYjInfSxcbiAqICAgICAgICAgICAgICAgICAgICB7aWQ6IDMsIG5hbWU6ICdxZnMzJ30sXG4gKiAgICAgICAgICAgICAgICAgICAge2lkOiAyLCBuYW1lOiAncXNncXNmZzInfVxuICogICAgIClcbiAqICAgICAuZ3JvdXBCeShwID0+IHAuaWQpXG4gKiAgICAgLmZsYXRNYXAoIChncm91cCQpID0+IGdyb3VwJC5yZWR1Y2UoKGFjYywgY3VyKSA9PiBbLi4uYWNjLCBjdXJdLCBbXSkpXG4gKiAgICAgLnN1YnNjcmliZShwID0+IGNvbnNvbGUubG9nKHApKTtcbiAqXG4gKiAvLyBkaXNwbGF5czpcbiAqIC8vIFsgeyBpZDogMSwgbmFtZTogJ2F6ZTEnIH0sXG4gKiAvLyAgIHsgaWQ6IDEsIG5hbWU6ICdlcmcxJyB9LFxuICogLy8gICB7IGlkOiAxLCBuYW1lOiAnZGYxJyB9IF1cbiAqIC8vXG4gKiAvLyBbIHsgaWQ6IDIsIG5hbWU6ICdzZjInIH0sXG4gKiAvLyAgIHsgaWQ6IDIsIG5hbWU6ICdkZzInIH0sXG4gKiAvLyAgIHsgaWQ6IDIsIG5hbWU6ICdzZnFmYjInIH0sXG4gKiAvLyAgIHsgaWQ6IDIsIG5hbWU6ICdxc2dxc2ZnMicgfSBdXG4gKiAvL1xuICogLy8gWyB7IGlkOiAzLCBuYW1lOiAncWZzMycgfSBdXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+UGl2b3QgZGF0YSBvbiB0aGUgaWQgZmllbGQ8L2NhcHRpb24+XG4gKiBPYnNlcnZhYmxlLm9mPE9iaj4oe2lkOiAxLCBuYW1lOiAnYXplMSd9LFxuICogICAgICAgICAgICAgICAgICAgIHtpZDogMiwgbmFtZTogJ3NmMid9LFxuICogICAgICAgICAgICAgICAgICAgIHtpZDogMiwgbmFtZTogJ2RnMid9LFxuICogICAgICAgICAgICAgICAgICAgIHtpZDogMSwgbmFtZTogJ2VyZzEnfSxcbiAqICAgICAgICAgICAgICAgICAgICB7aWQ6IDEsIG5hbWU6ICdkZjEnfSxcbiAqICAgICAgICAgICAgICAgICAgICB7aWQ6IDIsIG5hbWU6ICdzZnFmYjInfSxcbiAqICAgICAgICAgICAgICAgICAgICB7aWQ6IDMsIG5hbWU6ICdxZnMxJ30sXG4gKiAgICAgICAgICAgICAgICAgICAge2lkOiAyLCBuYW1lOiAncXNncXNmZzInfVxuICogICAgICAgICAgICAgICAgICAgKVxuICogICAgIC5ncm91cEJ5KHAgPT4gcC5pZCwgcCA9PiBwLm5hbWUpXG4gKiAgICAgLmZsYXRNYXAoIChncm91cCQpID0+IGdyb3VwJC5yZWR1Y2UoKGFjYywgY3VyKSA9PiBbLi4uYWNjLCBjdXJdLCBbXCJcIiArIGdyb3VwJC5rZXldKSlcbiAqICAgICAubWFwKGFyciA9PiAoeydpZCc6IHBhcnNlSW50KGFyclswXSksICd2YWx1ZXMnOiBhcnIuc2xpY2UoMSl9KSlcbiAqICAgICAuc3Vic2NyaWJlKHAgPT4gY29uc29sZS5sb2cocCkpO1xuICpcbiAqIC8vIGRpc3BsYXlzOlxuICogLy8geyBpZDogMSwgdmFsdWVzOiBbICdhemUxJywgJ2VyZzEnLCAnZGYxJyBdIH1cbiAqIC8vIHsgaWQ6IDIsIHZhbHVlczogWyAnc2YyJywgJ2RnMicsICdzZnFmYjInLCAncXNncXNmZzInIF0gfVxuICogLy8geyBpZDogMywgdmFsdWVzOiBbICdxZnMxJyBdIH1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBUKTogS30ga2V5U2VsZWN0b3IgQSBmdW5jdGlvbiB0aGF0IGV4dHJhY3RzIHRoZSBrZXlcbiAqIGZvciBlYWNoIGl0ZW0uXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBUKTogUn0gW2VsZW1lbnRTZWxlY3Rvcl0gQSBmdW5jdGlvbiB0aGF0IGV4dHJhY3RzIHRoZVxuICogcmV0dXJuIGVsZW1lbnQgZm9yIGVhY2ggaXRlbS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oZ3JvdXBlZDogR3JvdXBlZE9ic2VydmFibGU8SyxSPik6IE9ic2VydmFibGU8YW55Pn0gW2R1cmF0aW9uU2VsZWN0b3JdXG4gKiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRvIGRldGVybWluZSBob3cgbG9uZyBlYWNoIGdyb3VwIHNob3VsZFxuICogZXhpc3QuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPEdyb3VwZWRPYnNlcnZhYmxlPEssUj4+fSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHNcbiAqIEdyb3VwZWRPYnNlcnZhYmxlcywgZWFjaCBvZiB3aGljaCBjb3JyZXNwb25kcyB0byBhIHVuaXF1ZSBrZXkgdmFsdWUgYW5kIGVhY2hcbiAqIG9mIHdoaWNoIGVtaXRzIHRob3NlIGl0ZW1zIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRoYXQgc2hhcmUgdGhhdCBrZXlcbiAqIHZhbHVlLlxuICogQG1ldGhvZCBncm91cEJ5XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ3JvdXBCeTxULCBLLCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBrZXlTZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBLLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFNlbGVjdG9yPzogKCh2YWx1ZTogVCkgPT4gUikgfCB2b2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb25TZWxlY3Rvcj86IChncm91cGVkOiBHcm91cGVkT2JzZXJ2YWJsZTxLLCBSPikgPT4gT2JzZXJ2YWJsZTxhbnk+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdFNlbGVjdG9yPzogKCkgPT4gU3ViamVjdDxSPik6IE9ic2VydmFibGU8R3JvdXBlZE9ic2VydmFibGU8SywgUj4+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgR3JvdXBCeU9wZXJhdG9yKGtleVNlbGVjdG9yLCBlbGVtZW50U2VsZWN0b3IsIGR1cmF0aW9uU2VsZWN0b3IsIHN1YmplY3RTZWxlY3RvcikpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlZkNvdW50U3Vic2NyaXB0aW9uIHtcbiAgY291bnQ6IG51bWJlcjtcbiAgdW5zdWJzY3JpYmU6ICgpID0+IHZvaWQ7XG4gIGNsb3NlZDogYm9vbGVhbjtcbiAgYXR0ZW1wdGVkVG9VbnN1YnNjcmliZTogYm9vbGVhbjtcbn1cblxuY2xhc3MgR3JvdXBCeU9wZXJhdG9yPFQsIEssIFI+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgR3JvdXBlZE9ic2VydmFibGU8SywgUj4+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBrZXlTZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBLLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsZW1lbnRTZWxlY3Rvcj86ICgodmFsdWU6IFQpID0+IFIpIHwgdm9pZCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkdXJhdGlvblNlbGVjdG9yPzogKGdyb3VwZWQ6IEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+KSA9PiBPYnNlcnZhYmxlPGFueT4sXG4gICAgICAgICAgICAgIHByaXZhdGUgc3ViamVjdFNlbGVjdG9yPzogKCkgPT4gU3ViamVjdDxSPikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+Piwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBHcm91cEJ5U3Vic2NyaWJlcihcbiAgICAgIHN1YnNjcmliZXIsIHRoaXMua2V5U2VsZWN0b3IsIHRoaXMuZWxlbWVudFNlbGVjdG9yLCB0aGlzLmR1cmF0aW9uU2VsZWN0b3IsIHRoaXMuc3ViamVjdFNlbGVjdG9yXG4gICAgKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIEdyb3VwQnlTdWJzY3JpYmVyPFQsIEssIFI+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiBpbXBsZW1lbnRzIFJlZkNvdW50U3Vic2NyaXB0aW9uIHtcbiAgcHJpdmF0ZSBncm91cHM6IE1hcDxLLCBTdWJqZWN0PFR8Uj4+ID0gbnVsbDtcbiAgcHVibGljIGF0dGVtcHRlZFRvVW5zdWJzY3JpYmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGNvdW50OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBrZXlTZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBLLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsZW1lbnRTZWxlY3Rvcj86ICgodmFsdWU6IFQpID0+IFIpIHwgdm9pZCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkdXJhdGlvblNlbGVjdG9yPzogKGdyb3VwZWQ6IEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+KSA9PiBPYnNlcnZhYmxlPGFueT4sXG4gICAgICAgICAgICAgIHByaXZhdGUgc3ViamVjdFNlbGVjdG9yPzogKCkgPT4gU3ViamVjdDxSPikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGxldCBrZXk6IEs7XG4gICAgdHJ5IHtcbiAgICAgIGtleSA9IHRoaXMua2V5U2VsZWN0b3IodmFsdWUpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2dyb3VwKHZhbHVlLCBrZXkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ3JvdXAodmFsdWU6IFQsIGtleTogSykge1xuICAgIGxldCBncm91cHMgPSB0aGlzLmdyb3VwcztcblxuICAgIGlmICghZ3JvdXBzKSB7XG4gICAgICBncm91cHMgPSB0aGlzLmdyb3VwcyA9IHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnID8gbmV3IEZhc3RNYXAoKSA6IG5ldyBNYXAoKTtcbiAgICB9XG5cbiAgICBsZXQgZ3JvdXAgPSBncm91cHMuZ2V0KGtleSk7XG5cbiAgICBsZXQgZWxlbWVudDogUjtcbiAgICBpZiAodGhpcy5lbGVtZW50U2VsZWN0b3IpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRTZWxlY3Rvcih2YWx1ZSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhpcy5lcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50ID0gPGFueT52YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoIWdyb3VwKSB7XG4gICAgICBncm91cCA9IHRoaXMuc3ViamVjdFNlbGVjdG9yID8gdGhpcy5zdWJqZWN0U2VsZWN0b3IoKSA6IG5ldyBTdWJqZWN0PFI+KCk7XG4gICAgICBncm91cHMuc2V0KGtleSwgZ3JvdXApO1xuICAgICAgY29uc3QgZ3JvdXBlZE9ic2VydmFibGUgPSBuZXcgR3JvdXBlZE9ic2VydmFibGUoa2V5LCBncm91cCwgdGhpcyk7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoZ3JvdXBlZE9ic2VydmFibGUpO1xuICAgICAgaWYgKHRoaXMuZHVyYXRpb25TZWxlY3Rvcikge1xuICAgICAgICBsZXQgZHVyYXRpb246IGFueTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkdXJhdGlvbiA9IHRoaXMuZHVyYXRpb25TZWxlY3RvcihuZXcgR3JvdXBlZE9ic2VydmFibGU8SywgUj4oa2V5LCA8U3ViamVjdDxSPj5ncm91cCkpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICB0aGlzLmVycm9yKGVycik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkKGR1cmF0aW9uLnN1YnNjcmliZShuZXcgR3JvdXBEdXJhdGlvblN1YnNjcmliZXIoa2V5LCBncm91cCwgdGhpcykpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWdyb3VwLmNsb3NlZCkge1xuICAgICAgZ3JvdXAubmV4dChlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2Vycm9yKGVycjogYW55KTogdm9pZCB7XG4gICAgY29uc3QgZ3JvdXBzID0gdGhpcy5ncm91cHM7XG4gICAgaWYgKGdyb3Vwcykge1xuICAgICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwLCBrZXkpID0+IHtcbiAgICAgICAgZ3JvdXAuZXJyb3IoZXJyKTtcbiAgICAgIH0pO1xuXG4gICAgICBncm91cHMuY2xlYXIoKTtcbiAgICB9XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBncm91cHMgPSB0aGlzLmdyb3VwcztcbiAgICBpZiAoZ3JvdXBzKSB7XG4gICAgICBncm91cHMuZm9yRWFjaCgoZ3JvdXAsIGtleSkgPT4ge1xuICAgICAgICBncm91cC5jb21wbGV0ZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIGdyb3Vwcy5jbGVhcigpO1xuICAgIH1cbiAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gIH1cblxuICByZW1vdmVHcm91cChrZXk6IEspOiB2b2lkIHtcbiAgICB0aGlzLmdyb3Vwcy5kZWxldGUoa2V5KTtcbiAgfVxuXG4gIHVuc3Vic2NyaWJlKCkge1xuICAgIGlmICghdGhpcy5jbG9zZWQpIHtcbiAgICAgIHRoaXMuYXR0ZW1wdGVkVG9VbnN1YnNjcmliZSA9IHRydWU7XG4gICAgICBpZiAodGhpcy5jb3VudCA9PT0gMCkge1xuICAgICAgICBzdXBlci51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgR3JvdXBEdXJhdGlvblN1YnNjcmliZXI8SywgVD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBrZXk6IEssXG4gICAgICAgICAgICAgIHByaXZhdGUgZ3JvdXA6IFN1YmplY3Q8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcGFyZW50OiBHcm91cEJ5U3Vic2NyaWJlcjxhbnksIEssIFQ+KSB7XG4gICAgc3VwZXIoZ3JvdXApO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgdGhpcy5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF91bnN1YnNjcmliZSgpIHtcbiAgICBjb25zdCB7IHBhcmVudCwga2V5IH0gPSB0aGlzO1xuICAgIHRoaXMua2V5ID0gdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5yZW1vdmVHcm91cChrZXkpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFuIE9ic2VydmFibGUgcmVwcmVzZW50aW5nIHZhbHVlcyBiZWxvbmdpbmcgdG8gdGhlIHNhbWUgZ3JvdXAgcmVwcmVzZW50ZWQgYnlcbiAqIGEgY29tbW9uIGtleS4gVGhlIHZhbHVlcyBlbWl0dGVkIGJ5IGEgR3JvdXBlZE9ic2VydmFibGUgY29tZSBmcm9tIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUuIFRoZSBjb21tb24ga2V5IGlzIGF2YWlsYWJsZSBhcyB0aGUgZmllbGQgYGtleWAgb24gYVxuICogR3JvdXBlZE9ic2VydmFibGUgaW5zdGFuY2UuXG4gKlxuICogQGNsYXNzIEdyb3VwZWRPYnNlcnZhYmxlPEssIFQ+XG4gKi9cbmV4cG9ydCBjbGFzcyBHcm91cGVkT2JzZXJ2YWJsZTxLLCBUPiBleHRlbmRzIE9ic2VydmFibGU8VD4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMga2V5OiBLLFxuICAgICAgICAgICAgICBwcml2YXRlIGdyb3VwU3ViamVjdDogU3ViamVjdDxUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZWZDb3VudFN1YnNjcmlwdGlvbj86IFJlZkNvdW50U3Vic2NyaXB0aW9uKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pIHtcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgY29uc3Qge3JlZkNvdW50U3Vic2NyaXB0aW9uLCBncm91cFN1YmplY3R9ID0gdGhpcztcbiAgICBpZiAocmVmQ291bnRTdWJzY3JpcHRpb24gJiYgIXJlZkNvdW50U3Vic2NyaXB0aW9uLmNsb3NlZCkge1xuICAgICAgc3Vic2NyaXB0aW9uLmFkZChuZXcgSW5uZXJSZWZDb3VudFN1YnNjcmlwdGlvbihyZWZDb3VudFN1YnNjcmlwdGlvbikpO1xuICAgIH1cbiAgICBzdWJzY3JpcHRpb24uYWRkKGdyb3VwU3ViamVjdC5zdWJzY3JpYmUoc3Vic2NyaWJlcikpO1xuICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIElubmVyUmVmQ291bnRTdWJzY3JpcHRpb24gZXh0ZW5kcyBTdWJzY3JpcHRpb24ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmVudDogUmVmQ291bnRTdWJzY3JpcHRpb24pIHtcbiAgICBzdXBlcigpO1xuICAgIHBhcmVudC5jb3VudCsrO1xuICB9XG5cbiAgdW5zdWJzY3JpYmUoKSB7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnQ7XG4gICAgaWYgKCFwYXJlbnQuY2xvc2VkICYmICF0aGlzLmNsb3NlZCkge1xuICAgICAgc3VwZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHBhcmVudC5jb3VudCAtPSAxO1xuICAgICAgaWYgKHBhcmVudC5jb3VudCA9PT0gMCAmJiBwYXJlbnQuYXR0ZW1wdGVkVG9VbnN1YnNjcmliZSkge1xuICAgICAgICBwYXJlbnQudW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==