import * as THREE from 'three/webgpu';
import { windowHeight, windowWidth } from './dynamicVariables';
import { backPlate, glass, midHoleCylinder, windowFrames } from './meshes';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { highlightMeshes, removeHighlights } from './raycaster';
import { changeScale, setBackSide, setHandlePositionOnFrame, switchToSide } from './dynamicChangeSystem';
import { cockSpurHandleHeight, cockSpurHandleWidth } from './handleVariables';

const renderer = new THREE.WebGPURenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Global variables
const scene = new THREE.Scene();
scene.background = new THREE.Color("#f0f0f0");
const camera = new THREE.OrthographicCamera();
camera.position.z = Math.max(windowWidth, windowHeight);
let aspect = window.innerWidth / window.innerHeight;

// Ray caster to select window profiles
const rayCaster = new THREE.Raycaster();

function updateScene(frustumHeight: number) {
    aspect = window.innerWidth / window.innerHeight;
    camera.left = -frustumHeight * aspect / 2;
    camera.right = frustumHeight * aspect / 2;
    camera.top = frustumHeight/2;
    camera.bottom = -frustumHeight/2;

    camera.far = 2 * Math.max(windowWidth, windowHeight);

    camera.updateProjectionMatrix();
}

updateScene(Math.max(windowWidth / aspect, windowHeight) * 1.5);

new OrbitControls(camera, renderer.domElement);

scene.add(...windowFrames, glass, backPlate, midHoleCylinder);

function animate() {
    renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
    aspect = window.innerWidth / window.innerHeight;
    updateScene(Math.max(windowHeight * 1.8, windowWidth * 1.8));
});

window.addEventListener("dblclick", (event: MouseEvent) => {
    const mouseCoordX = 2 * event.clientX / window.innerWidth - 1;
    const mouseCoordY = 1 - 2 * event.clientY / window.innerHeight;

    rayCaster.setFromCamera(new THREE.Vector2(mouseCoordX, mouseCoordY), camera);
    if (highlightMeshes(rayCaster)) 
        console.log(mouseCoordX, mouseCoordY);
});

// Remove the highlights by single click and avoid removal for click and drag
let isDragging = false;
window.addEventListener("mousedown", () => {
    window.addEventListener("mousemove", onMouseMove);
})

function onMouseMove(event: MouseEvent) {
    if (event.buttons === 0) return;
    isDragging = true;
}

window.addEventListener("mouseup", () => {
    if (isDragging) {
        window.removeEventListener("mousemove", onMouseMove);
        isDragging = false;
        return;
    }
    removeHighlights();
});

window.addEventListener("dragstart", (event: DragEvent) =>{
    event.preventDefault();
});

let scaleX = 1, scaleY = 1;
function setHandleWidth(value: number) {
    scaleX = value/cockSpurHandleWidth;
    changeScale(scaleX, scaleY);
}

function setHandleHeight(value: number) {
    scaleY = value/cockSpurHandleHeight;
    changeScale(scaleX, scaleY);
}

const handleWidthSlider = document.getElementById("handleWidth") as HTMLInputElement;
const handleHeightSlider = document.getElementById("handleHeight") as HTMLInputElement;
const handlePositionSlider = document.getElementById("handlePosition") as HTMLInputElement;
const handleSidePositioners = document.querySelectorAll('input[name="side"]') as NodeListOf<HTMLInputElement>;
const handleBackPositioner = document.getElementById("backside") as HTMLInputElement;

handleWidthSlider.addEventListener("input", (event: Event) => {
    const target = event.target as HTMLInputElement;
    setHandleWidth(target.valueAsNumber);
});

handleHeightSlider.addEventListener("input", (event: Event) => {
    const target = event.target as HTMLInputElement;
    setHandleHeight(target.valueAsNumber);
});

handlePositionSlider.addEventListener("input", (event: Event) => {
    const target = event.target as HTMLInputElement;
    setHandlePositionOnFrame(target.valueAsNumber - windowHeight/2);
});

handleSidePositioners.forEach(sideOption => {
    sideOption.addEventListener("change", (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.checked) {
            switchToSide(parseInt(target.value));
        }
    });
});

handleBackPositioner.addEventListener("input", (event: Event) => {
    const target = event.target as HTMLInputElement;
    setBackSide(target.checked);
});