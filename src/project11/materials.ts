import * as THREE from 'three/webgpu';
import textureLink from "./assets/WoodFloor034_1K-JPG_Color.jpg";
import normalLink from "./assets/WoodFloor034_1K-JPG_NormalGL.jpg";
import roughnessLink from "./assets/WoodFloor034_1K-JPG_Roughness.jpg";
import displacementLink from "./assets/WoodFloor034_1K-JPG_Displacement.jpg";
import AOLink from "./assets/WoodFloor034_1K-JPG_AmbientOcclusion.jpg";
// import { materialColor, texture } from 'three/tsl';
// import { fixedHorizontalUV, fixedNormalsForHorizontal, fixedNormalsForVertical, fixedVerticalUV } from './textureCorrection';
import { materialColor, normalMap, texture } from 'three/tsl';
import { fixedHorizontalUV, fixedVerticalUV } from './textureCorrection';
// import { defaultColor } from './dynamicVariables';

const loader = new THREE.TextureLoader();
// const exrLoader = new EXRLoader();
const sideTexture = await loader.loadAsync(textureLink);
const sideTextureVertDisplacement = await loader.loadAsync(displacementLink);
const sideTextureAO = await loader.loadAsync(AOLink);
// const sideTextureNormal = await exrLoader.loadAsync(normalLink);
// const sideTextureRoughness = await exrLoader.loadAsync(roughnessLink);
const sideTextureNormal = await loader.loadAsync(normalLink);
const sideTextureRoughness = await loader.loadAsync(roughnessLink);

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
    normalMap(texture(sideTextureNormal, fixedVerticalUV)),
    texture(sideTextureRoughness, fixedVerticalUV),
];
const horizontalSideTextureNodes = [
    texture(sideTexture, fixedHorizontalUV),
    texture(sideTextureAO, fixedHorizontalUV),
    normalMap(texture(sideTextureNormal, fixedHorizontalUV)),
    texture(sideTextureRoughness, fixedHorizontalUV),
];

export const frameSkinPhysicalMaterials = [
    new THREE.MeshPhysicalNodeMaterial({ 
        color: "white", 
        colorNode: horizontalSideTextureNodes[0].toVec4().mul(materialColor.toColor()),
        normalNode: horizontalSideTextureNodes[2],
        roughnessNode: horizontalSideTextureNodes[3],
        aoNode: horizontalSideTextureNodes[1],
        // map: sideTexture,
        wireframe: false,
        shadowSide: THREE.FrontSide,
        normalScale: new THREE.Vector2(0, 0)
    }),
    new THREE.MeshPhysicalNodeMaterial({ 
        color: "white", 
        colorNode: verticalSideTextureNodes[0].toVec4().mul(materialColor.toColor()),
        normalNode: verticalSideTextureNodes[2],
        roughnessNode: verticalSideTextureNodes[3],
        aoNode: verticalSideTextureNodes[1],
        // map: sideTexture,
        wireframe: false,
        shadowSide: THREE.FrontSide,
        normalScale: new THREE.Vector2(0, 0)
    }),
    new THREE.MeshPhysicalNodeMaterial({ 
        color: "white", 
        colorNode: horizontalSideTextureNodes[0].toVec4().mul(materialColor.toColor()),
        normalNode: horizontalSideTextureNodes[2],
        roughnessNode: horizontalSideTextureNodes[3],
        aoNode: horizontalSideTextureNodes[1],
        // map: sideTexture,
        wireframe: false,
        shadowSide: THREE.FrontSide,
        normalScale: new THREE.Vector2(0, 0)
    }),
    new THREE.MeshPhysicalNodeMaterial({ 
        color: "white", 
        colorNode: verticalSideTextureNodes[0].toVec4().mul(materialColor.toColor()),
        normalNode: verticalSideTextureNodes[2],
        roughnessNode: verticalSideTextureNodes[3],
        aoNode: verticalSideTextureNodes[1],
        // map: sideTexture,
        wireframe: false,
        shadowSide: THREE.FrontSide,
        normalScale: new THREE.Vector2(0, 0)
    })
];

export const beadSkinPhysicalMaterials = [
    new THREE.MeshPhysicalNodeMaterial({ 
        color: "white", 
        colorNode: horizontalSideTextureNodes[0].toVec4().mul(materialColor.toColor()),
        normalNode: horizontalSideTextureNodes[2],
        roughnessNode: horizontalSideTextureNodes[3],
        aoNode: horizontalSideTextureNodes[1],
        // map: sideTexture,
        wireframe: false,
        shadowSide: THREE.FrontSide
    }),
    new THREE.MeshPhysicalNodeMaterial({ 
        color: "white", 
        colorNode: verticalSideTextureNodes[0].toVec4().mul(materialColor.toColor()),
        normalNode: verticalSideTextureNodes[2],
        roughnessNode: verticalSideTextureNodes[3],
        aoNode: verticalSideTextureNodes[1],
        // map: sideTexture,
        wireframe: false,
        shadowSide: THREE.FrontSide
    }),
    new THREE.MeshPhysicalNodeMaterial({ 
        color: "white", 
        colorNode: horizontalSideTextureNodes[0].toVec4().mul(materialColor.toColor()),
        normalNode: horizontalSideTextureNodes[2],
        roughnessNode: horizontalSideTextureNodes[3],
        aoNode: horizontalSideTextureNodes[1],
        // map: sideTexture,
        wireframe: false,
        shadowSide: THREE.FrontSide
    }),
    new THREE.MeshPhysicalNodeMaterial({ 
        color: "white", 
        colorNode: verticalSideTextureNodes[0].toVec4().mul(materialColor.toColor()),
        normalNode: verticalSideTextureNodes[2],
        roughnessNode: verticalSideTextureNodes[3],
        aoNode: verticalSideTextureNodes[1],
        // map: sideTexture,
        wireframe: false,
        shadowSide: THREE.FrontSide
    })
];

export const frameSkinMaterial = [
    new THREE.MeshBasicNodeMaterial({ 
        color: "white", 
        colorNode: horizontalSideTextureNodes[0].toVec4().mul(materialColor.toColor()),
    }),
    new THREE.MeshBasicNodeMaterial({ 
        color: "white", 
        colorNode: verticalSideTextureNodes[0].toVec4().mul(materialColor.toColor()),
    }),
    new THREE.MeshBasicNodeMaterial({ 
        color: "white", 
        colorNode: horizontalSideTextureNodes[0].toVec4().mul(materialColor.toColor()),
    }),
    new THREE.MeshBasicNodeMaterial({ 
        color: "white", 
        colorNode: verticalSideTextureNodes[0].toVec4().mul(materialColor.toColor()),
    })
];

export const beadSkinMaterial = [
    new THREE.MeshBasicNodeMaterial({ 
        color: "white", 
        colorNode: horizontalSideTextureNodes[0].toVec4().mul(materialColor.toColor()),
    }),
    new THREE.MeshBasicNodeMaterial({ 
        color: "white", 
        colorNode: verticalSideTextureNodes[0].toVec4().mul(materialColor.toColor()),
    }),
    new THREE.MeshBasicNodeMaterial({ 
        color: "white", 
        colorNode: horizontalSideTextureNodes[0].toVec4().mul(materialColor.toColor()),
    }),
    new THREE.MeshBasicNodeMaterial({ 
        color: "white", 
        colorNode: verticalSideTextureNodes[0].toVec4().mul(materialColor.toColor()),
    })
];

export const glassMaterial = new THREE.MeshPhysicalMaterial({ color: "#8bcbff", transparent: true, opacity: 0.7 });

export const profileEdgesMaterial = new THREE.LineBasicMaterial({ color: "black" });