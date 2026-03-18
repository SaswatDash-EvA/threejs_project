import * as THREE from 'three/webgpu';
import {  handlePositionShader } from './dynamicChangeSystem';

export const backPlateMaterial = new THREE.MeshBasicNodeMaterial({ color: "#fafddd", positionNode: handlePositionShader, wireframe: false, side: THREE.DoubleSide });
export const midCylinderMaterial = new THREE.MeshBasicNodeMaterial({ color: "#ddb8ad", positionNode: handlePositionShader, wireframe: false, side: THREE.DoubleSide })
export const handleHolderMaterial = new THREE.MeshBasicNodeMaterial({ color: "#c26700", positionNode: handlePositionShader, wireframe: false, side: THREE.DoubleSide });