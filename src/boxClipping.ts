import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { SUBTRACTION, Brush, Evaluator } from "three-bvh-csg";

const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(
    60,
    aspect,
    0.1,
    100,
);
camera.position.set(1.8, 0.9, 1.8);
camera.lookAt(0, 0, 1);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.localClippingEnabled = true;
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
const trapizoidBrush = new Brush(trapizoidGeometry);
trapizoidBrush.position.z = -1;
trapizoidBrush.updateMatrixWorld();

const brush1 = new Brush(new THREE.BoxGeometry(0.4 * Math.sqrt(2), 0.4 * Math.sqrt(2), 0.8 / Math.sqrt(2)));
brush1.position.set(0, 0.2, 1);
brush1.rotateX(-Math.PI / 4);
brush1.updateMatrixWorld();

const brush2 = new Brush(new THREE.BoxGeometry(0.4 * Math.sqrt(2), 0.4 * Math.sqrt(2), 0.8 / Math.sqrt(2)));
brush2.position.set(0, 0.2, -1);
brush2.rotateX(Math.PI / 4);
brush2.updateMatrixWorld();

const evaluator = new Evaluator();
const halfTrapizoid = evaluator.evaluate( trapizoidBrush, brush2, SUBTRACTION );
const result = evaluator.evaluate(halfTrapizoid, brush1, SUBTRACTION);

const material = new THREE.MeshBasicMaterial({ color: "#45b324" });
const edgeMaterial = new THREE.MeshBasicMaterial({ color: "#ec1313" });

const trapizoidEdgeGeo = new THREE.EdgesGeometry(result.geometry);
const trapizoidLineSegments = new THREE.LineSegments(trapizoidEdgeGeo, edgeMaterial);

const trapizoid = new THREE.Mesh(result.geometry, material);
trapizoid.add(trapizoidLineSegments);

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