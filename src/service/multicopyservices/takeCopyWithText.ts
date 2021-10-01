import Realm from "realm";
import SingleCopy from "../../model/SingleCopy";
import copyData from "../realmCopySchema";

export const takeCopyWithText = async (text: string, ignoreCaps?: boolean) => {
    const realm = await Realm.open({
        path: "copies",
        schema: [copyData],
    })

    const tasks = []

    const allNotFavourites = (realm.objects("Copy") as Realm.Results<SingleCopy & Realm.Object>).filter((item): boolean => {
        return ignoreCaps ? item.text.toLowerCase().includes(text.toLowerCase()) : item.text.includes(text)
    })

    allNotFavourites.forEach((item) => {
        const newData = new SingleCopy(item.text, item.isFavourite)
        tasks.push(newData)
    })

    realm.close()

    return tasks
}