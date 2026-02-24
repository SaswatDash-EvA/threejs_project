import * as THREE from "three";
import { disableExtrudeGeometry, enableExtrudeGeometry } from "./style-ui";
import { activeCamera, changeActiveCamera } from "./cameras";
import { renderer } from "./renderer";
import { firstStandardMaterial, glossyStandardMaterial, secondStandardMaterial } from "./materials";
import { backWall, floor, leftWall, meshes } from "./meshes";

const scene = new THREE.Scene();

scene.add(floor, leftWall, backWall);

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
renderer.setAnimationLoop(animate);

export function updateLights() {
	dirLight.visible = lightvisibility[0];
	pointLight.visible = lightvisibility[1];
	hemisphereLight.visible = lightvisibility[2];
}

window.addEventListener("resize", onWindowResize);
function onWindowResize() {
	activeCamera.updateProjectionMatrix();
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
			changeActiveCamera();
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