import { lightvisibility, meshes, firstStandardMaterial, secondStandardMaterial, glossyStandardMaterial, updateLights, rectangleLength, rectangleWidth, updateRectangleLength, updateRectangleWidth, updateRectangleDepth, updateCircleRadius, updateExtrudedRectangle } from "./main";

export function enableExtrudeGeometry() {
	const extrudeInfo = document.getElementById("extrude-info") as HTMLDivElement;
	if (extrudeInfo) {
		extrudeInfo.innerHTML = `<h3>Extrude Shape: Enabled</h3><label for="rectangle-length"><strong>Length</strong></label>
				<input class="extrudeshape-input" type="range" name="rectangle-length" min="0.1" max="1" value="0.5" step="0.01"> <br>
				<label for="rectangle-width"><strong>Width</strong></label>
				<input class="extrudeshape-input" type="range" name="rectangle-width" min="0.1" max="1" value="0.5" step="0.01"> <br>
				<label for="rectangle-depth"><strong>Depth</strong></label>
				<input class="extrudeshape-input" type="range" name="rectangle-depth" min="0.1" max="0.5" value="0.2" step="0.01"> <br>
				<label for="circle-radius"><strong>Circle Radius</strong></label>
				<input class="extrudeshape-input" type="range" name="circle-radius" min="0.01" max="${rectangleLength > rectangleWidth? rectangleWidth/4:rectangleLength/4}" value="0.06" step="0.01">`;
	}
	const extrudeInputElements = document.getElementsByClassName("extrudeshape-input");
	Array.from(extrudeInputElements).forEach(element => {
		element.addEventListener("input", function(this: HTMLInputElement) {
			if (element.getAttribute("name") === "rectangle-length") updateRectangleLength(parseFloat(this.value));
			if (element.getAttribute("name") === "rectangle-width") updateRectangleWidth(parseFloat(this.value));
			if (element.getAttribute("name") === "rectangle-depth") updateRectangleDepth(parseFloat(this.value));
			if (element.getAttribute("name") === "circle-radius") updateCircleRadius(parseFloat(this.value));

			updateExtrudedRectangle();
		});		
	});
}


export function disableExtrudeGeometry() {
    const extrudeInfo = document.getElementById("extrude-info") as HTMLDivElement;
	if (extrudeInfo) {
		extrudeInfo.innerHTML = "<h3>Extrude Shape: Disabled</h3>";
	}
}

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
			if (shapeid == 8) enableExtrudeGeometry();
			else disableExtrudeGeometry();
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
