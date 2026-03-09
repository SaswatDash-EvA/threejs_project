import * as THREE from 'three/webgpu';
import { plane } from './meshes';
import { dirLight, pointLight } from './lights';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const renderer = new THREE.WebGPURenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    60,
	window.innerWidth / window.innerHeight,
	0.1,
	100
);
camera.position.z = 15;

new OrbitControls(camera, renderer.domElement);

scene.background = new THREE.Color("#d8d7cb")

scene.add(plane, dirLight, pointLight);

function animate() {
    renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
