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
var UnsubscriptionError = (function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        var _this = _super.call(this) || this;
        _this.errors = errors;
        var err = Error.call(_this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '');
        _this.name = err.name = 'UnsubscriptionError';
        _this.stack = err.stack;
        _this.message = err.message;
        return _this;
    }
    return UnsubscriptionError;
}(Error));
exports.UnsubscriptionError = UnsubscriptionError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5zdWJzY3JpcHRpb25FcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlVuc3Vic2NyaXB0aW9uRXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBSUE7SUFBeUMsdUNBQUs7SUFDNUMsNkJBQW1CLE1BQWE7UUFBaEMsWUFDRSxpQkFBTyxTQU9SO1FBUmtCLFlBQU0sR0FBTixNQUFNLENBQU87UUFFOUIsSUFBTSxHQUFHLEdBQVEsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFJLEVBQUUsTUFBTTtZQUNuQyxNQUFNLENBQUMsTUFBTSxtREFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUcsRUFBRSxDQUFDLElBQUssT0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFLLEdBQUcsQ0FBQyxRQUFRLEVBQUksRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNwRSxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcscUJBQXFCLENBQUM7UUFDOUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQzs7SUFDckMsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQVZELENBQXlDLEtBQUssR0FVN0M7QUFWWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEFuIGVycm9yIHRocm93biB3aGVuIG9uZSBvciBtb3JlIGVycm9ycyBoYXZlIG9jY3VycmVkIGR1cmluZyB0aGVcbiAqIGB1bnN1YnNjcmliZWAgb2YgYSB7QGxpbmsgU3Vic2NyaXB0aW9ufS5cbiAqL1xuZXhwb3J0IGNsYXNzIFVuc3Vic2NyaXB0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlcnJvcnM6IGFueVtdKSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zdCBlcnI6IGFueSA9IEVycm9yLmNhbGwodGhpcywgZXJyb3JzID9cbiAgICAgIGAke2Vycm9ycy5sZW5ndGh9IGVycm9ycyBvY2N1cnJlZCBkdXJpbmcgdW5zdWJzY3JpcHRpb246XG4gICR7ZXJyb3JzLm1hcCgoZXJyLCBpKSA9PiBgJHtpICsgMX0pICR7ZXJyLnRvU3RyaW5nKCl9YCkuam9pbignXFxuICAnKX1gIDogJycpO1xuICAgICg8YW55PiB0aGlzKS5uYW1lID0gZXJyLm5hbWUgPSAnVW5zdWJzY3JpcHRpb25FcnJvcic7XG4gICAgKDxhbnk+IHRoaXMpLnN0YWNrID0gZXJyLnN0YWNrO1xuICAgICg8YW55PiB0aGlzKS5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gIH1cbn1cbiJdfQ==