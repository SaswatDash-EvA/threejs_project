import * as THREE from 'three';
import { cutExtrudeRectangle } from './lineCutting';

export let extrudeRectangleLength = 5, extrudeRectangleWidth = 1, extrudeDepth = 2;
export let angle1 = Math.PI/4, angle2 = Math.PI/4;

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

const squareShape = createSegmentedShape(extrudeRectangleLength, extrudeRectangleWidth, 2);

export const extrudeRectangleGeometry = new THREE.ExtrudeGeometry(squareShape, {
    bevelEnabled: false,
    depth: extrudeDepth,
    steps: 100
});

extrudeRectangleGeometry.translate(-extrudeRectangleLength/2, -extrudeRectangleWidth/2, -extrudeDepth/2);
cutExtrudeRectangle(extrudeRectangleGeometry);

export const extrudeEdgeGeometry = new THREE.EdgesGeometry(extrudeRectangleGeometry);