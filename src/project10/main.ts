import * as THREE from 'three';
import { beadInsideFrame, cutLineSegments, dashedLineSegments, outerBoundaryFrame, outerInsideFrame } from './meshes';

const canvas = document.getElementById("three-canvas") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
renderer.setAnimationLoop(animate);

const scene = new THREE.Scene();
scene.background = new THREE.Color("white");

let aspect = canvas.clientWidth / canvas.clientHeight;
const camera = new THREE.OrthographicCamera(-aspect, aspect);
camera.position.z = 2;

scene.add(outerBoundaryFrame, outerInsideFrame, beadInsideFrame, cutLineSegments, dashedLineSegments);

function animate() {
    renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize);
function onWindowResize() {
    aspect = canvas.clientWidth / canvas.clientHeight;
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    camera.left = -aspect;
    camera.right = aspect;
    camera.updateProjectionMatrix();
}