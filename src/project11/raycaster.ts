import * as THREE from 'three';
import { beads, windowFrames } from './meshes';

export function highlightMeshes(rayCaster: THREE.Raycaster): boolean {
    const intersectedObjects = rayCaster.intersectObjects([...windowFrames, ...beads]);

    if (intersectedObjects.length === 0)
        return false;

    if (windowFrames.some(mesh => mesh.name == intersectedObjects[0].object.name)) {
        windowFrames.forEach(mesh => {
            mesh.material = new THREE.MeshBasicMaterial({ color: "#0b0b96" });
        })
    }
    return true;
}