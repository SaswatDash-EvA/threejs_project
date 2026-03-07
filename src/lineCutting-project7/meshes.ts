import * as THREE from 'three';
import { extrudeEdgeGeometry, extrudeRectangleGeometry } from './geometries';
import { edgeMaterial, extrudeMaterial } from './materials';

export const extrudeRectangle = new THREE.Mesh(extrudeRectangleGeometry, extrudeMaterial);
const edge = new THREE.LineSegments(extrudeEdgeGeometry, edgeMaterial);
extrudeRectangle.add(edge);