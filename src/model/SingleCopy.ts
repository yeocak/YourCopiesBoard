import * as Services from "../service/RealmSingleRepositories"

export default interface SingleCopy {
    text: string
    isFavourite: boolean
}

export default class SingleCopy {
    public text: string
    public isFavourite = false


    constructor (text: string, isFavourite?: boolean) {
        this.text = text
        this.isFavourite = isFavourite || false
    }

    // Repositories
    addToDatabase = () => {
        Services.addCopy(this)
    }

    deleteFromDatabase = () => {
        Services.deleteCopy(this)
    }

    changeIsFavourite = () => {
        Services.changeFavourite(this)
    }

    deleteCopyFromDatabase = () => {
        Services.deleteCopy(this)
    }

}