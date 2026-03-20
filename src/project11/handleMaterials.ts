import * as THREE from 'three/webgpu';
import {  handlePositionShader } from './dynamicChangeSystem';

export const backPlateMaterial = new THREE.MeshStandardNodeMaterial({ color: "#fafddd", positionNode: handlePositionShader, wireframe: false, side: THREE.FrontSide });
export const midCylinderMaterial = new THREE.MeshStandardNodeMaterial({ color: "#ddb8ad", positionNode: handlePositionShader, wireframe: false, side: THREE.FrontSide })
export const handleHolderMaterial = new THREE.MeshStandardNodeMaterial({ color: "#c26700", positionNode: handlePositionShader, wireframe: false, side: THREE.FrontSide });