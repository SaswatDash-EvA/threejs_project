import * as THREE from 'three/webgpu';

export const planeMaterial = new THREE.MeshStandardMaterial({
    color: "#ffffa7",
    metalness: 0.12
});

export const cubeMaterial = new THREE.MeshStandardMaterial({
    color: "#e26024",
    roughness: 0.4
});

export const sphereMaterial = new THREE.MeshStandardMaterial({
    color: "#91e94a",
    roughness: 0.4
});

export const cylinderMaterial = new THREE.MeshStandardMaterial({
    color: "#37a584",
    roughness: 0.4
});