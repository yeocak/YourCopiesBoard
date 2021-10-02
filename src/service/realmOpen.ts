import Realm from "realm";
import realmCopySchema from "./realmCopySchema";

const realmOpen = async () => await Realm.open({
    path: "copies",
    schema: [realmCopySchema],
})

export default realmOpen;