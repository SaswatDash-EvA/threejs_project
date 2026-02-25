import { activeGeometry, angle1, angle2, cleanTrapizoidGeometry, extrudeCircleMajorRadius, extrudeDepth, extrudeRectangleWidth } from "./geometries";

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
        positionAttribute.needsUpdate = true;
    }
    else {
        for (let i = 0; i < vertexArray.length; i += 3) {
            if (vertexArray[i+1] == -extrudeCircleMajorRadius) continue;

            if (((2 * extrudeCircleMajorRadius / Math.tan(angle1)) + (2 * extrudeCircleMajorRadius / Math.tan(angle2))) <= extrudeDepth) {
                if (vertexArray[i+2] > 0)
                    vertexArray[i+2] -= (vertexArray[i+1] + extrudeCircleMajorRadius) / Math.tan(angle1);
                else vertexArray[i+2] += (vertexArray[i+1] + extrudeCircleMajorRadius) / Math.tan(angle2);
            }            
        }
        positionAttribute.needsUpdate = true;
    }
}