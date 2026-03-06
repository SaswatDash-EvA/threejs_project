import * as THREE from 'three';
import { extrudeRectangleGeometry } from './geometries';
import { extrudeMaterial } from './materials';

export const extrudeRectangle = new THREE.Mesh(extrudeRectangleGeometry, extrudeMaterial);