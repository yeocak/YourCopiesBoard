import Realm from "realm";
import SingleCopy from "../../model/SingleCopy";
import copyData from "../realmCopySchema";

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