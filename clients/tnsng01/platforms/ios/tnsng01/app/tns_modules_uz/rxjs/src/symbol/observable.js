"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../util/root");
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.observable = getSymbolObservable(root_1.root);
exports.$$observable = exports.observable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9ic2VydmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBb0M7QUFFcEMsNkJBQW9DLE9BQVk7SUFDOUMsSUFBSSxZQUFpQixDQUFDO0lBQ3RCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFFNUIsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNqQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN0QixZQUFZLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNuQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDO1FBQ3JDLENBQUM7SUFDSCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixZQUFZLEdBQUcsY0FBYyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxNQUFNLENBQUMsWUFBWSxDQUFDO0FBQ3RCLENBQUM7QUFoQkQsa0RBZ0JDO0FBRVksUUFBQSxVQUFVLEdBQUcsbUJBQW1CLENBQUMsV0FBSSxDQUFDLENBQUM7QUFLdkMsUUFBQSxZQUFZLEdBQUcsa0JBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJvb3QgfSBmcm9tICcuLi91dGlsL3Jvb3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3ltYm9sT2JzZXJ2YWJsZShjb250ZXh0OiBhbnkpIHtcbiAgbGV0ICQkb2JzZXJ2YWJsZTogYW55O1xuICBsZXQgU3ltYm9sID0gY29udGV4dC5TeW1ib2w7XG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoU3ltYm9sLm9ic2VydmFibGUpIHtcbiAgICAgICQkb2JzZXJ2YWJsZSA9IFN5bWJvbC5vYnNlcnZhYmxlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQkb2JzZXJ2YWJsZSA9IFN5bWJvbCgnb2JzZXJ2YWJsZScpO1xuICAgICAgICBTeW1ib2wub2JzZXJ2YWJsZSA9ICQkb2JzZXJ2YWJsZTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgJCRvYnNlcnZhYmxlID0gJ0BAb2JzZXJ2YWJsZSc7XG4gIH1cblxuICByZXR1cm4gJCRvYnNlcnZhYmxlO1xufVxuXG5leHBvcnQgY29uc3Qgb2JzZXJ2YWJsZSA9IGdldFN5bWJvbE9ic2VydmFibGUocm9vdCk7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgdXNlIG9ic2VydmFibGUgaW5zdGVhZFxuICovXG5leHBvcnQgY29uc3QgJCRvYnNlcnZhYmxlID0gb2JzZXJ2YWJsZTtcbiJdfQ==