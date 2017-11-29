"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("./root");
var ImmediateDefinition = (function () {
    function ImmediateDefinition(root) {
        this.root = root;
        if (root.setImmediate && typeof root.setImmediate === 'function') {
            this.setImmediate = root.setImmediate.bind(root);
            this.clearImmediate = root.clearImmediate.bind(root);
        }
        else {
            this.nextHandle = 1;
            this.tasksByHandle = {};
            this.currentlyRunningATask = false;
            if (this.canUseProcessNextTick()) {
                this.setImmediate = this.createProcessNextTickSetImmediate();
            }
            else if (this.canUsePostMessage()) {
                this.setImmediate = this.createPostMessageSetImmediate();
            }
            else if (this.canUseMessageChannel()) {
                this.setImmediate = this.createMessageChannelSetImmediate();
            }
            else if (this.canUseReadyStateChange()) {
                this.setImmediate = this.createReadyStateChangeSetImmediate();
            }
            else {
                this.setImmediate = this.createSetTimeoutSetImmediate();
            }
            var ci = function clearImmediate(handle) {
                delete clearImmediate.instance.tasksByHandle[handle];
            };
            ci.instance = this;
            this.clearImmediate = ci;
        }
    }
    ImmediateDefinition.prototype.identify = function (o) {
        return this.root.Object.prototype.toString.call(o);
    };
    ImmediateDefinition.prototype.canUseProcessNextTick = function () {
        return this.identify(this.root.process) === '[object process]';
    };
    ImmediateDefinition.prototype.canUseMessageChannel = function () {
        return Boolean(this.root.MessageChannel);
    };
    ImmediateDefinition.prototype.canUseReadyStateChange = function () {
        var document = this.root.document;
        return Boolean(document && 'onreadystatechange' in document.createElement('script'));
    };
    ImmediateDefinition.prototype.canUsePostMessage = function () {
        var root = this.root;
        if (root.postMessage && !root.importScripts) {
            var postMessageIsAsynchronous_1 = true;
            var oldOnMessage = root.onmessage;
            root.onmessage = function () {
                postMessageIsAsynchronous_1 = false;
            };
            root.postMessage('', '*');
            root.onmessage = oldOnMessage;
            return postMessageIsAsynchronous_1;
        }
        return false;
    };
    ImmediateDefinition.prototype.partiallyApplied = function (handler) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var fn = function result() {
            var _a = result, handler = _a.handler, args = _a.args;
            if (typeof handler === 'function') {
                handler.apply(undefined, args);
            }
            else {
                (new Function('' + handler))();
            }
        };
        fn.handler = handler;
        fn.args = args;
        return fn;
    };
    ImmediateDefinition.prototype.addFromSetImmediateArguments = function (args) {
        this.tasksByHandle[this.nextHandle] = this.partiallyApplied.apply(undefined, args);
        return this.nextHandle++;
    };
    ImmediateDefinition.prototype.createProcessNextTickSetImmediate = function () {
        var fn = function setImmediate() {
            var instance = setImmediate.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.process.nextTick(instance.partiallyApplied(instance.runIfPresent, handle));
            return handle;
        };
        fn.instance = this;
        return fn;
    };
    ImmediateDefinition.prototype.createPostMessageSetImmediate = function () {
        var root = this.root;
        var messagePrefix = 'setImmediate$' + root.Math.random() + '$';
        var onGlobalMessage = function globalMessageHandler(event) {
            var instance = globalMessageHandler.instance;
            if (event.source === root &&
                typeof event.data === 'string' &&
                event.data.indexOf(messagePrefix) === 0) {
                instance.runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };
        onGlobalMessage.instance = this;
        root.addEventListener('message', onGlobalMessage, false);
        var fn = function setImmediate() {
            var _a = setImmediate, messagePrefix = _a.messagePrefix, instance = _a.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.postMessage(messagePrefix + handle, '*');
            return handle;
        };
        fn.instance = this;
        fn.messagePrefix = messagePrefix;
        return fn;
    };
    ImmediateDefinition.prototype.runIfPresent = function (handle) {
        if (this.currentlyRunningATask) {
            this.root.setTimeout(this.partiallyApplied(this.runIfPresent, handle), 0);
        }
        else {
            var task = this.tasksByHandle[handle];
            if (task) {
                this.currentlyRunningATask = true;
                try {
                    task();
                }
                finally {
                    this.clearImmediate(handle);
                    this.currentlyRunningATask = false;
                }
            }
        }
    };
    ImmediateDefinition.prototype.createMessageChannelSetImmediate = function () {
        var _this = this;
        var channel = new this.root.MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            _this.runIfPresent(handle);
        };
        var fn = function setImmediate() {
            var _a = setImmediate, channel = _a.channel, instance = _a.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            channel.port2.postMessage(handle);
            return handle;
        };
        fn.channel = channel;
        fn.instance = this;
        return fn;
    };
    ImmediateDefinition.prototype.createReadyStateChangeSetImmediate = function () {
        var fn = function setImmediate() {
            var instance = setImmediate.instance;
            var root = instance.root;
            var doc = root.document;
            var html = doc.documentElement;
            var handle = instance.addFromSetImmediateArguments(arguments);
            var script = doc.createElement('script');
            script.onreadystatechange = function () {
                instance.runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
            return handle;
        };
        fn.instance = this;
        return fn;
    };
    ImmediateDefinition.prototype.createSetTimeoutSetImmediate = function () {
        var fn = function setImmediate() {
            var instance = setImmediate.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.setTimeout(instance.partiallyApplied(instance.runIfPresent, handle), 0);
            return handle;
        };
        fn.instance = this;
        return fn;
    };
    return ImmediateDefinition;
}());
exports.ImmediateDefinition = ImmediateDefinition;
exports.Immediate = new ImmediateDefinition(root_1.root);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1tZWRpYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSW1tZWRpYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsK0JBQWdDO0FBRWhDO0lBZUUsNkJBQW9CLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7WUFHbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUVqQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDO1lBQy9ELENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUVwQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO1lBQzNELENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUV2QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDO1lBQzlELENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUV6QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDO1lBQ2hFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFFTixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1lBQzFELENBQUM7WUFFRCxJQUFJLEVBQUUsR0FBRyx3QkFBd0IsTUFBVztnQkFDMUMsT0FBYSxjQUFlLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQUM7WUFFSSxFQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUUxQixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUMzQixDQUFDO0lBQ0gsQ0FBQztJQTdDTyxzQ0FBUSxHQUFoQixVQUFpQixDQUFNO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBNkNELG1EQUFxQixHQUFyQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssa0JBQWtCLENBQUM7SUFDakUsQ0FBQztJQUVELGtEQUFvQixHQUFwQjtRQUNFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsb0RBQXNCLEdBQXRCO1FBQ0UsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksb0JBQW9CLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCwrQ0FBaUIsR0FBakI7UUFDRSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBR3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLDJCQUF5QixHQUFHLElBQUksQ0FBQztZQUNyQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUc7Z0JBQ2YsMkJBQXlCLEdBQUcsS0FBSyxDQUFDO1lBQ3BDLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO1lBQzlCLE1BQU0sQ0FBQywyQkFBeUIsQ0FBQztRQUNuQyxDQUFDO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFJRCw4Q0FBZ0IsR0FBaEIsVUFBaUIsT0FBWTtRQUFFLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQsNkJBQWM7O1FBQzNDLElBQUksRUFBRSxHQUFHO1lBQ0QsSUFBQSxXQUErQixFQUE3QixvQkFBTyxFQUFFLGNBQUksQ0FBaUI7WUFDdEMsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLENBQUMsSUFBSSxRQUFRLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNqQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDO1FBRUksRUFBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdEIsRUFBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFdEIsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCwwREFBNEIsR0FBNUIsVUFBNkIsSUFBVztRQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCwrREFBaUMsR0FBakM7UUFDRSxJQUFJLEVBQUUsR0FBRztZQUNDLElBQUEsZ0NBQVEsQ0FBeUI7WUFDekMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLDRCQUE0QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlELFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3pGLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDO1FBRUksRUFBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFMUIsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCwyREFBNkIsR0FBN0I7UUFJRSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRXZCLElBQUksYUFBYSxHQUFHLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUMvRCxJQUFJLGVBQWUsR0FBRyw4QkFBOEIsS0FBVTtZQUM1RCxJQUFNLFFBQVEsR0FBUyxvQkFBcUIsQ0FBQyxRQUFRLENBQUM7WUFDdEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJO2dCQUN2QixPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUTtnQkFDOUIsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLENBQUM7UUFDSCxDQUFDLENBQUM7UUFDSSxlQUFnQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFdkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFekQsSUFBSSxFQUFFLEdBQUc7WUFDRCxJQUFBLGlCQUFpRCxFQUEvQyxnQ0FBYSxFQUFFLHNCQUFRLENBQXlCO1lBQ3hELElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5RCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEdBQUcsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDO1FBRUksRUFBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDcEIsRUFBRyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFFeEMsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCwwQ0FBWSxHQUFaLFVBQWEsTUFBVztRQUd0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1lBRy9CLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO2dCQUNsQyxJQUFJLENBQUM7b0JBQ0gsSUFBSSxFQUFFLENBQUM7Z0JBQ1QsQ0FBQzt3QkFBUyxDQUFDO29CQUNULElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzVCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7Z0JBQ3JDLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCw4REFBZ0MsR0FBaEM7UUFBQSxpQkFrQkM7UUFqQkMsSUFBSSxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFVBQUMsS0FBVTtZQUNuQyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDO1FBRUYsSUFBSSxFQUFFLEdBQUc7WUFDRCxJQUFBLGlCQUEyQyxFQUF6QyxvQkFBTyxFQUFFLHNCQUFRLENBQXlCO1lBQ2xELElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5RCxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQztRQUVJLEVBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3RCLEVBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBRTFCLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsZ0VBQWtDLEdBQWxDO1FBQ0UsSUFBSSxFQUFFLEdBQUc7WUFDUCxJQUFNLFFBQVEsR0FBUyxZQUFhLENBQUMsUUFBUSxDQUFDO1lBQzlDLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDM0IsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMxQixJQUFNLElBQUksR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDO1lBRWpDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUc5RCxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRztnQkFDMUIsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDOUIsTUFBTSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztnQkFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDekIsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNoQixDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDO1FBRUksRUFBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFMUIsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCwwREFBNEIsR0FBNUI7UUFDRSxJQUFJLEVBQUUsR0FBRztZQUNQLElBQU0sUUFBUSxHQUFTLFlBQWEsQ0FBQyxRQUFRLENBQUM7WUFDOUMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLDRCQUE0QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlELFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RGLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDO1FBRUksRUFBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFMUIsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUF0T0QsSUFzT0M7QUF0T1ksa0RBQW1CO0FBdU9uQixRQUFBLFNBQVMsR0FBRyxJQUFJLG1CQUFtQixDQUFDLFdBQUksQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG5Tb21lIGNyZWRpdCBmb3IgdGhpcyBoZWxwZXIgZ29lcyB0byBodHRwOi8vZ2l0aHViLmNvbS9ZdXp1SlMvc2V0SW1tZWRpYXRlXG4qL1xuXG5pbXBvcnQgeyAgcm9vdCAgfSBmcm9tICcuL3Jvb3QnO1xuXG5leHBvcnQgY2xhc3MgSW1tZWRpYXRlRGVmaW5pdGlvbiB7XG4gIHNldEltbWVkaWF0ZTogKGNiOiAoKSA9PiB2b2lkKSA9PiBudW1iZXI7XG5cbiAgY2xlYXJJbW1lZGlhdGU6IChoYW5kbGU6IG51bWJlcikgPT4gdm9pZDtcblxuICBwcml2YXRlIGlkZW50aWZ5KG86IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucm9vdC5PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG4gIH1cblxuICB0YXNrc0J5SGFuZGxlOiBhbnk7XG5cbiAgbmV4dEhhbmRsZTogbnVtYmVyO1xuXG4gIGN1cnJlbnRseVJ1bm5pbmdBVGFzazogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvb3Q6IGFueSkge1xuICAgIGlmIChyb290LnNldEltbWVkaWF0ZSAmJiB0eXBlb2Ygcm9vdC5zZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuc2V0SW1tZWRpYXRlID0gcm9vdC5zZXRJbW1lZGlhdGUuYmluZChyb290KTtcbiAgICAgIHRoaXMuY2xlYXJJbW1lZGlhdGUgPSByb290LmNsZWFySW1tZWRpYXRlLmJpbmQocm9vdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubmV4dEhhbmRsZSA9IDE7XG4gICAgICB0aGlzLnRhc2tzQnlIYW5kbGUgPSB7fTtcbiAgICAgIHRoaXMuY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG5cbiAgICAgIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgICAgIGlmICh0aGlzLmNhblVzZVByb2Nlc3NOZXh0VGljaygpKSB7XG4gICAgICAgIC8vIEZvciBOb2RlLmpzIGJlZm9yZSAwLjlcbiAgICAgICAgdGhpcy5zZXRJbW1lZGlhdGUgPSB0aGlzLmNyZWF0ZVByb2Nlc3NOZXh0VGlja1NldEltbWVkaWF0ZSgpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmNhblVzZVBvc3RNZXNzYWdlKCkpIHtcbiAgICAgICAgLy8gRm9yIG5vbi1JRTEwIG1vZGVybiBicm93c2Vyc1xuICAgICAgICB0aGlzLnNldEltbWVkaWF0ZSA9IHRoaXMuY3JlYXRlUG9zdE1lc3NhZ2VTZXRJbW1lZGlhdGUoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jYW5Vc2VNZXNzYWdlQ2hhbm5lbCgpKSB7XG4gICAgICAgIC8vIEZvciB3ZWIgd29ya2Vycywgd2hlcmUgc3VwcG9ydGVkXG4gICAgICAgIHRoaXMuc2V0SW1tZWRpYXRlID0gdGhpcy5jcmVhdGVNZXNzYWdlQ2hhbm5lbFNldEltbWVkaWF0ZSgpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmNhblVzZVJlYWR5U3RhdGVDaGFuZ2UoKSkge1xuICAgICAgICAvLyBGb3IgSUUgNuKAkzhcbiAgICAgICAgdGhpcy5zZXRJbW1lZGlhdGUgPSB0aGlzLmNyZWF0ZVJlYWR5U3RhdGVDaGFuZ2VTZXRJbW1lZGlhdGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvciBvbGRlciBicm93c2Vyc1xuICAgICAgICB0aGlzLnNldEltbWVkaWF0ZSA9IHRoaXMuY3JlYXRlU2V0VGltZW91dFNldEltbWVkaWF0ZSgpO1xuICAgICAgfVxuXG4gICAgICBsZXQgY2kgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShoYW5kbGU6IGFueSkge1xuICAgICAgICBkZWxldGUgKDxhbnk+Y2xlYXJJbW1lZGlhdGUpLmluc3RhbmNlLnRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICAgIH07XG5cbiAgICAgICg8YW55PmNpKS5pbnN0YW5jZSA9IHRoaXM7XG5cbiAgICAgIHRoaXMuY2xlYXJJbW1lZGlhdGUgPSBjaTtcbiAgICB9XG4gIH1cblxuICBjYW5Vc2VQcm9jZXNzTmV4dFRpY2soKSB7XG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpZnkodGhpcy5yb290LnByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXSc7XG4gIH1cblxuICBjYW5Vc2VNZXNzYWdlQ2hhbm5lbCgpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLnJvb3QuTWVzc2FnZUNoYW5uZWwpO1xuICB9XG5cbiAgY2FuVXNlUmVhZHlTdGF0ZUNoYW5nZSgpIHtcbiAgICBjb25zdCBkb2N1bWVudCA9IHRoaXMucm9vdC5kb2N1bWVudDtcbiAgICByZXR1cm4gQm9vbGVhbihkb2N1bWVudCAmJiAnb25yZWFkeXN0YXRlY2hhbmdlJyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKSk7XG4gIH1cblxuICBjYW5Vc2VQb3N0TWVzc2FnZSgpIHtcbiAgICBjb25zdCByb290ID0gdGhpcy5yb290O1xuICAgIC8vIFRoZSB0ZXN0IGFnYWluc3QgYGltcG9ydFNjcmlwdHNgIHByZXZlbnRzIHRoaXMgaW1wbGVtZW50YXRpb24gZnJvbSBiZWluZyBpbnN0YWxsZWQgaW5zaWRlIGEgd2ViIHdvcmtlcixcbiAgICAvLyB3aGVyZSBgcm9vdC5wb3N0TWVzc2FnZWAgbWVhbnMgc29tZXRoaW5nIGNvbXBsZXRlbHkgZGlmZmVyZW50IGFuZCBjYW4ndCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgaWYgKHJvb3QucG9zdE1lc3NhZ2UgJiYgIXJvb3QuaW1wb3J0U2NyaXB0cykge1xuICAgICAgbGV0IHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSB0cnVlO1xuICAgICAgbGV0IG9sZE9uTWVzc2FnZSA9IHJvb3Qub25tZXNzYWdlO1xuICAgICAgcm9vdC5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IGZhbHNlO1xuICAgICAgfTtcbiAgICAgIHJvb3QucG9zdE1lc3NhZ2UoJycsICcqJyk7XG4gICAgICByb290Lm9ubWVzc2FnZSA9IG9sZE9uTWVzc2FnZTtcbiAgICAgIHJldHVybiBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFRoaXMgZnVuY3Rpb24gYWNjZXB0cyB0aGUgc2FtZSBhcmd1bWVudHMgYXMgc2V0SW1tZWRpYXRlLCBidXRcbiAgLy8gcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgcmVxdWlyZXMgbm8gYXJndW1lbnRzLlxuICBwYXJ0aWFsbHlBcHBsaWVkKGhhbmRsZXI6IGFueSwgLi4uYXJnczogYW55W10pIHtcbiAgICBsZXQgZm4gPSBmdW5jdGlvbiByZXN1bHQgKCkge1xuICAgICAgY29uc3QgeyBoYW5kbGVyLCBhcmdzIH0gPSA8YW55PnJlc3VsdDtcbiAgICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAobmV3IEZ1bmN0aW9uKCcnICsgaGFuZGxlcikpKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgICg8YW55PmZuKS5oYW5kbGVyID0gaGFuZGxlcjtcbiAgICAoPGFueT5mbikuYXJncyA9IGFyZ3M7XG5cbiAgICByZXR1cm4gZm47XG4gIH1cblxuICBhZGRGcm9tU2V0SW1tZWRpYXRlQXJndW1lbnRzKGFyZ3M6IGFueVtdKSB7XG4gICAgdGhpcy50YXNrc0J5SGFuZGxlW3RoaXMubmV4dEhhbmRsZV0gPSB0aGlzLnBhcnRpYWxseUFwcGxpZWQuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICByZXR1cm4gdGhpcy5uZXh0SGFuZGxlKys7XG4gIH1cblxuICBjcmVhdGVQcm9jZXNzTmV4dFRpY2tTZXRJbW1lZGlhdGUoKSB7XG4gICAgbGV0IGZuID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKCkge1xuICAgICAgY29uc3QgeyBpbnN0YW5jZSB9ID0gKDxhbnk+c2V0SW1tZWRpYXRlKTtcbiAgICAgIGxldCBoYW5kbGUgPSBpbnN0YW5jZS5hZGRGcm9tU2V0SW1tZWRpYXRlQXJndW1lbnRzKGFyZ3VtZW50cyk7XG4gICAgICBpbnN0YW5jZS5yb290LnByb2Nlc3MubmV4dFRpY2soaW5zdGFuY2UucGFydGlhbGx5QXBwbGllZChpbnN0YW5jZS5ydW5JZlByZXNlbnQsIGhhbmRsZSkpO1xuICAgICAgcmV0dXJuIGhhbmRsZTtcbiAgICB9O1xuXG4gICAgKDxhbnk+Zm4pLmluc3RhbmNlID0gdGhpcztcblxuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIGNyZWF0ZVBvc3RNZXNzYWdlU2V0SW1tZWRpYXRlKCkge1xuICAgIC8vIEluc3RhbGxzIGFuIGV2ZW50IGhhbmRsZXIgb24gYGdsb2JhbGAgZm9yIHRoZSBgbWVzc2FnZWAgZXZlbnQ6IHNlZVxuICAgIC8vICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vRE9NL3dpbmRvdy5wb3N0TWVzc2FnZVxuICAgIC8vICogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvY29tbXMuaHRtbCNjcm9zc0RvY3VtZW50TWVzc2FnZXNcbiAgICBjb25zdCByb290ID0gdGhpcy5yb290O1xuXG4gICAgbGV0IG1lc3NhZ2VQcmVmaXggPSAnc2V0SW1tZWRpYXRlJCcgKyByb290Lk1hdGgucmFuZG9tKCkgKyAnJCc7XG4gICAgbGV0IG9uR2xvYmFsTWVzc2FnZSA9IGZ1bmN0aW9uIGdsb2JhbE1lc3NhZ2VIYW5kbGVyKGV2ZW50OiBhbnkpIHtcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gKDxhbnk+Z2xvYmFsTWVzc2FnZUhhbmRsZXIpLmluc3RhbmNlO1xuICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gcm9vdCAmJlxuICAgICAgICB0eXBlb2YgZXZlbnQuZGF0YSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgZXZlbnQuZGF0YS5pbmRleE9mKG1lc3NhZ2VQcmVmaXgpID09PSAwKSB7XG4gICAgICAgIGluc3RhbmNlLnJ1bklmUHJlc2VudCgrZXZlbnQuZGF0YS5zbGljZShtZXNzYWdlUHJlZml4Lmxlbmd0aCkpO1xuICAgICAgfVxuICAgIH07XG4gICAgKDxhbnk+b25HbG9iYWxNZXNzYWdlKS5pbnN0YW5jZSA9IHRoaXM7XG5cbiAgICByb290LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbkdsb2JhbE1lc3NhZ2UsIGZhbHNlKTtcblxuICAgIGxldCBmbiA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZSgpIHtcbiAgICAgIGNvbnN0IHsgbWVzc2FnZVByZWZpeCwgaW5zdGFuY2UgfSA9ICg8YW55PnNldEltbWVkaWF0ZSk7XG4gICAgICBsZXQgaGFuZGxlID0gaW5zdGFuY2UuYWRkRnJvbVNldEltbWVkaWF0ZUFyZ3VtZW50cyhhcmd1bWVudHMpO1xuICAgICAgaW5zdGFuY2Uucm9vdC5wb3N0TWVzc2FnZShtZXNzYWdlUHJlZml4ICsgaGFuZGxlLCAnKicpO1xuICAgICAgcmV0dXJuIGhhbmRsZTtcbiAgICB9O1xuXG4gICAgKDxhbnk+Zm4pLmluc3RhbmNlID0gdGhpcztcbiAgICAoPGFueT5mbikubWVzc2FnZVByZWZpeCA9IG1lc3NhZ2VQcmVmaXg7XG5cbiAgICByZXR1cm4gZm47XG4gIH1cblxuICBydW5JZlByZXNlbnQoaGFuZGxlOiBhbnkpIHtcbiAgICAvLyBGcm9tIHRoZSBzcGVjOiAnV2FpdCB1bnRpbCBhbnkgaW52b2NhdGlvbnMgb2YgdGhpcyBhbGdvcml0aG0gc3RhcnRlZCBiZWZvcmUgdGhpcyBvbmUgaGF2ZSBjb21wbGV0ZWQuJ1xuICAgIC8vIFNvIGlmIHdlJ3JlIGN1cnJlbnRseSBydW5uaW5nIGEgdGFzaywgd2UnbGwgbmVlZCB0byBkZWxheSB0aGlzIGludm9jYXRpb24uXG4gICAgaWYgKHRoaXMuY3VycmVudGx5UnVubmluZ0FUYXNrKSB7XG4gICAgICAvLyBEZWxheSBieSBkb2luZyBhIHNldFRpbWVvdXQuIHNldEltbWVkaWF0ZSB3YXMgdHJpZWQgaW5zdGVhZCwgYnV0IGluIEZpcmVmb3ggNyBpdCBnZW5lcmF0ZWQgYVxuICAgICAgLy8gJ3RvbyBtdWNoIHJlY3Vyc2lvbicgZXJyb3IuXG4gICAgICB0aGlzLnJvb3Quc2V0VGltZW91dCh0aGlzLnBhcnRpYWxseUFwcGxpZWQodGhpcy5ydW5JZlByZXNlbnQsIGhhbmRsZSksIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdGFzayA9IHRoaXMudGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgdGhpcy5jdXJyZW50bHlSdW5uaW5nQVRhc2sgPSB0cnVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRhc2soKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICB0aGlzLmNsZWFySW1tZWRpYXRlKGhhbmRsZSk7XG4gICAgICAgICAgdGhpcy5jdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZU1lc3NhZ2VDaGFubmVsU2V0SW1tZWRpYXRlKCkge1xuICAgIGxldCBjaGFubmVsID0gbmV3IHRoaXMucm9vdC5NZXNzYWdlQ2hhbm5lbCgpO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgIGxldCBoYW5kbGUgPSBldmVudC5kYXRhO1xuICAgICAgdGhpcy5ydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICB9O1xuXG4gICAgbGV0IGZuID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKCkge1xuICAgICAgY29uc3QgeyBjaGFubmVsLCBpbnN0YW5jZSB9ID0gKDxhbnk+c2V0SW1tZWRpYXRlKTtcbiAgICAgIGxldCBoYW5kbGUgPSBpbnN0YW5jZS5hZGRGcm9tU2V0SW1tZWRpYXRlQXJndW1lbnRzKGFyZ3VtZW50cyk7XG4gICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKGhhbmRsZSk7XG4gICAgICByZXR1cm4gaGFuZGxlO1xuICAgIH07XG5cbiAgICAoPGFueT5mbikuY2hhbm5lbCA9IGNoYW5uZWw7XG4gICAgKDxhbnk+Zm4pLmluc3RhbmNlID0gdGhpcztcblxuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIGNyZWF0ZVJlYWR5U3RhdGVDaGFuZ2VTZXRJbW1lZGlhdGUoKSB7XG4gICAgbGV0IGZuID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKCkge1xuICAgICAgY29uc3QgaW5zdGFuY2UgPSAoPGFueT5zZXRJbW1lZGlhdGUpLmluc3RhbmNlO1xuICAgICAgY29uc3Qgcm9vdCA9IGluc3RhbmNlLnJvb3Q7XG4gICAgICBjb25zdCBkb2MgPSByb290LmRvY3VtZW50O1xuICAgICAgY29uc3QgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICAgIGxldCBoYW5kbGUgPSBpbnN0YW5jZS5hZGRGcm9tU2V0SW1tZWRpYXRlQXJndW1lbnRzKGFyZ3VtZW50cyk7XG4gICAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG4gICAgICBsZXQgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgaW5zdGFuY2UucnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgIHNjcmlwdCA9IG51bGw7XG4gICAgICB9O1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgcmV0dXJuIGhhbmRsZTtcbiAgICB9O1xuXG4gICAgKDxhbnk+Zm4pLmluc3RhbmNlID0gdGhpcztcblxuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIGNyZWF0ZVNldFRpbWVvdXRTZXRJbW1lZGlhdGUoKSB7XG4gICAgbGV0IGZuID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKCkge1xuICAgICAgY29uc3QgaW5zdGFuY2UgPSAoPGFueT5zZXRJbW1lZGlhdGUpLmluc3RhbmNlO1xuICAgICAgbGV0IGhhbmRsZSA9IGluc3RhbmNlLmFkZEZyb21TZXRJbW1lZGlhdGVBcmd1bWVudHMoYXJndW1lbnRzKTtcbiAgICAgIGluc3RhbmNlLnJvb3Quc2V0VGltZW91dChpbnN0YW5jZS5wYXJ0aWFsbHlBcHBsaWVkKGluc3RhbmNlLnJ1bklmUHJlc2VudCwgaGFuZGxlKSwgMCk7XG4gICAgICByZXR1cm4gaGFuZGxlO1xuICAgIH07XG5cbiAgICAoPGFueT5mbikuaW5zdGFuY2UgPSB0aGlzO1xuXG4gICAgcmV0dXJuIGZuO1xuICB9XG59XG5leHBvcnQgY29uc3QgSW1tZWRpYXRlID0gbmV3IEltbWVkaWF0ZURlZmluaXRpb24ocm9vdCk7XG4iXX0=