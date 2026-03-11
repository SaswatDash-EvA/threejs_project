import * as THREE from 'three';
import { windowHeight, windowWidth } from './dynamicVariables';
import { beads, windowFrames } from './meshes';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Global variables
const scene = new THREE.Scene();
scene.background = new THREE.Color("#f0f0f0");
const camera = new THREE.OrthographicCamera();
camera.position.z = Math.max(windowWidth, windowHeight);
let aspect = window.innerWidth / window.innerHeight;

function updateScene(frustumHeight: number) {
    aspect = window.innerWidth / window.innerHeight;
    camera.left = -frustumHeight * aspect / 2;
    camera.right = frustumHeight * aspect / 2;
    camera.top = frustumHeight/2;
    camera.bottom = -frustumHeight/2;

    camera.far = 2 * Math.max(windowWidth, windowHeight);

    camera.updateProjectionMatrix();
}

updateScene(Math.max(windowWidth / aspect, windowHeight) * 1.5);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = false;

scene.add(...windowFrames, ...beads);

function animate() {
    renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
    aspect = window.innerWidth / window.innerHeight;
    updateScene(Math.max(windowHeight * 1.8, windowWidth * 1.8));
});

// window.addEventListener("click", (event: PointerEvent) => {
     
// });