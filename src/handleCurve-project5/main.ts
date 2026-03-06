import * as THREE from 'three';
import { handle, updateMesh } from './meshes';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { cameraZ, handleHeight, handleThickness, handleWidth, updateParameters } from './parameters';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    60,
	window.innerWidth / window.innerHeight,
	0.1,
	3000
);
camera.position.set(cameraZ/3, cameraZ/4, cameraZ + handleThickness);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const cameraControl = new OrbitControls(camera, renderer.domElement);
cameraControl.target.set(cameraZ/3, 0, 0);
cameraControl.update();

let axesHelper = new THREE.AxesHelper(Math.max(handleHeight, handleWidth) + 5);
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

function updateChanges() {
	scene.remove(handle, axesHelper);
	const height = parseFloat((document.getElementById("height") as HTMLInputElement).value);
    const width = parseFloat((document.getElementById("width") as HTMLInputElement).value);
    const rightLegWidth = parseFloat((document.getElementById("rightLegWidth") as HTMLInputElement).value);
    const H1 = parseFloat((document.getElementById("H1") as HTMLInputElement).value);
    const innerHoleDiameter = parseFloat((document.getElementById("innerHoleDiameter") as HTMLInputElement).value);
	const handleThickness = parseFloat((document.getElementById("handleThickness") as HTMLInputElement).value);

	updateParameters(height, width, rightLegWidth, H1, innerHoleDiameter, handleThickness);
	updateMesh();
	camera.position.set(cameraZ/3, cameraZ/4, cameraZ + handleThickness);
	cameraControl.target.set(cameraZ/3, 0, 0);
	cameraControl.update();

	axesHelper = new THREE.AxesHelper(Math.max(height/2, width, handleThickness) + 5);
	axesHelper.setColors("red", "yellow", "blue");
	scene.add(handle, axesHelper);
}

(window as any).updateChanges = updateChanges;