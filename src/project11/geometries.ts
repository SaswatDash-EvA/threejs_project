import * as THREE from 'three';
import { beadH, beadThickness, beadW, frameH, frameH1, frameW, frameW1, windowHeight, windowWidth } from './dynamicVariables';
import { cutBy45135, heightMajor90Cut } from './polygonCutting';

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
const topLeft = new THREE.Vector3(-windowWidth/2, windowHeight/2), topRight = new THREE.Vector3(windowWidth/2, windowHeight/2);
const bottomLeft = new THREE.Vector3(-windowWidth/2, -windowHeight/2), bottomRight = new THREE.Vector3(windowWidth/2, -windowHeight/2);
const windowBorderLines = [
    new THREE.LineCurve3(bottomLeft, bottomRight), // Bottom
    new THREE.LineCurve3(bottomRight, topRight), // Right
    new THREE.LineCurve3(topRight, topLeft), // Top
    new THREE.LineCurve3(topLeft, bottomLeft), // Left
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

export const frameEdgeGeometries: Array<THREE.EdgesGeometry> = frameGeometries.map<THREE.EdgesGeometry>((geometry) => {
    return new THREE.EdgesGeometry(geometry);
});
export const beadEdgeGeometries: Array<THREE.EdgesGeometry> = beadGeometries.map<THREE.EdgesGeometry>((geometry) => {
    return new THREE.EdgesGeometry(geometry, 4);
});