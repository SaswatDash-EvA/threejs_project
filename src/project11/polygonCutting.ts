import * as THREE from 'three';
import { beadH, frameH, frameH1, windowHeight, windowWidth } from './dynamicVariables';
 /**
  * Cuts the Extrude geometry by 45 degre and 135 degree
  * @param geometry takes the THREE.ExtrudeGeometry to cut by vertex manipulation
  * @param index the part position of the mesh: bottom = 1, right = 2, top = 3, left = 4
  */
export function cutBy45135(geometry: THREE.ExtrudeGeometry, index: number) {
    const vertexArray = geometry.attributes.position.array;

    // For bottom and top frames
    if (index === 1 || index === 3) {
        for (let i = 0; i < vertexArray.length; i += 3) {
            const x = vertexArray[i], y = vertexArray[i+1];
            if (Math.abs(x) === windowWidth/2){
                vertexArray[i] = Math.sign(x)*Math.sign(y) * (y - Math.sign(y)*windowHeight/2) + Math.sign(x) * windowWidth/2;
            }
            // Shift the vertices that are not at the edges
            else if (Math.abs(y) != windowHeight / 2) {
                vertexArray[i] = x * (windowWidth - 2 * (Math.abs(y) == windowHeight/2 - frameH? frameH : frameH1)) / windowWidth;
            }
        }
    }
    // For left and right frames
    else if (index === 2 || index === 4) {
        for (let i = 0; i < vertexArray.length; i += 3) {
            const x = vertexArray[i], y = vertexArray[i+1];
            if (Math.abs(y) === windowHeight/2){
                vertexArray[i+1] = Math.sign(x)*Math.sign(y) * (x - Math.sign(x) * windowWidth/2) + Math.sign(y) * windowHeight/2;
            }
            // Shift the vertices that are not at the edges
            else if (Math.abs(x) != windowWidth / 2) {
                vertexArray[i+1] = y * (windowHeight - 2 * (Math.abs(x) == windowWidth/2 - frameH? frameH : frameH1)) / windowHeight;
            }
        }
    }
}

/**
 * Cuts the extrude geometry by 90 degree keeping the height side full length
 * @param geometry takes the THREE.ExtrudeGeometry to cut by vertex manipulation
 * @param index the part position of the mesh: bottom = 1, right = 2, top = 3, left = 4
 */
export function heightMajor90Cut(geometry: THREE.ExtrudeGeometry, index: number) {
    if (index == 1 || index == 3)
        geometry.scale((windowWidth - 2*(frameH1 + beadH)) / (windowWidth - 2*frameH1), 1, 1);
}