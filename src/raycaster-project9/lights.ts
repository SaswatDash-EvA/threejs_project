import * as THREE from 'three/webgpu';
import { plane } from './meshes';

export const dirLight = new THREE.DirectionalLight("white", 2);
dirLight.position.set(1, 1, -0.5);
dirLight.target = plane;
dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;