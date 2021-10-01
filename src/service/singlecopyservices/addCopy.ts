import Realm from "realm";
import SingleCopy from "../../model/SingleCopy";
import copyData from "../realmCopySchema";

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