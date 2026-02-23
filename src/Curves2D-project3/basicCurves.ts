import * as THREE from "three";

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

const ellipseCurve = new THREE.EllipseCurve(0, 0, 7, 3);
const arcCurve = new THREE.ArcCurve(
	0,
	0,
	5,
	Math.PI / 4,
	(3 * Math.PI) / 4,
	true,
);
const tangentVector = ellipseCurve.getTangent(0.2).clone();
const ellipsePoint = ellipseCurve.getPoint(0.2).clone();

const lineCurve = new THREE.LineCurve(
	ellipsePoint.clone().sub(tangentVector.clone().multiplyScalar(5)),
	ellipsePoint.clone().add(tangentVector.clone().multiplyScalar(10)),
);

const ellipsePoints = ellipseCurve.getPoints(100);
const ellipseGeometry = new THREE.BufferGeometry().setFromPoints(ellipsePoints);
const ellipseMaterial = new THREE.LineBasicMaterial({ color: "green" });

const arcPoints = arcCurve.getPoints(100);
const arcGeometry = new THREE.BufferGeometry().setFromPoints(arcPoints);
const arcMaterial = new THREE.LineBasicMaterial({ color: "magenta" });

const linePoints = lineCurve.getPoints(100);
const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
const lineMaterial = new THREE.LineBasicMaterial({ color: "cyan" });

const ellipse = new THREE.Line(ellipseGeometry, ellipseMaterial);
const circularArc = new THREE.Line(arcGeometry, arcMaterial);
const straightLine = new THREE.Line(lineGeometry, lineMaterial);
scene.add(ellipse, circularArc, straightLine);

function animate() {
	renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
