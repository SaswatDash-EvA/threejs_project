import * as THREE from 'three/webgpu';

export const planeGeometry = new THREE.PlaneGeometry(10, 10, 64, 64);

// Child objects
export const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
export const sphereGeometry = new THREE.SphereGeometry(0.25, 64, 64);
export const cylinderGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.7, 64);

cubeGeometry.translate(2, 1.3, 0.25);
sphereGeometry.translate(-1.2, 2.1, 0.25);
cylinderGeometry.rotateX(Math.PI/2).translate(3.8, 3.8, 0.35);