import * as THREE from 'three/webgpu';

export function getIntersectedMesh(mouseCoordX: number, mouseCoordY: number, objects: Array<THREE.Object3D>, camera: THREE.Camera): THREE.Intersection {
    const ndcCoordX = (mouseCoordX / window.innerWidth) * 2 - 1;
    const ndcCoordY = 1 - (mouseCoordY / window.innerHeight) * 2;

    const caster = new THREE.Raycaster();
    caster.setFromCamera(new THREE.Vector2(ndcCoordX, ndcCoordY), camera);
    
    const intersections = caster.intersectObjects(objects);
    return intersections[0];
}