import Realm from "realm";
import SingleCopy from "../../model/SingleCopy";
import realmOpen from "../realmOpen";

export const changeFavourite = async (copy: SingleCopy) => {
    const realm = await realmOpen()

    const equal = realm.objects("Copy")
        .filtered(`isFavourite = ${copy.isFavourite}`)
        .filtered(`text = '${copy.text}'`) as Realm.Results<SingleCopy & Realm.Object>

    realm.write(() => {
        for (let a = 0; a < equal.length; a++) {
            equal[a].isFavourite = !copy.isFavourite
        }
    })
}