import * as THREE from 'three';
import { frameGeometries, frameEdgeGeometries } from './geometries';
import { profileEdgesMaterial, profilesSkinMaterial } from './materials';

export const windowFrames = frameGeometries.map<THREE.Mesh>((geometry, index) => {
    const frameEdge = new THREE.LineSegments(frameEdgeGeometries[index], profileEdgesMaterial);

    return new THREE.Mesh(geometry, profilesSkinMaterial).add(frameEdge);
});