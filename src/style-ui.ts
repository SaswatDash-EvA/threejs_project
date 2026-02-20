import { lightvisibility, meshes, firstStandardMaterial, secondStandardMaterial, glossyStandardMaterial, updateLights } from "./main";

const shapes =
	document.querySelectorAll<HTMLAnchorElement>("#shapesDropdown a");
const materials = document.querySelectorAll<HTMLAnchorElement>(
	"#materialsDropdown a",
);
const lights = document.querySelectorAll<HTMLAnchorElement>(
	"#lightingDropdown a",
);
const cameraText = document.getElementById("cameraType");

let currentShape: number = 0;
let currentMaterial: number = 0;
let lightsOn: Array<boolean> = [true, false, false];
let isPerspective: boolean = true;

function clearActive(list: NodeListOf<HTMLAnchorElement>): void {
	list.forEach((item) => item.classList.remove("active-item"));
}

function updateUI(): void {
	clearActive(shapes);
	clearActive(materials);
	clearActive(lights);

	if (shapes[currentShape]) {
		shapes[currentShape].classList.add("active-item");
	}

	if (materials[currentMaterial]) {
		materials[currentMaterial].classList.add("active-item");
	}

	for (let i = 0; i < 3; i++) {
		if (lightsOn[i])
			lights[i].classList.add("active-item");
	}

	if (cameraText) {
		cameraText.textContent = isPerspective ? "Perspective" : "Orthographic";
	}
}

const materialsArray = [ firstStandardMaterial, secondStandardMaterial, glossyStandardMaterial ];
const dropdownItems = document.querySelectorAll<HTMLAnchorElement>('a');
dropdownItems.forEach((dropdownItem) => {
	dropdownItem.addEventListener('click', () => { 
		if (dropdownItem.parentElement?.id === "shapesDropdown") {
			const shapeid = parseInt(dropdownItem.getAttribute("data-index")!);
			currentShape = shapeid;
			meshes.forEach((mesh) => {
				mesh.visible = mesh === meshes[shapeid];
			});
		}
		else if (dropdownItem.parentElement?.id === "materialsDropdown") {
			const materialId = parseInt(dropdownItem.getAttribute("data-index")!);
			currentMaterial = materialId;
			meshes.forEach((mesh) => {
				mesh.material = materialsArray[materialId];
			});
		}
		else if (dropdownItem.parentElement?.id === "lightingDropdown") {
			const lightId = parseInt(dropdownItem.getAttribute("data-index")!, 10);
			lightsOn[lightId] = !lightsOn[lightId];
			lightvisibility[lightId] = !lightvisibility[lightId];
			updateLights();
		}
		updateUI();
	});
});

document.addEventListener("keydown", (event: KeyboardEvent): void => {
	const key = event.key;

	if (key >= "1" && key <= "9") {
		currentShape = parseInt(key, 10) - 1;
	}

	if (key === "f" || key === "F") currentMaterial = 0;
	if (key === "s" || key === "S") currentMaterial = 1;
	if (key === "g" || key === "G") currentMaterial = 2;

	if (key === "a" || key === "A") lightsOn[0] = !lightsOn[0];
	if (key === "b" || key === "B") lightsOn[1] = !lightsOn[1];
	if (key === "c" || key === "C") lightsOn[2] = !lightsOn[2];

	if (key === "l" || key === "L") {
		isPerspective = !isPerspective;
	}

	updateUI();
});

updateUI();
