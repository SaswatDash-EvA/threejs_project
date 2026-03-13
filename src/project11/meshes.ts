import * as THREE from 'three';
import { frameGeometries, frameEdgeGeometries, beadGeometries, beadEdgeGeometries, glassGeometry, plusLinesGeometry } from './geometries';
import { profileEdgesMaterial, frameSkinMaterials, beadSkinMaterials, glassMaterial } from './materials';
import { backPlateGeometry, handleGeometry } from './handleGeometries';
import { handleHolderMaterial, handleMaterial } from './handleMaterials';
import { frameW } from './dynamicVariables';

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
export const backPlate = new THREE.Mesh(backPlateGeometry, handleMaterial);
backPlate.translateZ(frameW);

export const handle = new THREE.Mesh(handleGeometry, handleHolderMaterial);
handle.translateZ(6);

backPlate.add(handle);