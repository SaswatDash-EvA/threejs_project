import * as THREE from 'three';
import { extrudeShape1, extrudeShape2, extrudeShape3, shape1EdgesGeo, shape2EdgesGeo, shape3EdgesGeo } from './geometries';
import { child1ExtrudeMaterial, child2ExtrudeMaterial, edgeMaterial, partentExtrudeMaterial } from './materials';

export const parentMesh = new THREE.Mesh(extrudeShape1, partentExtrudeMaterial);

const child1Mesh = new THREE.Mesh(extrudeShape2, child1ExtrudeMaterial);
const child2Mesh = new THREE.Mesh(extrudeShape3, child2ExtrudeMaterial);

const parentMeshEdges = new THREE.LineSegments(shape1EdgesGeo, edgeMaterial);
parentMesh.add(parentMeshEdges, child1Mesh, child2Mesh);

const child1MeshEdges = new THREE.LineSegments(shape2EdgesGeo, edgeMaterial);
const child2MeshEdges = new THREE.LineSegments(shape3EdgesGeo, edgeMaterial);
child1Mesh.add(child1MeshEdges);
child2Mesh.add(child2MeshEdges);