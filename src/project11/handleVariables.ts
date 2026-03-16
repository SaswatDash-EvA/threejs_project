import { frameH1, windowWidth } from "./dynamicVariables";

let handleOriginX = (windowWidth - frameH1)/2, handleOriginY = 0;

let cockSpurHeadRadius = 24, cockSpurHolderWidth = 35;
let cockSpurHandleWidth = 110, cockSpurHandleHeight = 250;
let cockSpurHandleDepth = 4, cockSpurHandleCurveHeight = 40;

let backPlateHeight = 80, backPlateWidth = 57, backPlateSideRadius = cockSpurHeadRadius, backPlateMidRadius = backPlateHeight/2 - backPlateSideRadius;
let backPlateTopBottomFaceLength = backPlateWidth - backPlateSideRadius - backPlateMidRadius;

let midHoleRadius = 10, topBottomHoleRadius = backPlateTopBottomFaceLength/3;

export { cockSpurHandleHeight, cockSpurHandleWidth, cockSpurHolderWidth, cockSpurHeadRadius, backPlateHeight, backPlateWidth, 
    handleOriginX, handleOriginY, backPlateSideRadius, backPlateMidRadius, backPlateTopBottomFaceLength, midHoleRadius, topBottomHoleRadius, cockSpurHandleDepth, cockSpurHandleCurveHeight };