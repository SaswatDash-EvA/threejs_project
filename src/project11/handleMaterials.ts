import * as THREE from 'three/webgpu';
import {  handlePositionShader, rotatedNormal } from './dynamicChangeSystem';

export const backPlatePhysicalMaterial = new THREE.MeshPhysicalNodeMaterial({ 
    color: "#fafddd", 
    positionNode: handlePositionShader,
    normalNode: rotatedNormal,
    wireframe: false, 
    side: THREE.FrontSide });
export const midCylinderPhysicalMaterial = new THREE.MeshPhysicalNodeMaterial({ 
    color: "#ddb8ad", 
    positionNode: handlePositionShader,
    normalNode: rotatedNormal,
    wireframe: false, 
    side: THREE.FrontSide });
export const handleHolderPhysicalMaterial = new THREE.MeshPhysicalNodeMaterial({ 
    color: "#c26700", 
    positionNode: handlePositionShader,
    normalNode: rotatedNormal,
    wireframe: false, 
    side: THREE.FrontSide });

export const backPlateMaterial = new THREE.MeshBasicNodeMaterial({ color: "#fafddd" });
export const midCylinderMaterial = new THREE.MeshBasicNodeMaterial({ color: "#ddb8ad" });
export const handleHolderMaterial = new THREE.MeshBasicNodeMaterial({ color: "#c26700" });