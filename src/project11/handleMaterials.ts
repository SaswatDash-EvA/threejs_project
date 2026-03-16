import * as THREE from 'three/webgpu';
import {  positionShader } from './dynamicChangeSystem';

export const backPlateMaterial = new THREE.MeshBasicNodeMaterial({ color: "#fafddd", positionNode: positionShader, wireframe: false, side: THREE.DoubleSide });
export const midCylinderMaterial = new THREE.MeshBasicNodeMaterial({ color: "#ddb8ad", positionNode: positionShader, wireframe: false, side: THREE.DoubleSide })
export const handleHolderMaterial = new THREE.MeshBasicNodeMaterial({ color: "#c26700", positionNode: positionShader, wireframe: false, side: THREE.DoubleSide });