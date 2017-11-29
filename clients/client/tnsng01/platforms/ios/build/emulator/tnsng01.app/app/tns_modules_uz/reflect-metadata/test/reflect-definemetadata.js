"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../Reflect");
var chai_1 = require("chai");
describe("Reflect.defineMetadata", function () {
    it("InvalidTarget", function () {
        chai_1.assert.throws(function () { return Reflect.defineMetadata("key", "value", undefined, undefined); }, TypeError);
    });
    it("ValidTargetWithoutTargetKey", function () {
        chai_1.assert.doesNotThrow(function () { return Reflect.defineMetadata("key", "value", {}, undefined); });
    });
    it("ValidTargetWithTargetKey", function () {
        chai_1.assert.doesNotThrow(function () { return Reflect.defineMetadata("key", "value", {}, "name"); });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdC1kZWZpbmVtZXRhZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlZmxlY3QtZGVmaW5lbWV0YWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxzQkFBb0I7QUFDcEIsNkJBQThCO0FBRTlCLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRTtJQUMvQixFQUFFLENBQUMsZUFBZSxFQUFFO1FBQ2hCLGFBQU0sQ0FBQyxNQUFNLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQTVELENBQTRELEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDakcsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNkJBQTZCLEVBQUU7UUFDOUIsYUFBTSxDQUFDLFlBQVksQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUcsRUFBRSxTQUFTLENBQUMsRUFBdEQsQ0FBc0QsQ0FBQyxDQUFDO0lBQ3RGLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDBCQUEwQixFQUFFO1FBQzNCLGFBQU0sQ0FBQyxZQUFZLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFHLEVBQUUsTUFBTSxDQUFDLEVBQW5ELENBQW1ELENBQUMsQ0FBQztJQUNuRixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gNC4xLjIgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YSAoIG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlLCB0YXJnZXQsIHByb3BlcnR5S2V5IClcclxuLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jcmVmbGVjdC5kZWZpbmVtZXRhZGF0YVxyXG5cclxuaW1wb3J0IFwiLi4vUmVmbGVjdFwiO1xyXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tIFwiY2hhaVwiO1xyXG5cclxuZGVzY3JpYmUoXCJSZWZsZWN0LmRlZmluZU1ldGFkYXRhXCIsICgpID0+IHtcclxuICAgIGl0KFwiSW52YWxpZFRhcmdldFwiLCAoKSA9PiB7XHJcbiAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQpLCBUeXBlRXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJWYWxpZFRhcmdldFdpdGhvdXRUYXJnZXRLZXlcIiwgKCkgPT4ge1xyXG4gICAgICAgIGFzc2VydC5kb2VzTm90VGhyb3coKCkgPT4gUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIsIHsgfSwgdW5kZWZpbmVkKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcIlZhbGlkVGFyZ2V0V2l0aFRhcmdldEtleVwiLCAoKSA9PiB7XHJcbiAgICAgICAgYXNzZXJ0LmRvZXNOb3RUaHJvdygoKSA9PiBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIiwgeyB9LCBcIm5hbWVcIikpO1xyXG4gICAgfSk7XHJcbn0pOyJdfQ==