import * as THREE from 'three/webgpu';
import textureLink from "./assets/oak_veneer_01_diff_4k.jpg"
import { materialColor, texture } from 'three/tsl';
import { fixedHorizontalUV, fixedVerticalUV } from './textureCorrection';
// import { defaultColor } from './dynamicVariables';

const loader = new THREE.TextureLoader();
const sideTexture = await loader.loadAsync(textureLink);
sideTexture.center.set(0.5, 0.5);
sideTexture.rotation = Math.PI / 2;
sideTexture.wrapS = THREE.RepeatWrapping;
sideTexture.wrapT = THREE.RepeatWrapping;
sideTexture.colorSpace = THREE.SRGBColorSpace;

const verticalSideTextureNode = texture(sideTexture, fixedVerticalUV);
const horizontalSideTextureNode = texture(sideTexture, fixedHorizontalUV);

export const frameSkinMaterials = [
    new THREE.MeshBasicNodeMaterial({ color: "white", colorNode: horizontalSideTextureNode.mul(materialColor.toColor()), wireframe: false }),
    new THREE.MeshBasicNodeMaterial({ color: "white", colorNode: verticalSideTextureNode.mul(materialColor.toColor()), wireframe: false }),
    new THREE.MeshBasicNodeMaterial({ color: "white", colorNode: horizontalSideTextureNode.mul(materialColor.toColor()), wireframe: false }),
    new THREE.MeshBasicNodeMaterial({ color: "white", colorNode: verticalSideTextureNode.mul(materialColor.toColor()), wireframe: false })
];

export const beadSkinMaterials = [
    new THREE.MeshBasicNodeMaterial({ color: "white", colorNode: horizontalSideTextureNode.mul(materialColor.toColor()), wireframe: false }),
    new THREE.MeshBasicNodeMaterial({ color: "white", colorNode: verticalSideTextureNode.mul(materialColor.toColor()), wireframe: false }),
    new THREE.MeshBasicNodeMaterial({ color: "white", colorNode: horizontalSideTextureNode.mul(materialColor.toColor()), wireframe: false }),
    new THREE.MeshBasicNodeMaterial({ color: "white", colorNode: verticalSideTextureNode.mul(materialColor.toColor()), wireframe: false })
];

export const glassMaterial = new THREE.MeshBasicMaterial({ color: "#8bcbff" })

export const profileEdgesMaterial = new THREE.LineBasicMaterial({ color: "black" });