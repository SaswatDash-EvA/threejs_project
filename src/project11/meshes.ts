import * as THREE from 'three';
import { frameGeometries, frameEdgeGeometries, beadGeometries, beadEdgeGeometries, glassGeometry, plusLinesGeometry } from './geometries';
import { profileEdgesMaterial, frameSkinMaterials, beadSkinMaterials, glassMaterial } from './materials';
import { backPlateGeometry, cylinderDomeGeometry, handleCurveGeometry, handleGeometry, handleHolderGeometry, midHoleCylinderGeometry } from './handleGeometries';
import { handleHolderMaterial, backPlateMaterial, midCylinderMaterial } from './handleMaterials';

export const beads = beadGeometries.map<THREE.Mesh>((geometry, index) => {
    const beadEdge = new THREE.LineSegments(beadEdgeGeometries[index], profileEdgesMaterial);

    const mesh = new THREE.Mesh(geometry, beadSkinMaterials[index]).add(beadEdge);
    return mesh;
});

export const windowFrames = frameGeometries.map<THREE.Mesh>((geometry, index) => {
    const frameEdge = new THREE.LineSegments(frameEdgeGeometries[index], profileEdgesMaterial);

    const mesh = new THREE.Mesh(geometry, frameSkinMaterials[index]).add(frameEdge, beads[index]);
    return mesh;
});

export const glass = new THREE.Mesh(glassGeometry, glassMaterial);

export const plusLine = new THREE.LineSegments(plusLinesGeometry, profileEdgesMaterial);
glass.add(plusLine);

// Window Handle
export const backPlate = new THREE.Mesh(backPlateGeometry, backPlateMaterial);
backPlate.frustumCulled = false;

export const handle = new THREE.Mesh(handleGeometry, handleHolderMaterial);
handle.frustumCulled = false;

const handleCurve = new THREE.Mesh(handleCurveGeometry, handleHolderMaterial);
handleCurve.frustumCulled = false;

const handleHolder = new THREE.Mesh(handleHolderGeometry, handleHolderMaterial);
handleHolder.frustumCulled = false;

export const midHoleCylinder = new THREE.Mesh(midHoleCylinderGeometry, midCylinderMaterial);
midHoleCylinder.frustumCulled = false;
const midHoleDome = new THREE.Mesh(cylinderDomeGeometry, midCylinderMaterial);
midHoleDome.frustumCulled = false;

midHoleCylinder.add(midHoleDome)

backPlate.add(handle, handleCurve, handleHolder);