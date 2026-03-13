import * as THREE from 'three';
import { LineGeometry } from 'three/examples/jsm/Addons.js';

export function createHexagon(centreX: number, centerY: number, radius: number): LineGeometry {
    const shape = new THREE.Path([
        new THREE.Vector2(centreX, centerY - radius),
        new THREE.Vector2(centreX + radius * Math.cos(Math.PI/6), centerY - radius * (1-Math.sin(Math.PI/6))),
        new THREE.Vector2(centreX + radius * Math.cos(Math.PI/6), centerY + radius * (1-Math.sin(Math.PI/6))),
        new THREE.Vector2(centreX, centerY + radius),
        new THREE.Vector2(centreX - radius * Math.cos(Math.PI/6), centerY + radius * (1-Math.sin(Math.PI/6))),
        new THREE.Vector2(centreX - radius * Math.cos(Math.PI/6), centerY - radius * (1-Math.sin(Math.PI/6))),
        new THREE.Vector2(centreX, centerY - radius)
    ]);

    const points = shape.getPoints();
    return new LineGeometry().setFromPoints(points);
}

export function createStarShape(originX: number, originY: number, side: number): LineGeometry {
    const cos30 = Math.cos(Math.PI/6);
    const sin30 = Math.sin(Math.PI/6);
    const cos60 = Math.cos(Math.PI/3);
    const sin60 = Math.sin(Math.PI/3);
    const path = new THREE.Path([
        new THREE.Vector2(originX, originY),
        new THREE.Vector2(originX + side*sin30, originY + side*cos30),
        new THREE.Vector2(originX + side*sin30+side, originY + side*cos30),
        new THREE.Vector2(originX + side*sin30+side-side*cos60, originY + side*cos30+side*sin60),
        new THREE.Vector2(originX + side*sin30+side, originY + side*cos30+2*side*sin60),
        new THREE.Vector2(originX + side*sin30, originY + side*cos30+2*side*sin60),
        new THREE.Vector2(originX, originY + 2*side*cos30+2*side*sin60),
        new THREE.Vector2(originX + -side*sin30, originY + side*cos30+2*side*sin60),
        new THREE.Vector2(originX + -(side*sin30+side), originY + side*cos30+2*side*sin60),
        new THREE.Vector2(originX + -(side*sin30+side-side*cos60), originY + side*cos30+side*sin60),
        new THREE.Vector2(originX + -(side*sin30+side), originY + side*cos30),
        new THREE.Vector2(originX + -side*sin30, originY + side*cos30),
        new THREE.Vector2(originX, originY),
    ]);
   
    const points = path.getPoints(13);
    return new LineGeometry().setFromPoints(points);
}

export function createUpwardArrow(originX: number, originY: number, length: number): LineGeometry {
    const shape = new THREE.Path().moveTo(originX, originY);
    shape.lineTo(originX, originY + length)
        .lineTo(originX - (length/3) * Math.sin(Math.PI/6), originY + length * (1 - Math.cos(Math.PI/6)/3))
        .moveTo(originX, originY + length)
        .lineTo(originX + (length/3) * Math.sin(Math.PI/6), originY + length * (1 - Math.cos(Math.PI/6)/3));

    const points = shape.getPoints();
    return new LineGeometry().setFromPoints(points);
}

export function createLeftArrow(originX: number, originY: number, totalLength: number, totalHeight: number): LineGeometry {
    const shape = new THREE.Path().moveTo(originX, originY);
    shape.lineTo(originX + totalLength/2, originY + totalHeight/2)
        .lineTo(originX + totalLength/2, originY + totalHeight/2 - totalHeight/5)
        .lineTo(originX + totalLength, originY + totalHeight/2 - totalHeight/5)
        .lineTo(originX + totalLength, originY - totalHeight/2 + totalHeight/5)
        .lineTo(originX + totalLength/2, originY - totalHeight/2 + totalHeight/5)
        .lineTo(originX + totalLength/2, originY - totalHeight/2)
        .lineTo(originX, originY);

    const points = shape.getPoints();
    return new LineGeometry().setFromPoints(points);
}

export function createRightArrow(originX: number, originY: number, totalLength: number, totalHeight: number): LineGeometry {
    const shape = new THREE.Path().moveTo(originX, originY);
    shape.lineTo(originX - totalLength/2, originY + totalHeight/2)
        .lineTo(originX - totalLength/2, originY + totalHeight/2 - totalHeight/5)
        .lineTo(originX - totalLength, originY + totalHeight/2 - totalHeight/5)
        .lineTo(originX - totalLength, originY - totalHeight/2 + totalHeight/5)
        .lineTo(originX - totalLength/2, originY - totalHeight/2 + totalHeight/5)
        .lineTo(originX - totalLength/2, originY - totalHeight/2)
        .lineTo(originX, originY);

    const points = shape.getPoints();
    return new LineGeometry().setFromPoints(points);
}