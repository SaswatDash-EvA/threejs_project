import * as THREE from "three";

// Room geometry
export const floorGeometry = new THREE.PlaneGeometry(1, 1);
export const leftWallGeomtry = new THREE.PlaneGeometry(1, 0.6);
export const backWallGeometry = new THREE.PlaneGeometry(1, 0.6);
floorGeometry.rotateX((-1 * Math.PI) / 2);
leftWallGeomtry.rotateY(Math.PI / 2);
floorGeometry.translate(0.5, 0, 0.5);
backWallGeometry.translate(0.5, 0.3, 0);
leftWallGeomtry.translate(0, 0.3, 0.5);

export let rectangleLength = 0.5, rectangleWidth = 0.4, rectangleDepth = 0.2;
export let circleRadius = 0.06;
export function updateRectangleLength(num: number) { rectangleLength = num; }
export function updateRectangleWidth(num: number) { rectangleWidth = num; }
export function updateRectangleDepth(num: number) { rectangleDepth = num; }
export function updateCircleRadius(num: number) { circleRadius = num; }
const rectangleShape = new THREE.Shape([
    new THREE.Vector2(rectangleLength/2, rectangleWidth/2),
    new THREE.Vector2(rectangleLength/2, -rectangleWidth/2),
    new THREE.Vector2(-rectangleLength/2, -rectangleWidth/2),
    new THREE.Vector2(-rectangleLength/2, rectangleWidth/2)
]);
rectangleShape.closePath();
const holes = [ new THREE.Path(), new THREE.Path(), new THREE.Path(), new THREE.Path() ];
holes[0].absarc(rectangleLength/4, rectangleWidth/4, circleRadius, 0, 2*Math.PI );
holes[1].absarc(rectangleLength/4, -rectangleWidth/4, circleRadius, 0, 2*Math.PI );
holes[2].absarc(-rectangleLength/4, -rectangleWidth/4, circleRadius, 0, 2*Math.PI );
holes[3].absarc(-rectangleLength/4, rectangleWidth/4, circleRadius, 0, 2*Math.PI );
rectangleShape.holes.push(...holes);

// 9 Different shapes
const sphereGeometry = new THREE.SphereGeometry(0.2, 64, 64);
const cubeGeometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.4);
const coneGeometry = new THREE.ConeGeometry(0.2, 0.3, 64, 64);
const torusGeometry = new THREE.TorusGeometry(0.2, 0.08);
const capsuleGeometry = new THREE.CapsuleGeometry(0.1, 0.2, 64, 64, 64);
const pyramidGeometry = new THREE.TetrahedronGeometry(0.2);
const magicboxGeometry = new THREE.IcosahedronGeometry(0.15);
const extrudedRectangleGeometry = new THREE.ExtrudeGeometry(rectangleShape, {
    depth: rectangleDepth,
    bevelEnabled: false
});

sphereGeometry.translate(0.35, 0.35, 0.35);
cubeGeometry.translate(0.5, 0.5, 0.5);
cylinderGeometry.translate(0.5, 0.5, 0.5);
coneGeometry.translate(0.5, 0.3, 0.5);
torusGeometry.translate(0.4, 0.4, 0.3);
capsuleGeometry.translate(0.4, 0.3, 0.3);
pyramidGeometry.translate(0.3, 0.3, 0.3);
magicboxGeometry.translate(0.25, 0.25, 0.25);
extrudedRectangleGeometry.translate(-0.3, 0.3, 0.3);
extrudedRectangleGeometry.rotateY(Math.PI/2);

export { sphereGeometry, cubeGeometry, cylinderGeometry, coneGeometry, torusGeometry, capsuleGeometry, pyramidGeometry, magicboxGeometry, extrudedRectangleGeometry };