import * as THREE from 'three';
import { Line, type ExtrudePath } from "./customObjects";
import { extrudeRectangleLength, extrudeRectangleWidth } from './geometries';

const edge1Lines = [
    new Line(new THREE.Vector2(0.8, 2), new THREE.Vector2(2, 0.35)),
    new Line(new THREE.Vector2(0.8, -2), new THREE.Vector2(2, -0.4))
];

const edge2Lines = [
    new Line(new THREE.Vector2(1.5, 0.8), new THREE.Vector2(3, 0.35)),
    new Line(new THREE.Vector2(-1.5, 0.8), new THREE.Vector2(-3, 0.35))
];

const edge3Lines = [
    new Line(new THREE.Vector2(-0.8, 2), new THREE.Vector2(-2, 0.35)),
    new Line(new THREE.Vector2(-0.8, -2), new THREE.Vector2(-2, -0.35))
];

const edge4Lines = [
    new Line(new THREE.Vector2(-1.5, -0.8), new THREE.Vector2(-3, -0.35)),
    new Line(new THREE.Vector2(1.5, -0.8), new THREE.Vector2(4, 0.35))
];

const cutData: ExtrudePath = {
    edge1: edge1Lines,
    edge2: edge2Lines,
    edge3: edge3Lines,
    edge4: edge4Lines
};

export function cutExtrudeRectangle(geometry: THREE.ExtrudeGeometry) {
    const vertexArray: THREE.TypedArray = geometry.attributes.position.array;

    for (let i = 0; i < vertexArray.length; i += 3) {
        if (vertexArray[i] === extrudeRectangleLength/2) {
            let leastX = 0x8ffffffe;
            cutData.edge1.forEach((line: Line) => {
                const currentX = line.getXfromY(vertexArray[i+1]);
                if (currentX < leastX) leastX = currentX;
            })
            vertexArray[i] = leastX;
        }
        else if (vertexArray[i] === -extrudeRectangleLength/2) {
            let mostX = -0x8fffffff;
            cutData.edge3.forEach((line: Line) => {
                const currentX = line.getXfromY(vertexArray[i+1]);
                if (currentX > mostX) mostX = currentX;
            })
            vertexArray[i] = mostX;
        }
        else if (vertexArray[i+1] === extrudeRectangleWidth/2) {
            let leastY = 0x8ffffffe;
            cutData.edge2.forEach((line: Line) => {
                const currentY = line.getYfromX(vertexArray[i]);
                if (currentY < leastY) leastY = currentY;
            })
            vertexArray[i+1] = leastY;
        }        
        else if (vertexArray[i+1] === -extrudeRectangleWidth/2) {
            let mostY = -0x8fffffff;
            cutData.edge4.forEach((line: Line) => {
                const currentY = line.getYfromX(vertexArray[i]);
                if (currentY > mostY) mostY = currentY;
            })
            vertexArray[i+1] = mostY;
        }
    }

    geometry.attributes.position.needsUpdate = true;
}