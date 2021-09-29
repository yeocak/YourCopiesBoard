import Realm from "realm";
import { CopyModel, SingleCopy } from "../model/CopyModels";

const copyData = {
    name: "Copy",
    properties: {
        text: "string",
        isFavourite: "bool"
    }
}

export const addCopy = async (copy: SingleCopy) => {
    const realm = await Realm.open({
        path: "copies",
        schema: [copyData],
    })

    realm.write(() => {
        realm.create("Copy", {
            text: copy.text,
            isFavourite: copy.isFavourite
        })
    })

    realm.close()
}

export const takeNotFavouriteCopies = async () => {
    const realm = await Realm.open({
        path: "copies",
        schema: [copyData],
    })

    const tasks = []

    const allNotFavourites = realm.objects("Copy").filter((item) => {
        return item.isFavourite == false
    })

    allNotFavourites.forEach((item) => {
        tasks.push(item)
    })

    //realm.close()

    return tasks
}

export const takeLastCopy = async () => {
    const realm = await Realm.open({
        path: "copies",
        schema: [copyData],
    })

    const realmData = realm.objects("Copy")[realm.objects("Copy").length - 1]

    if(realmData == undefined) return null

    const value: SingleCopy = {
        text: realmData.text,
        isFavourite: realmData.isFavourite
    }

    return value
}

export const makeDoubleListCopy = (realmObject: Realm.Results<Realm.Object>) => {
    let isFirst = true

    let value: CopyModel = {
        columnOne: [],
        columnTwo: []
    }

    for (let a = 0; a < realmObject.length; a++) {
        const currentObject: SingleCopy = {
            text: realmObject[a].text,
            isFavourite: realmObject[a].isFavourite
        }

        if (isFirst) {
            value.columnOne.push(currentObject)
        } else {
            value.columnTwo.push(currentObject)
        }

        isFirst = !isFirst
    }

    return value
}

export const takeFavouritesCopies = async () => {
    const realm = await Realm.open({
        path: "copies",
        schema: [copyData],
    })

    const allData = realm.objects("Copy").filtered("isFavourite = true")

    const value: SingleCopy[] = []

    for (let a = 0; a < allData.length; a++) {
        const newData: SingleCopy = {
            text: allData[a].text,
            isFavourite: true
        }

        value.push(newData)
    }

    return value
}

export const changeFavourite = async (copy: SingleCopy) => {
    const realm = await Realm.open({
        path: "copies",
        schema: [copyData],
    })

    const equal = realm.objects("Copy")
        .filtered(`isFavourite = ${copy.isFavourite}`)
        .filtered(`text = "${copy.text}"`)

    realm.write(() => {
        for (let a = 0; a < equal.length; a++) {
            equal[a].isFavourite = !copy.isFavourite
        }
    })
}

export const deleteCopy = async (copy: SingleCopy) => {
    const realm = await Realm.open({
        path: "copies",
        schema: [copyData],
    })

    const equal = realm.objects("Copy")
        .filtered(`isFavourite = ${copy.isFavourite}`)
        .filtered(`text = "${copy.text}"`)
        
    realm.write(() => {
        realm.delete(equal)
    })

    realm.close()
}

export const takeCopyWithText = async (text: string) => {
    const realm = await Realm.open({
        path: "copies",
        schema: [copyData],
    })

    const tasks = []

    const allNotFavourites = realm.objects("Copy").filter((item) => {
        return item.text.includes(text)
    })

    allNotFavourites.forEach((item) => {
        tasks.push(item)
    })

    //realm.close()

    return tasks
}