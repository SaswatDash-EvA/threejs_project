import * as THREE from 'three';
import { beadH, beadThickness, beadW, frameH, frameH1, frameW, frameW1, GHA, GVA, horizontalLineLength, verticalLineLength, windowHeight, windowWidth } from './dynamicVariables';
import { cutBy45135, heightMajor90Cut } from './polygonCutting';
import { Line3, type Point } from './customObjects';

// Step-1: Create frame and bead shapes
const frameShape = new THREE.Shape([
    // Local coordinates of points of frame cross section
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, frameH),
    new THREE.Vector2(-frameW + frameW1, frameH),
    new THREE.Vector2(-frameW + frameW1, frameH1),
    new THREE.Vector2(-frameW, frameH1),
    new THREE.Vector2(-frameW, 0),
    new THREE.Vector2(0, 0)
]);

const beadShape = new THREE.Shape();
beadShape.moveTo(-frameW, frameH1)
    .lineTo(-frameW, beadH - beadW + frameH1)
    .arc(beadW, 0, beadW, Math.PI, Math.PI/2, true)
    .lineTo(beadW - frameW, beadH - beadThickness + frameH1)
    .arc(0, -beadW + beadThickness, beadW - beadThickness, Math.PI/2, Math.PI)
    .lineTo(beadThickness - frameW, 0 + frameH1)
    .lineTo(-frameW, frameH1);

// Step-2: Create a rectangle path to extrude
const topLeft: Required<Point> = {x: -windowWidth/2, y: windowHeight/2, z: 0}, topRight: Required<Point> = {x: windowWidth/2, y: windowHeight/2, z: 0};
const bottomLeft: Required<Point> = {x: -windowWidth/2, y: -windowHeight/2, z: 0}, bottomRight: Required<Point> = {x: windowWidth/2, y: -windowHeight/2, z: 0};
const windowBorderLines = [
    new Line3(bottomLeft, bottomRight).getLineCurve(), // Bottom
    new Line3(bottomRight, topRight).getLineCurve(), // Right
    new Line3(topRight, topLeft).getLineCurve(), // Top
    new Line3(topLeft, bottomLeft).getLineCurve(), // Left
];

// Step-3: extrude along the rectangle
// Retrun a new extruded frame geometry for each LineCurve3
export const frameGeometries: Array<THREE.ExtrudeGeometry> = windowBorderLines.map<THREE.ExtrudeGeometry>((line, index) => {
    const extrudePath = new THREE.CurvePath<THREE.Vector3>();
    extrudePath.add(line);
    const geometry =  new THREE.ExtrudeGeometry(frameShape, {
        extrudePath,
        bevelEnabled: false, 
        steps: 1
    });
    cutBy45135(geometry, index + 1);
    console.log(geometry);    
    return geometry;
});

export const beadGeometries: Array<THREE.ExtrudeGeometry> = windowBorderLines.map<THREE.ExtrudeGeometry>((line, index) => {
    const extrudePath = new THREE.CurvePath<THREE.Vector3>();
    extrudePath.add(line);
    const geometry =  new THREE.ExtrudeGeometry(beadShape, {
        extrudePath,
        bevelEnabled: false, 
        steps: 1
    });
    heightMajor90Cut(geometry, index + 1);
    return geometry;
});

// Geometry for glass
export const glassGeometry = new THREE.BoxGeometry(windowWidth - 2 * frameH + GHA, windowHeight - 2 * frameH + GVA, frameW1 - beadW);
glassGeometry.translate(0, 0, frameW - frameW1 + (frameW1 - beadW)/2);

export const frameEdgeGeometries: Array<THREE.EdgesGeometry> = frameGeometries.map<THREE.EdgesGeometry>((geometry) => {
    return new THREE.EdgesGeometry(geometry);
});
export const beadEdgeGeometries: Array<THREE.EdgesGeometry> = beadGeometries.map<THREE.EdgesGeometry>((geometry) => {
    return new THREE.EdgesGeometry(geometry, 4);
});

// + sign on the window to show it is fixed
const lineEnds = new Float32Array([
    -horizontalLineLength/2, 0, frameW - beadW, horizontalLineLength/2, 0, frameW - beadW,
    0, verticalLineLength/2, frameW - beadW, 0, -verticalLineLength/2, frameW - beadW
]);
export const plusLinesGeometry = new THREE.BufferGeometry();
plusLinesGeometry.setAttribute('position', new THREE.BufferAttribute(lineEnds, 3));