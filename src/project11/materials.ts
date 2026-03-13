import * as THREE from 'three';
import textureLink from "./assets/oak_veneer_01_diff_4k.jpg"
// import { defaultColor } from './dynamicVariables';

const loader = new THREE.TextureLoader();
const sideTexture = await loader.loadAsync(textureLink);
sideTexture.center.set(0.5, 0.5);
sideTexture.rotation = Math.PI / 2;
sideTexture.wrapS = THREE.RepeatWrapping;
sideTexture.wrapT = THREE.RepeatWrapping;
sideTexture.repeat.set(0.001, 0.001);
sideTexture.colorSpace = THREE.SRGBColorSpace;

const faceTexture = sideTexture.clone();
faceTexture.repeat.set(0.001, 0.001);

export const frameSkinMaterials = [
    [new THREE.MeshBasicMaterial({ color: "white", map: faceTexture, wireframe: false }), new THREE.MeshBasicMaterial({ color: "white", map: sideTexture, wireframe: false })],
    [new THREE.MeshBasicMaterial({ color: "white", map: faceTexture, wireframe: false }), new THREE.MeshBasicMaterial({ color: "white", map: sideTexture, wireframe: false })],
    [new THREE.MeshBasicMaterial({ color: "white", map: faceTexture, wireframe: false }), new THREE.MeshBasicMaterial({ color: "white", map: sideTexture, wireframe: false })],
    [new THREE.MeshBasicMaterial({ color: "white", map: faceTexture, wireframe: false }), new THREE.MeshBasicMaterial({ color: "white", map: sideTexture, wireframe: false })]
];

export const beadSkinMaterials = [
    [new THREE.MeshBasicMaterial({ color: "white", map: faceTexture, wireframe: false }), new THREE.MeshBasicMaterial({ color: "white", map: sideTexture, wireframe: false })],
    [new THREE.MeshBasicMaterial({ color: "white", map: faceTexture, wireframe: false }), new THREE.MeshBasicMaterial({ color: "white", map: sideTexture, wireframe: false })],
    [new THREE.MeshBasicMaterial({ color: "white", map: faceTexture, wireframe: false }), new THREE.MeshBasicMaterial({ color: "white", map: sideTexture, wireframe: false })],
    [new THREE.MeshBasicMaterial({ color: "white", map: faceTexture, wireframe: false }), new THREE.MeshBasicMaterial({ color: "white", map: sideTexture, wireframe: false })]
];

export const glassMaterial = new THREE.MeshBasicMaterial({ color: "#8bcbff" })

export const profileEdgesMaterial = new THREE.LineBasicMaterial({ color: "black" });
profileEdgesMaterial.polygonOffset = true; // Applying offset because the lines are breaking like dashed lines
profileEdgesMaterial.polygonOffsetFactor = 1; 
profileEdgesMaterial.polygonOffsetUnits = 1;