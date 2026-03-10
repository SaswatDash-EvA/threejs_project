import * as THREE from 'three'
import { LineMaterial } from 'three/examples/jsm/Addons.js';

export const boundaryMaterial = new LineMaterial({ color: "black", linewidth: 4 });
boundaryMaterial.resolution.set(window.innerWidth, window.innerHeight);
boundaryMaterial.needsUpdate = true;

export const uiLinesMaterial = new LineMaterial({ color: "black", linewidth: 2 });

export const textMaterial = new THREE.MeshBasicMaterial({ color: "black" });

export const windowMaterial = new LineMaterial({ color: "#919191", linewidth: 2 });
export const dashedDividerMaterial = new LineMaterial({ color: "#313131", linewidth: 2, dashed: true, 
    dashSize: 0.08, gapSize: 0.01
});