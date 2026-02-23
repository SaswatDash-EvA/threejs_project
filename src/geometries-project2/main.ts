import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { disableExtrudeGeometry, enableExtrudeGeometry } from "./style-ui";

const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const orthoCamera = new THREE.OrthographicCamera(-aspect, aspect);
orthoCamera.position.set(10, 5, 10);
orthoCamera.lookAt(0, 0, 0);

const perspectCamera = new THREE.PerspectiveCamera(
	60,
	window.innerWidth / window.innerHeight,
	0.1,
	100,
);
perspectCamera.position.set(1.8, 0.9, 1.8);
perspectCamera.lookAt(0, 0, 0);

let activeCamera: THREE.Camera = orthoCamera;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

new OrbitControls(orthoCamera, renderer.domElement);
new OrbitControls(perspectCamera, renderer.domElement);

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

// Shape for the extruded rectangle
export let rectangleLength = 0.5, rectangleWidth = 0.4, rectangleDepth = 0.2;
let circleRadius = 0.06;
export function updateRectangleLength(num: number) { rectangleLength = num; }
export function updateRectangleWidth(num: number) { rectangleWidth = num; }
export function updateRectangleDepth(num: number) { rectangleDepth = num; }
export function updateCircleRadius(num: number) { circleRadius = num; }
const rectangleShape = new THREE.Shape([
	new THREE.Vector2(rectangleLength/2, rectangleWidth/2),
	new THREE.Vector2(rectangleLength/2, -rectangleWidth/2),
	new THREE.Vector2(-rectangleLength/2, -rectangleWidth/2),
	new THREE.Vector2(-rectangleLength/2, rectangleWidth/2)
]);
rectangleShape.closePath();
const holes = [ new THREE.Path(), new THREE.Path(), new THREE.Path(), new THREE.Path() ];
holes[0].absarc(rectangleLength/4, rectangleWidth/4, circleRadius, 0, 2*Math.PI );
holes[1].absarc(rectangleLength/4, -rectangleWidth/4, circleRadius, 0, 2*Math.PI );
holes[2].absarc(-rectangleLength/4, -rectangleWidth/4, circleRadius, 0, 2*Math.PI );
holes[3].absarc(-rectangleLength/4, rectangleWidth/4, circleRadius, 0, 2*Math.PI );
rectangleShape.holes.push(...holes);

// 9 Different shapes
const sphereGeometry = new THREE.SphereGeometry(0.2, 64, 64);
const cubeGeometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.4);
const coneGeometry = new THREE.ConeGeometry(0.2, 0.3, 64, 64);
const torusGeometry = new THREE.TorusGeometry(0.2, 0.08);
const capsuleGeometry = new THREE.CapsuleGeometry(0.1, 0.2, 64, 64, 64);
const pyramidGeometry = new THREE.TetrahedronGeometry(0.2);
const magicboxGeometry = new THREE.IcosahedronGeometry(0.15);
const extrudedRectangleGeometry = new THREE.ExtrudeGeometry(rectangleShape, {
	depth: rectangleDepth,
	bevelEnabled: false
});

sphereGeometry.translate(0.35, 0.35, 0.35);
cubeGeometry.translate(0.5, 0.5, 0.5);
cylinderGeometry.translate(0.5, 0.5, 0.5);
coneGeometry.translate(0.5, 0.3, 0.5);
torusGeometry.translate(0.4, 0.4, 0.3);
capsuleGeometry.translate(0.4, 0.3, 0.3);
pyramidGeometry.translate(0.3, 0.3, 0.3);
magicboxGeometry.translate(0.25, 0.25, 0.25);
extrudedRectangleGeometry.translate(-0.3, 0.3, 0.3);
extrudedRectangleGeometry.rotateY(Math.PI/2);

export const firstStandardMaterial = new THREE.MeshStandardMaterial({
	color: "red",
	metalness: 0.2,
	roughness: 0.6,
});
export const secondStandardMaterial = new THREE.MeshStandardMaterial({
	color: "blue",
	metalness: 0.25,
	roughness: 0.48
});
export const glossyStandardMaterial = new THREE.MeshStandardMaterial({
	color: "gray",
	metalness: 0.42,
	roughness: 0.02
});

const sphere = new THREE.Mesh(sphereGeometry, firstStandardMaterial);
const cube = new THREE.Mesh(cubeGeometry, firstStandardMaterial);
const cylinder = new THREE.Mesh(cylinderGeometry, firstStandardMaterial);
const cone = new THREE.Mesh(coneGeometry, firstStandardMaterial);
const torus = new THREE.Mesh(torusGeometry, firstStandardMaterial);
const capsule = new THREE.Mesh(capsuleGeometry, firstStandardMaterial);
const pyramid = new THREE.Mesh(pyramidGeometry, firstStandardMaterial);
const magicbox = new THREE.Mesh(magicboxGeometry, firstStandardMaterial);
let extrudedRectangle = new THREE.Mesh(extrudedRectangleGeometry, firstStandardMaterial);

export const meshes: Array<THREE.Mesh> = [
	sphere,
	cube,
	cylinder,
	cone,
	torus,
	capsule,
	pyramid,
	magicbox,
	extrudedRectangle
];

export function updateExtrudedRectangle() {
	if (extrudedRectangle) {
        extrudedRectangle.geometry.dispose();
    }

    const rectangleShape = new THREE.Shape([
        new THREE.Vector2(rectangleLength/2, rectangleWidth/2),
        new THREE.Vector2(rectangleLength/2, -rectangleWidth/2),
        new THREE.Vector2(-rectangleLength/2, -rectangleWidth/2),
        new THREE.Vector2(-rectangleLength/2, rectangleWidth/2)
    ]);
    rectangleShape.closePath();

    const holes = [
        new THREE.Path(),
        new THREE.Path(),
        new THREE.Path(),
        new THREE.Path()
    ];

    holes[0].absarc(rectangleLength/4, rectangleWidth/4, circleRadius, 0, 2*Math.PI);
    holes[1].absarc(rectangleLength/4, -rectangleWidth/4, circleRadius, 0, 2*Math.PI);
    holes[2].absarc(-rectangleLength/4, -rectangleWidth/4, circleRadius, 0, 2*Math.PI);
    holes[3].absarc(-rectangleLength/4, rectangleWidth/4, circleRadius, 0, 2*Math.PI);

    rectangleShape.holes.push(...holes);

    const newGeometry = new THREE.ExtrudeGeometry(rectangleShape, {
        depth: rectangleDepth,
        bevelEnabled: false
    });

    newGeometry.translate(-0.3, 0.3, 0.3);
    newGeometry.rotateY(Math.PI/2);

    extrudedRectangle.geometry = newGeometry;
}

meshes.forEach((mesh) => {
	mesh.visible = false;
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	scene.add(mesh);
});
meshes[0].visible = true;

const dirLight = new THREE.DirectionalLight("white", 2);
dirLight.position.set(1, 0.6, 0.2);
dirLight.castShadow = true;

const pointLight = new THREE.PointLight(0xf8f0e3, 1, 0, 1.5);
pointLight.position.set(0.3, 0.8, 1.2);
pointLight.castShadow = true;
pointLight.visible = false;

const hemisphereLight = new THREE.HemisphereLight(0xfff8e7, 0xf4f8ff, 0.2);
hemisphereLight.position.set(0.5, 0.5, 2);
hemisphereLight.castShadow = true;
hemisphereLight.visible = false;

export const lightvisibility: Array<boolean> = [true, false, false];
scene.add(dirLight, pointLight, hemisphereLight);

function animate() {
	renderer.render(scene, activeCamera);
}

export function updateLights() {
	dirLight.visible = lightvisibility[0];
	pointLight.visible = lightvisibility[1];
	hemisphereLight.visible = lightvisibility[2];
}

window.addEventListener("resize", onWindowResize);
function onWindowResize() {
	orthoCamera.updateProjectionMatrix();
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
		case "6":
		case "7":
		case "8":
		case "9":
			const index = parseInt(event.key) - 1;
			meshes.forEach((mesh) => {
				mesh.visible = mesh === meshes[index];
			});
			if (index == 8) enableExtrudeGeometry();
			else disableExtrudeGeometry();
			break;

		case "a":
		case "A":
			lightvisibility[0] = !lightvisibility[0];
			updateLights();
			break;

		case "b":
		case "B":
			lightvisibility[1] = !lightvisibility[1];
			updateLights();
			break;

		case "c":
		case "C":
			lightvisibility[2] = !lightvisibility[2];
			updateLights();
			break;

		case "l":
		case "L":
			activeCamera =
				activeCamera == perspectCamera ? orthoCamera : perspectCamera;
			break;

		case "f":
		case "F":
			meshes.forEach((mesh) => {
				mesh.material = firstStandardMaterial;
			});
			break;

		case "s":
		case "S":
			meshes.forEach((mesh) => {
				mesh.material = secondStandardMaterial;
			});
			break;

		case "g":
		case "G":
			meshes.forEach((mesh) => {
				mesh.material = glossyStandardMaterial;
			});
			break;

		default:
			break;
	}
}