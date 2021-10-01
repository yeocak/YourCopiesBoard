import Realm from "realm";
import SingleCopy from "../../model/SingleCopy";
import copyData from "../realmCopySchema";

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