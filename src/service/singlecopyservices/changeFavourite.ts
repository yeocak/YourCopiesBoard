import Realm from "realm";
import SingleCopy from "../../model/SingleCopy";
import copyData from "../realmCopySchema";

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