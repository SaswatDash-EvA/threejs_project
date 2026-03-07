import * as THREE from 'three';
import { extrudeShape1, shape1EdgesGeo } from './geometries';
import { edgeMaterial, partentExtrudeMaterial } from './materials';

export const parentMesh = new THREE.Mesh(extrudeShape1, partentExtrudeMaterial);

const parentMeshEdges = new THREE.LineSegments(shape1EdgesGeo, edgeMaterial);
parentMesh.add(parentMeshEdges);