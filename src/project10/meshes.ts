import { Line2, LineSegments2 } from 'three/examples/jsm/Addons.js';
import { beadInsideGeometry, boundaryGeometry, cutSegmentsGeometry, dashedLineSegmentGeometry, designationResTextGeometry, designationTextGeometry, empIdResTextGeometry, empIdTextGeometry, hardwareDetHeight, heightSegment, lowerHeightSegments, lvl10TextGeometry, lvl2leftTextGeometry, lvl2RightTextGeometry, lvl3TextGeometry, lvl4TextGeometry, lvl6TextGeometry, lvl7RightTextGeometry, lvl7TextGeometry, lvl8TextGeometry, lvl9TextGeometry, mainFrameHeight, mainFrameWidth, mainSceneUILinesGeometry, nameTextGeometry, outerFrameGeometry, outerInsideGeometry, profileHeightSegments, profileInlineGeometry, profileLength, profileOffset, profileOutlineGeometry, textSize, topTextGeometry, uiHeight, uiwidth } from './geometries';
import { boundaryMaterial, dashedDividerMaterial, textMaterial, uiLinesMaterial, windowMaterial } from './materials';
import { Mesh } from 'three';

export const boundaryFrame = new Line2(boundaryGeometry, boundaryMaterial);
boundaryFrame.computeLineDistances();

export const uiLines = new LineSegments2(mainSceneUILinesGeometry, uiLinesMaterial);
uiLines.computeLineDistances();

const topText = new Mesh(topTextGeometry, textMaterial);
const lvl2LeftText = new Mesh(lvl2leftTextGeometry, textMaterial), lvl2RightText = new Mesh(lvl2RightTextGeometry, textMaterial);
const lvl3Text = new Mesh(lvl3TextGeometry, textMaterial);
const lvl4Text = new Mesh(lvl4TextGeometry, textMaterial);
const lvl6Text = new Mesh(lvl6TextGeometry, textMaterial);
const lvl7Text = new Mesh(lvl7TextGeometry, textMaterial);
const lvl7RightText = new Mesh(lvl7RightTextGeometry, textMaterial);
const lvl8Text = new Mesh(lvl8TextGeometry, textMaterial);
const lvl9Text = new Mesh(lvl9TextGeometry, textMaterial);
const lvl10Text = new Mesh(lvl10TextGeometry, textMaterial);

// Text positioning
let textLeftOffset = 10, textTopOffset = textSize + 4, topDoubleOffeset = textSize + 10;
topText.position.set(-uiwidth/2 + textLeftOffset, uiHeight/2 - heightSegment/2 - textSize/2, 0); // Top text offeset set as 2 as top 4 pixels are taken by border
lvl2LeftText.position.set(-uiwidth/2 + textLeftOffset, uiHeight/2 - heightSegment - textTopOffset - textSize/2, 0);
lvl2RightText.position.set(textLeftOffset, uiHeight/2 - heightSegment - textTopOffset - textSize/2, 0);
lvl3Text.position.set(-uiwidth/2 + textLeftOffset, uiHeight/2 - 2*heightSegment - heightSegment/2 - textSize/2, 0);
lvl4Text.position.set(-uiwidth/2 + textLeftOffset, uiHeight/2 - 3*heightSegment - heightSegment/2 - textSize/2, 0);
lvl6Text.position.set(-uiwidth/2 + textLeftOffset, uiHeight/2 - 5*heightSegment - heightSegment/2 - textSize/2, 0);
lvl7Text.position.set(-uiwidth/2 + textLeftOffset, uiHeight/2 - 6*heightSegment - topDoubleOffeset - textSize/2, 0);
lvl7RightText.position.set(uiwidth/4 + textLeftOffset, uiHeight/2 - 6*heightSegment - topDoubleOffeset - textSize/2, 0);
lvl8Text.position.set(-uiwidth/2 + textLeftOffset, uiHeight/2 - 6*heightSegment - hardwareDetHeight - topDoubleOffeset - textSize/2, 0);
lvl9Text.position.set(-uiwidth/2 + textLeftOffset, uiHeight/2 - 6*heightSegment - hardwareDetHeight - lowerHeightSegments - lowerHeightSegments/2 - textSize/2, 0);
lvl10Text.position.set(-uiwidth/2 + textLeftOffset, uiHeight/2 - 6*heightSegment - hardwareDetHeight - 2*lowerHeightSegments - lowerHeightSegments/2 - textSize/2, 0);

export const uiTexts = [topText, lvl2LeftText, lvl2RightText, lvl3Text, lvl4Text, lvl6Text, lvl7Text, lvl7RightText, lvl8Text, lvl9Text, lvl10Text];

// Profile card texts
const nameText = new Mesh(nameTextGeometry, textMaterial);
const empIdText = new Mesh(empIdTextGeometry, textMaterial);
const empIdResText = new Mesh(empIdResTextGeometry, textMaterial);
const designationText = new Mesh(designationTextGeometry, textMaterial);
const designationResText = new Mesh(designationResTextGeometry, textMaterial);

nameText.position.set(-mainFrameWidth/2 + profileOffset + profileLength/2, mainFrameHeight/2 - profileOffset - profileHeightSegments/2, 0);
empIdText.position.set(-mainFrameWidth/2 + profileOffset + profileLength/2, mainFrameHeight/2 - profileOffset - profileHeightSegments - profileHeightSegments/4, 0);
empIdResText.position.set(-mainFrameWidth/2 + profileOffset + profileLength/2, mainFrameHeight/2 - profileOffset - profileHeightSegments - 3*profileHeightSegments/5, 0);
designationText.position.set(-mainFrameWidth/2 + profileOffset + profileLength/2, mainFrameHeight/2 - profileOffset - 2*profileHeightSegments - profileHeightSegments/6, 0);
designationResText.position.set(-mainFrameWidth/2 + profileOffset + profileLength/2, mainFrameHeight/2 - profileOffset - 2*profileHeightSegments - 3*profileHeightSegments/5, 0);

export const profileCardTexts = [nameText, empIdText, empIdResText, designationText, designationResText];

export const outerOutsideFrame = new Line2(outerFrameGeometry, windowMaterial);
const outerInsideFrame = new Line2(outerInsideGeometry, windowMaterial);
const beadInsideFrame = new Line2(beadInsideGeometry, windowMaterial);

const cutLineSegments = new LineSegments2(cutSegmentsGeometry, windowMaterial);
const dashedLineSegments = new LineSegments2(dashedLineSegmentGeometry, dashedDividerMaterial);
dashedLineSegments.computeLineDistances();

outerOutsideFrame.add(outerInsideFrame, beadInsideFrame, cutLineSegments, dashedLineSegments);
outerOutsideFrame.translateY(0.2);

// Profile UI
export const profileOutline = new Line2(profileOutlineGeometry, uiLinesMaterial);
export const profileInlines = new LineSegments2(profileInlineGeometry, uiLinesMaterial);