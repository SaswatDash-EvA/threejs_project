import { LineMaterial } from 'three/examples/jsm/Addons.js';
import { cornerCoordinates } from './geometries';

export const windowMaterial = new LineMaterial({ color: "#919191", linewidth: 2 });
export const dashedDividerMaterial = new LineMaterial({ color: "#313131", linewidth: 2, dashed: true, 
    dashSize: Math.max(cornerCoordinates[0], cornerCoordinates[1])/20, gapSize: Math.max(cornerCoordinates[0], cornerCoordinates[1])/50 
});