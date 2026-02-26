import { activeGeometry, angle1, angle2, cleanCylinderGeometry, cleanTrapizoidGeometry, dynamicSquareHeight, dynamicSquareWidth, extrudeCircleMajorRadius, extrudeDepth, extrudeRectangleWidth } from "./geometries";

let cutWidth1 = 0.25, cutHeight1 = 0.25;
let cutWidth2 = 0.25, cutHeight2 = 0.25;

export function updateCutWidths(W1: number, W2: number) {
    cutWidth1 = W1;
    cutWidth2 = W2;
}

export function updateCutHeights(H1: number, H2: number) {
    cutHeight1 = H1;
    cutHeight2 = H2;
}

export function cutPolygon() {
    const positionAttribute = activeGeometry.attributes.position;
    const vertexArray = positionAttribute.array;

    if (activeGeometry === cleanTrapizoidGeometry) {
        for (let i = 0; i < vertexArray.length; i += 3) {
            if (vertexArray[i+1] == -extrudeRectangleWidth/2) continue;

            if (((extrudeRectangleWidth / Math.tan(angle1)) + (extrudeRectangleWidth / Math.tan(angle2))) <= extrudeDepth) {
                if (vertexArray[i+2] > 0)
                    vertexArray[i+2] -= 2 * vertexArray[i+1] / Math.tan(angle1);
                else vertexArray[i+2] += 2 * vertexArray[i+1] / Math.tan(angle2);
            }
            else {
                const y = Math.sin(angle1) * Math.cos(angle2) * extrudeDepth * Math.abs(2 * vertexArray[i+1] / extrudeRectangleWidth) / Math.sin(angle1 + angle2);
                vertexArray[i+2] = -extrudeDepth/2 + y;
                vertexArray[i+1] = -extrudeRectangleWidth/2 + y * Math.tan(angle2)
            }
            
        }
    }
    else if (activeGeometry === cleanCylinderGeometry) {
        for (let i = 0; i < vertexArray.length; i += 3) {
            if (vertexArray[i+1] == -extrudeCircleMajorRadius) continue;

            if (((2 * extrudeCircleMajorRadius / Math.tan(angle1)) + (2 * extrudeCircleMajorRadius / Math.tan(angle2))) <= extrudeDepth) {
                if (vertexArray[i+2] > 0)
                    vertexArray[i+2] -= (vertexArray[i+1] + extrudeCircleMajorRadius) / Math.tan(angle1);
                else vertexArray[i+2] += (vertexArray[i+1] + extrudeCircleMajorRadius) / Math.tan(angle2);
            }            
        }
    }
    else if ((cutWidth1 + cutWidth2) < extrudeDepth) {
        for (let i = 0; i < vertexArray.length; i += 3) {
            if (vertexArray[i+1] == 0) {
                if (vertexArray[i] > 0) vertexArray[i+1] = (-dynamicSquareHeight/2 + cutHeight1);
                else vertexArray[i+1] = (-dynamicSquareHeight/2 + cutHeight2);
                continue;
            }

            if (vertexArray[i] > 0) {
                if (vertexArray[i] === dynamicSquareWidth/2) {
                    vertexArray[i] -= cutWidth1 * Math.abs(2 * vertexArray[i+1] / dynamicSquareHeight);
                    if (vertexArray[i+1] > 0) vertexArray[i+1] = (-dynamicSquareHeight/2 + cutHeight1) + 2 * (1 - cutHeight1/dynamicSquareHeight) * vertexArray[i+1];
                    else vertexArray[i+1] = (-dynamicSquareHeight/2 + cutHeight1) + 2 * (cutHeight1/dynamicSquareHeight) * vertexArray[i+1];
                }  
                else vertexArray[i] = ((dynamicSquareWidth - 2*cutWidth1) * vertexArray[i]) / dynamicSquareWidth;
            }
            else {
                if (vertexArray[i] === -dynamicSquareWidth/2) {
                    vertexArray[i] += cutWidth2 * Math.abs(2 * vertexArray[i+1] / dynamicSquareHeight);
                    if (vertexArray[i+1] > 0) vertexArray[i+1] = (-dynamicSquareHeight/2 + cutHeight2) + 2 * (1 - cutHeight2/dynamicSquareHeight) * vertexArray[i+1];
                    else vertexArray[i+1] = (-dynamicSquareHeight/2 + cutHeight2) + 2 * (cutHeight2/dynamicSquareHeight) * vertexArray[i+1];
                }                    
                else vertexArray[i] = ((dynamicSquareWidth - 2*cutWidth2) * vertexArray[i]) / dynamicSquareWidth;
            } 
            
        }
    }
    positionAttribute.needsUpdate = true;
}