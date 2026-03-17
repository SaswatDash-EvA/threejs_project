import { frameH, windowWidth } from "./dynamicVariables";

let cockSpurHandleWidth = 90, cockSpurHandleHeight = 250;
let cockSpurHeadRadius = cockSpurHandleWidth * (1.9/5), cockSpurHolderWidth = cockSpurHeadRadius * (35/24);
let cockSpurHandleDepth = 4, cockSpurHandleCurveHeight = 40 < 3*cockSpurHandleDepth ? 3*cockSpurHandleDepth: 40;

let backPlateHeight = 7*cockSpurHandleHeight/16, backPlateWidth = 4 * backPlateHeight/5, backPlateSideRadius = 1.5*backPlateHeight/5, backPlateMidRadius = backPlateHeight/2 - backPlateSideRadius;
let backPlateTopBottomFaceLength = backPlateWidth - backPlateSideRadius - backPlateMidRadius;

let midHoleRadius = 3*cockSpurHeadRadius/8, topBottomHoleRadius = Math.min(backPlateMidRadius, backPlateTopBottomFaceLength)/2.3;

let handleOriginX = -(windowWidth - frameH)/2, handleOriginY = 0;

export { cockSpurHandleHeight, cockSpurHandleWidth, cockSpurHolderWidth, cockSpurHeadRadius, backPlateHeight, backPlateWidth, 
    handleOriginX, handleOriginY, backPlateSideRadius, backPlateMidRadius, backPlateTopBottomFaceLength, midHoleRadius, topBottomHoleRadius, cockSpurHandleDepth, cockSpurHandleCurveHeight };