import * as THREE from 'three';
import { FontLoader, LineGeometry, LineSegmentsGeometry, TextGeometry, type TextGeometryParameters } from 'three/examples/jsm/Addons.js';
import helvetikerFont from 'three/examples/fonts/helvetiker_bold.typeface.json';

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
export let cornerCoordinates = [0.5, 0.9];
let outerWidth = 0.04, beadWidth = 0.02;

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
export const nameTextGeometry = new TextGeometry("Saswat Kumar Dash", profileTextParameters).center();
export const empIdTextGeometry = new TextGeometry("Employee Id:-", profileTextParameters).center();
export const empIdResTextGeometry = new TextGeometry("EvA/280", profileLargeTextParameters).center();
export const designationTextGeometry = new TextGeometry("Designation:-", profileTextParameters).center();
export const designationResTextGeometry = new TextGeometry("Software Engineer - Design\n Configurator", profileLargeTextParameters).center();