import fs from 'fs';
import path from 'path';

enum SlotNames {
    SKIN_MATS='skinMats',
    HEAD='head',
    HAIR='hair',
    BOOT='boot',
    WAIST='waist',
    LEG='leg',
    CHEST='chest',
    HAND='hand'
}

type OtherValues = {
    derived:string,
    flush:number[],
    fleshBrightness:number,
    palette1:number[],
    palette2:number[],
    palette1Specular:number[],
    palette2Specular:number[],
    palette1MetallicSpecular:number[],
    palette2MetallicSpecular:number[],
    materialSkinIndex?:number
}

type DDSPaths = {
    paletteMap:string,
    paletteMaskMap:string,
    diffuseMap:string,
    glossMap:string,
    rotationMap:string,
    ageMap?:string,
    complexionMap?:string,
    facepaintMap?:string
}

type MaterialInfo = {
    matPath?:string,
    ddsPaths:DDSPaths,
    otherValues:OtherValues
    eyeMatInfo?:MaterialInfo
}

type Slot = {
    slotName:SlotNames,
    models:string[],
    materialInfo:MaterialInfo
}

type SkinMaterial = {
    slotName:SlotNames,
    materialInfo:{ matPath:string },
    ddsPaths:DDSPaths,
    otherValues:OtherValues
}

type MaterialSlot = {
    slotName:SlotNames,
    materialInfo:{ mats:SkinMaterial[] },
}

type PathsRes = {
    slots:Slot[],
    eyeMatInfo?:MaterialInfo
}

function readPaths(pJSONPath:string):PathsRes {
    const data = fs.readFileSync(pJSONPath, 'utf-8');
    const slots = JSON.parse(data);

    const res:PathsRes = {
        slots: slots,
    }

    for (let i = 0; i < slots.length; i++) {
        const slot = slots[i] as Slot;
        
        if (slot.materialInfo.eyeMatInfo) res.eyeMatInfo = slot.materialInfo.eyeMatInfo;
    }

    return res;
}

function locAndCopFiles(slot: Slot|MaterialSlot, dataFolder: string, extractFolder: string) {
    function isSkinMat(slot: Slot | MaterialSlot): slot is MaterialSlot {
        return (slot as MaterialSlot).materialInfo.mats !== undefined;
    }

    if (isSkinMat(slot)) {
        const mats = slot.materialInfo.mats;

        for (let i = 0; i < mats.length; i++) {
            const mat = mats[i];
            const copyLoc = path.join(dataFolder, "assets", "materials", "skinMats", mat.slotName);

            if (!fs.existsSync(copyLoc)) fs.mkdirSync(copyLoc, { recursive: true });

            let matPath = path.join(extractFolder, mat.materialInfo.matPath);

            if (fs.existsSync(matPath)) {
                matPath = matPath.replace(/\\/g, "/");
                const idx = matPath.lastIndexOf("/");

                const tarLoc = path.join(copyLoc, matPath.substring(idx));
                fs.copyFileSync(matPath, tarLoc);
            }

            const textures = Object.values(mat.ddsPaths);

            for (let i = 0; i < textures.length; i++) {
                let tex = textures[i];
                if (tex == "/.dds" || tex == ".dds") tex = path.join("art", "defaultassets", "black.dds");

                let texPath = path.join(extractFolder, tex);

                if (fs.existsSync(texPath)) {
                    texPath = texPath.replace(/\\/g, "/");
                    const idx = texPath.lastIndexOf("/");

                    const tarLoc = path.join(copyLoc, texPath.substring(idx+1))

                    fs.copyFileSync(texPath, tarLoc);
                } else {
                    throw new Error(`Missing texture file in extraction: ${texPath}`);
                }
            }
        }
    } else {
        const modelCopyLoc = path.join(dataFolder, "assets", "models", slot.slotName);

        if (!fs.existsSync(modelCopyLoc)) fs.mkdirSync(modelCopyLoc, { recursive: true });

        const models = slot.models;

        for (let i = 0; i < models.length; i++) {
            let modelPath = path.join(extractFolder, models[i]);

            if (fs.existsSync(modelPath)) {
                modelPath = modelPath.replace(/\\/g, "/");
                const idx = modelPath.lastIndexOf("/");

                const tarLoc = path.join(modelCopyLoc, modelPath.substring(idx));
                fs.copyFileSync(modelPath, tarLoc);
            } else {
                throw new Error(`Missing model file in extraction: ${modelPath}`);
            }
        }


        const matCopyLoc = path.join(dataFolder, "assets", "materials", slot.slotName);

        let matPath = path.join(extractFolder, slot.materialInfo.matPath as string);

        if (fs.existsSync(matCopyLoc)) {
            matPath = matPath.replace(/\\/g, "/");
            const idx = matPath.lastIndexOf("/");

            const tarLoc = path.join(matCopyLoc, matPath.substring(idx));
            fs.copyFileSync(matPath, tarLoc);
        }


        const textures = Object.values(slot.materialInfo.ddsPaths);

        for (let i = 0; i < textures.length; i++) {
            let tex = textures[i];
            if (tex == "/.dds" || tex == ".dds") tex = path.join("art", "defaultassets", "black.dds");

            let texPath = path.join(extractFolder, tex);

            if (fs.existsSync(texPath)) {
                texPath = texPath.replace(/\\/g, "/");
                const idx = texPath.lastIndexOf("/");

                const tarLoc = path.join(matCopyLoc, texPath.substring(idx+1))

                fs.copyFileSync(texPath, tarLoc);
            } else {
                throw new Error(`Missing texture file in extraction: ${texPath}`);
            }
        }
    }
}

export function locate(targetDir:string, assetsDir:string) {
    const dataFolder = targetDir;
    const pJSONPath = path.join(dataFolder, 'assets', 'paths.json')
	const extractFolder = assetsDir;

    if (fs.existsSync(extractFolder)) {
        const {slots, eyeMatInfo} = readPaths(pJSONPath);

        if (eyeMatInfo?.otherValues?.derived) {
            const copyLoc = path.join(dataFolder, 'assets', 'materials', 'eye');

            if (!fs.existsSync(copyLoc)) fs.mkdirSync(copyLoc, { recursive: true });

            const textures = Object.values(eyeMatInfo.ddsPaths);

            for (let i = 0; i < textures.length; i++) {
                let tex = textures[i];
                if (tex == "/.dds" || tex == ".dds") tex = path.join("art", "defaultassets", "black.dds");

                let texPath = path.join(extractFolder, tex);

                if (fs.existsSync(texPath)) {
                    texPath = texPath.replace(/\\/g, "/");
                    const idx = texPath.lastIndexOf("/");

                    const tarLoc = path.join(copyLoc, texPath.substring(idx+1))

                    fs.copyFileSync(texPath, tarLoc);
                } else {
                    throw new Error(`Missing texture file in extraction: ${texPath}`);
                }
            }
        }

        for (let i = 0; i < slots.length; i++) {
            locAndCopFiles(slots[i], dataFolder, extractFolder);
        }
        return true;
    } else {
        throw new Error("Extraction folder does not exist or is undefined");
    }
}