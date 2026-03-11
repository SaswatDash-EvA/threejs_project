import * as THREE from 'three';
import { frameH, frameH1, frameW, frameW1, windowHeight, windowWidth } from './dynamicVariables';

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

const windowBorderLines = [
    new THREE.LineCurve3(new THREE.Vector3(-windowWidth/2, -windowHeight/2), new THREE.Vector3(windowWidth/2, -windowHeight/2)), // Bottom
    new THREE.LineCurve3(new THREE.Vector3(windowWidth/2, -windowHeight/2), new THREE.Vector3(windowWidth/2, windowHeight/2)), // Right
    new THREE.LineCurve3(new THREE.Vector3(windowWidth/2, windowHeight/2), new THREE.Vector3(-windowWidth/2, windowHeight/2)), // Top
    new THREE.LineCurve3(new THREE.Vector3(-windowWidth/2, windowHeight/2), new THREE.Vector3(-windowWidth/2, -windowHeight/2)), // Left
];

// Retrun a new extrude geometry for each LineCurve3
export const frameGeometries: Array<THREE.ExtrudeGeometry> = windowBorderLines.map<THREE.ExtrudeGeometry>((line) => {
    const extrudePath = new THREE.CurvePath<THREE.Vector3>();
    extrudePath.add(line);
    return new THREE.ExtrudeGeometry(frameShape, {
        extrudePath,
        bevelEnabled: false, 
        steps: 100
    });
});

export const frameEdgeGeometries: Array<THREE.EdgesGeometry> = frameGeometries.map<THREE.EdgesGeometry>((geometry) => {
    return new THREE.EdgesGeometry(geometry);
})