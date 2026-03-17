import * as THREE from 'three';
import { uniform, vec3, mat4, select, equal, or, length, positionLocal, vec4 } from 'three/tsl';

import { handleOriginX, handleOriginY, midHoleRadius } from './handleVariables';
import { frameH, frameW, windowHeight } from './dynamicVariables';

// Mirror across z = frameW / 2
const mirrorProjectionMatrix = mat4(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, -1, frameW,
    0, 0, 0, 1
);

// Right side flip
const rightSideMatrix = mat4(
    -1, 0, 0, 0,
     0, 1, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 1
);

// Bottom flip
const bottomSideMatrix = mat4(
     1, 0, 0, 0,
     0, -1, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 1
);

// Rotation (Z -90°)
const rotateRight = mat4(
    new THREE.Matrix4().makeRotationZ(-Math.PI/2)
);

const dynamicVars = uniform(new THREE.Vector3(1, 1, midHoleRadius + 1));
const positionVar = uniform(0);
const isBackSide = uniform(false);

// (left, right, top, bottom)
const sides = uniform(new THREE.Vector4(1, 0, 0, 0));

const isTopOrBottom = or(
    equal(sides.value.z, 1),
    equal(sides.value.w, 1)
);

const rotatedPosition = select(
    isTopOrBottom,
    rotateRight.mul(positionLocal),
    positionLocal
);

// Apply bottom flip if needed
const orientedPosition = select(
    equal(sides.value.w, 1),
    rotatedPosition.mul(bottomSideMatrix),
    rotatedPosition
);
const currentOrigin = select(
    isTopOrBottom,
    vec3(0, (windowHeight - frameH) / 2, 0),
    vec3(handleOriginX, handleOriginY, 0)
);

const centered = orientedPosition.sub(currentOrigin);

const distXY = length(centered.xy);

const scaled = vec3(
    centered.x.mul(dynamicVars.value.x),
    centered.y.mul(dynamicVars.value.y),
    centered.z
).add(currentOrigin);

const scaledPosition = select(
    distXY.greaterThan(dynamicVars.value.z),
    scaled,
    orientedPosition
);

const finalProjectionMatrix = select(
    equal(sides.value.x, 1),
    select(isBackSide, mirrorProjectionMatrix, mat4()),
    rightSideMatrix.mul(
        select(isBackSide, mirrorProjectionMatrix, mat4())
    )
);

const positionVector = select(
    isTopOrBottom,
    vec3(positionVar, 0, 0),
    vec3(0, positionVar, 0)
);

const transformedPosition = finalProjectionMatrix.mul(vec4(scaledPosition, 1)).xyz;

export const positionShader = transformedPosition.add(positionVector);

export function switchToTop() {
    sides.value.set(0, 0, 1, 0);
}

export function switchToLeft() {
    sides.value.set(1, 0, 0, 0);
}

export function switchToBottom() {
    sides.value.set(0, 0, 0, 1);
}

export function switchToRight() {
    sides.value.set(0, 1, 0, 0);
}

export function changeScale(x: number = dynamicVars.value.x, y: number = dynamicVars.value.y) {
    dynamicVars.value.x = x;
    dynamicVars.value.y = y;
}

export function setBackSide(set: boolean = true) {
    isBackSide.value = set;
}