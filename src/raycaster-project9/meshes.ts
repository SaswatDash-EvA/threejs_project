import * as THREE from 'three/webgpu';
import { cubeGeometry, cylinderGeometry, planeGeometry, sphereGeometry } from './geometries';
import { cubeMaterial, cylinderMaterial, planeMaterial, sphereMaterial } from './materials';

export const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

const box = new THREE.Mesh(cubeGeometry, cubeMaterial);
box.castShadow = true;
box.receiveShadow = true;
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;
sphere.receiveShadow = true;
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.castShadow = true;
cylinder.receiveShadow = true;

plane.add(box, sphere, cylinder);

plane.rotateX(-Math.PI/3);