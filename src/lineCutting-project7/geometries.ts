import * as THREE from 'three';

export let extrudeRectangleLength = 5, extrudeRectangleWidth = 1, extrudeDepth = 2;
export let angle1 = Math.PI/4, angle2 = Math.PI/4;

const squareShape = new THREE.Shape();
squareShape.moveTo(extrudeRectangleLength/2, extrudeRectangleWidth/2);
squareShape.lineTo(extrudeRectangleLength/2, -extrudeRectangleWidth/2);
squareShape.lineTo(-extrudeRectangleLength/2, -extrudeRectangleWidth/2);
squareShape.lineTo(-extrudeRectangleLength/2, extrudeRectangleWidth/2);
squareShape.closePath();

export const extrudeRectangleGeometry = new THREE.ExtrudeGeometry(squareShape, {
    bevelEnabled: false,
    depth: extrudeDepth,
    steps: 100
});