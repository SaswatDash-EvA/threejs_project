import * as THREE from 'three';
import { activeGeometry } from './geometries';
import { material } from './materials';
import { activeLineSegments } from './helpers';

export const activeShape = new THREE.Mesh(activeGeometry, material);
activeShape.add(activeLineSegments);

export function updateActiveShape() {
    activeShape.geometry = activeGeometry;
}