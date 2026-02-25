import * as THREE from 'three';
import { activeGeometry, extrudeDepth } from './geometries';
import { edgeMaterial } from './materials';

const activeEdgeGeo = new THREE.EdgesGeometry(activeGeometry);
export const activeLineSegments = new THREE.LineSegments(activeEdgeGeo, edgeMaterial);

export const axesHelper = new THREE.AxesHelper(extrudeDepth/2 + 3);
axesHelper.setColors("red", "yellow", "blue");