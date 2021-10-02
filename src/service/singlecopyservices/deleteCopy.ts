import SingleCopy from "../../model/SingleCopy";
import realmOpen from "../realmOpen";

export const deleteCopy = async (copy: SingleCopy) => {
    const realm = await realmOpen()

    const equal = realm.objects("Copy")
        .filtered(`isFavourite = ${copy.isFavourite}`)
        .filtered(`text = '${copy.text}'`)

    realm.write(() => {
        realm.delete(equal)
    })

    realm.close()
}