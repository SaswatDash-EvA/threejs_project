import * as THREE from "three";

const floorMaterial = new THREE.MeshStandardMaterial({
    color: "#c8c6c0",
    metalness: 0,
    roughness: 0.75,
    side: THREE.DoubleSide,
});
const leftWallMaterial = new THREE.MeshStandardMaterial({
    color: "#c5c3bd",
    metalness: 0,
    roughness: 0.75,
    side: THREE.DoubleSide,
});
const backWallMaterial = new THREE.MeshStandardMaterial({
    color: "#d2d0ca",
    metalness: 0,
    roughness: 0.75,
    side: THREE.DoubleSide,
});

const firstStandardMaterial = new THREE.MeshStandardMaterial({
	color: "red",
	metalness: 0.2,
	roughness: 0.6,
});
const secondStandardMaterial = new THREE.MeshStandardMaterial({
	color: "blue",
	metalness: 0.25,
	roughness: 0.48
});
const glossyStandardMaterial = new THREE.MeshStandardMaterial({
	color: "gray",
	metalness: 0.42,
	roughness: 0.02
});

export {floorMaterial, leftWallMaterial, backWallMaterial, firstStandardMaterial, secondStandardMaterial, glossyStandardMaterial};