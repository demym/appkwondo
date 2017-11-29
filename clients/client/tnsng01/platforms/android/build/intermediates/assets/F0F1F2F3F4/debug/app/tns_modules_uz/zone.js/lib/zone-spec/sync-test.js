var SyncTestZoneSpec = (function () {
    function SyncTestZoneSpec(namePrefix) {
        this.runZone = Zone.current;
        this.name = 'syncTestZone for ' + namePrefix;
    }
    SyncTestZoneSpec.prototype.onScheduleTask = function (delegate, current, target, task) {
        switch (task.type) {
            case 'microTask':
            case 'macroTask':
                throw new Error("Cannot call " + task.source + " from within a sync test.");
            case 'eventTask':
                task = delegate.scheduleTask(target, task);
                break;
        }
        return task;
    };
    return SyncTestZoneSpec;
}());
Zone['SyncTestZoneSpec'] = SyncTestZoneSpec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy10ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3luYy10ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBO0lBR0UsMEJBQVksVUFBa0I7UUFGOUIsWUFBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFHckIsSUFBSSxDQUFDLElBQUksR0FBRyxtQkFBbUIsR0FBRyxVQUFVLENBQUM7SUFDL0MsQ0FBQztJQU1ELHlDQUFjLEdBQWQsVUFBZSxRQUFzQixFQUFFLE9BQWEsRUFBRSxNQUFZLEVBQUUsSUFBVTtRQUM1RSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsQixLQUFLLFdBQVcsQ0FBQztZQUNqQixLQUFLLFdBQVc7Z0JBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBZSxJQUFJLENBQUMsTUFBTSw4QkFBMkIsQ0FBQyxDQUFDO1lBQ3pFLEtBQUssV0FBVztnQkFDZCxJQUFJLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzNDLEtBQUssQ0FBQztRQUNWLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQXRCRCxJQXNCQztBQUlBLElBQVksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLGdCQUFnQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5jbGFzcyBTeW5jVGVzdFpvbmVTcGVjIGltcGxlbWVudHMgWm9uZVNwZWMge1xuICBydW5ab25lID0gWm9uZS5jdXJyZW50O1xuXG4gIGNvbnN0cnVjdG9yKG5hbWVQcmVmaXg6IHN0cmluZykge1xuICAgIHRoaXMubmFtZSA9ICdzeW5jVGVzdFpvbmUgZm9yICcgKyBuYW1lUHJlZml4O1xuICB9XG5cbiAgLy8gWm9uZVNwZWMgaW1wbGVtZW50YXRpb24gYmVsb3cuXG5cbiAgbmFtZTogc3RyaW5nO1xuXG4gIG9uU2NoZWR1bGVUYXNrKGRlbGVnYXRlOiBab25lRGVsZWdhdGUsIGN1cnJlbnQ6IFpvbmUsIHRhcmdldDogWm9uZSwgdGFzazogVGFzayk6IFRhc2sge1xuICAgIHN3aXRjaCAodGFzay50eXBlKSB7XG4gICAgICBjYXNlICdtaWNyb1Rhc2snOlxuICAgICAgY2FzZSAnbWFjcm9UYXNrJzpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgY2FsbCAke3Rhc2suc291cmNlfSBmcm9tIHdpdGhpbiBhIHN5bmMgdGVzdC5gKTtcbiAgICAgIGNhc2UgJ2V2ZW50VGFzayc6XG4gICAgICAgIHRhc2sgPSBkZWxlZ2F0ZS5zY2hlZHVsZVRhc2sodGFyZ2V0LCB0YXNrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiB0YXNrO1xuICB9XG59XG5cbi8vIEV4cG9ydCB0aGUgY2xhc3Mgc28gdGhhdCBuZXcgaW5zdGFuY2VzIGNhbiBiZSBjcmVhdGVkIHdpdGggcHJvcGVyXG4vLyBjb25zdHJ1Y3RvciBwYXJhbXMuXG4oWm9uZSBhcyBhbnkpWydTeW5jVGVzdFpvbmVTcGVjJ10gPSBTeW5jVGVzdFpvbmVTcGVjO1xuIl19