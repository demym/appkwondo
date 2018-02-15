import { ContentView } from "tns-core-modules/ui/content-view";
import { EventData } from "tns-core-modules/data/observable";
import { Color } from "tns-core-modules/color";
export declare enum ARDebugLevel {
    NONE,
    WORLD_ORIGIN,
    FEATURE_POINTS,
    PHYSICS_SHAPES,
}
export interface ARNode {
    id: string;
    position: ARPosition;
    scale?: number | ARScale;
    rotation?: ARRotation;
    ios?: any;
    android?: any;
    remove(): void;
}
export interface ARAddOptions {
    position: ARPosition;
    scale?: number | ARScale;
    rotation?: ARRotation;
    mass?: number;
    onTap?: (model: ARNode) => void;
    onLongPress?: (model: ARNode) => void;
    onPan?: (model: ARNode) => void;
}
export declare type ARMaterialWrapMode = "Clamp" | "Repeat" | "ClampToBorder" | "Mirror";
export interface ARMaterialProperty {
    contents: string;
    wrapMode?: ARMaterialWrapMode;
}
export interface ARMaterial {
    diffuse?: string | Color | ARMaterialProperty;
    roughness?: string | Color | ARMaterialProperty;
    metalness?: string | Color | ARMaterialProperty;
    normal?: string | Color | ARMaterialProperty;
    specular?: string | Color | ARMaterialProperty;
    transparency?: number;
}
export interface ARAddGeometryOptions extends ARAddOptions {
    materials?: Array<string | Color | ARMaterial>;
}
export interface ARAddModelOptions extends ARAddOptions {
    name: string;
    childNodeName?: string;
}
export interface ARAddBoxOptions extends ARAddGeometryOptions {
    dimensions: number | ARDimensions;
    chamferRadius?: number;
}
export interface ARAddSphereOptions extends ARAddGeometryOptions {
    radius: number;
    segmentCount?: number;
}
export interface ARAddTextOptions extends ARAddGeometryOptions {
    text: string;
    depth?: number;
}
export interface ARAddTubeOptions extends ARAddGeometryOptions {
    innerRadius: number;
    outerRadius: number;
    height: number;
    radialSegmentCount?: number;
    heightSegmentCount?: number;
}
export interface ARPlane extends ARNode {
}
export interface AREventData extends EventData {
    object: AR;
}
export interface ARLoadedEventData extends AREventData {
    ios: any;
}
export interface ARPlaneTappedEventData extends AREventData {
    position: ARPosition;
}
export interface ARSceneTappedEventData extends AREventData {
    position: ARPosition;
}
export interface ARPlaneDetectedEventData extends AREventData {
    plane: ARPlane;
}
export declare class ARDimensions {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
}
export declare class ARScale extends ARDimensions {
}
export declare class ARPosition extends ARDimensions {
}
export declare class ARRotation {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(x: number, y: number, z: number, w: number);
}
export declare abstract class AR extends ContentView {
    static arLoadedEvent: string;
    static sceneTappedEvent: string;
    static planeDetectedEvent: string;
    static planeTappedEvent: string;
    planeMaterial: string;
    planeOpacity: number;
    detectPlanes: boolean;
    showStatistics: boolean;
    static isSupported(): boolean;
    abstract reset(): void;
    abstract addModel(options: ARAddModelOptions): Promise<ARNode>;
    abstract addBox(options: ARAddBoxOptions): Promise<ARNode>;
    abstract addSphere(options: ARAddSphereOptions): Promise<ARNode>;
    abstract addText(options: ARAddTextOptions): Promise<ARNode>;
    abstract addTube(options: ARAddTubeOptions): Promise<ARNode>;
    abstract togglePlaneDetection(on: boolean): void;
    abstract toggleStatistics(on: boolean): void;
    abstract togglePlaneVisibility(on: boolean): void;
    abstract setDebugLevel(to: ARDebugLevel): void;
}
