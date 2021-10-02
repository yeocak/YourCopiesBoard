import Realm from "realm";
import SingleCopy from "../../model/SingleCopy";
import realmOpen from "../realmOpen";

export const takeFavouritesCopies = async () => {
    const realm = await realmOpen()

    const allData = realm.objects("Copy")
        .filtered("isFavourite = true") as Realm.Results<SingleCopy & Realm.Object>

    const value: SingleCopy[] = []

    for (let a = 0; a < allData.length; a++) {
        const newData = new SingleCopy(allData[a].text, true)
        value.push(newData)
    }

    return value
}