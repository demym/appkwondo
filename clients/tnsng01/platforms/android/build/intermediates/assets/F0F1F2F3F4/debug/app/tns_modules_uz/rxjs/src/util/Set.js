"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("./root");
function minimalSetImpl() {
    return (function () {
        function MinimalSet() {
            this._values = [];
        }
        MinimalSet.prototype.add = function (value) {
            if (!this.has(value)) {
                this._values.push(value);
            }
        };
        MinimalSet.prototype.has = function (value) {
            return this._values.indexOf(value) !== -1;
        };
        Object.defineProperty(MinimalSet.prototype, "size", {
            get: function () {
                return this._values.length;
            },
            enumerable: true,
            configurable: true
        });
        MinimalSet.prototype.clear = function () {
            this._values.length = 0;
        };
        return MinimalSet;
    }());
}
exports.minimalSetImpl = minimalSetImpl;
exports.Set = root_1.root.Set || minimalSetImpl();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQThCO0FBYTlCO0lBR0UsTUFBTTtRQUFDO1lBQ0csWUFBTyxHQUFRLEVBQUUsQ0FBQztRQW1CNUIsQ0FBQztRQWpCQyx3QkFBRyxHQUFILFVBQUksS0FBUTtZQUNWLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNCLENBQUM7UUFDSCxDQUFDO1FBRUQsd0JBQUcsR0FBSCxVQUFJLEtBQVE7WUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUVELHNCQUFJLDRCQUFJO2lCQUFSO2dCQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUM3QixDQUFDOzs7V0FBQTtRQUVELDBCQUFLLEdBQUw7WUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUNILGlCQUFDO0lBQUQsQ0FBQyxBQXBCTSxJQW9CTDtBQUNKLENBQUM7QUF4QkQsd0NBd0JDO0FBRVksUUFBQSxHQUFHLEdBQWEsV0FBSSxDQUFDLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJvb3QgfSBmcm9tICcuL3Jvb3QnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTZXRDdG9yIHtcbiAgbmV3PFQ+KCk6IElTZXQ8VD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNldDxUPiB7XG4gIGFkZCh2YWx1ZTogVCk6IHZvaWQ7XG4gIGhhcyh2YWx1ZTogVCk6IGJvb2xlYW47XG4gIHNpemU6IG51bWJlcjtcbiAgY2xlYXIoKTogdm9pZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1pbmltYWxTZXRJbXBsPFQ+KCk6IElTZXRDdG9yIHtcbiAgLy8gVEhJUyBJUyBOT1QgYSBmdWxsIGltcGwgb2YgU2V0LCB0aGlzIGlzIGp1c3QgdGhlIG1pbmltdW1cbiAgLy8gYml0cyBvZiBmdW5jdGlvbmFsaXR5IHdlIG5lZWQgZm9yIHRoaXMgbGlicmFyeS5cbiAgcmV0dXJuIGNsYXNzIE1pbmltYWxTZXQ8VD4gaW1wbGVtZW50cyBJU2V0PFQ+IHtcbiAgICBwcml2YXRlIF92YWx1ZXM6IFRbXSA9IFtdO1xuXG4gICAgYWRkKHZhbHVlOiBUKTogdm9pZCB7XG4gICAgICBpZiAoIXRoaXMuaGFzKHZhbHVlKSkge1xuICAgICAgICB0aGlzLl92YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaGFzKHZhbHVlOiBUKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5fdmFsdWVzLmluZGV4T2YodmFsdWUpICE9PSAtMTtcbiAgICB9XG5cbiAgICBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgY2xlYXIoKTogdm9pZCB7XG4gICAgICB0aGlzLl92YWx1ZXMubGVuZ3RoID0gMDtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBTZXQ6IElTZXRDdG9yID0gcm9vdC5TZXQgfHwgbWluaW1hbFNldEltcGwoKTsiXX0=