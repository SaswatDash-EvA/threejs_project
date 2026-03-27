import * as THREE from 'three';
import { uniform, vec3, mat4, select, equal, or, length, positionLocal, normalLocal } from 'three/tsl';

import { handleOrigin, midHoleRadius } from './handleVariables';
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

// (left, right, top, bottom) in order
const sides = uniform(0);

const isTopOrBottom = or(
    equal(sides, 2),
    equal(sides, 3)
);

const currentOrigin = select(
    isTopOrBottom,
    select(equal(sides, 2), vec3(0, (windowHeight - frameH) / 2, 0), vec3(0, -(windowHeight - frameH)/2, 0)),
    vec3(handleOrigin.x, handleOrigin.y, 0)
);

const rotatedPosition = select(
    isTopOrBottom,
    rotateRight.mul(positionLocal.sub(vec3(handleOrigin.x, handleOrigin.y, 0))),
    positionLocal.sub(vec3(handleOrigin.x, handleOrigin.y, 0))
);

// Apply bottom flip if needed
const orientedPosition = select(
    equal(sides, 3),
    rotatedPosition.mul(bottomSideMatrix),
    rotatedPosition
);

const distXYFromOrigin = length(orientedPosition.xy);

const scaledOutside = vec3(
    orientedPosition.x.mul(select(isTopOrBottom, dynamicVars.y, dynamicVars.x)),
    orientedPosition.y.mul(select(isTopOrBottom, dynamicVars.x, dynamicVars.y)),
    orientedPosition.z
).add(currentOrigin);

const scaledInside = vec3(
    orientedPosition.x.mul(select(dynamicVars.x.lessThan(dynamicVars.y), dynamicVars.x, dynamicVars.y)),
    orientedPosition.y.mul(select(dynamicVars.x.lessThan(dynamicVars.y), dynamicVars.x, dynamicVars.y)),
    orientedPosition.z
).add(currentOrigin);

const scaledPosition = select(
    distXYFromOrigin.greaterThan(dynamicVars.z),
    scaledOutside,
    scaledInside
);

const finalProjectionMatrix = select(
    equal(sides, 0),
    select(isBackSide, mirrorProjectionMatrix, mat4()),
    select(isTopOrBottom, select(isBackSide, mirrorProjectionMatrix, mat4()), rightSideMatrix.mul(
        select(isBackSide, mirrorProjectionMatrix, mat4())
    ))
);

const positionVector = select(
    isTopOrBottom,
    vec3(positionVar, 0, 0),
    vec3(0, positionVar, 0)
);

const transformedPosition =
    finalProjectionMatrix
        .mul(scaledPosition.toVec4())
        .xyz;

export const handlePositionShader = transformedPosition.add(positionVector);

// Change handle normals when changed sides
// const backNormal = select(isBackSide, normalLocal.mul(vec3(1, 1, -1)), normalLocal);

export const rotatedNormal = select(
    isTopOrBottom, 
    select(equal(sides, 2), rotateRight.mul(normalLocal), rotateRight.mul(normalLocal).mul(vec3(1, -1, 1))), 
    select(equal(sides, 0), normalLocal, normalLocal.mul(vec3(-1, 1, 1))));

function switchToTop() {
    sides.value = 2;
}

function switchToLeft() {
    sides.value = 0;
}

function switchToBottom() {
    sides.value = 3;
}

function switchToRight() {
    sides.value = 1;
}

export function switchToSide(index: number) {
    switch(index) {
        case 0:
            switchToLeft();
            break;
        case 1:
            switchToRight();
            break;
        case 2:
            switchToTop();
            break;
        case 3:
            switchToBottom();
            break;
        default:
            switchToLeft();
            break;
    }
}

export function changeScale(x: number = dynamicVars.value.x, y: number = dynamicVars.value.y) {
    dynamicVars.value.x = x;
    dynamicVars.value.y = y;
}

export function setBackSide(set: boolean = true) {
    isBackSide.value = set;
}

export function setHandlePositionOnFrame(position: number) {
    if (position > windowHeight/2) {
        positionVar.value = windowHeight/2;
        return windowHeight/2;
    }
    if (position < -windowHeight/2) {
        positionVar.value = -windowHeight/2;
        return -windowHeight/2;
    }
    positionVar.value = position;
    return position;
}