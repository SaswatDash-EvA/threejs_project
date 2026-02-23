import { rectangleLength, rectangleWidth, updateCircleRadius, updateExtrudedRectangle, updateRectangleDepth, updateRectangleLength, updateRectangleWidth } from "./main";



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
		});
		updateExtrudedRectangle();
	});
}


export function disableExtrudeGeometry() {
    const extrudeInfo = document.getElementById("extrude-info") as HTMLDivElement;
	if (extrudeInfo) {
		extrudeInfo.innerHTML = "<h3>Extrude Shape: Disabled</h3>";
	}
}