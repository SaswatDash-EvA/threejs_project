import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1, 3000
);
camera.position.z = 25;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

let handleHeight = 18, handleTopWidth = 5, handleBottomWidth = 5;
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

// const handleCurve = new THREE.CubicBezierCurve3(
//     new THREE.Vector3(0, (handleHeight - handleDiameter)/2),
//     new THREE.Vector3((handleTopWidth - handleDiameter/2) * 4/3, (handleHeight - handleDiameter)/2),
//     new THREE.Vector3((handleBottomWidth - handleDiameter/2) * 4/3, -(handleHeight - handleDiameter)/2),
//     new THREE.Vector3(0, -(handleHeight - handleDiameter)/2)
// );

let handleMidHeight = 5;

const upperBezierCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, (handleHeight - handleDiameter)/2 + handleMidHeight/2, 0),
    new THREE.Vector3((8*handleTopWidth - handleMidHeight)/6, (handleHeight - handleDiameter)/2 + handleMidHeight/2, 0),
    new THREE.Vector3((8*handleTopWidth - handleMidHeight)/6, handleMidHeight/2, 0),
    new THREE.Vector3(handleMidHeight/2, handleMidHeight/2 - handleDiameter/2, 0)
);

const arcRadius = handleMidHeight / 2 - handleDiameter/2;
const arc2D = new THREE.ArcCurve(handleMidHeight/2, 0, arcRadius, Math.PI / 2, 3 * Math.PI / 2, false);

const arcPoints = arc2D.getPoints(50).map(p => new THREE.Vector3(p.x, p.y, 0));
const midCircle = new THREE.CatmullRomCurve3(arcPoints);

const lowerBezierCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(handleMidHeight/2, -handleMidHeight/2 + handleDiameter/2, 0),
    new THREE.Vector3((8*handleBottomWidth - handleMidHeight)/6, -handleMidHeight/2, 0),
    new THREE.Vector3((8*handleBottomWidth - handleMidHeight)/6, -(handleHeight - handleDiameter)/2 - handleMidHeight/2, 0),
    new THREE.Vector3(0, -(handleHeight - handleDiameter)/2 - handleMidHeight/2, 0)
);

const handleCurve = new THREE.CurvePath<THREE.Vector3>();
handleCurve.add(upperBezierCurve);
handleCurve.add(midCircle);
handleCurve.add(lowerBezierCurve);

const numOfPoints = 240;
const points = midCircle.getPoints(numOfPoints);
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

const handleGeometry = new THREE.TubeGeometry(handleCurve, 256, handleDiameter/2, 32);
const handleMaterial = new THREE.MeshBasicMaterial({ color: "cyan", wireframe: false, side: THREE.DoubleSide });

const circle = new THREE.Line(lineGeometry, handleMaterial);
const handle = new THREE.Mesh(handleGeometry, handleMaterial);
scene.add(handle, circle);

function animate() {
    renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}