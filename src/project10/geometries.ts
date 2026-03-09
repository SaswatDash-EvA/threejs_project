import * as THREE from 'three';
import { LineGeometry, LineSegmentsGeometry } from 'three/examples/jsm/Addons.js';

export let cornerCoordinates = [0.5, 0.5];
let outerWidth = 0.04, beadWidth = 0.02;

const points = [
    new THREE.Vector2(cornerCoordinates[0], cornerCoordinates[1]),
    new THREE.Vector2(-cornerCoordinates[0], cornerCoordinates[1]),
    new THREE.Vector2(-cornerCoordinates[0], -cornerCoordinates[1]),
    new THREE.Vector2(cornerCoordinates[0], -cornerCoordinates[1]),
    new THREE.Vector2(cornerCoordinates[0], cornerCoordinates[1])
];

export let outerBoundaryGeometry = new LineGeometry().setFromPoints(points);

// Outer inside scale factor wrt outer boundary
let insideScaleFactorX = (cornerCoordinates[0] - outerWidth) / cornerCoordinates[0], insideScaleFactorY = (cornerCoordinates[1] - outerWidth) / cornerCoordinates[1];
export let outerInsideGeometry = new LineGeometry().setFromPoints(points).scale(insideScaleFactorX, insideScaleFactorY, 1);

// Bead inside scale factor wrt outer boundary
insideScaleFactorX = (cornerCoordinates[0] - outerWidth - beadWidth) / cornerCoordinates[0]; 
insideScaleFactorY = (cornerCoordinates[1] - outerWidth - beadWidth) / cornerCoordinates[1];

export let beadInsideGeometry = new LineGeometry().setFromPoints(points).scale(insideScaleFactorX, insideScaleFactorY, 1);

// Cut lines (outer and bead), in form: (x1, y1, z1, x2, y2, z2, ...)
const cutLineSegmentPoints = [
    cornerCoordinates[0], cornerCoordinates[1], 0, cornerCoordinates[0] - outerWidth - beadWidth, cornerCoordinates[1] - outerWidth - beadWidth, 0,
    -cornerCoordinates[0], cornerCoordinates[1], 0, -cornerCoordinates[0] + outerWidth + beadWidth, cornerCoordinates[1] - outerWidth - beadWidth, 0,
    -cornerCoordinates[0], -cornerCoordinates[1], 0, -cornerCoordinates[0] + outerWidth + beadWidth, -cornerCoordinates[1] + outerWidth + beadWidth, 0,
    cornerCoordinates[0], -cornerCoordinates[1], 0, cornerCoordinates[0] - outerWidth - beadWidth, -cornerCoordinates[1] + outerWidth + beadWidth, 0,
]

export const cutSegmentsGeometry = new LineSegmentsGeometry().setPositions(cutLineSegmentPoints);

// Divider dashes
const dashedLinesSegmentPoints = [
    0, cornerCoordinates[1], 0, 0, -cornerCoordinates[1], 0,
    cornerCoordinates[0], 0, 0, -cornerCoordinates[0], 0, 0
];

export const dashedLineSegmentGeometry = new LineSegmentsGeometry().setPositions(dashedLinesSegmentPoints);