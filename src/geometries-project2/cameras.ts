import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { renderer } from "./renderer";

const aspect = window.innerWidth / window.innerHeight;
const orthoCamera = new THREE.OrthographicCamera(-aspect, aspect);
orthoCamera.position.set(10, 5, 10);
orthoCamera.lookAt(0, 0, 0);

const perspectCamera = new THREE.PerspectiveCamera(
	60,
	window.innerWidth / window.innerHeight,
	0.1,
	100,
);
perspectCamera.position.set(1.8, 0.9, 1.8);
perspectCamera.lookAt(0, 0, 0);

export let activeCamera: THREE.OrthographicCamera | THREE.PerspectiveCamera = orthoCamera;

export function changeActiveCamera() {
    activeCamera = activeCamera == perspectCamera ? orthoCamera : perspectCamera;
}

new OrbitControls(orthoCamera, renderer.domElement);
new OrbitControls(perspectCamera, renderer.domElement);