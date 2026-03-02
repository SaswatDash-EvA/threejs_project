import * as THREE from 'three';
import { handle } from './meshes';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { cameraZ, handleHeight, handleWidth } from './parameters';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    60,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.set(cameraZ/3, cameraZ/4, cameraZ);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const cameraControl = new OrbitControls(camera, renderer.domElement);
cameraControl.target.set(cameraZ/3, 0, 0);
cameraControl.update();

const axesHelper = new THREE.AxesHelper(Math.max(handleHeight, handleWidth) + 5);
axesHelper.setColors("red", "yellow", "blue");

const dirLight = new THREE.DirectionalLight("white", 1);
dirLight.position.set(100, 100, 100);
dirLight.target = handle;

const localLight = new THREE.DirectionalLight("white", 0.8);
localLight.position.set(0, -5, -5);

scene.add(handle, dirLight, localLight, axesHelper);

function animate() {
    renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}