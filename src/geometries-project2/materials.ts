import * as THREE from "three";
import { EXRLoader } from "three/examples/jsm/Addons.js";

import diffuseUrl from './assets/rock_wall_16_diff_4k.jpg';
import displacementUrl from './assets/rock_wall_16_disp_4k.png';
import normalMapUrl from './assets/rock_wall_16_nor_gl_4k.exr';
import roughnessUrl from './assets/rock_wall_16_rough_4k.exr';

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

const textureLoader = new THREE.TextureLoader();
const exrLoader = new EXRLoader();

const rockDiffuseMap = textureLoader.load(diffuseUrl);
rockDiffuseMap.colorSpace = THREE.SRGBColorSpace;

const displacementMap = textureLoader.load(displacementUrl);
const normalMap = exrLoader.load(normalMapUrl);
const roughnessMap = exrLoader.load(roughnessUrl);

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
    map: rockDiffuseMap,
	metalness: 0.42,
	normalMap: normalMap,
    roughnessMap: roughnessMap,
    displacementMap: displacementMap,
    displacementScale: 0.05
});

export {floorMaterial, leftWallMaterial, backWallMaterial, firstStandardMaterial, secondStandardMaterial, glossyStandardMaterial};