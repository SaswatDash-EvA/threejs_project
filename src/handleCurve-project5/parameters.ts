// Variable parameters
let height = 16, width = 8;
let rightLegWidth = 3;
let H1 = 5;
let innerHoleDiameter = 3;
let handleThickness = 2;

let handleHeight = height, handleWidth = width;
let topOffset = handleHeight/2 - H1;
let leftH1toTopGapRatio = H1/topOffset;

let leftLegHeight = H1 <= (handleHeight/2)? H1 : (handleHeight/2) / (1 + 1/leftH1toTopGapRatio);

if (rightLegWidth > handleWidth) 
    rightLegWidth = handleWidth;

if (innerHoleDiameter >= leftLegHeight * Math.cos(Math.atan(topOffset/handleWidth))) 
    innerHoleDiameter = leftLegHeight * Math.cos(Math.atan(topOffset/handleWidth));
if (innerHoleDiameter > handleWidth)
    innerHoleDiameter = handleWidth;

let cameraZ = Math.ceil(Math.max(handleHeight, handleWidth) / 10) * 10;

export function updateParameters(height: number, width: number, rlegwidth: number, H1: number, holeDiameter: number, thickness: number) {
    handleHeight = height, handleWidth = width;
    leftH1toTopGapRatio = H1/topOffset;

    leftLegHeight = H1 < (height/2)? H1 : (height/2);
    topOffset = handleHeight/2 - leftLegHeight;
    handleThickness = thickness;

    if (rlegwidth > handleWidth) 
        rlegwidth = handleWidth;

    rightLegWidth = rlegwidth;

    if (holeDiameter >= leftLegHeight * Math.cos(Math.atan(topOffset/handleWidth))) 
        holeDiameter = leftLegHeight * Math.cos(Math.atan(topOffset/handleWidth));
    if (holeDiameter > handleWidth)
        holeDiameter = handleWidth;

    innerHoleDiameter = holeDiameter;

    cameraZ = Math.ceil(Math.max(handleHeight, handleWidth) / 10) * 10;
}

export { handleHeight, handleWidth, leftLegHeight, topOffset, leftH1toTopGapRatio, rightLegWidth, handleThickness, innerHoleDiameter, cameraZ };