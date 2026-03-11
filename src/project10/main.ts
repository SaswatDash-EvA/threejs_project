import * as THREE from 'three';
import { outerOutsideFrame, boundaryFrame, uiLines, uiTexts, profileOutline, profileInlines, profileCardTexts, bottomMainPanelShapes } from './meshes';
import { mainCameraFOV, mainCameraPosition, outerFrameHeight, outerFrameWidth } from './geometries';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const mainScene = new THREE.Scene();
mainScene.background = new THREE.Color("#f5f5f5");
const uiScene = new THREE.Scene();
uiScene.background = new THREE.Color("#f5f5f5");
const overlayScene = new THREE.Scene();
overlayScene.background = new THREE.Color("#f5f5f5");

const mainCamera = new THREE.PerspectiveCamera(mainCameraFOV * 180 / Math.PI, 1, 0.1, 1000);
mainCamera.position.z = mainCameraPosition;

let uiCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
uiCamera.position.z = 1;

const overlayCamera = new THREE.OrthographicCamera(
    -window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    -window.innerHeight / 2,
    0.1,
    1000
);
overlayCamera.position.z = 1;
new OrbitControls(mainCamera, renderer.domElement);

// Setting dimentions of main scene Viewport
let mainViewportW = 0.65 * outerFrameWidth, mainViewportH = outerFrameHeight;
let mainViewportX = (window.innerWidth - outerFrameWidth) / 2, mainViewportY = (window.innerHeight - outerFrameHeight) / 2;

// Setting dimentions of UI scene viewport
let uiViewportW = 0.35 * outerFrameWidth, uiViewportH = outerFrameHeight;
let uiViewportX = (window.innerWidth - outerFrameWidth) / 2 + mainViewportW, uiViewportY = (window.innerHeight - outerFrameHeight) / 2;

mainCamera.aspect = mainViewportW / mainViewportH;
mainCamera.updateProjectionMatrix();

uiCamera.left = -uiViewportW / 2;
uiCamera.right = uiViewportW / 2;
uiCamera.top = uiViewportH / 2;
uiCamera.bottom = -uiViewportH / 2;
uiCamera.updateProjectionMatrix();

// const axesHelper = new THREE.AxesHelper(uiViewportW / 2);

mainScene.add(outerOutsideFrame, profileOutline, profileInlines, ...profileCardTexts, ...bottomMainPanelShapes);
uiScene.add(uiLines, ...uiTexts/*, axesHelper*/);
overlayScene.add(boundaryFrame);

function animate() {
    renderer.setScissorTest(false);
    renderer.clear(true, true, true);

    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.setScissorTest(false);
    renderer.render(overlayScene, overlayCamera);

    // Render main scene
    renderer.setViewport(mainViewportX, mainViewportY, mainViewportW, mainViewportH);
    renderer.setScissor(mainViewportX, mainViewportY, mainViewportW, mainViewportH);
    renderer.setScissorTest(true);
    renderer.render(mainScene, mainCamera);

    // Render UI
    renderer.setViewport(uiViewportX, uiViewportY, uiViewportW, uiViewportH);
    renderer.setScissor(uiViewportX, uiViewportY, uiViewportW, uiViewportH);
    renderer.setScissorTest(true);
    renderer.render(uiScene, uiCamera);

}

window.addEventListener("resize", onWindowResize);
function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    mainCamera.updateProjectionMatrix();
}