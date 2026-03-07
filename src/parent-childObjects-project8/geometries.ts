import * as THREE from 'three';

let width = 5, height = 15;
let leftSmallOffset = 0.5;
let extrudeDepth = 2;
let upperHolesDiameter = 1.5, lowerHoleDiameter = 2;
let lowerHoleLocation = 3.5, upperHolesLocation = 1.5;

const shape1 = new THREE.Shape();
shape1.moveTo((width - leftSmallOffset)/2, -height + (width-leftSmallOffset)/2);
shape1.lineTo((width - leftSmallOffset)/2, width - leftSmallOffset);
shape1.lineTo(0, 0);
shape1.lineTo((leftSmallOffset - width)/2, width - leftSmallOffset);
shape1.lineTo((leftSmallOffset - width)/2, -height + 3 * width/2 - leftSmallOffset/2);
shape1.lineTo((leftSmallOffset - width)/2 - leftSmallOffset, -height + (3 * width - leftSmallOffset)/2);
shape1.arc(width, 0, width, Math.PI, 3*Math.PI/2);

const lowerHole = new THREE.Path();
lowerHole.absarc(0, -height + (width - leftSmallOffset)/2 + lowerHoleLocation, lowerHoleDiameter/2, 0, 2 * Math.PI);

const upperHoles = [ new THREE.Path(), new THREE.Path() ];
upperHoles[0].absarc((width - leftSmallOffset)/4, -upperHolesLocation - upperHolesDiameter/2, upperHolesDiameter/2, 0, 2 * Math.PI);
upperHoles[1].absarc((leftSmallOffset - width)/4, -upperHolesLocation - upperHolesDiameter/2, upperHolesDiameter/2, 0, 2 * Math.PI);

shape1.holes.push(lowerHole, ...upperHoles);

export const extrudeShape1 = new THREE.ExtrudeGeometry(shape1, {
    bevelEnabled: false,
    depth: extrudeDepth,
    curveSegments: 100
});

export const shape1EdgesGeo = new THREE.EdgesGeometry(extrudeShape1, 2);