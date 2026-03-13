import * as THREE from 'three';
import { backPlateHeight, backPlateMidRadius, backPlateSideRadius, backPlateTopBottomFaceLength, cockSpurHandleHeight, cockSpurHeadRadius, cockSpurHolderWidth, handleOriginX, handleOriginY, midHoleRadius, topBottomHoleRadius } from './handleVariables';

// Handle backplates shape
const backPlateShape = new THREE.Shape()
    .moveTo(handleOriginX - backPlateMidRadius - backPlateTopBottomFaceLength, handleOriginY + backPlateHeight/2)
    .lineTo(handleOriginX - backPlateMidRadius - backPlateTopBottomFaceLength, handleOriginY - backPlateHeight/2)
    .lineTo(handleOriginX - backPlateMidRadius, handleOriginY - backPlateHeight/2)
    .arc(backPlateMidRadius, 0, backPlateMidRadius, Math.PI, Math.PI/2, true)
    .arc(0, backPlateSideRadius, backPlateSideRadius, 3 * Math.PI/2, Math.PI/2)
    .arc(0, backPlateMidRadius, backPlateMidRadius, 3 * Math.PI/2, Math.PI, true)
    .lineTo(handleOriginX - backPlateMidRadius - backPlateTopBottomFaceLength, handleOriginY + backPlateHeight/2);

const midHole = new THREE.Path().absarc(handleOriginX, handleOriginY, midHoleRadius, 0, 2 * Math.PI);
const topBottomHoles = [
    new THREE.Path().absarc(handleOriginX - backPlateMidRadius - backPlateTopBottomFaceLength/2, handleOriginY + backPlateSideRadius + backPlateMidRadius/2, topBottomHoleRadius, 0, 2 * Math.PI),
    new THREE.Path().absarc(handleOriginX - backPlateMidRadius - backPlateTopBottomFaceLength/2, handleOriginY - backPlateSideRadius - backPlateMidRadius/2, topBottomHoleRadius, 0, 2 * Math.PI)
]
backPlateShape.holes.push(midHole, ...topBottomHoles);

// Handle shape
const handleShape = new THREE.Shape()
    .moveTo(handleOriginX - cockSpurHeadRadius * Math.cos(Math.PI/6), handleOriginY + cockSpurHeadRadius * Math.sin(Math.PI/6))
    .absarc(handleOriginX, handleOriginY, cockSpurHeadRadius, 5 * Math.PI/6, 0, true)
    .lineTo(handleOriginX + cockSpurHeadRadius, handleOriginY - cockSpurHandleHeight + cockSpurHeadRadius + cockSpurHolderWidth)
    .arc(-cockSpurHolderWidth/2, 0, cockSpurHolderWidth/2, 0, Math.PI, true)
    .lineTo(handleOriginX + cockSpurHeadRadius - cockSpurHolderWidth, handleOriginY - cockSpurHeadRadius * Math.sin(Math.PI/6) - (cockSpurHeadRadius * (1 + Math.cos(Math.PI/6)) - cockSpurHolderWidth) * Math.tan(7 * Math.PI/24))
    .arc(-(cockSpurHeadRadius * (1 + Math.cos(Math.PI/6)) - cockSpurHolderWidth) * Math.tan(7 * Math.PI/24) / Math.sin(5 * Math.PI/12), 0, (cockSpurHeadRadius * (1 + Math.cos(Math.PI/6)) - cockSpurHolderWidth) * Math.tan(7 * Math.PI/24) / Math.sin(5 * Math.PI/12), 0, 5 * Math.PI/12)
    .lineTo(handleOriginX - cockSpurHeadRadius * Math.cos(Math.PI/6) - cockSpurHeadRadius * Math.sin(Math.PI/6) / Math.tan(Math.PI/12), 0)
    .lineTo(handleOriginX - cockSpurHeadRadius * Math.cos(Math.PI/6), handleOriginY + cockSpurHeadRadius * Math.sin(Math.PI/6));

const handleMidHole = new THREE.Path().absarc(handleOriginX, handleOriginY, midHoleRadius, 0, 2 * Math.PI, true);
handleShape.holes.push(handleMidHole);

export const backPlateGeometry = new THREE.ExtrudeGeometry(backPlateShape, {
    bevelEnabled: true,
    depth: 4,
    curveSegments: 64
});

export const handleGeometry = new THREE.ExtrudeGeometry(handleShape, {
    bevelEnabled: true,
    depth: 4,
    curveSegments: 64
});