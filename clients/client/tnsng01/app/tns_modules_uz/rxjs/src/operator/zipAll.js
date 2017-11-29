"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zip_1 = require("./zip");
function zipAll(project) {
    return this.lift(new zip_1.ZipOperator(project));
}
exports.zipAll = zipAll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemlwQWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiemlwQWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQW9DO0FBU3BDLGdCQUFrRCxPQUFzQztJQUN0RixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBRkQsd0JBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBaaXBPcGVyYXRvciB9IGZyb20gJy4vemlwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcblxuLyoqXG4gKiBAcGFyYW0gcHJvamVjdFxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxSPnxXZWJTb2NrZXRTdWJqZWN0PFQ+fE9ic2VydmFibGU8VD59XG4gKiBAbWV0aG9kIHppcEFsbFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHppcEFsbDxULCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBwcm9qZWN0PzogKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUik6IE9ic2VydmFibGU8Uj4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBaaXBPcGVyYXRvcihwcm9qZWN0KSk7XG59XG4iXX0=