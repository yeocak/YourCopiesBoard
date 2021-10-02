import Realm from "realm";
import SingleCopy from "../../model/SingleCopy";
import realmOpen from "../realmOpen";

export const takeNotFavouriteCopies = async () => {
    const realm = await realmOpen()

    const tasks: SingleCopy[] = []

    const allNotFavourites = (realm.objects("Copy") as Realm.Results<SingleCopy & Realm.Object>)
        .filter((item: any) => {
            return item.isFavourite == false
        })

    allNotFavourites.forEach((item) => {
        const newItem = new SingleCopy(item.text, false)
        tasks.push(newItem)
    })

    realm.close()

    return tasks
}