import { Line2, LineSegments2 } from 'three/examples/jsm/Addons.js';
import { beadInsideGeometry, cutSegmentsGeometry, dashedLineSegmentGeometry, outerBoundaryGeometry, outerInsideGeometry } from './geometries';
import { dashedDividerMaterial, windowMaterial } from './materials';

export const outerBoundaryFrame = new Line2(outerBoundaryGeometry, windowMaterial);
export const outerInsideFrame = new Line2(outerInsideGeometry, windowMaterial);
export const beadInsideFrame = new Line2(beadInsideGeometry, windowMaterial);

export const cutLineSegments = new LineSegments2(cutSegmentsGeometry, windowMaterial);
export const dashedLineSegments = new LineSegments2(dashedLineSegmentGeometry, dashedDividerMaterial);
dashedLineSegments.computeLineDistances();