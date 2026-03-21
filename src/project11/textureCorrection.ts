import * as TSL from 'three/tsl';
import * as THREE from 'three/webgpu';

export const fixedVerticalUV = TSL.vec2(TSL.positionLocal.x.add(TSL.positionLocal.z).mul(0.001), TSL.positionLocal.y.mul(0.001));
export const fixedHorizontalUV = TSL.vec2(TSL.positionLocal.y.add(TSL.positionLocal.z).mul(0.001), TSL.positionLocal.x.mul(0.001));

// Recompute tangents and bitangents after generating UVs
export function fixedNormalsForVertical(normalTexture: THREE.Texture<HTMLImageElement>): THREE.Node<"vec3"> {
    
    const dpdx = TSL.dFdx(TSL.positionWorld);
    const dpdy = TSL.dFdy(TSL.positionWorld);

    const tangent = dpdx.normalize();
    const bitangent = dpdy.normalize();
    const normal = tangent.cross(bitangent).normalize();

    
    const normalMapSample = TSL.texture(normalTexture, fixedVerticalUV).mul(2.0).sub(1.0);
    return TSL.mat3(tangent, bitangent, normal).mul(normalMapSample).normalize();
}

export function fixedNormalsForHorizontal(normalTexture: THREE.Texture<HTMLImageElement>): THREE.Node<"vec3"> {
    const dpdx = TSL.dFdx(TSL.positionWorld);
    const dpdy = TSL.dFdy(TSL.positionWorld);

    const tangent = dpdx.normalize();
    const bitangent = dpdy.normalize();
    const normal = tangent.cross(bitangent).normalize();

    
    const normalMapSample = TSL.texture(normalTexture, fixedHorizontalUV).mul(2.0).sub(1.0);
    return TSL.mat3(tangent, bitangent, normal).mul(normalMapSample).normalize();
}