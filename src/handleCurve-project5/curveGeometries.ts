import * as THREE from 'three';
import { NURBSCurve } from 'three/addons/curves/NURBSCurve.js';
import { handleHeight, handleThickness, handleWidth, innerHoleDiameter, leftLegHeight, rightLegWidth, topOffset } from './parameters';
import { edgesMaterial } from './materials';

const topSplineDegree = 3;
const bottomSplineDegree = 3;

let minBtwWidthNHeight = Math.min(leftLegHeight, handleHeight, handleWidth);

const topSplineControlPoints = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, leftLegHeight/2),
    new THREE.Vector2(0, leftLegHeight-minBtwWidthNHeight/5),
    new THREE.Vector2(0, leftLegHeight-minBtwWidthNHeight/20),
    new THREE.Vector2(minBtwWidthNHeight/20, leftLegHeight+(minBtwWidthNHeight/20) * topOffset / handleWidth),
    new THREE.Vector2(minBtwWidthNHeight/10, leftLegHeight+(minBtwWidthNHeight/10) * topOffset / handleWidth),
    new THREE.Vector2(handleWidth/2, leftLegHeight + topOffset/2 + minBtwWidthNHeight/20),
    new THREE.Vector2(handleWidth-minBtwWidthNHeight/5, handleHeight/2),
    new THREE.Vector2(handleWidth-minBtwWidthNHeight/20, handleHeight/2),
    new THREE.Vector2(handleWidth, handleHeight/2 - minBtwWidthNHeight/20),
    new THREE.Vector2(handleWidth, handleHeight/2 - minBtwWidthNHeight/5),
    new THREE.Vector2(handleWidth, 0),
    new THREE.Vector2(handleWidth, -handleHeight/2 + rightLegWidth/2)
];

const bottomSplineControlPoints = [
    new THREE.Vector2(handleWidth - rightLegWidth, -handleHeight/2 + rightLegWidth/2),
    new THREE.Vector2(handleWidth - rightLegWidth, 0),
    new THREE.Vector2(handleWidth - rightLegWidth, (handleWidth - rightLegWidth - minBtwWidthNHeight/5) * topOffset / handleWidth),
    new THREE.Vector2(handleWidth - rightLegWidth, (handleWidth - rightLegWidth - minBtwWidthNHeight/10) * topOffset / handleWidth),
    new THREE.Vector2((rightLegWidth >= handleWidth)? handleWidth - rightLegWidth : handleWidth - rightLegWidth - (minBtwWidthNHeight/20), (handleWidth - rightLegWidth - minBtwWidthNHeight/20) * topOffset / handleWidth),
    new THREE.Vector2((rightLegWidth >= handleWidth)? handleWidth - rightLegWidth : handleWidth - rightLegWidth - (minBtwWidthNHeight/10), (handleWidth - rightLegWidth - minBtwWidthNHeight/10) * topOffset / handleWidth),
    new THREE.Vector2((handleWidth - rightLegWidth)/2, ((handleWidth - rightLegWidth)/2) * topOffset / handleWidth),
    new THREE.Vector2(0, 0)    
];

const topKnotArray = [ 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10 ];
const bottomKnotArray = [0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 5];

const handleTopSpline = new NURBSCurve(topSplineDegree, topKnotArray, topSplineControlPoints, 0, 16);
const handleBottomSpline = new NURBSCurve(bottomSplineDegree, bottomKnotArray, bottomSplineControlPoints, 0, 11);

const numOfDivisions = 240;
const topSplinePoints = handleTopSpline.getPoints(numOfDivisions);
const bottomSplinePoints = handleBottomSpline.getPoints(numOfDivisions);

const shape = new THREE.Shape();
shape.moveTo(topSplinePoints[0].x, topSplinePoints[0].y);
for (let i = 1; i < topSplinePoints.length; i++) 
    shape.lineTo(topSplinePoints[i].x, topSplinePoints[i].y);

shape.absarc(handleWidth - rightLegWidth/2, (rightLegWidth - handleHeight)/2, rightLegWidth/2, 0, Math.PI, true);

for (let i = 1; i < bottomSplinePoints.length; i++) 
    shape.lineTo(bottomSplinePoints[i].x, bottomSplinePoints[i].y);

const innerHolePath = new THREE.Path();
innerHolePath.absarc(handleWidth/2, handleHeight/4, innerHoleDiameter/2, 0, 2 * Math.PI);

shape.holes.push(innerHolePath);

export let extrudeHandleGeometry = new THREE.ExtrudeGeometry(shape, {
    bevelEnabled: false,
    curveSegments: 200,
    depth: handleThickness
});

const handleEdges = new THREE.EdgesGeometry(extrudeHandleGeometry, 90);
export let edgeLines = new THREE.LineSegments(handleEdges, edgesMaterial);

export function updateGeometryMesh() {
    extrudeHandleGeometry.dispose();

    const topSplineDegree = 3;
    const bottomSplineDegree = 3;

    let minBtwWidthNHeight = Math.min(leftLegHeight, handleHeight, handleWidth);

    const topSplineControlPoints = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0, leftLegHeight/2),
        new THREE.Vector2(0, leftLegHeight-minBtwWidthNHeight/5),
        new THREE.Vector2(0, leftLegHeight-minBtwWidthNHeight/20),
        new THREE.Vector2(minBtwWidthNHeight/20, leftLegHeight+(minBtwWidthNHeight/20) * topOffset / handleWidth),
        new THREE.Vector2(minBtwWidthNHeight/10, leftLegHeight+(minBtwWidthNHeight/10) * topOffset / handleWidth),
        new THREE.Vector2(handleWidth/2, leftLegHeight + topOffset/2 + minBtwWidthNHeight/20),
        new THREE.Vector2(handleWidth-minBtwWidthNHeight/5, handleHeight/2),
        new THREE.Vector2(handleWidth-minBtwWidthNHeight/20, handleHeight/2),
        new THREE.Vector2(handleWidth, handleHeight/2 - minBtwWidthNHeight/20),
        new THREE.Vector2(handleWidth, handleHeight/2 - minBtwWidthNHeight/5),
        new THREE.Vector2(handleWidth, 0),
        new THREE.Vector2(handleWidth, -handleHeight/2 + rightLegWidth/2)
    ];

    const bottomSplineControlPoints = [
        new THREE.Vector2(handleWidth - rightLegWidth, -handleHeight/2 + rightLegWidth/2),
        new THREE.Vector2(handleWidth - rightLegWidth, 0),
        new THREE.Vector2(handleWidth - rightLegWidth, (handleWidth - rightLegWidth - minBtwWidthNHeight/5) * topOffset / handleWidth),
        new THREE.Vector2(handleWidth - rightLegWidth, (handleWidth - rightLegWidth - minBtwWidthNHeight/10) * topOffset / handleWidth),
        new THREE.Vector2((rightLegWidth >= handleWidth)? handleWidth - rightLegWidth : handleWidth - rightLegWidth - (minBtwWidthNHeight/20), (handleWidth - rightLegWidth - minBtwWidthNHeight/20) * topOffset / handleWidth),
        new THREE.Vector2((rightLegWidth >= handleWidth)? handleWidth - rightLegWidth : handleWidth - rightLegWidth - (minBtwWidthNHeight/10), (handleWidth - rightLegWidth - minBtwWidthNHeight/10) * topOffset / handleWidth),
        new THREE.Vector2((handleWidth - rightLegWidth)/2, ((handleWidth - rightLegWidth)/2) * topOffset / handleWidth),
        new THREE.Vector2(0, 0)    
    ];

    const topKnotArray = [ 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10 ];
    const bottomKnotArray = [0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 5];

    const handleTopSpline = new NURBSCurve(topSplineDegree, topKnotArray, topSplineControlPoints, 0, 16);
    const handleBottomSpline = new NURBSCurve(bottomSplineDegree, bottomKnotArray, bottomSplineControlPoints, 0, 11);

    const numOfDivisions = 240;
    const topSplinePoints = handleTopSpline.getPoints(numOfDivisions);
    const bottomSplinePoints = handleBottomSpline.getPoints(numOfDivisions);

    const shape = new THREE.Shape();
    shape.moveTo(topSplinePoints[0].x, topSplinePoints[0].y);
    for (let i = 1; i < topSplinePoints.length; i++) 
        shape.lineTo(topSplinePoints[i].x, topSplinePoints[i].y);

    shape.absarc(handleWidth - rightLegWidth/2, (rightLegWidth - handleHeight)/2, rightLegWidth/2, 0, Math.PI, true);

    for (let i = 1; i < bottomSplinePoints.length; i++) 
        shape.lineTo(bottomSplinePoints[i].x, bottomSplinePoints[i].y);

    const innerHolePath = new THREE.Path();
    innerHolePath.absarc(handleWidth/2, handleHeight/4, innerHoleDiameter/2, 0, 2 * Math.PI);

    shape.holes.push(innerHolePath);

    extrudeHandleGeometry = new THREE.ExtrudeGeometry(shape, {
        bevelEnabled: false,
        curveSegments: 200,
        depth: handleThickness
    });
    const handleEdges = new THREE.EdgesGeometry(extrudeHandleGeometry, 90);
    edgeLines = new THREE.LineSegments(handleEdges, edgesMaterial);
}