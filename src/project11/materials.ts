import * as THREE from 'three';
import { defaultColor } from './dynamicVariables';

export const frameSkinMaterial = new THREE.MeshBasicMaterial({ color: defaultColor, wireframe: false });
export const beadSkinMaterial = new THREE.MeshBasicMaterial({ color: defaultColor, wireframe: false });
export const profileEdgesMaterial = new THREE.LineBasicMaterial({ color: "black" });