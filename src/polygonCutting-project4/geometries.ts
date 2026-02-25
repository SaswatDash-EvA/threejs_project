import * as THREE from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/Addons.js';
import { cutPolygon } from './extrudeShapeCutting';

export let extrudeRectangleLength = 0.5, extrudeRectangleWidth = 0.5, extrudeDepth = 2;
export let angle1 = Math.PI/4, angle2 = Math.PI/4;

const squareShape = new THREE.Shape();
squareShape.moveTo(extrudeRectangleLength/2, extrudeRectangleWidth/2);
squareShape.lineTo(extrudeRectangleLength/2, -extrudeRectangleWidth/2);
squareShape.lineTo(-extrudeRectangleLength/2, -extrudeRectangleWidth/2);
squareShape.lineTo(-extrudeRectangleLength/2, extrudeRectangleWidth/2);
squareShape.closePath();

export let extrudeCircleMajorRadius = 0.25;
const circularShape = new THREE.Shape();
circularShape.absarc(0, 0, extrudeCircleMajorRadius, 0, 2 * Math.PI);

const trapizoidGeometry = new THREE.ExtrudeGeometry(squareShape, {
    bevelEnabled: false,
    curveSegments: 1,
    depth: extrudeDepth,
});
trapizoidGeometry.translate(0, 0, -extrudeDepth/2);

const cylinderExtrudeGeometry = new THREE.ExtrudeGeometry(circularShape, {
    bevelEnabled: false,
    depth: extrudeDepth,
    curveSegments: 256
});
cylinderExtrudeGeometry.translate(0, 0, -extrudeDepth/2);

trapizoidGeometry.deleteAttribute("normal");
trapizoidGeometry.deleteAttribute("uv");
export const cleanTrapizoidGeometry = BufferGeometryUtils.mergeVertices(trapizoidGeometry);

cylinderExtrudeGeometry.deleteAttribute("normal");
cylinderExtrudeGeometry.deleteAttribute("uv");
export const cleanCylinderGeometry = BufferGeometryUtils.mergeVertices(cylinderExtrudeGeometry);

// Dynamic Rectangle cut with V shape
export let dynamicSquareWidth = 0.5, dynamicSquareHeight = 0.5;
const dynamicShape = new THREE.Shape();
dynamicShape.moveTo(dynamicSquareWidth/2, dynamicSquareWidth/2);
dynamicShape.lineTo(dynamicSquareWidth/2, 0);
dynamicShape.lineTo(dynamicSquareWidth/2, -dynamicSquareWidth/2);
dynamicShape.lineTo(-dynamicSquareWidth/2, -dynamicSquareHeight/2);
dynamicShape.lineTo(-dynamicSquareHeight/2, 0);
dynamicShape.lineTo(-dynamicSquareWidth/2, dynamicSquareHeight/2);

const dynamicRectangleGeometry = new THREE.ExtrudeGeometry(dynamicShape, {
    depth: extrudeDepth,
    bevelEnabled: false,
});
dynamicRectangleGeometry.translate(0, 0, -extrudeDepth/2);

dynamicRectangleGeometry.deleteAttribute("normal");
dynamicRectangleGeometry.deleteAttribute("uv");
export const cleanDynamicGeometry = BufferGeometryUtils.mergeVertices(dynamicRectangleGeometry);
const indexArray = cleanDynamicGeometry.index;
if (indexArray) {
    indexArray.array[20] = 9;
    indexArray.array[23] = 6;
    indexArray.array[8] = 5;
    indexArray.array[11] = 2;
    indexArray.needsUpdate = true;
}

console.log(cleanDynamicGeometry.attributes.position.array);
console.log(cleanDynamicGeometry.index?.array)
export let activeGeometry = cleanDynamicGeometry;

cutPolygon();

export function updateActiveGeometry(index: number) {
    const geometries: Array<THREE.BufferGeometry> = [cleanTrapizoidGeometry, cleanCylinderGeometry, cleanDynamicGeometry];
    activeGeometry = geometries[index];
}