import Realm from "realm";
import SingleCopy from "../../model/SingleCopy";
import realmOpen from "../realmOpen";

export const takeLastCopy = async () => {
    const realm = await realmOpen()

    const realmData = realm.objects("Copy") as Realm.Results<SingleCopy & Realm.Object>

    const lastCopy = realmData[realm.objects("Copy").length - 1]

    if (lastCopy == undefined) return null

    const value = new SingleCopy(lastCopy.text, lastCopy.date, lastCopy.isFavourite)

    realm.close()

    return value
}