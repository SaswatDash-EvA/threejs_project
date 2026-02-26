import * as THREE from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/Addons.js';
import { cutPolygon, updateCutHeights, updateCutWidths } from './extrudeShapeCutting';

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
function createSegmentedShape(width: number, height: number, segments: number) {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    for (let i = 1; i <= segments; i++) {
      shape.lineTo((i / segments) * width, 0);
    }
    for (let i = 1; i <= segments; i++) {
      shape.lineTo(width, (i / segments) * height);
    }
    for (let i = segments - 1; i >= 0; i--) {
      shape.lineTo((i / segments) * width, height);
    }
    for (let i = segments - 1; i >= 0; i--) {
      shape.lineTo(0, (i / segments) * height);
    }
    return shape;
}
export let dynamicSquareWidth = 2, dynamicSquareHeight = 0.5;
export const extrudeSegments = 12;
const dynamicShape = createSegmentedShape(dynamicSquareWidth, dynamicSquareHeight, 8);

const dynamicRectangleGeometry = new THREE.ExtrudeGeometry(dynamicShape, {
    depth: extrudeDepth,
    bevelEnabled: false,
});
dynamicRectangleGeometry.translate(-dynamicSquareWidth/2, -dynamicSquareHeight/2, -extrudeDepth/2);

dynamicRectangleGeometry.deleteAttribute("normal");
dynamicRectangleGeometry.deleteAttribute("uv");
export const cleanDynamicGeometry = BufferGeometryUtils.mergeVertices(dynamicRectangleGeometry);
// const indexArray = cleanDynamicGeometry.index;
// if (indexArray) {
//     indexArray.array[20] = 9;
//     indexArray.array[23] = 6;
//     indexArray.array[8] = 5;
//     indexArray.array[11] = 2;
//     indexArray.needsUpdate = true;
// }

// console.log(cleanDynamicGeometry.attributes.position.array);
// console.log(cleanDynamicGeometry.index?.array)
export let activeGeometry = cleanDynamicGeometry;

updateCutWidths(0.3, 0.3);
updateCutHeights(0.3, 0.2);
cutPolygon();

export function updateActiveGeometry(index: number) {
    const geometries: Array<THREE.BufferGeometry> = [cleanTrapizoidGeometry, cleanCylinderGeometry, cleanDynamicGeometry];
    activeGeometry = geometries[index];
}