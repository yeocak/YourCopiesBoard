import { addCopy } from "../service/RealmServices"

export interface CopyModel {
    columnOne: SingleCopy[]
    columnTwo: SingleCopy[]
}

export interface SingleCopy {
    text: string
    isFavourite: boolean
}

export class SingleCopy {
    public text: string
    public isFavourite = false

    constructor (text: string)
    constructor (text: string, isFavourite?: boolean) {
        this.text = text
        this.isFavourite = isFavourite || false
    }

    // Repositories
    addToDatabase = () => {
        addCopy(this)
    }

    
}