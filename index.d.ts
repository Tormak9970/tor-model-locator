declare module '@tormak/tor-model-locator' {
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

    /**
     * @precondition pJSONPath must be the path to a paths.json file from one of TORCommunity.com's tools 
     * @param  {string} pJSONPath
     * @returns PathsRes
     */
    function readPaths(pJSONPath:string):PathsRes

    /**
     * @param  {Slot|MaterialSlot} slot
     * @param  {string} dataFolder
     * @param  {string} extractFolder
     * @returns void
     */
    function locAndCopFiles(slot: Slot|MaterialSlot, dataFolder: string, extractFolder: string):void

    /**
     * @precondition targetDir and assetsDir must be defined and point to existing folders
     * @param  {string} targetDir
     * @param  {string} assetsDir
     * @returns boolean
     */
    export function locate(targetDir:string, assetsDir:string):boolean
}
