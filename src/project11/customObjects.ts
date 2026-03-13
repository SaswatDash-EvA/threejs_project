import * as THREE from 'three';

export interface Point {
    x: number; 
    y: number;
    z?: number; 
}

export class Line {
    private startPoint: Point | THREE.Vector2;
    private endPoint: Point | THREE.Vector2;

    private slope: number;
    private yintercept: number;

    constructor(p1: Point | THREE.Vector2, p2: Point | THREE.Vector2) {
        this.startPoint = p1;
        this.endPoint = p2;

        this.slope = (p1.y - p2.y) / (p1.x - p2.x);
        this.yintercept = p2.y - this.slope * p2.x;
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

    getXfromY(coordY: number): number {
        return (coordY - this.yintercept) / this.slope;
    }

    getYfromX(coordX: number): number {
        return this.slope * coordX + this.yintercept;
    }
}

export class Line3 {
    private startPoint: Required<Point> | THREE.Vector3;
    private endPoint: Required<Point> | THREE.Vector3;

    public directionVector: THREE.Vector3;

    constructor(p1: Required<Point> | THREE.Vector3, p2: Required<Point> | THREE.Vector3) {
        this.startPoint = p1;
        this.endPoint = p2;

        if (this.startPoint instanceof THREE.Vector3 && this.endPoint instanceof THREE.Vector3) {
            this.directionVector = this.endPoint.sub(this.startPoint);
        }
        else
            this.directionVector = new THREE.Vector3(this.endPoint.x - this.startPoint.x, this.endPoint.y - this.startPoint.y, this.endPoint.z - this.startPoint.z);
    }

    getDistance(): number {
        return Math.sqrt(Math.pow(this.startPoint.x - this.endPoint.x, 2) + Math.pow(this.startPoint.y - this.endPoint.y, 2) + Math.pow(this.startPoint.z - this.endPoint.z, 2));
    }

    getLineCurve(): THREE.LineCurve3 {
        if (this.startPoint instanceof THREE.Vector3 && this.endPoint instanceof THREE.Vector3)
            return new THREE.LineCurve3(this.startPoint, this.endPoint);
        else 
            return new THREE.LineCurve3(new THREE.Vector3(this.startPoint.x, this.startPoint.y, this.startPoint.z), new THREE.Vector3(this.endPoint.x, this.endPoint.y, this.endPoint.z));
    }
}