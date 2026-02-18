import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.OrthographicCamera(-aspect, aspect);
camera.position.set(10, 5, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
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
	side: THREE.DoubleSide,
});
const leftWallMaterial = new THREE.MeshStandardMaterial({
	color: "#c5c3bd",
	metalness: 0,
	roughness: 0.75,
	side: THREE.DoubleSide,
});
const backWallMaterial = new THREE.MeshStandardMaterial({
	color: "#d2d0ca",
	metalness: 0,
	roughness: 0.75,
	side: THREE.DoubleSide,
});

const floor = new THREE.Mesh(floorGeometry, floorMaterial);
const leftWall = new THREE.Mesh(leftWallGeomtry, leftWallMaterial);
const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
floor.receiveShadow = true;
leftWall.receiveShadow = true;
backWall.receiveShadow = true;
scene.add(floor, leftWall, backWall);

// 9 Different shapes
const sphereGeometry = new THREE.SphereGeometry(0.2, 64, 64);
const cubeGeometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.4);
const coneGeometry = new THREE.ConeGeometry(0.2, 0.3);
const torusGeometry = new THREE.TorusGeometry(0.2, 0.08);
// const capsuleGeometry = new THREE.CapsuleGeometry(0.1, 0.2);
// const pyramidGeometry = new THREE.TetrahedronGeometry(0.2);
// const magicboxGeometry = new THREE.IcosahedronGeometry(0.15);
// const glossySphereGeometry = new THREE.SphereGeometry(0.15);

sphereGeometry.translate(0.35, 0.35, 0.35);
cubeGeometry.translate(0.3, 0.3, 0.3);
cylinderGeometry.translate(0.3, 0.3, 0.3);
coneGeometry.translate(0.3, 0.2, 0.3);
torusGeometry.translate(0.34, 0.34, 0.14);

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
// const glossySphereMaterial = new THREE.MeshStandardMaterial({
// 	color: "gray",
// 	metalness: 0.95,
// 	roughness: 0.02,
// });

const sphere = new THREE.Mesh(sphereGeometry, firstStandardMaterial);
// sphere.visible = false;
const cube = new THREE.Mesh(cubeGeometry, firstStandardMaterial);
cube.visible = false;
const cylinder = new THREE.Mesh(cylinderGeometry, firstStandardMaterial);
cylinder.visible = false;
const cone = new THREE.Mesh(coneGeometry, secondStandardMaterial);
cone.visible = false;
const torus = new THREE.Mesh(torusGeometry, secondStandardMaterial);
torus.visible = false;

const dirLight = new THREE.DirectionalLight("white");
dirLight.position.set(1, 0.6, 0.2);
dirLight.castShadow = true;

scene.add(sphere, dirLight);

function animate() {
	renderer.render(scene, camera);
}

// const keymaps: Record<string, THREE.Mesh> = {
// 	"1": sphere,
// 	"2": cube,
// 	"3": cylinder,
// 	"4": cone,
// 	"5": torus,
// };

window.addEventListener("resize", onWindowResize);
function onWindowResize() {
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("keypress", onNumericKeyPress);
function onNumericKeyPress(event: KeyboardEvent): void {
	switch (event.key) {
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		// case "6":
		// case "7":
		// case "8":
		// case "9":

		default:
			break;
	}
}
