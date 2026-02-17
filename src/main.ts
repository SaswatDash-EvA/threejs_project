import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000,
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ellipseGeometry = new THREE.SphereGeometry(1, 64, 64);
const material = new THREE.MeshBasicMaterial({
	color: 0x00ff00,
	wireframe: true,
});
const ellipsoid = new THREE.Mesh(ellipseGeometry, material);
scene.add(ellipsoid);
camera.position.z = 5;

let clock = new THREE.Clock();
const omega = 1;
function animate() {
	const deltatime = clock.getDelta();
	const time = clock.getElapsedTime();
	let scaleX = 1 + 0.5 * Math.sin(omega * time);
	let scaleY = 1 - 0.5 * Math.sin(omega * time);

	ellipsoid.scale.set(scaleX, scaleY, 1);
	ellipsoid.rotation.set(deltatime, deltatime, 0);

	renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
