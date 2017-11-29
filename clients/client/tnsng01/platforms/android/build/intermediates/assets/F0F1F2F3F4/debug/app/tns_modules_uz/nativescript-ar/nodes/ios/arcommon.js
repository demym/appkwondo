"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ar_common_1 = require("../../ar-common");
var ARCommonNode = (function () {
    function ARCommonNode(options, node) {
        this.onTapHandler = options.onTap;
        this.onLongPressHandler = options.onLongPress;
        this.onPanHandler = options.onPan;
        node.position = this.position = options.position;
        if (options.rotation) {
            node.rotation = this.rotation = options.rotation;
        }
        node.name = this.id = (JSON.stringify(options.position) + "_" + new Date().getTime());
        node.physicsBody = SCNPhysicsBody.bodyWithTypeShape(1, null);
        node.physicsBody.mass = options.mass || 0;
        node.physicsBody.categoryBitMask = 1;
        if (options.scale) {
            node.scale = (options.scale instanceof ar_common_1.ARScale ? options.scale : {
                x: options.scale,
                y: options.scale,
                z: options.scale
            });
        }
        this.ios = node;
    }
    ARCommonNode.prototype.onTap = function () {
        this.onTapHandler && this.onTapHandler(this);
    };
    ARCommonNode.prototype.onLongPress = function () {
        this.onLongPressHandler && this.onLongPressHandler(this);
    };
    ARCommonNode.prototype.onPan = function () {
        this.onPanHandler && this.onPanHandler(this);
    };
    ARCommonNode.prototype.remove = function () {
        this.ios.removeFromParentNode();
    };
    return ARCommonNode;
}());
exports.ARCommonNode = ARCommonNode;
