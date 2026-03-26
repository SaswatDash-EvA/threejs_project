import * as TSL from 'three/tsl';

export const fixedVerticalUV = TSL.vec2(TSL.positionLocal.x.add(TSL.positionLocal.z).mul(0.001), TSL.positionLocal.y.mul(0.001));
export const fixedHorizontalUV = TSL.vec2(TSL.positionLocal.y.add(TSL.positionLocal.z).mul(0.001), TSL.positionLocal.x.mul(0.001));