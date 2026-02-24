import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { BufferGeometryUtils } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(
    60,
    aspect,
    0.1,
    100,
);
camera.position.set(2, 1, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.localClippingEnabled = true;
renderer.shadowMap.enabled = true;
renderer.localClippingEnabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const control = new OrbitControls(camera, renderer.domElement);
control.update();

let extrudeRectangleLength = 0.5, extrudeRectangleWidth = 0.5, extrudeDepth = 2;
let angle1 = Math.PI/4, angle2 = Math.PI/4;

const squareShape = new THREE.Shape();
squareShape.moveTo(extrudeRectangleLength/2, extrudeRectangleWidth/2);
squareShape.lineTo(extrudeRectangleLength/2, -extrudeRectangleWidth/2);
squareShape.lineTo(-extrudeRectangleLength/2, -extrudeRectangleWidth/2);
squareShape.lineTo(-extrudeRectangleLength/2, extrudeRectangleWidth/2);

squareShape.closePath();

const trapizoidGeometry = new THREE.ExtrudeGeometry(squareShape, {
    bevelEnabled: false,
    curveSegments: 1,
    depth: extrudeDepth,
    steps: 1
});
trapizoidGeometry.translate(0, 0, -extrudeDepth/2);

trapizoidGeometry.deleteAttribute("normal");
trapizoidGeometry.deleteAttribute("uv");
const cleanGeometry = BufferGeometryUtils.mergeVertices(trapizoidGeometry);

const positionAttribute = cleanGeometry.attributes.position;
const vertexArray = positionAttribute.array;

for (let i = 0; i < vertexArray.length; i += 3) {
    if (vertexArray[i+1] == -extrudeRectangleWidth/2) continue;

    if (((extrudeRectangleWidth / Math.tan(angle1)) + (extrudeRectangleWidth / Math.tan(angle2))) <= extrudeDepth) {
        if (vertexArray[i+2] > 0)
            vertexArray[i+2] -= 2 * vertexArray[i+1] / Math.tan(angle1);
        else vertexArray[i+2] += 2 * vertexArray[i+1] / Math.tan(angle2);
    }
    else {
        const y = Math.sin(angle1) * Math.cos(angle2) * extrudeDepth * Math.abs(2 * vertexArray[i+1] / extrudeRectangleWidth) / Math.sin(angle1 + angle2);
        vertexArray[i+2] = -extrudeDepth/2 + y;
        vertexArray[i+1] = -extrudeRectangleWidth/2 + y * Math.tan(angle2)
    }
    
}
positionAttribute.needsUpdate = true;

const material = new THREE.MeshBasicMaterial({ color: "#45b324", wireframe: false });
const edgeMaterial = new THREE.MeshBasicMaterial({ color: "#ec1313" });

const trapizoidEdgeGeo = new THREE.EdgesGeometry(cleanGeometry);
const trapizoidLineSegments = new THREE.LineSegments(trapizoidEdgeGeo, edgeMaterial);

const trapizoid = new THREE.Mesh(cleanGeometry, material);
trapizoid.add(trapizoidLineSegments);

const axesHelper = new THREE.AxesHelper(extrudeDepth/2 + 3);
axesHelper.setColors("red", "yellow", "blue");

scene.add(trapizoid, axesHelper);

function animate() {
    renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}