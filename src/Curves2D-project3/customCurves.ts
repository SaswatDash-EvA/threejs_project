import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	60,
	window.innerWidth / window.innerHeight,
	0.1,
	100,
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const controlPoints: Array<THREE.Vector3> = [
	new THREE.Vector3(-6, 0, 0),
	new THREE.Vector3(-2, 3.5, 0),
	new THREE.Vector3(2, 0.5, 0),
	new THREE.Vector3(5, 2.5, 0),
	new THREE.Vector3(7, 0, 0),
	new THREE.Vector3(4.5, -4.5, 0),
	new THREE.Vector3(1.5, -3, 0),
	new THREE.Vector3(-4, -4, 0),
];
const splineCurve = new THREE.CatmullRomCurve3(
	controlPoints,
	true,
	"catmullrom",
);
const numOfDivisions = 240;
const splineCurvePoints = splineCurve.getPoints(numOfDivisions);
const splineCurveGeometry = new THREE.BufferGeometry().setFromPoints(
	splineCurvePoints,
);
const splineCurveMaterial = new THREE.LineBasicMaterial({ color: "cyan" });

const catmullrumSpline = new THREE.Line(
	splineCurveGeometry,
	splineCurveMaterial,
);
scene.add(catmullrumSpline);

const donutsGeometry = new THREE.TorusGeometry(0.8, 0.3, 20, 127);
donutsGeometry.rotateX(Math.PI / 2);
const donutMaterial = new THREE.MeshBasicMaterial({
	color: "blue",
});
const donut = new THREE.Mesh(donutsGeometry, donutMaterial);
scene.add(donut);

let i = 0;
const position = new THREE.Vector3();
const direction = new THREE.Vector3();
function animate() {
	splineCurve.getPointAt(i / numOfDivisions, position);
	splineCurve.getTangentAt(i / numOfDivisions, direction);
	donut.position.set(position.x, position.y, 0);

	const angle = Math.atan2(direction.y, direction.x);
	donut.rotation.set(0, 0, angle - Math.PI/2);
	renderer.render(scene, camera);
	i = (i + 1) % numOfDivisions;
}

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
