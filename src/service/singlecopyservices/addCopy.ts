import Realm from "realm";
import SingleCopy from "../../model/SingleCopy";
import realmOpen from "../realmOpen";

export const addCopy = async (copy: SingleCopy) => {
    const realm = await realmOpen()

    realm.write(() => {
        realm.create("Copy", {
            text: copy.text,
            isFavourite: copy.isFavourite
        })
    })

    realm.close()
}