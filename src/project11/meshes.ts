import * as THREE from 'three';
import { frameGeometries, frameEdgeGeometries, beadGeometries, beadEdgeGeometries, glassGeometry, plusLinesGeometry } from './geometries';
import { profileEdgesMaterial, frameSkinMaterials, beadSkinMaterials, glassMaterial } from './materials';
import { backPlateGeometry, cylinderDomeGeometry, handleCurveGeometry, handleGeometry, handleHolderGeometry, midHoleCylinderGeometry } from './handleGeometries';
import { handleHolderMaterial, backPlateMaterial, midCylinderMaterial } from './handleMaterials';

export const beads = beadGeometries.map<THREE.Mesh>((geometry, index) => {
    const beadEdge = new THREE.LineSegments(beadEdgeGeometries[index], profileEdgesMaterial);

    const mesh = new THREE.Mesh(geometry, beadSkinMaterials[index]).add(beadEdge);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
});

export const windowFrames = frameGeometries.map<THREE.Mesh>((geometry, index) => {
    const frameEdge = new THREE.LineSegments(frameEdgeGeometries[index], profileEdgesMaterial);

    const mesh = new THREE.Mesh(geometry, frameSkinMaterials[index]).add(frameEdge, beads[index]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
});

export const glass = new THREE.Mesh(glassGeometry, glassMaterial);

export const plusLine = new THREE.LineSegments(plusLinesGeometry, profileEdgesMaterial);
glass.add(plusLine);

// Window Handle
export const backPlate = new THREE.Mesh(backPlateGeometry, backPlateMaterial);
backPlate.frustumCulled = false;
backPlate.castShadow = true;
backPlate.receiveShadow = true;

export const handle = new THREE.Mesh(handleGeometry, handleHolderMaterial);
handle.frustumCulled = false;
handle.castShadow = true;
handle.receiveShadow = true;

const handleCurve = new THREE.Mesh(handleCurveGeometry, handleHolderMaterial);
handleCurve.frustumCulled = false;
handleCurve.castShadow = true;
handleCurve.receiveShadow = true;

const handleHolder = new THREE.Mesh(handleHolderGeometry, handleHolderMaterial);
handleHolder.frustumCulled = false;
handleHolder.castShadow = true;
handleHolder.receiveShadow = true;

export const midHoleCylinder = new THREE.Mesh(midHoleCylinderGeometry, midCylinderMaterial);
midHoleCylinder.frustumCulled = false;
const midHoleDome = new THREE.Mesh(cylinderDomeGeometry, midCylinderMaterial);
midHoleDome.frustumCulled = false;
midHoleDome.castShadow = true;
midHoleDome.receiveShadow = true;

midHoleCylinder.add(midHoleDome)

backPlate.add(handle, handleCurve, handleHolder);

// Enum structure but type safety to erasable syntax only mode
export const HandleSide = {
    default: 0,
    backSide: 1 << 0,
    rightSide: 1 << 1,
    bottomSide: 1 << 2
} as const;
export type HandleSide = typeof HandleSide[keyof typeof HandleSide];

// Update materials of the handle and backplate based on it's position
export function updateHandleSide(side: HandleSide) {
    if ((((side & HandleSide.rightSide) || (side & HandleSide.bottomSide)) && !(side & HandleSide.backSide)) ||
        !((side & HandleSide.rightSide) || (side & HandleSide.bottomSide)) && (side & HandleSide.backSide)) {
        backPlate.material.side = THREE.BackSide;
        handle.material.side = THREE.BackSide;
        midHoleDome.material.side = THREE.BackSide;
    }
    else {
        backPlate.material.side = THREE.FrontSide;
        handle.material.side = THREE.FrontSide;
        midHoleDome.material.side = THREE.FrontSide;
    }
}