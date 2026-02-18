import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.OrthographicCamera(-aspect, aspect);
camera.position.set(10, 5, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

// Room geometry
const floorGeometry = new THREE.PlaneGeometry(1, 1);
const leftWallGeomtry = new THREE.PlaneGeometry(1, 0.6);
const backWallGeometry = new THREE.PlaneGeometry(1, 0.6);
floorGeometry.rotateX((-1 * Math.PI) / 2);
leftWallGeomtry.rotateY(Math.PI / 2);
floorGeometry.translate(0.5, 0, 0.5);
backWallGeometry.translate(0.5, 0.3, 0);
leftWallGeomtry.translate(0, 0.3, 0.5);

const floorMaterial = new THREE.MeshStandardMaterial({
	color: "#c8c6c0",
	metalness: 0,
	roughness: 0.75,
});
const leftWallMaterial = new THREE.MeshStandardMaterial({
	color: "#c5c3bd",
	metalness: 0,
	roughness: 0.75,
});
const backWallMaterial = new THREE.MeshStandardMaterial({
	color: "#d2d0ca",
	metalness: 0,
	roughness: 0.75,
});

const floor = new THREE.Mesh(floorGeometry, floorMaterial);
const leftWall = new THREE.Mesh(leftWallGeomtry, leftWallMaterial);
const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
scene.add(floor, leftWall, backWall);

// 9 Different shapes
const sphereGeometry = new THREE.SphereGeometry(0.15);
const cubeGeometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.4);
const coneGeometry = new THREE.ConeGeometry(0.2, 0.3);
const torusGeometry = new THREE.TorusGeometry(0.2, 0.08);
const capsuleGeometry = new THREE.CapsuleGeometry(0.1, 0.2);
const pyramidGeometry = new THREE.TetrahedronGeometry(0.2);
const magicboxGeometry = new THREE.IcosahedronGeometry(0.15);
const glossySphereGeometry = new THREE.SphereGeometry(0.15);

const firstStandardMaterial = new THREE.MeshStandardMaterial({
	color: "red",
	metalness: 0.2,
	roughness: 0.6,
});
const secondStandardMaterial = new THREE.MeshStandardMaterial({
	color: "blue",
	metalness: 0.25,
	roughness: 0.48,
});
const glossySphereMaterial = new THREE.MeshStandardMaterial({
	color: "gray",
	metalness: 0.95,
	roughness: 0.02,
});

function animate() {
	renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
