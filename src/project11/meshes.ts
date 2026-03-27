import * as THREE from 'three/webgpu';
import { frameGeometries, frameEdgeGeometries, beadGeometries, beadEdgeGeometries, glassGeometry, plusLinesGeometry } from './geometries';
import { profileEdgesMaterial, frameSkinPhysicalMaterials, beadSkinPhysicalMaterials, glassMaterial, frameSkinMaterial, beadSkinMaterial } from './materials';
import { backPlateGeometry, cylinderDomeGeometry, handleCurveGeometry, handleGeometry, handleHolderGeometry, midHoleCylinderGeometry } from './handleGeometries';
import { handleHolderPhysicalMaterial, backPlatePhysicalMaterial, midCylinderPhysicalMaterial, handleHolderMaterial, midCylinderMaterial, backPlateMaterial } from './handleMaterials';

export const beads = beadGeometries.map<THREE.Mesh>((geometry, index) => {
    const beadEdge = new THREE.LineSegments(beadEdgeGeometries[index], profileEdgesMaterial);

    const mesh = new THREE.Mesh(geometry, beadSkinPhysicalMaterials[index]).add(beadEdge);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
});

export const windowFrames = frameGeometries.map<THREE.Mesh>((geometry, index) => {
    const frameEdge = new THREE.LineSegments(frameEdgeGeometries[index], profileEdgesMaterial);

    const mesh = new THREE.Mesh(geometry, frameSkinPhysicalMaterials[index]).add(frameEdge, beads[index]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
});

export const glass = new THREE.Mesh(glassGeometry, glassMaterial);

export const plusLine = new THREE.LineSegments(plusLinesGeometry, profileEdgesMaterial);
glass.add(plusLine);

// Window Handle
export const backPlate = new THREE.Mesh(backPlateGeometry, backPlatePhysicalMaterial);
backPlate.frustumCulled = false;
backPlate.castShadow = true;
backPlate.receiveShadow = true;

export const handle = new THREE.Mesh(handleGeometry, handleHolderPhysicalMaterial);
handle.frustumCulled = false;
handle.castShadow = true;
handle.receiveShadow = true;

const handleCurve = new THREE.Mesh(handleCurveGeometry, handleHolderPhysicalMaterial);
handleCurve.frustumCulled = false;
handleCurve.castShadow = true;
handleCurve.receiveShadow = true;

const handleHolder = new THREE.Mesh(handleHolderGeometry, handleHolderPhysicalMaterial);
handleHolder.frustumCulled = false;
handleHolder.castShadow = true;
handleHolder.receiveShadow = true;

export const midHoleCylinder = new THREE.Mesh(midHoleCylinderGeometry, midCylinderPhysicalMaterial);
midHoleCylinder.frustumCulled = false;
midHoleCylinder.castShadow = true;
midHoleCylinder.receiveShadow = true;
midHoleCylinder.frustumCulled = false;
const midHoleDome = new THREE.Mesh(cylinderDomeGeometry, midCylinderPhysicalMaterial);
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

export function changeToNormalView() {
    windowFrames.forEach((frame, index) => {
        frame.material = frameSkinMaterial[index];
    });
    beads.forEach((bead, index) => {
        bead.material = beadSkinMaterial[index];
    });
    (backPlate.material as THREE.NodeMaterial) = backPlateMaterial;
    (handle.material as THREE.NodeMaterial) = handleHolderMaterial;
    (handleCurve.material as THREE.NodeMaterial) = handleHolderMaterial;
    (handleHolder.material as THREE.NodeMaterial) = handleHolderMaterial;

    (midHoleCylinder.material as THREE.NodeMaterial) = midCylinderMaterial;
    (midHoleDome.material as THREE.NodeMaterial) = midCylinderMaterial;
}

export function changeToRealisticView() {
    windowFrames.forEach((frame, index) => {
        frame.material = frameSkinPhysicalMaterials[index];
    });
    beads.forEach((bead, index) => {
        bead.material = beadSkinPhysicalMaterials[index];
    });
    backPlate.material = backPlatePhysicalMaterial;
    handle.material = handleHolderPhysicalMaterial;
    handleCurve.material = handleHolderPhysicalMaterial;
    handleHolder.material = handleHolderPhysicalMaterial;

    midHoleCylinder.material = midCylinderPhysicalMaterial;
    midHoleDome.material = midCylinderPhysicalMaterial;
}