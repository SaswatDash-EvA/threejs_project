import * as THREE from 'three';
import { frameGeometries, frameEdgeGeometries, beadGeometries, beadEdgeGeometries } from './geometries';
import { profileEdgesMaterial, profilesSkinMaterial } from './materials';

export const windowFrames = frameGeometries.map<THREE.Mesh>((geometry, index) => {
    const frameEdge = new THREE.LineSegments(frameEdgeGeometries[index], profileEdgesMaterial);

    const mesh = new THREE.Mesh(geometry, profilesSkinMaterial).add(frameEdge);
    mesh.name = "window";
    return mesh;
});

export const beads = beadGeometries.map<THREE.Mesh>((geometry, index) => {
    const beadEdge = new THREE.LineSegments(beadEdgeGeometries[index], profileEdgesMaterial);

    const mesh = new THREE.Mesh(geometry, profilesSkinMaterial).add(beadEdge);
    mesh.name = "bead";
    return mesh;
});