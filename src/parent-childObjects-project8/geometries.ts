import * as THREE from 'three';

let width = 5, height = 15;
let leftSmallOffset = 0.5;
let extrudeDepth = 2;
let upperHolesDiameter = 1.5, lowerHoleDiameter = 2;
let lowerHoleLocation = 3.5, upperHolesLocation = 3;

let child1Length = 8, child1Width = 4.5;
const lowerShapeLocation = -height + (width - leftSmallOffset)/2 + lowerHoleLocation;

const shape1 = new THREE.Shape();
shape1.moveTo((width - leftSmallOffset)/2, -height + (width-leftSmallOffset)/2);
shape1.lineTo((width - leftSmallOffset)/2, width - leftSmallOffset);
shape1.lineTo(0, 0);
shape1.lineTo((leftSmallOffset - width)/2, width - leftSmallOffset);
shape1.lineTo((leftSmallOffset - width)/2, -height + 3 * width/2 - leftSmallOffset/2);
shape1.lineTo((leftSmallOffset - width)/2 - leftSmallOffset, -height + (3 * width - leftSmallOffset)/2);
shape1.arc(width, 0, width, Math.PI, 3*Math.PI/2);

const shape2 = new THREE.Shape();
shape2.moveTo(child1Length - child1Width/2, -child1Width/2 + lowerShapeLocation);
shape2.lineTo(child1Length - child1Width/2, child1Width/2 + 0.8 + lowerShapeLocation);
shape2.lineTo(child1Length - child1Width/2 - 0.3, child1Width/2 + lowerShapeLocation);
shape2.lineTo(0, child1Width/2 + lowerShapeLocation);
shape2.arc(0, -child1Width/2, child1Width/2, Math.PI/2, 3 * Math.PI/2);
shape2.lineTo(child1Length - child1Width/2, -child1Width/2 + lowerShapeLocation);

const shape3 = new THREE.Shape();
shape3.moveTo((width - leftSmallOffset)/4, -upperHolesLocation - upperHolesDiameter/2 + (width - leftSmallOffset)/4);
shape3.lineTo((leftSmallOffset - width)/4, -upperHolesLocation - upperHolesDiameter/2 + (width - leftSmallOffset)/4);
shape3.arc(0, (leftSmallOffset - width)/4, (width - leftSmallOffset)/4, Math.PI/2, 3*Math.PI/2);
shape3.lineTo((width - leftSmallOffset)/4, -upperHolesLocation - upperHolesDiameter/2 - (width - leftSmallOffset)/4);
shape3.arc(0, (width - leftSmallOffset)/4, (width - leftSmallOffset)/4, 3*Math.PI/2, Math.PI/2);

const lowerHole = new THREE.Path();
lowerHole.absarc(0, -height + (width - leftSmallOffset)/2 + lowerHoleLocation, lowerHoleDiameter/2, 0, 2 * Math.PI);

const upperHoles = [ new THREE.Path(), new THREE.Path() ];
upperHoles[0].absarc((width - leftSmallOffset)/4, -upperHolesLocation - upperHolesDiameter/2, upperHolesDiameter/2, 0, 2 * Math.PI);
upperHoles[1].absarc((leftSmallOffset - width)/4, -upperHolesLocation - upperHolesDiameter/2, upperHolesDiameter/2, 0, 2 * Math.PI);

shape1.holes.push(lowerHole, ...upperHoles);
shape2.holes.push(lowerHole);
shape3.holes.push(...upperHoles);

export const extrudeShape1 = new THREE.ExtrudeGeometry(shape1, {
    bevelEnabled: false,
    depth: extrudeDepth,
    curveSegments: 100
});

export const extrudeShape2 = new THREE.ExtrudeGeometry(shape2, {
    bevelEnabled: false,
    depth: extrudeDepth,
    curveSegments: 100
});

export const extrudeShape3 = new THREE.ExtrudeGeometry(shape3, {
    bevelEnabled: false,
    depth: extrudeDepth,
    curveSegments: 100
});

extrudeShape2.translate(0, -lowerShapeLocation, extrudeDepth);
extrudeShape2.rotateZ(Math.PI/5);
extrudeShape2.translate(0, lowerShapeLocation, 0);

extrudeShape3.translate(0, 0, extrudeDepth);

export const shape1EdgesGeo = new THREE.EdgesGeometry(extrudeShape1, 2);
export const shape2EdgesGeo = new THREE.EdgesGeometry(extrudeShape2, 2);
export const shape3EdgesGeo = new THREE.EdgesGeometry(extrudeShape3, 2);