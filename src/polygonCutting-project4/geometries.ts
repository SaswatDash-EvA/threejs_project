import * as THREE from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/Addons.js';
import { cutPolygon } from './boxCutting';

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

export let activeGeometry = cleanCylinderGeometry;

cutPolygon();

export function updateActiveGeometry() {
    activeGeometry = activeGeometry === cleanCylinderGeometry? cleanTrapizoidGeometry : cleanCylinderGeometry;
}