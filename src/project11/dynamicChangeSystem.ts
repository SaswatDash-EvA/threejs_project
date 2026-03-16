import * as THREE from 'three';
import { equal, mat4, or, positionLocal, select, uniform, vec3 } from 'three/tsl';
import { frameW } from './dynamicVariables';

const mirrorProjectionMatrix = mat4(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, -1, frameW,
    0, 0, 0, 1
);

const oppositeSideMatrix = mat4(
    -1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
)

// const scaleX = 1, scaleY = 1, boundingRadius = midHoleRadius;
// const dynamicVars = uniform(new THREE.Vector3(scaleX, scaleY, boundingRadius));
const positionVar = uniform(0);
const isBackSide = uniform(false);
// Sides array order: left, right, top, bottom
const sides = uniform(new THREE.Vector4(0, 1, 0, 0));

let finalProjectionMatrix = select(equal(sides.value.x, 1), oppositeSideMatrix.mul(select(isBackSide, mirrorProjectionMatrix, mat4())), select(isBackSide, mirrorProjectionMatrix, mat4()));
const positionVector = select(or(equal(sides.value.z, 1), equal(sides.value.w, 1)), vec3(positionVar, 0, 0), vec3(0, positionVar, 0));

export const positionShader = finalProjectionMatrix.mul(positionLocal).add(positionVector);

export function switchToTop() {
    sides.value.set(0, 0, 1, 0);
}

export function switchToLeft() {
    sides.value.set(1, 0, 0, 0);
}

export function swithToBottom() {
    sides.value.set(0, 0, 0, 1);
}

export function swithToRight() {
    sides.value.set(0, 1, 0, 0);
}