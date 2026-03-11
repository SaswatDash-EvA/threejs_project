import * as THREE from 'three';
import { frameW, windowHeight, windowWidth } from './dynamicVariables';
import { windowFrames } from './meshes';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Global variables
const scene = new THREE.Scene();
scene.background = new THREE.Color("#f0f0f0");
const camera = new THREE.OrthographicCamera();
camera.position.z = frameW + 1;
let aspect = window.innerWidth / window.innerHeight;

function updateScene(frustumHeight: number) {
    aspect = window.innerWidth / window.innerHeight;
    camera.left = -frustumHeight * aspect / 2;
    camera.right = frustumHeight * aspect / 2;
    camera.top = frustumHeight/2;
    camera.bottom = -frustumHeight/2;

    camera.updateProjectionMatrix();
}

updateScene(Math.max(windowWidth, windowHeight) * 1.8);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = false;

scene.add(...windowFrames);

function animate() {
    renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
    aspect = window.innerWidth / window.innerHeight;
    updateScene(Math.max(windowHeight * 1.8, windowWidth * 1.8));
});