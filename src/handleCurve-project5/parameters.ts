// Variable parameters
let height = 16, width = 8;
let rightLegWidth = 3;
let H1 = 5;
let innerHoleDiameter = 3;

let handleHeight = height, handleWidth = width;
let topOffset = handleHeight/2 - H1;
let leftH1toTopGapRatio = H1/topOffset;

let leftLegHeight = H1 <= (handleHeight/2)? H1 : (handleHeight/2) / (1 + 1/leftH1toTopGapRatio);
let handleThickness = 2;

if (rightLegWidth > handleWidth) 
    rightLegWidth = handleWidth;

if (innerHoleDiameter >= leftLegHeight * Math.cos(Math.atan(topOffset/handleWidth))) 
    innerHoleDiameter = leftLegHeight * Math.cos(Math.atan(topOffset/handleWidth));
if (innerHoleDiameter > handleWidth)
    innerHoleDiameter = handleWidth;

let cameraZ = Math.ceil(Math.max(handleHeight, handleWidth) / 10) * 10;

export function updateParameters(height: number, width: number, rightLegWidth: number, H1: number, innerHoleDiameter: number) {
    handleHeight = height, handleWidth = width;
    topOffset = handleHeight/2 - H1;
    leftH1toTopGapRatio = H1/topOffset;

    leftLegHeight = H1 <= (handleHeight/2)? H1 : (handleHeight/2) / (1 + 1/leftH1toTopGapRatio);
    handleThickness = 2;

    if (rightLegWidth > handleWidth) 
        rightLegWidth = handleWidth;

    if (innerHoleDiameter >= leftLegHeight * Math.cos(Math.atan(topOffset/handleWidth))) 
        innerHoleDiameter = leftLegHeight * Math.cos(Math.atan(topOffset/handleWidth));
    if (innerHoleDiameter > handleWidth)
        innerHoleDiameter = handleWidth;

    cameraZ = Math.ceil(Math.max(handleHeight, handleWidth) / 10) * 10;
}

export { handleHeight, handleWidth, leftLegHeight, topOffset, leftH1toTopGapRatio, rightLegWidth, handleThickness, innerHoleDiameter, cameraZ };