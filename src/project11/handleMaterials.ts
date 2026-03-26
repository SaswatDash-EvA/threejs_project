import * as THREE from 'three/webgpu';
import {  handlePositionShader } from './dynamicChangeSystem';

export const backPlateMaterial = new THREE.MeshPhysicalNodeMaterial({ color: "#fafddd", positionNode: handlePositionShader, wireframe: false, side: THREE.FrontSide });
export const midCylinderMaterial = new THREE.MeshPhysicalNodeMaterial({ color: "#ddb8ad", positionNode: handlePositionShader, wireframe: false, side: THREE.FrontSide })
export const handleHolderMaterial = new THREE.MeshPhysicalNodeMaterial({ color: "#c26700", positionNode: handlePositionShader, wireframe: false, side: THREE.FrontSide });