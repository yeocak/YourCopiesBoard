import Realm from "realm";
import SingleCopy from "../../model/SingleCopy";
import copyData from "../realmCopySchema";

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