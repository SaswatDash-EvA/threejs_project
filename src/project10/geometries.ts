import * as THREE from 'three';
import { FontLoader, LineGeometry, LineSegmentsGeometry, TextGeometry, type TextGeometryParameters } from 'three/examples/jsm/Addons.js';
import helvetikerFont from 'three/examples/fonts/helvetiker_bold.typeface.json';
import { createHexagon, createLeftArrow, createRightArrow, createStarShape, createUpwardArrow } from './shapes';
import { beadH, frameH, frameH1, windowWidth } from '../project11/dynamicVariables';
import { backPlateHeight, backPlateMidRadius, backPlateSideRadius, backPlateTopBottomFaceLength, cockSpurHandleHeight, cockSpurHandleWidth, cockSpurHeadRadius, cockSpurHolderWidth, handleOrigin, midHoleRadius, topBottomHoleRadius } from '../project11/handleVariables';

// Frame borders geometry
export let outerFrameWidth = 0.75 * window.innerWidth, outerFrameHeight = 0.75 * window.innerHeight;
let frameVertices = [
    new THREE.Vector2(-outerFrameWidth / 2 - 2, -outerFrameHeight / 2 - 2),
    new THREE.Vector2(-outerFrameWidth / 2 - 2, outerFrameHeight / 2 + 2),
    new THREE.Vector2(outerFrameWidth / 2 + 2, outerFrameHeight / 2 + 2),
    new THREE.Vector2(outerFrameWidth / 2 + 2, -outerFrameHeight / 2 - 2),
    new THREE.Vector2(-outerFrameWidth / 2 - 2, -outerFrameHeight / 2 - 2)
]; // Adding extra 2 because line width is 4

export let boundaryGeometry = new LineGeometry().setFromPoints(frameVertices);

/**
 *  UI Scene
 */

// Right UI Lines (uiwidth - 2 as the boundary between main scene and uiscene)
export let uiwidth = outerFrameWidth * 0.35 - 2, uiHeight = outerFrameHeight;
let UIVertices: Array<number> = [];
export let heightSegment = uiHeight * 0.55 / 6;

// Addition of vertices
for (let i = 0; i <= 6; i++) {
    UIVertices.push(-uiwidth / 2, uiHeight / 2 - i * heightSegment, 0);
}
for (let i = 1; i < 5; i++) {
    UIVertices.push(uiwidth / 2, uiHeight / 2 - i * heightSegment, 0);
}
UIVertices.push(0, uiHeight / 2 - 5 * heightSegment, 0, uiwidth / 2, uiHeight / 2 - 6 * heightSegment, 0, 0, -uiHeight / 2, 0, -uiwidth / 2, -uiHeight / 2, 0);
UIVertices.push(0, uiHeight / 2 - heightSegment, 0, 0, uiHeight / 2 - 2 * heightSegment, 0);

export let hardwareDetHeight = heightSegment * 1.7;
export let lowerHeightSegments = (uiHeight - 6 * heightSegment - hardwareDetHeight) / 3, midDividerY = (uiHeight / 2 - 6 * heightSegment - hardwareDetHeight);
UIVertices.push(-uiwidth / 2, midDividerY, 0)
for (let i = 1; i < 3; i++) {
    UIVertices.push(-uiwidth / 2, midDividerY - i * lowerHeightSegments, 0);
}
UIVertices.push(0, midDividerY, 0)
for (let i = 1; i < 3; i++) {
    UIVertices.push(0, midDividerY - i * lowerHeightSegments, 0);
    if (i == 2) UIVertices[UIVertices.length - 3] = uiwidth / 2;
}
UIVertices.push(uiwidth / 4, midDividerY + hardwareDetHeight, 0, uiwidth / 4, midDividerY - 2 * lowerHeightSegments, 0);
UIVertices.push(uiwidth / 4, (2 * midDividerY + hardwareDetHeight - 2 * lowerHeightSegments) / 2, 0, uiwidth / 2, (2 * midDividerY + hardwareDetHeight - 2 * lowerHeightSegments) / 2, 0);

// Addition of indices
let UIIndices: Array<number> = [0, 14];
for (let i = 0; i <= 4; i++)
    UIIndices.push(1 + i, 7 + i);
UIIndices.push(5, 11, 6, 12, 11, 13, 15, 16);
for (let i = 0; i < 3; i++) {
    UIIndices.push(17 + i, 20 + i);
}
UIIndices.push(23, 24, 25, 26);

function lineSegmentPositions(vertices: Array<number>, indices: Array<number>): LineSegmentsGeometry {
    let segmentGeometry = new LineSegmentsGeometry();

    let positions: Array<number> = [];
    for (let i = 0; i < indices.length; i += 2) {
        let a = indices[i] * 3;
        let b = indices[i + 1] * 3;

        positions.push(
            vertices[a], vertices[a + 1], vertices[a + 2],
            vertices[b], vertices[b + 1], vertices[b + 2]
        );
    }
    return segmentGeometry.setPositions(positions);
}

// Final geometry for ui lines
export let mainSceneUILinesGeometry = lineSegmentPositions(UIVertices, UIIndices);

// Texts for UI Scene
const loader = new FontLoader();
const font = loader.parse(helvetikerFont);
export const textSize = heightSegment / 7;
const midTextParameters: TextGeometryParameters = {
    font: font,
    size: textSize,
    depth: textSize * 0.02,
    curveSegments: 30
};

export const topTextGeometry = new TextGeometry("Design Name:-", midTextParameters),
    lvl2leftTextGeometry = new TextGeometry("Org Name:-", midTextParameters),
    lvl2RightTextGeometry = new TextGeometry("Project Id:", midTextParameters),
    lvl3TextGeometry = new TextGeometry("Lorem ipsum, dolor sit amet...", midTextParameters),
    lvl4TextGeometry = new TextGeometry("Design Details:-", midTextParameters),
    lvl6TextGeometry = new TextGeometry("Date:-", midTextParameters),
    lvl7TextGeometry = new TextGeometry("Hardware Details:-", midTextParameters),
    lvl7RightTextGeometry = new TextGeometry("Developer \nName:-", midTextParameters),
    lvl8TextGeometry = new TextGeometry("Design Dimensions", midTextParameters),
    lvl9TextGeometry = new TextGeometry("Scale Factor:-", midTextParameters),
    lvl10TextGeometry = new TextGeometry("Signature:-", midTextParameters);

/**
 * Main scene
 */

// Main scene dimensions
export let mainCameraPosition = 2, mainCameraFOV = (Math.PI / 180) * 75;
export let mainFrameHeight = 2 * mainCameraPosition * Math.tan(mainCameraFOV / 2), mainFrameWidth = mainFrameHeight * 0.65 * outerFrameWidth / outerFrameHeight;

// Window geometries
export let cornerCoordinates = [0.5, 0.5];
let outerWidth = frameH1 * (2*cornerCoordinates[0] / windowWidth), beadWidth = beadH * (2*cornerCoordinates[0] / windowWidth);

const points = [
    new THREE.Vector2(cornerCoordinates[0], cornerCoordinates[1]),
    new THREE.Vector2(-cornerCoordinates[0], cornerCoordinates[1]),
    new THREE.Vector2(-cornerCoordinates[0], -cornerCoordinates[1]),
    new THREE.Vector2(cornerCoordinates[0], -cornerCoordinates[1]),
    new THREE.Vector2(cornerCoordinates[0], cornerCoordinates[1])
];

export let outerFrameGeometry = new LineGeometry().setFromPoints(points);
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

// Handle's geometry
const backPlateShape = new THREE.Shape()
    .moveTo((handleOrigin.x - backPlateMidRadius - backPlateTopBottomFaceLength) * (2*cornerCoordinates[0]/windowWidth), (handleOrigin.y + backPlateHeight/2) * (2*cornerCoordinates[0]/windowWidth))
    .lineTo((handleOrigin.x - backPlateMidRadius - backPlateTopBottomFaceLength) * (2*cornerCoordinates[0]/windowWidth), (handleOrigin.y - backPlateHeight/2) * (2*cornerCoordinates[0]/windowWidth))
    .lineTo((handleOrigin.x - backPlateMidRadius) * (2*cornerCoordinates[0]/windowWidth), (handleOrigin.y - backPlateHeight/2) * (2*cornerCoordinates[0]/windowWidth))
    .arc((backPlateMidRadius) * (2*cornerCoordinates[0]/windowWidth), 0, (backPlateMidRadius) * (2*cornerCoordinates[0]/windowWidth), Math.PI, Math.PI/2, true)
    .arc(0, (backPlateSideRadius) * (2*cornerCoordinates[0]/windowWidth), (backPlateSideRadius) * (2*cornerCoordinates[0]/windowWidth), 3 * Math.PI/2, Math.PI/2)
    .arc(0, (backPlateMidRadius) * (2*cornerCoordinates[0]/windowWidth), (backPlateMidRadius) * (2*cornerCoordinates[0]/windowWidth), 3 * Math.PI/2, Math.PI, true)
    .lineTo((handleOrigin.x - backPlateMidRadius - backPlateTopBottomFaceLength) * (2*cornerCoordinates[0]/windowWidth), (handleOrigin.y + backPlateHeight/2) * (2*cornerCoordinates[0]/windowWidth));

const midHole = new THREE.Path().absarc(handleOrigin.x * (2*cornerCoordinates[0]/windowWidth), handleOrigin.y * (2*cornerCoordinates[0]/windowWidth), midHoleRadius * (2*cornerCoordinates[0]/windowWidth), 0, 2 * Math.PI);
const topBottomHoles = [
    new THREE.Path().absarc((handleOrigin.x - backPlateMidRadius - backPlateTopBottomFaceLength/2) * (2*cornerCoordinates[0]/windowWidth), (handleOrigin.y + backPlateSideRadius + backPlateMidRadius/2) * (2*cornerCoordinates[0]/windowWidth), (topBottomHoleRadius) * (2*cornerCoordinates[0]/windowWidth), 0, 2 * Math.PI),
    new THREE.Path().absarc((handleOrigin.x - backPlateMidRadius - backPlateTopBottomFaceLength/2) * (2*cornerCoordinates[0]/windowWidth), (handleOrigin.y - backPlateSideRadius - backPlateMidRadius/2) * (2*cornerCoordinates[0]/windowWidth), (topBottomHoleRadius) * (2*cornerCoordinates[0]/windowWidth), 0, 2 * Math.PI)
]
backPlateShape.holes.push(midHole, ...topBottomHoles);

const handleShape = new THREE.Shape()
    .moveTo((handleOrigin.x - cockSpurHeadRadius * Math.cos(Math.PI/6)) * (2*cornerCoordinates[0]/windowWidth), (handleOrigin.y + cockSpurHeadRadius * Math.sin(Math.PI/6)) * (2*cornerCoordinates[0]/windowWidth))
    .absarc((handleOrigin.x) * (2*cornerCoordinates[0]/windowWidth), (handleOrigin.y) * (2*cornerCoordinates[0]/windowWidth), (cockSpurHeadRadius) * (2*cornerCoordinates[0]/windowWidth), 5 * Math.PI/6, 0, true)
    .lineTo((handleOrigin.x + cockSpurHeadRadius) * (2*cornerCoordinates[0]/windowWidth), (handleOrigin.y - cockSpurHandleHeight + cockSpurHeadRadius + cockSpurHolderWidth) * (2*cornerCoordinates[0]/windowWidth))
    .arc((-cockSpurHolderWidth/2) * (2*cornerCoordinates[0]/windowWidth), 0, (cockSpurHolderWidth/2) * (2*cornerCoordinates[0]/windowWidth), 0, Math.PI, true)
    .lineTo((handleOrigin.x + cockSpurHeadRadius - cockSpurHolderWidth) * (2*cornerCoordinates[0]/windowWidth), (handleOrigin.y - cockSpurHeadRadius * Math.sin(Math.PI/6) - (cockSpurHeadRadius * (1 + Math.cos(Math.PI/6)) - cockSpurHolderWidth) * Math.tan(7 * Math.PI/24)) * (2*cornerCoordinates[0]/windowWidth))
    .arc((-(cockSpurHeadRadius * (1 + Math.cos(Math.PI/6)) - cockSpurHolderWidth) * Math.tan(7 * Math.PI/24) / Math.sin(5 * Math.PI/12)) * (2*cornerCoordinates[0]/windowWidth), 0, ((cockSpurHeadRadius * (1 + Math.cos(Math.PI/6)) - cockSpurHolderWidth) * Math.tan(7 * Math.PI/24) / Math.sin(5 * Math.PI/12)) * (2*cornerCoordinates[0]/windowWidth), 0, 5 * Math.PI/12)
    .lineTo((handleOrigin.x - cockSpurHeadRadius * Math.cos(Math.PI/6) - cockSpurHandleWidth + cockSpurHeadRadius *(1 + Math.cos(Math.PI/6))) * (2*cornerCoordinates[0]/windowWidth), (handleOrigin.y - 9) * (2*cornerCoordinates[0]/windowWidth))
    .arc(0, (8) * (2*cornerCoordinates[0]/windowWidth), (8) * (2*cornerCoordinates[0]/windowWidth), 3 * Math.PI/2, 7 * Math.PI/12, true)
    .lineTo((handleOrigin.x - cockSpurHeadRadius * Math.cos(Math.PI/6)) * (2*cornerCoordinates[0]/windowWidth), (handleOrigin.y + cockSpurHeadRadius * Math.sin(Math.PI/6)) * (2*cornerCoordinates[0]/windowWidth));

export const backPlateGeometry = new THREE.ShapeGeometry(backPlateShape, 64);

export const handleShapeGeometry = new THREE.ShapeGeometry(handleShape, 64);
handleShapeGeometry.translate(0, 0, 0.001);

const midCirclePoints = midHole.getPoints(240);
export const midCircleGeometry = new LineGeometry().setFromPoints(midCirclePoints);
midCircleGeometry.translate(0, 0, 0.002);

// Modify the handle based on project 11 properties
const handleScaleX = sessionStorage.getItem("handleScaleX");
const handleScaleY = sessionStorage.getItem("handleScaleY");
const handlePosition = sessionStorage.getItem("handlePosition");
const handleSide = sessionStorage.getItem("handleSide");
if (handleScaleX && handleScaleY) {
    backPlateGeometry.translate(-handleOrigin.x * (2*cornerCoordinates[0]/windowWidth), 0, 0);
    handleShapeGeometry.translate(-handleOrigin.x * (2*cornerCoordinates[0]/windowWidth), 0, 0);
    backPlateGeometry.scale(parseFloat(handleScaleX), parseFloat(handleScaleY), 1);
    handleShapeGeometry.scale(parseFloat(handleScaleX), parseFloat(handleScaleY), 1);
    backPlateGeometry.translate(handleOrigin.x * (2*cornerCoordinates[0]/windowWidth), 0, 0);
    handleShapeGeometry.translate(handleOrigin.x * (2*cornerCoordinates[0]/windowWidth), 0, 0);
}
if (handlePosition && handleSide) {
    const side = parseInt(handleSide);
    // Move to the desired side and move along the frame to desired position
    if (side == 0 || side == 1) {
        if (side == 1){
            const mirrorAlongX = new THREE.Matrix4(
                -1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            );
            backPlateGeometry.applyMatrix4(mirrorAlongX);
            handleShapeGeometry.applyMatrix4(mirrorAlongX);
            midCircleGeometry.applyMatrix4(mirrorAlongX);
        }
        backPlateGeometry.translate(0, parseFloat(handlePosition) * (2*cornerCoordinates[0]/windowWidth), 0);
        handleShapeGeometry.translate(0, parseFloat(handlePosition) * (2*cornerCoordinates[0]/windowWidth), 0);
        midCircleGeometry.translate(0, parseFloat(handlePosition) * (2*cornerCoordinates[0]/windowWidth), 0);
    } else if (side == 2 || side == 3) {
        // Moce to top
        backPlateGeometry.translate(-handleOrigin.x * (2*cornerCoordinates[0]/windowWidth), 0, 0).rotateZ(-Math.PI/2).translate(0, cornerCoordinates[1] - (frameH/2) * (2*cornerCoordinates[0]/windowWidth), 0);
        handleShapeGeometry.translate(-handleOrigin.x * (2*cornerCoordinates[0]/windowWidth), 0, 0).rotateZ(-Math.PI/2).translate(0, cornerCoordinates[1] - (frameH/2) * (2*cornerCoordinates[0]/windowWidth), 0);
        midCircleGeometry.translate(-handleOrigin.x * (2*cornerCoordinates[0]/windowWidth), cornerCoordinates[1] - (frameH/2) * (2*cornerCoordinates[0]/windowWidth), 0);
        if (side == 3) {
            const mirrorAlongY = new THREE.Matrix4(
                1, 0, 0, 0,
                0, -1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            );
            backPlateGeometry.applyMatrix4(mirrorAlongY);
            handleShapeGeometry.applyMatrix4(mirrorAlongY);
            midCircleGeometry.applyMatrix4(mirrorAlongY);
        }
        backPlateGeometry.translate(parseFloat(handlePosition) * (2*cornerCoordinates[0]/windowWidth), 0, 0);
        handleShapeGeometry.translate(parseFloat(handlePosition) * (2*cornerCoordinates[0]/windowWidth), 0, 0);
        midCircleGeometry.translate(parseFloat(handlePosition) * (2*cornerCoordinates[0]/windowWidth), 0, 0);
    }
}

export const backPlateEdgesGeometry = new LineSegmentsGeometry().fromEdgesGeometry(new THREE.EdgesGeometry(backPlateGeometry));
export const handleEdgesGeometry = new LineSegmentsGeometry().fromEdgesGeometry(new THREE.EdgesGeometry(handleShapeGeometry));

// Divider dashes
const dashedLinesSegmentPoints = [
    0, cornerCoordinates[1], 0, 0, -cornerCoordinates[1], 0,
    cornerCoordinates[0], 0, 0, -cornerCoordinates[0], 0, 0
];

export const dashedLineSegmentGeometry = new LineSegmentsGeometry().setPositions(dashedLinesSegmentPoints);

// Profile UI on the main screen
export let profileOffset = 0.1, profileLength = 1, profileHeight = 1, profileBorderRadius = 0.15;

const profileUIPath = new THREE.Path();
profileUIPath.moveTo(-mainFrameWidth / 2 + profileOffset, mainFrameHeight / 2 - profileOffset - profileBorderRadius);
profileUIPath.arc(profileBorderRadius, 0, profileBorderRadius, Math.PI, Math.PI / 2, true);
profileUIPath.lineTo(-mainFrameWidth / 2 + profileOffset - profileBorderRadius + profileLength, mainFrameHeight / 2 - profileOffset);
profileUIPath.arc(0, -profileBorderRadius, profileBorderRadius, Math.PI / 2, 0, true);
profileUIPath.lineTo(-mainFrameWidth / 2 + profileOffset + profileLength, mainFrameHeight / 2 - profileOffset - profileHeight + profileBorderRadius);
profileUIPath.arc(-profileBorderRadius, 0, profileBorderRadius, 0, 3 * Math.PI / 2, true);
profileUIPath.lineTo(-mainFrameWidth / 2 + profileOffset + profileBorderRadius, mainFrameHeight / 2 - profileOffset - profileHeight);
profileUIPath.arc(0, profileBorderRadius, profileBorderRadius, 3 * Math.PI / 2, Math.PI, true);
profileUIPath.lineTo(-mainFrameWidth / 2 + profileOffset, mainFrameHeight / 2 - profileOffset - profileBorderRadius);

const profileOutlinePoints = profileUIPath.getPoints(240);

export const profileOutlineGeometry = new LineGeometry().setFromPoints(profileOutlinePoints);

// Profile inner divider lines
export let profileHeightSegments = profileHeight / 4;
let profileUIVertices: Array<number> = [];
for (let i = 1; i < 4; i++) {
    profileUIVertices.push(
        -mainFrameWidth / 2 + profileOffset, mainFrameHeight / 2 - profileOffset - i * profileHeightSegments, 0,
        -mainFrameWidth / 2 + profileOffset + profileLength, mainFrameHeight / 2 - profileOffset - i * profileHeightSegments, 0
    );
}
profileUIVertices.push(
    -mainFrameWidth / 2 + profileOffset + profileLength / 5, mainFrameHeight / 2 - profileOffset - profileHeightSegments, 0,
    -mainFrameWidth / 2 + profileOffset + profileLength / 5, mainFrameHeight / 2 - profileOffset - 2 * profileHeightSegments, 0,
    -mainFrameWidth / 2 + profileOffset + 4 * profileLength / 5, mainFrameHeight / 2 - profileOffset - profileHeightSegments, 0,
    -mainFrameWidth / 2 + profileOffset + 4 * profileLength / 5, mainFrameHeight / 2 - profileOffset - 2 * profileHeightSegments, 0,
    -mainFrameWidth / 2 + profileOffset + profileLength / 2, mainFrameHeight / 2 - profileOffset - 3 * profileHeightSegments, 0,
    -mainFrameWidth / 2 + profileOffset + profileLength / 2, mainFrameHeight / 2 - profileOffset - 4 * profileHeightSegments, 0,
);
let profileUIIndices: Array<number> = [];
for (let i = 0; i < 12; i++)
    profileUIIndices.push(i);

export const profileInlineGeometry = lineSegmentPositions(profileUIVertices, profileUIIndices);

// Profile texts
export const profileTextSize = profileHeightSegments / 6, profileLargeTextSize = profileHeightSegments / 5;
const profileTextParameters: TextGeometryParameters = {
    font: font,
    size: profileTextSize,
    depth: profileTextSize * 0.02,
    curveSegments: 30
};
const profileLargeTextParameters: TextGeometryParameters = {
    font: font,
    size: profileLargeTextSize,
    depth: profileTextSize * 0.02,
    curveSegments: 30
};
export const nameTextGeometry = new TextGeometry("Saswat Kumar Dash", profileLargeTextParameters).center();
export const empIdTextGeometry = new TextGeometry("Employee Id:-", profileTextParameters).center();
export const empIdResTextGeometry = new TextGeometry("EvA/280", profileLargeTextParameters).center();
export const designationTextGeometry = new TextGeometry("Designation:-", profileTextParameters).center();
export const designationResTextGeometry = new TextGeometry("Software Engineer - Design\n Configurator", profileLargeTextParameters).center();

// Shapes at the bottom of main scene
let shapesAreaLength = mainFrameWidth, shapesAreaWidth = 0.15 * shapesAreaLength;
export const hexagonGeometry = createHexagon(-shapesAreaLength/2 + shapesAreaLength/10, -mainFrameHeight/2 + shapesAreaWidth/2, 0.4 * shapesAreaWidth);
export const starGeometry = createStarShape(-shapesAreaLength/2 + 3*shapesAreaLength/10, -mainFrameHeight/2 + shapesAreaWidth/10, (shapesAreaWidth/5) / Math.sin(Math.PI/3));
export const upwardArroeGeometry = createUpwardArrow(0, -mainFrameHeight/2 + shapesAreaWidth/10, 4*shapesAreaWidth/5);
export const leftArrowGeometry = createLeftArrow(shapesAreaLength/10 + shapesAreaLength/25, -mainFrameHeight/2 + shapesAreaWidth/2, 3 * shapesAreaLength/25, 3 * shapesAreaWidth/5);
export const rightArrowGeometry = createRightArrow(shapesAreaLength/2 - shapesAreaLength/25, -mainFrameHeight/2 + shapesAreaWidth/2, 3 * shapesAreaLength/25, 3 * shapesAreaWidth/5);

// Bottom Shapes Outlines
let shapesUIVertices: Array<number> = [];
shapesUIVertices.push(
    -shapesAreaLength/2, -mainFrameHeight/2 + shapesAreaWidth, 0, shapesAreaLength/2, -mainFrameHeight/2 + shapesAreaWidth, 0,
    -shapesAreaLength/2, -mainFrameHeight/2, 0, shapesAreaLength/2, -mainFrameHeight/2, 0
);
for (let i = 0; i < 8; i++) {
    shapesUIVertices.push(
        -shapesAreaLength/2 + i*shapesAreaLength/5, -mainFrameHeight/2 + shapesAreaWidth, 0,
        -shapesAreaLength/2 + i*shapesAreaLength/5, -mainFrameHeight/2, 0,
    )
}
let shapeUIIndices: Array<number> = [];
for (let i = 0; i < shapesUIVertices.length/3; i+=3) 
    shapeUIIndices.push(i/3);

// export const shapeUILinesGeometry = lineSegmentPositions(shapesUIVertices, shapeUIIndices);