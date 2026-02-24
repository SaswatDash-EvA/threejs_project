import * as THREE from "three";
import { backWallGeometry, capsuleGeometry, circleRadius, coneGeometry, cubeGeometry, cylinderGeometry, extrudedRectangleGeometry, floorGeometry, leftWallGeomtry, magicboxGeometry, pyramidGeometry, rectangleDepth, rectangleLength, rectangleWidth, sphereGeometry, torusGeometry } from "./geometries";
import { backWallMaterial, firstStandardMaterial, floorMaterial, leftWallMaterial } from "./materials";

export const floor = new THREE.Mesh(floorGeometry, floorMaterial);
export const leftWall = new THREE.Mesh(leftWallGeomtry, leftWallMaterial);
export const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
floor.receiveShadow = true;
leftWall.receiveShadow = true;
backWall.receiveShadow = true;

const sphere = new THREE.Mesh(sphereGeometry, firstStandardMaterial);
const cube = new THREE.Mesh(cubeGeometry, firstStandardMaterial);
const cylinder = new THREE.Mesh(cylinderGeometry, firstStandardMaterial);
const cone = new THREE.Mesh(coneGeometry, firstStandardMaterial);
const torus = new THREE.Mesh(torusGeometry, firstStandardMaterial);
const capsule = new THREE.Mesh(capsuleGeometry, firstStandardMaterial);
const pyramid = new THREE.Mesh(pyramidGeometry, firstStandardMaterial);
const magicbox = new THREE.Mesh(magicboxGeometry, firstStandardMaterial);
let extrudedRectangle = new THREE.Mesh(extrudedRectangleGeometry, firstStandardMaterial);

export const meshes: Array<THREE.Mesh> = [
	sphere,
	cube,
	cylinder,
	cone,
	torus,
	capsule,
	pyramid,
	magicbox,
	extrudedRectangle
];

export function updateExtrudedRectangle() {
    if (extrudedRectangle) {
        extrudedRectangle.geometry.dispose();
    }

    const rectangleShape = new THREE.Shape([
        new THREE.Vector2(rectangleLength/2, rectangleWidth/2),
        new THREE.Vector2(rectangleLength/2, -rectangleWidth/2),
        new THREE.Vector2(-rectangleLength/2, -rectangleWidth/2),
        new THREE.Vector2(-rectangleLength/2, rectangleWidth/2)
    ]);
    rectangleShape.closePath();

    const holes = [
        new THREE.Path(),
        new THREE.Path(),
        new THREE.Path(),
        new THREE.Path()
    ];

    holes[0].absarc(rectangleLength/4, rectangleWidth/4, circleRadius, 0, 2*Math.PI);
    holes[1].absarc(rectangleLength/4, -rectangleWidth/4, circleRadius, 0, 2*Math.PI);
    holes[2].absarc(-rectangleLength/4, -rectangleWidth/4, circleRadius, 0, 2*Math.PI);
    holes[3].absarc(-rectangleLength/4, rectangleWidth/4, circleRadius, 0, 2*Math.PI);

    rectangleShape.holes.push(...holes);

    const newGeometry = new THREE.ExtrudeGeometry(rectangleShape, {
        depth: rectangleDepth,
        bevelEnabled: false
    });

    newGeometry.translate(-0.3, 0.3, 0.3);
    newGeometry.rotateY(Math.PI/2);

    extrudedRectangle.geometry = newGeometry;
}