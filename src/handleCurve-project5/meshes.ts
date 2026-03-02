import * as THREE from 'three';
import { edgeLines, extrudeHandleGeometry } from './curveGeometries';
import { handleOuterMaterial } from './materials';

export const handle = new THREE.Mesh(extrudeHandleGeometry, handleOuterMaterial);
handle.add(edgeLines);