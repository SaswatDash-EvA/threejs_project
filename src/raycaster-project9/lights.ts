import * as THREE from 'three/webgpu';
import { plane } from './meshes';

export const dirLight = new THREE.DirectionalLight("white", 2);
dirLight.position.set(10, 10, -5);
dirLight.target = plane;
dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

const d = 8; // Covers the 10x10 Area
dirLight.shadow.camera.left = -d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = -d;

dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 30;
dirLight.shadow.camera.updateProjectionMatrix();

export const pointLight = new THREE.PointLight("white", 4, 0, 0.3);
pointLight.position.set(-10, 7, 2);

pointLight.castShadow = true;