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

let extrudeCircleMajorRadius = 0.25;
const circularShape = new THREE.Shape();
circularShape.absarc(0, 0, extrudeCircleMajorRadius, 0, 2 * Math.PI);

const trapizoidGeometry = new THREE.ExtrudeGeometry(squareShape, {
    bevelEnabled: false,
    curveSegments: 1,
    depth: extrudeDepth,
});
trapizoidGeometry.translate(0, 0, -extrudeDepth/2);

const cylinderExtrudeGeometry = new THREE.ExtrudeGeometry(circularShape, {
    bevelEnabled: false,
    depth: extrudeDepth,
    curveSegments: 256
});
cylinderExtrudeGeometry.translate(0, 0, -extrudeDepth/2);

trapizoidGeometry.deleteAttribute("normal");
trapizoidGeometry.deleteAttribute("uv");
const cleanTrapizoidGeometry = BufferGeometryUtils.mergeVertices(trapizoidGeometry);

cylinderExtrudeGeometry.deleteAttribute("normal");
cylinderExtrudeGeometry.deleteAttribute("uv");
const cleanCylinderGeometry = BufferGeometryUtils.mergeVertices(cylinderExtrudeGeometry);

const activeGeometry = cleanCylinderGeometry;

function cutPolygon() {
    if (activeGeometry === cleanTrapizoidGeometry) {
        const positionAttribute = cleanTrapizoidGeometry.attributes.position;
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
    }
    else {
        const positionAttribute = cleanCylinderGeometry.attributes.position;
        const vertexArray = positionAttribute.array;

        for (let i = 0; i < vertexArray.length; i += 3) {
            if (vertexArray[i+1] == -extrudeCircleMajorRadius) continue;

            if (((2 * extrudeCircleMajorRadius / Math.tan(angle1)) + (2 * extrudeCircleMajorRadius / Math.tan(angle2))) <= extrudeDepth) {
                if (vertexArray[i+2] > 0)
                    vertexArray[i+2] -= (vertexArray[i+1] + extrudeCircleMajorRadius) / Math.tan(angle1);
                else vertexArray[i+2] += (vertexArray[i+1] + extrudeCircleMajorRadius) / Math.tan(angle2);
            }            
        }
        positionAttribute.needsUpdate = true;
    }
}

cutPolygon();

const material = new THREE.MeshBasicMaterial({ color: "#45b324", wireframe: false });
const edgeMaterial = new THREE.MeshBasicMaterial({ color: "#ec1313" });

const activeEdgeGeo = new THREE.EdgesGeometry(activeGeometry);
const activeLineSegments = new THREE.LineSegments(activeEdgeGeo, edgeMaterial);

const activeShape = new THREE.Mesh(activeGeometry, material);
activeShape.add(activeLineSegments);

const axesHelper = new THREE.AxesHelper(extrudeDepth/2 + 3);
axesHelper.setColors("red", "yellow", "blue");

scene.add(activeShape, axesHelper);

function animate() {
    renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}