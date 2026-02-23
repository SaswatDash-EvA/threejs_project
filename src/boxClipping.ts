import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(
    60,
    aspect,
    0.1,
    100,
);
camera.position.set(1.8, 0.9, 1.8);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.localClippingEnabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const squareShape = new THREE.Shape([
    new THREE.Vector2(0.2, 0.2),
    new THREE.Vector2(0.2, -0.2),
    new THREE.Vector2(-0.2, -0.2),
    new THREE.Vector2(-0.2, 0.2)
]);
squareShape.closePath();

const trapizoidGeometry = new THREE.ExtrudeGeometry(squareShape, {
    bevelEnabled: false,
    depth: 2
});
trapizoidGeometry.translate(0, 0, -1);

const material = new THREE.MeshBasicMaterial({ color: 0x268b07 });

const trapizoid = new THREE.Mesh(trapizoidGeometry, material);

scene.add(trapizoid);

function animate() {
    renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}