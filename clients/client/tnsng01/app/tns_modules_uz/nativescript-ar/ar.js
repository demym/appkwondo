"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ar_common_1 = require("./ar-common");
exports.ARDebugLevel = ar_common_1.ARDebugLevel;
var armaterialfactory_1 = require("./nodes/ios/armaterialfactory");
var arbox_1 = require("./nodes/ios/arbox");
var arplane_1 = require("./nodes/ios/arplane");
var armodel_1 = require("./nodes/ios/armodel");
var arsphere_1 = require("./nodes/ios/arsphere");
var artext_1 = require("./nodes/ios/artext");
var artube_1 = require("./nodes/ios/artube");
var ARState = {
    planes: new Map(),
    shapes: new Map(),
};
var AR = (function (_super) {
    __extends(AR, _super);
    function AR() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AR.isSupported = function () {
        try {
            return !!ARSCNView && NSProcessInfo.processInfo.environment.objectForKey("SIMULATOR_DEVICE_NAME") === null;
        }
        catch (ignore) {
            return false;
        }
    };
    AR.prototype.setDebugLevel = function (to) {
        if (!this.sceneView) {
            return;
        }
        if (to === ar_common_1.ARDebugLevel.WORLD_ORIGIN) {
            this.sceneView.debugOptions = ARSCNDebugOptionShowWorldOrigin;
        }
        else if (to === ar_common_1.ARDebugLevel.FEATURE_POINTS) {
            this.sceneView.debugOptions = ARSCNDebugOptionShowFeaturePoints;
        }
        else if (to === ar_common_1.ARDebugLevel.PHYSICS_SHAPES) {
            this.sceneView.debugOptions = 1;
        }
        else {
            this.sceneView.debugOptions = 0;
        }
    };
    AR.prototype.toggleStatistics = function (on) {
        if (!this.sceneView) {
            return;
        }
        this.sceneView.showsStatistics = on;
    };
    AR.prototype.togglePlaneDetection = function (on) {
        if (!this.sceneView) {
            return;
        }
        this.configuration.planeDetection = on ? 1 : 0;
        this.sceneView.session.runWithConfiguration(this.configuration);
    };
    AR.prototype.togglePlaneVisibility = function (on) {
        var _this = this;
        var material = armaterialfactory_1.ARMaterialFactory.getMaterial(this.planeMaterial);
        ARState.planes.forEach(function (plane) {
            plane.setMaterial(material, on ? _this.planeOpacity : 0);
        });
    };
    AR.prototype.initAR = function () {
        if (!AR.isSupported()) {
            return;
        }
        this.configuration = ARWorldTrackingConfiguration.new();
        this.configuration.lightEstimationEnabled = true;
        this.sceneView = ARSCNView.new();
        this.sceneView.delegate = this.delegate = ARSCNViewDelegateImpl.createWithOwnerResultCallbackAndOptions(new WeakRef(this), function (data) {
        }, {});
        this.toggleStatistics(this.showStatistics);
        this.togglePlaneDetection(this.detectPlanes);
        this.sceneView.autoenablesDefaultLighting = true;
        this.sceneView.automaticallyUpdatesLighting = true;
        this.sceneView.scene.rootNode.name = "root";
        var scene = SCNScene.new();
        this.sceneView.scene = scene;
        this.addBottomPlane(scene);
        this.sceneTapHandler = SceneTapHandlerImpl.initWithOwner(new WeakRef(this));
        var tapGestureRecognizer = UITapGestureRecognizer.alloc().initWithTargetAction(this.sceneTapHandler, "tap");
        tapGestureRecognizer.numberOfTapsRequired = 1;
        this.sceneView.addGestureRecognizer(tapGestureRecognizer);
        this.sceneLongPressHandler = SceneLongPressHandlerImpl.initWithOwner(new WeakRef(this));
        var longPressGestureRecognizer = UILongPressGestureRecognizer.alloc().initWithTargetAction(this.sceneLongPressHandler, "longpress");
        longPressGestureRecognizer.minimumPressDuration = 0.5;
        this.sceneView.addGestureRecognizer(longPressGestureRecognizer);
        this.scenePanHandler = ScenePanHandlerImpl.initWithOwner(new WeakRef(this));
        var panGestureRecognizer = UIPanGestureRecognizer.alloc().initWithTargetAction(this.scenePanHandler, "pan");
        panGestureRecognizer.minimumNumberOfTouches = 1;
        this.sceneView.addGestureRecognizer(panGestureRecognizer);
        this.sceneView.antialiasingMode = 2;
        this.nativeView.addSubview(this.sceneView);
        var eventData = {
            eventName: ar_common_1.AR.arLoadedEvent,
            object: this,
            ios: this.sceneView
        };
        this.notify(eventData);
    };
    AR.prototype.addBottomPlane = function (scene) {
        var bottomPlane = SCNBox.boxWithWidthHeightLengthChamferRadius(1000, 0.5, 1000, 0);
        var bottomMaterial = SCNMaterial.new();
        bottomMaterial.diffuse.contents = UIColor.colorWithWhiteAlpha(1.0, 0.0);
        var materialArray = NSMutableArray.alloc().initWithCapacity(6);
        materialArray.addObject(bottomMaterial);
        bottomPlane.materials = materialArray;
        var bottomNode = SCNNode.nodeWithGeometry(bottomPlane);
        bottomNode.position = new ar_common_1.ARPosition(0, -25, 0);
        bottomNode.physicsBody = SCNPhysicsBody.bodyWithTypeShape(2, null);
        bottomNode.physicsBody.categoryBitMask = 0;
        bottomNode.physicsBody.contactTestBitMask = 1;
        scene.rootNode.addChildNode(bottomNode);
        scene.physicsWorld.contactDelegate = this.physicsWorldContactDelegate = SCNPhysicsContactDelegateImpl.createWithOwner(new WeakRef(this));
    };
    AR.prototype.createNativeView = function () {
        var v = _super.prototype.createNativeView.call(this);
        this.initAR();
        return v;
    };
    AR.prototype.onLayout = function (left, top, right, bottom) {
        _super.prototype.onLayout.call(this, left, top, right, bottom);
        if (this.sceneView) {
            this.sceneView.layer.frame = this.ios.layer.bounds;
        }
    };
    AR.prototype.sceneLongPressed = function (recognizer) {
        if (recognizer.state !== 1) {
            return;
        }
        var hitTestResults = this.sceneView.hitTestOptions(recognizer.locationInView(this.sceneView), {
            SCNHitTestBoundingBoxOnlyKey: true,
            SCNHitTestFirstFoundOnlyKey: true
        });
        if (hitTestResults.count === 0) {
            return;
        }
        var hitResult = hitTestResults.firstObject;
        var savedModel = ARState.shapes.get(hitResult.node.name);
        if (savedModel) {
            savedModel.onLongPress();
        }
    };
    AR.prototype.scenePanned = function (recognizer) {
        var hitTestResults = this.sceneView.hitTestOptions(recognizer.locationInView(this.sceneView), {
            SCNHitTestBoundingBoxOnlyKey: true,
            SCNHitTestFirstFoundOnlyKey: true
        });
        if (hitTestResults.count === 0) {
            return;
        }
        var hitResult = hitTestResults.firstObject;
        var savedModel = ARState.shapes.get(hitResult.node.name);
        if (savedModel) {
            if (recognizer.state === 3) {
                savedModel.onPan();
            }
        }
    };
    AR.prototype.sceneTapped = function (recognizer) {
        var tapPoint = recognizer.locationInView(this.sceneView);
        var hitTestResults = this.sceneView.hitTestTypes(tapPoint, 16);
        if (hitTestResults.count === 0) {
            var eventData = {
                eventName: ar_common_1.AR.sceneTappedEvent,
                object: this,
                position: {
                    x: tapPoint.x,
                    y: tapPoint.y,
                    z: 0
                }
            };
            this.notify(eventData);
            return;
        }
        var hitResult = hitTestResults.firstObject;
        var hitResultStr = "" + hitResult;
        var transformStart = hitResultStr.indexOf("worldTransform=<translation=(") + "worldTransform=<translation=(".length;
        var transformStr = hitResultStr.substring(transformStart, hitResultStr.indexOf(")", transformStart));
        var transformParts = transformStr.split(" ");
        var node = this.sceneView.nodeForAnchor(hitResult.anchor);
        var existingItemTapped = false;
        if (node !== undefined) {
            var parentNode = node.parentNode;
            var savedModel = ARState.shapes.get(parentNode.name);
            if (savedModel) {
                savedModel.onTap();
                existingItemTapped = true;
            }
        }
        if (!existingItemTapped) {
            var eventData = {
                eventName: ar_common_1.AR.planeTappedEvent,
                object: this,
                position: {
                    x: +transformParts[0],
                    y: +transformParts[1],
                    z: +transformParts[2]
                }
            };
            this.notify(eventData);
        }
    };
    AR.prototype.addModel = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var model = armodel_1.ARModel.create(options);
            ARState.shapes.set(model.id, model);
            _this.sceneView.scene.rootNode.addChildNode(model.ios);
            resolve(model);
        });
    };
    AR.prototype.addBox = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var box = arbox_1.ARBox.create(options);
            ARState.shapes.set(box.id, box);
            _this.sceneView.scene.rootNode.addChildNode(box.ios);
            resolve(box);
        });
    };
    AR.prototype.addSphere = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var sphere = arsphere_1.ARSphere.create(options);
            ARState.shapes.set(sphere.id, sphere);
            _this.sceneView.scene.rootNode.addChildNode(sphere.ios);
            resolve(sphere);
        });
    };
    AR.prototype.addText = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var text = artext_1.ARText.create(options);
            ARState.shapes.set(text.id, text);
            _this.sceneView.scene.rootNode.addChildNode(text.ios);
            resolve(text);
        });
    };
    AR.prototype.addTube = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var tube = artube_1.ARTube.create(options);
            ARState.shapes.set(tube.id, tube);
            _this.sceneView.scene.rootNode.addChildNode(tube.ios);
            resolve(tube);
        });
    };
    AR.prototype.reset = function () {
        ARState.planes.forEach(function (plane) { return plane.remove(); });
        ARState.planes.clear();
        ARState.shapes.forEach(function (node) { return node.remove(); });
        ARState.shapes.clear();
    };
    return AR;
}(ar_common_1.AR));
var SceneTapHandlerImpl = (function (_super) {
    __extends(SceneTapHandlerImpl, _super);
    function SceneTapHandlerImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SceneTapHandlerImpl.initWithOwner = function (owner) {
        var handler = SceneTapHandlerImpl.new();
        handler._owner = owner;
        return handler;
    };
    SceneTapHandlerImpl.prototype.tap = function (args) {
        this._owner.get().sceneTapped(args);
    };
    return SceneTapHandlerImpl;
}(NSObject));
SceneTapHandlerImpl.ObjCExposedMethods = {
    "tap": { returns: interop.types.void, params: [interop.types.id] }
};
var SceneLongPressHandlerImpl = (function (_super) {
    __extends(SceneLongPressHandlerImpl, _super);
    function SceneLongPressHandlerImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SceneLongPressHandlerImpl.initWithOwner = function (owner) {
        var handler = SceneLongPressHandlerImpl.new();
        handler._owner = owner;
        return handler;
    };
    SceneLongPressHandlerImpl.prototype.longpress = function (args) {
        this._owner.get().sceneLongPressed(args);
    };
    return SceneLongPressHandlerImpl;
}(NSObject));
SceneLongPressHandlerImpl.ObjCExposedMethods = {
    "longpress": { returns: interop.types.void, params: [interop.types.id] }
};
var ScenePanHandlerImpl = (function (_super) {
    __extends(ScenePanHandlerImpl, _super);
    function ScenePanHandlerImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScenePanHandlerImpl.initWithOwner = function (owner) {
        var handler = ScenePanHandlerImpl.new();
        handler._owner = owner;
        return handler;
    };
    ScenePanHandlerImpl.prototype.pan = function (args) {
        this._owner.get().scenePanned(args);
    };
    return ScenePanHandlerImpl;
}(NSObject));
ScenePanHandlerImpl.ObjCExposedMethods = {
    "pan": { returns: interop.types.void, params: [interop.types.id] }
};
var ARSCNViewDelegateImpl = (function (_super) {
    __extends(ARSCNViewDelegateImpl, _super);
    function ARSCNViewDelegateImpl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentTrackingState = 2;
        return _this;
    }
    ARSCNViewDelegateImpl.new = function () {
        try {
            ARSCNViewDelegateImpl.ObjCProtocols.push(ARSCNViewDelegate);
        }
        catch (ignore) {
        }
        return _super.new.call(this);
    };
    ARSCNViewDelegateImpl.createWithOwnerResultCallbackAndOptions = function (owner, callback, options) {
        var delegate = ARSCNViewDelegateImpl.new();
        delegate.owner = owner;
        delegate.options = options;
        delegate.resultCallback = callback;
        return delegate;
    };
    ARSCNViewDelegateImpl.prototype.sessionDidFailWithError = function (session, error) {
        console.log(">>> sessionDidFailWithError: " + error);
    };
    ARSCNViewDelegateImpl.prototype.sessionWasInterrupted = function (session) {
        console.log(">>> sessionWasInterrupted: The tracking session has been interrupted. The session will be reset once the interruption has completed");
    };
    ARSCNViewDelegateImpl.prototype.sessionInterruptionEnded = function (session) {
        console.log(">>> sessionInterruptionEnded, calling reset");
        this.owner.get().reset();
    };
    ARSCNViewDelegateImpl.prototype.sessionCameraDidChangeTrackingState = function (session, camera) {
        if (this.currentTrackingState === camera.trackingState) {
            return;
        }
        this.currentTrackingState = camera.trackingState;
        var trackingState = null, limitedTrackingStateReason = null;
        if (camera.trackingState === 0) {
            trackingState = "Not available";
        }
        else if (camera.trackingState === 1) {
            trackingState = "Limited";
            var reason = camera.trackingStateReason;
            if (reason === 2) {
                limitedTrackingStateReason = "Excessive motion";
            }
            else if (reason === 3) {
                limitedTrackingStateReason = "Insufficient features";
            }
            else if (reason === 1) {
                limitedTrackingStateReason = "Initializing";
            }
            else if (reason === 0) {
                limitedTrackingStateReason = "None";
            }
        }
        else if (camera.trackingState === 2) {
            trackingState = "Normal";
        }
        if (trackingState !== null) {
            console.log("Tracking state changed to: " + trackingState);
            if (limitedTrackingStateReason !== null) {
                console.log("Limited tracking state reason: " + limitedTrackingStateReason);
            }
        }
    };
    ARSCNViewDelegateImpl.prototype.rendererDidAddNodeForAnchor = function (renderer, node, anchor) {
        if (anchor instanceof ARPlaneAnchor) {
            var owner = this.owner.get();
            var plane = arplane_1.ARPlane.create(anchor, owner.planeOpacity, armaterialfactory_1.ARMaterialFactory.getMaterial(owner.planeMaterial));
            ARState.planes.set(anchor.identifier.UUIDString, plane);
            node.addChildNode(plane.ios);
            var eventData = {
                eventName: ar_common_1.AR.planeDetectedEvent,
                object: owner,
                plane: plane
            };
            owner.notify(eventData);
        }
    };
    ARSCNViewDelegateImpl.prototype.rendererDidUpdateNodeForAnchor = function (renderer, node, anchor) {
        var plane = ARState.planes.get(anchor.identifier.UUIDString);
        if (plane) {
            plane.update(anchor);
        }
    };
    ARSCNViewDelegateImpl.prototype.rendererDidRemoveNodeForAnchor = function (renderer, node, anchor) {
        ARState.planes.delete(anchor.identifier.UUIDString);
    };
    return ARSCNViewDelegateImpl;
}(NSObject));
ARSCNViewDelegateImpl.ObjCProtocols = [];
var SCNPhysicsContactDelegateImpl = (function (_super) {
    __extends(SCNPhysicsContactDelegateImpl, _super);
    function SCNPhysicsContactDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SCNPhysicsContactDelegateImpl.new = function () {
        return _super.new.call(this);
    };
    SCNPhysicsContactDelegateImpl.createWithOwner = function (owner) {
        var delegate = SCNPhysicsContactDelegateImpl.new();
        delegate.owner = owner;
        return delegate;
    };
    SCNPhysicsContactDelegateImpl.prototype.physicsWorldDidBeginContact = function (world, contact) {
        var contactMask = contact.nodeA.physicsBody.categoryBitMask | contact.nodeB.physicsBody.categoryBitMask;
        if (contactMask === (0 | 1)) {
            if (contact.nodeA.physicsBody.categoryBitMask === 0) {
                contact.nodeB.removeFromParentNode();
            }
            else {
                contact.nodeA.removeFromParentNode();
            }
        }
    };
    SCNPhysicsContactDelegateImpl.prototype.physicsWorldDidEndContact = function (world, contact) {
    };
    SCNPhysicsContactDelegateImpl.prototype.physicsWorldDidUpdateContact = function (world, contact) {
    };
    return SCNPhysicsContactDelegateImpl;
}(NSObject));
SCNPhysicsContactDelegateImpl.ObjCProtocols = [SCNPhysicsContactDelegate];
exports.AR = AR;
