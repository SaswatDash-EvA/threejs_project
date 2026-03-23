import * as THREE from 'three';
import { backPlateHeight, backPlateMidRadius, backPlateSideRadius, backPlateTopBottomFaceLength, cockSpurHandleCurveHeight, cockSpurHandleDepth, cockSpurHandleHeight, cockSpurHandleWidth, cockSpurHeadRadius, cockSpurHolderWidth, handleOrigin, midHoleRadius, topBottomHoleRadius } from './handleVariables';
import { frameW } from './dynamicVariables';

// Handle backplates shape
const backPlateShape = new THREE.Shape()
    .moveTo(handleOrigin.x - backPlateMidRadius - backPlateTopBottomFaceLength, handleOrigin.y + backPlateHeight/2)
    .lineTo(handleOrigin.x - backPlateMidRadius - backPlateTopBottomFaceLength, handleOrigin.y - backPlateHeight/2)
    .lineTo(handleOrigin.x - backPlateMidRadius, handleOrigin.y - backPlateHeight/2)
    .arc(backPlateMidRadius, 0, backPlateMidRadius, Math.PI, Math.PI/2, true)
    .arc(0, backPlateSideRadius, backPlateSideRadius, 3 * Math.PI/2, Math.PI/2)
    .arc(0, backPlateMidRadius, backPlateMidRadius, 3 * Math.PI/2, Math.PI, true)
    .lineTo(handleOrigin.x - backPlateMidRadius - backPlateTopBottomFaceLength, handleOrigin.y + backPlateHeight/2);

const midHole = new THREE.Path().absarc(handleOrigin.x, handleOrigin.y, midHoleRadius, 0, 2 * Math.PI);
const topBottomHoles = [
    new THREE.Path().absarc(handleOrigin.x - backPlateMidRadius - backPlateTopBottomFaceLength/2, handleOrigin.y + backPlateSideRadius + backPlateMidRadius/2, topBottomHoleRadius, 0, 2 * Math.PI),
    new THREE.Path().absarc(handleOrigin.x - backPlateMidRadius - backPlateTopBottomFaceLength/2, handleOrigin.y - backPlateSideRadius - backPlateMidRadius/2, topBottomHoleRadius, 0, 2 * Math.PI)
]
backPlateShape.holes.push(midHole, ...topBottomHoles);

// Handle shape
const handleShape = new THREE.Shape()
    .moveTo(handleOrigin.x - cockSpurHeadRadius * Math.cos(Math.PI/6), handleOrigin.y + cockSpurHeadRadius * Math.sin(Math.PI/6))
    .absarc(handleOrigin.x, handleOrigin.y, cockSpurHeadRadius, 5 * Math.PI/6, 0, true)
    .lineTo(handleOrigin.x + cockSpurHeadRadius, handleOrigin.y - cockSpurHeadRadius * Math.sin(Math.PI/6) - (cockSpurHeadRadius * (1 + Math.cos(Math.PI/6)) - cockSpurHolderWidth) * Math.tan(7 * Math.PI/24))
    .lineTo(handleOrigin.x + cockSpurHeadRadius - cockSpurHolderWidth, handleOrigin.y - cockSpurHeadRadius * Math.sin(Math.PI/6) - (cockSpurHeadRadius * (1 + Math.cos(Math.PI/6)) - cockSpurHolderWidth) * Math.tan(7 * Math.PI/24))
    // .arc(-cockSpurHolderWidth/2, 0, cockSpurHolderWidth/2, 0, Math.PI, true)
    // .lineTo(handleOriginX + cockSpurHeadRadius - cockSpurHolderWidth, handleOrigin.y - cockSpurHeadRadius * Math.sin(Math.PI/6) - (cockSpurHeadRadius * (1 + Math.cos(Math.PI/6)) - cockSpurHolderWidth) * Math.tan(7 * Math.PI/24))
    .arc(-(cockSpurHeadRadius * (1 + Math.cos(Math.PI/6)) - cockSpurHolderWidth) * Math.tan(7 * Math.PI/24) / Math.sin(5 * Math.PI/12), 0, (cockSpurHeadRadius * (1 + Math.cos(Math.PI/6)) - cockSpurHolderWidth) * Math.tan(7 * Math.PI/24) / Math.sin(5 * Math.PI/12), 0, 5 * Math.PI/12)
    .lineTo(handleOrigin.x - cockSpurHeadRadius * Math.cos(Math.PI/6) - cockSpurHandleWidth + cockSpurHeadRadius *(1 + Math.cos(Math.PI/6)), handleOrigin.y - 9)
    .arc(0, 8, 8, 3 * Math.PI/2, 7 * Math.PI/12, true)
    .lineTo(handleOrigin.x - cockSpurHeadRadius * Math.cos(Math.PI/6), handleOrigin.y + cockSpurHeadRadius * Math.sin(Math.PI/6));

const bezierHandleCurveShape = new THREE.Shape()
    .moveTo(0, 0)
    .bezierCurveTo(cockSpurHandleHeight/8, 0, cockSpurHandleHeight/8, cockSpurHandleCurveHeight - cockSpurHandleDepth, cockSpurHandleHeight/4, cockSpurHandleCurveHeight - cockSpurHandleDepth)
    .lineTo(cockSpurHandleHeight/4 + cockSpurHandleDepth, cockSpurHandleCurveHeight - cockSpurHandleDepth)
    .lineTo(cockSpurHandleHeight/4 + cockSpurHandleDepth, cockSpurHandleCurveHeight - 2 * cockSpurHandleDepth)
    .bezierCurveTo(cockSpurHandleHeight/8 + cockSpurHandleDepth, cockSpurHandleCurveHeight - 2 * cockSpurHandleDepth, cockSpurHandleHeight/8 + cockSpurHandleDepth, -cockSpurHandleDepth, cockSpurHandleDepth, -cockSpurHandleDepth)
    .lineTo(0, -cockSpurHandleDepth)
    .lineTo(0, 0);

const handleHolderShape = new THREE.Shape()
    .moveTo(handleOrigin.x + cockSpurHeadRadius, handleOrigin.y - cockSpurHeadRadius * Math.sin(Math.PI/6) - (cockSpurHeadRadius * (1 + Math.cos(Math.PI/6)) - cockSpurHolderWidth) * Math.tan(7 * Math.PI/24) - cockSpurHandleHeight/4 - cockSpurHandleDepth)
    .lineTo(handleOrigin.x + cockSpurHeadRadius, handleOrigin.y - cockSpurHandleHeight + cockSpurHeadRadius + cockSpurHolderWidth)
    .arc(-cockSpurHolderWidth/2, 0, cockSpurHolderWidth/2, 0, Math.PI, true)
    .lineTo(handleOrigin.x + cockSpurHeadRadius - cockSpurHolderWidth, handleOrigin.y - cockSpurHeadRadius * Math.sin(Math.PI/6) - (cockSpurHeadRadius * (1 + Math.cos(Math.PI/6)) - cockSpurHolderWidth) * Math.tan(7 * Math.PI/24) - cockSpurHandleHeight/4 - cockSpurHandleDepth)
    .lineTo(handleOrigin.x + cockSpurHeadRadius - cockSpurHolderWidth, handleOrigin.y - cockSpurHeadRadius * Math.sin(Math.PI/6) - (cockSpurHeadRadius * (1 + Math.cos(Math.PI/6)) - cockSpurHolderWidth) * Math.tan(7 * Math.PI/24) - cockSpurHandleHeight/4 - cockSpurHandleDepth);

const handleMidHole = new THREE.Path().absarc(handleOrigin.x, handleOrigin.y, midHoleRadius, 0, 2 * Math.PI, true);
handleShape.holes.push(handleMidHole);

// Add midhole cylinder
const midHoleCylinderShape = new THREE.Shape().absarc(handleOrigin.x, handleOrigin.y, midHoleRadius, 0, 2 * Math.PI);

export const backPlateGeometry = new THREE.ExtrudeGeometry(backPlateShape, {
    bevelEnabled: false,
    depth: 4,
    curveSegments: 64
});
backPlateGeometry.translate(0, 0, frameW);

export const handleGeometry = new THREE.ExtrudeGeometry(handleShape, {
    bevelEnabled: false,
    depth: cockSpurHandleDepth,
    curveSegments: 64
});
handleGeometry.translate(0, 0, frameW + 6);

export const handleCurveGeometry = new THREE.ExtrudeGeometry(bezierHandleCurveShape, {
    bevelEnabled: false,
    depth: cockSpurHolderWidth,
    curveSegments: 64
});

export const handleHolderGeometry = new THREE.ExtrudeGeometry(handleHolderShape, {
    bevelEnabled: false,
    depth: cockSpurHandleDepth,
    curveSegments: 64
});
handleHolderGeometry.translate(0, 0, frameW + 6 + cockSpurHandleCurveHeight - cockSpurHandleDepth)

handleCurveGeometry.rotateY(-Math.PI/2).rotateX(Math.PI/2)
    .translate(handleOrigin.x + cockSpurHeadRadius, handleOrigin.y - cockSpurHeadRadius * Math.sin(Math.PI/6) - (cockSpurHeadRadius * (1 + Math.cos(Math.PI/6)) - cockSpurHolderWidth) * Math.tan(7 * Math.PI/24), frameW + cockSpurHandleDepth + 6);

export const midHoleCylinderGeometry = new THREE.ExtrudeGeometry(midHoleCylinderShape,  {
    bevelEnabled: false,
    depth: cockSpurHandleDepth + 6,
    curveSegments: 64
}).translate(0, 0, frameW);

export const cylinderDomeGeometry = new THREE.SphereGeometry(midHoleRadius / Math.sin(5 * Math.PI/12), 32, 32, 0, 2 * Math.PI, 0, 5 * Math.PI/ 12);
cylinderDomeGeometry.rotateX(Math.PI/2).translate(handleOrigin.x, handleOrigin.y, frameW + cockSpurHandleDepth + 6 - midHoleRadius / Math.tan(5 * Math.PI/12));