import { frameH1, windowWidth } from "./dynamicVariables";

let handleOriginX = (windowWidth - frameH1)/2, handleOriginY = 0;

let cockSpurHeadRadius = 14, cockSpurHolderWidth = 20;
let cockSpurHandleWidth = 40, cockSpurHandleHeight = 130;
let cockSpurNoseAngle = Math.PI/6;

let backPlateHeight = 50, backPlateWidth = 37, backPlateSideRadius = cockSpurHeadRadius, backPlateMidRadius = backPlateHeight/2 - backPlateSideRadius;
let backPlateTopBottomFaceLength = backPlateWidth - backPlateSideRadius - backPlateMidRadius;

let midHoleRadius = 6, topBottomHoleRadius = backPlateTopBottomFaceLength/3;

export { cockSpurHandleHeight, cockSpurHandleWidth, cockSpurHolderWidth, cockSpurHeadRadius, cockSpurNoseAngle, backPlateHeight, backPlateWidth, 
    handleOriginX, handleOriginY, backPlateSideRadius, backPlateMidRadius, backPlateTopBottomFaceLength, midHoleRadius, topBottomHoleRadius };