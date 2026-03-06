import * as THREE from 'three';

export interface Point {
    x: number; 
    y: number;
}

export class Line {
    private startPoint: Point | THREE.Vector2;
    private endPoint: Point | THREE.Vector2;

    constructor(p1: Point | THREE.Vector2, p2: Point | THREE.Vector2) {
        this.startPoint = p1;
        this.endPoint = p2;
    }

    getDistance(): number {
        return Math.sqrt(Math.pow(this.startPoint.x - this.endPoint.x, 2) + Math.pow(this.startPoint.y - this.endPoint.y, 2));
    }

    getLineCurve(): THREE.LineCurve {
        if (this.startPoint instanceof THREE.Vector2 && this.endPoint instanceof THREE.Vector2)
            return new THREE.LineCurve(this.startPoint, this.endPoint);
        else 
            return new THREE.LineCurve(new THREE.Vector2(this.startPoint.x, this.startPoint.y), new THREE.Vector2(this.endPoint.x, this.endPoint.y));
    }
}

export type ExtrudePath = {
    edge1: Line[],
    edge2: Line[],
    edge3: Line[],
    edge4: Line[]
}