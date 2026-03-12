import * as THREE from 'three';
import { beads, windowFrames } from './meshes';
import { defaultColor, highlightColor } from './dynamicVariables';

// To check if frame and beads are highlighted (default: false)
let frameHighlighted = false, beadHighlighted = false;

function setFrameColor(hex: string) {
    windowFrames.forEach(mesh => {
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.color.set(hex);
        material.needsUpdate = true;
    });
}

function setBeadColor(hex: string) {
    beads.forEach(mesh => {
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.color.set(hex);
        material.needsUpdate = true;
    });
}

export function highlightMeshes(rayCaster: THREE.Raycaster): boolean {
    const intersectedObjects = rayCaster.intersectObjects([...windowFrames, ...beads]);

    if (intersectedObjects.length === 0) {
        if (frameHighlighted)
            setFrameColor(defaultColor);
        else if (beadHighlighted)
            setBeadColor(defaultColor);
        frameHighlighted = false, beadHighlighted = false;
        return false;
    }
        

    if (windowFrames.some(mesh => mesh.name == intersectedObjects[0].object.name)) {
        if (frameHighlighted) return true;
        setFrameColor(highlightColor);
        if (beadHighlighted)
            setBeadColor(defaultColor);
        frameHighlighted = true, beadHighlighted = false;
    }
    else if (beads.some(mesh => mesh.name == intersectedObjects[0].object.name)) {
        if (beadHighlighted) return true;
        setBeadColor(highlightColor);
        if (frameHighlighted)
            setFrameColor(defaultColor);

        frameHighlighted = false, beadHighlighted = true;
    }
    console.log(frameHighlighted, beadHighlighted);
    return true;
}