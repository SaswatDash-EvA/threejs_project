import * as THREE from 'three';
import { beads, windowFrames } from './meshes';
import { defaultColor, highlightColor, subHighlightColor } from './dynamicVariables';

// To check if frame and beads are highlighted (default: false)
let frameHighlighted = false, beadHighlighted = false;

function setFrameColor(intersectedFrame: THREE.Mesh | undefined, primaryHex: string, clickedHex?: string) {
    windowFrames.forEach(mesh => {
        const material = mesh.material as THREE.MeshBasicMaterial[];
        if (intersectedFrame === mesh && clickedHex) {
            material.forEach(material => {
                material.color.set(clickedHex);
                material.needsUpdate = true;
            });
            return;
        }     
        material.forEach(material => {
            material.color.set(primaryHex);
            material.needsUpdate = true;
        });
    });
}

function setBeadColor(intersectedBead: THREE.Mesh | undefined, primaryHex: string, clickedHex?: string) {
    beads.forEach(mesh => {
        const material = mesh.material as THREE.MeshBasicMaterial[];
        if (intersectedBead === mesh && clickedHex) {
            material.forEach(material => {
                material.color.set(clickedHex);
                material.needsUpdate = true;
            });
            return;
        }     
        material.forEach(material => {
            material.color.set(primaryHex);
            material.needsUpdate = true;
        });
    });
}

export function highlightMeshes(rayCaster: THREE.Raycaster): boolean {
    const intersectedObjects = rayCaster.intersectObjects([...windowFrames, ...beads]);

    if (intersectedObjects.length === 0) {
        removeHighlights();
        return false;
    }

    let intersectedframe: THREE.Mesh | undefined;
    let intersectedBead: THREE.Mesh | undefined;
    if (intersectedframe = windowFrames.find(mesh => mesh == intersectedObjects[0].object)) {
        if (frameHighlighted) return true;
        setFrameColor(intersectedframe, subHighlightColor, highlightColor);
        if (beadHighlighted)
            setBeadColor(intersectedBead, defaultColor);
        frameHighlighted = true, beadHighlighted = false;
    }
    else if (intersectedBead = beads.find(mesh => mesh == intersectedObjects[0].object)) {
        if (beadHighlighted) return true;
        setBeadColor(intersectedBead, subHighlightColor, highlightColor);
        if (frameHighlighted)
            setFrameColor(intersectedframe, defaultColor);

        frameHighlighted = false, beadHighlighted = true;
    }
    return true;
}

export function removeHighlights() {
    if (frameHighlighted)
        setFrameColor(undefined, defaultColor);
    else if (beadHighlighted)
        setBeadColor(undefined, defaultColor);
    frameHighlighted = false, beadHighlighted = false;
}