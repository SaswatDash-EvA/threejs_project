import * as THREE from 'three';
import { edgeLines, extrudeHandleGeometry, updateGeometry } from './curveGeometries';
import { handleOuterMaterial } from './materials';

export let handle = new THREE.Mesh(extrudeHandleGeometry, handleOuterMaterial);
handle.add(edgeLines);

export function updateMesh() {
    updateGeometry();
    handle = new THREE.Mesh(extrudeHandleGeometry, handleOuterMaterial);
    handle.add(edgeLines);
}