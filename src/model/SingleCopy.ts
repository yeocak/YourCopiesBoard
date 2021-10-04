import * as Services from "../service/RealmSingleRepositories"

export default interface SingleCopy {
    text: string
    isFavourite: boolean
    date: number
}

export default class SingleCopy {
    public text: string
    public isFavourite = false
    public date: number

    constructor (text: string, date: number, isFavourite?: boolean) {
        this.text = text
        this.isFavourite = isFavourite || false
        this.date = date
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