import * as THREE from "three/webgpu";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import {
	time,
	positionLocal,
	uv,
	sin,
	mul,
	vec3,
} from "three/src/nodes/TSL.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);
const camera = new THREE.PerspectiveCamera(
	60,
	window.innerWidth / window.innerHeight,
	0.1,
	100,
);
camera.position.set(2.5, 1.5, 5);
const renderer = new THREE.WebGPURenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Orbit controls functions for camera
const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;
control.dampingFactor = 0.1;
control.enablePan = true;
control.panSpeed = 5;
scene.add(new THREE.AmbientLight("white", 0.4));

const light = new THREE.DirectionalLight("white", 1);
light.position.set(3, 5, 2);
scene.add(light);

const geometry = new THREE.PlaneGeometry(3, 2, 120, 60);

// --- NODE MATERIAL (WebGPU compatible) ---
const material = new THREE.MeshStandardNodeMaterial({
	side: THREE.DoubleSide,
});

// Two sine waves
const t = time;
const wave1 = sin(positionLocal.x.mul(2.0).add(mul(t, 2.0))).mul(0.15);
const wave2 = sin(positionLocal.y.mul(3.0).add(mul(t, 1.5))).mul(0.1);

const combinedWave = wave1.add(wave2);

// Pin left edge (uv.x == 0 → no movement)
const pin = uv().x;

// Apply displacement only on Z
const displacedPosition = vec3(
	positionLocal.x,
	positionLocal.y,
	positionLocal.z.add(combinedWave.mul(pin)),
);

material.positionNode = displacedPosition;

// Simple tricolor
material.colorNode = vec3(
	uv()
		.y.greaterThan(0.66)
		.select(1.0, uv().y.greaterThan(0.33).select(1.0, 0.01)),
	uv()
		.y.greaterThan(0.66)
		.select(0.4, uv().y.greaterThan(0.33).select(1.0, 0.42)),
	uv()
		.y.greaterThan(0.66)
		.select(0.2, uv().y.greaterThan(0.33).select(1.0, 0.22)),
);

const flag = new THREE.Mesh(geometry, material);
flag.position.x = 1.5;
scene.add(flag);

const poleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2.2, 32);
const poleMaterial = new THREE.MeshStandardMaterial({
	color: 0x999999,
	metalness: 0.8,
	roughness: 0.3,
});

const pole = new THREE.Mesh(poleGeometry, poleMaterial);
scene.add(pole);

function animate() {
	renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
