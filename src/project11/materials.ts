import * as THREE from 'three/webgpu';
import textureLink from "./assets/oak_veneer_01_diff_4k.jpg";
import normalLink from "./assets/oak_veneer_01_nor_gl_4k.exr";
import roughnessLink from "./assets/oak_veneer_01_rough_4k.exr";
import displacementLink from "./assets/oak_veneer_01_disp_4k.png";
import AOLink from "./assets/oak_veneer_01_ao_4k.jpg";
import { materialColor, texture } from 'three/tsl';
import { fixedHorizontalUV, fixedVerticalUV } from './textureCorrection';
import { EXRLoader } from 'three/examples/jsm/Addons.js';
// import { defaultColor } from './dynamicVariables';

const loader = new THREE.TextureLoader();
const exrLoader = new EXRLoader();
const sideTexture = await loader.loadAsync(textureLink);
const sideTextureVertDisplacement = await loader.loadAsync(displacementLink);
const sideTextureAO = await loader.loadAsync(AOLink);
const sideTextureNormal = await exrLoader.loadAsync(normalLink);
const sideTextureRoughness = await exrLoader.loadAsync(roughnessLink);

[sideTexture, sideTextureVertDisplacement, sideTextureAO, sideTextureNormal, sideTextureRoughness].forEach(texture => {
    texture.center.set(0.5, 0.5);
    texture.rotation = Math.PI / 2;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.colorSpace = THREE.NoColorSpace;
});
sideTexture.colorSpace = THREE.SRGBColorSpace;

const verticalSideTextureNodes = [
    texture(sideTexture, fixedVerticalUV),
    texture(sideTextureAO, fixedVerticalUV),
    texture(sideTextureNormal, fixedVerticalUV).mul(0.7),
    texture(sideTextureRoughness, fixedVerticalUV)
];
const horizontalSideTextureNodes = [
    texture(sideTexture, fixedHorizontalUV),
    texture(sideTextureAO, fixedHorizontalUV),
    texture(sideTextureNormal, fixedHorizontalUV).mul(0.7),
    texture(sideTextureRoughness, fixedHorizontalUV)
];

export const frameSkinMaterials = [
    new THREE.MeshStandardNodeMaterial({ 
        color: "white", 
        colorNode: horizontalSideTextureNodes[0].mul(materialColor.toColor()),
        normalNode: horizontalSideTextureNodes[2],
        roughnessNode: horizontalSideTextureNodes[3],
        aoNode: horizontalSideTextureNodes[1],
        wireframe: false,
    }),
    new THREE.MeshStandardNodeMaterial({ 
        color: "white", 
        colorNode: verticalSideTextureNodes[0].mul(materialColor.toColor()),
        normalNode: verticalSideTextureNodes[2],
        roughnessNode: verticalSideTextureNodes[3],
        aoNode: verticalSideTextureNodes[1],
        wireframe: false,
    }),
    new THREE.MeshStandardNodeMaterial({ 
        color: "white", 
        colorNode: horizontalSideTextureNodes[0].mul(materialColor.toColor()),
        normalNode: horizontalSideTextureNodes[2],
        roughnessNode: horizontalSideTextureNodes[3],
        aoNode: horizontalSideTextureNodes[1],
        wireframe: false,
    }),
    new THREE.MeshStandardNodeMaterial({ 
        color: "white", 
        colorNode: verticalSideTextureNodes[0].mul(materialColor.toColor()),
        normalNode: verticalSideTextureNodes[2],
        roughnessNode: verticalSideTextureNodes[3],
        aoNode: verticalSideTextureNodes[1],
        wireframe: false,
    })
];

export const beadSkinMaterials = [
    new THREE.MeshStandardNodeMaterial({ 
        color: "white", 
        colorNode: horizontalSideTextureNodes[0].mul(materialColor.toColor()),
        normalNode: horizontalSideTextureNodes[2],
        roughnessNode: horizontalSideTextureNodes[3],
        aoNode: horizontalSideTextureNodes[1],
        wireframe: false,
    }),
    new THREE.MeshStandardNodeMaterial({ 
        color: "white", 
        colorNode: verticalSideTextureNodes[0].mul(materialColor.toColor()),
        normalNode: verticalSideTextureNodes[2],
        roughnessNode: verticalSideTextureNodes[3],
        aoNode: verticalSideTextureNodes[1],
        wireframe: false,
    }),
    new THREE.MeshStandardNodeMaterial({ 
        color: "white", 
        colorNode: horizontalSideTextureNodes[0].mul(materialColor.toColor()),
        normalNode: horizontalSideTextureNodes[2],
        roughnessNode: horizontalSideTextureNodes[3],
        aoNode: horizontalSideTextureNodes[1],
        wireframe: false,
    }),
    new THREE.MeshStandardNodeMaterial({ 
        color: "white", 
        colorNode: verticalSideTextureNodes[0].mul(materialColor.toColor()),
        normalNode: verticalSideTextureNodes[2],
        roughnessNode: verticalSideTextureNodes[3],
        aoNode: verticalSideTextureNodes[1],
        wireframe: false,
    })
];

export const glassMaterial = new THREE.MeshStandardMaterial({ color: "#8bcbff", transparent: true, opacity: 0.7 });

export const profileEdgesMaterial = new THREE.LineBasicMaterial({ color: "black" });