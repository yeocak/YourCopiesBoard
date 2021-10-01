import Realm from "realm";
import { SingleCopy } from "../model/CopyModels";

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

    const tasks: SingleCopy[] = []

    const allNotFavourites = (realm.objects("Copy") as Realm.Results<SingleCopy & Realm.Object>)
        .filter((item: any) => {
            return item.isFavourite == false
        })

    allNotFavourites.forEach((item) => {
        const newItem = new SingleCopy(item.text, false)
        tasks.push(newItem)
    })

    realm.close()

    return tasks
}

export const takeLastCopy = async () => {
    const realm = await Realm.open({
        path: "copies",
        schema: [copyData],
    })

    const realmData = realm.objects("Copy") as Realm.Results<SingleCopy & Realm.Object>

    const lastCopy = realmData[realm.objects("Copy").length - 1]

    if (realmData == undefined) return null

    const value = new SingleCopy(lastCopy.text, lastCopy.isFavourite)

    realm.close()

    return value
}

export const takeFavouritesCopies = async () => {
    const realm = await Realm.open({
        path: "copies",
        schema: [copyData],
    })

    const allData = realm.objects("Copy").filtered("isFavourite = true") as Realm.Results<SingleCopy & Realm.Object>

    const value: SingleCopy[] = []

    for (let a = 0; a < allData.length; a++) {
        const newData = new SingleCopy(allData[a].text, true)
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
        .filtered(`text = "${copy.text}"`) as Realm.Results<SingleCopy & Realm.Object>

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

export const takeCopyWithText = async (text: string, ignoreCaps?: boolean) => {
    const realm = await Realm.open({
        path: "copies",
        schema: [copyData],
    })

    const tasks = []

    const allNotFavourites = (realm.objects("Copy") as Realm.Results<SingleCopy & Realm.Object>).filter((item): boolean => {
        return ignoreCaps ? item.text.toLowerCase().includes(text.toLowerCase()) : item.text.includes(text)
    })

    allNotFavourites.forEach((item) => {
        const newData = new SingleCopy(item.text, item.isFavourite)
        tasks.push(newData)
    })

    realm.close()

    return tasks
}