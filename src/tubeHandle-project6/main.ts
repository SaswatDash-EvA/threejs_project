import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1, 3000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

let handleHeight = 10, handleTopWidth = 4, handleBottomWidth = 4;
let handleDiameter = 2;

// const handleCurve = new THREE.CatmullRomCurve3([
//     new THREE.Vector3(0, (handleHeight - handleDiameter)/2, 0),
//     new THREE.Vector3(handleTopWidth/3, (handleHeight - handleDiameter)/2, 0),
//     new THREE.Vector3(4 * handleTopWidth/5, (handleHeight - handleDiameter)/2 - handleTopWidth/5, 0),
//     new THREE.Vector3((handleBottomWidth + handleTopWidth)/2, 0, 0),
//     new THREE.Vector3(4 * handleBottomWidth/5, -(handleHeight - handleDiameter)/2 + handleBottomWidth/5, 0),
//     new THREE.Vector3(handleBottomWidth/3, -(handleHeight - handleDiameter)/2, 0),
//     new THREE.Vector3(0, -(handleHeight - handleDiameter)/2, 0)
// ], false);

const handleCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, (handleHeight - handleDiameter)/2),
    new THREE.Vector3((handleTopWidth - handleDiameter/2) * 4/3, (handleHeight - handleDiameter)/2),
    new THREE.Vector3((handleBottomWidth - handleDiameter/2) * 4/3, -(handleHeight - handleDiameter)/2),
    new THREE.Vector3(0, -(handleHeight - handleDiameter)/2)
);

// const numOfPoints = 240;
// const points = handleCurve.getPoints(numOfPoints);
// const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

const handleGeometry = new THREE.TubeGeometry(handleCurve, 64, handleDiameter/2, 32);
const handleMaterial = new THREE.MeshBasicMaterial({ color: "cyan", wireframe: false, side: THREE.DoubleSide });

const handle = new THREE.Mesh(handleGeometry, handleMaterial);
scene.add(handle);

function animate() {
    renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}