export interface CopyModel {
    columnOne: SingleCopy[]
    columnTwo: SingleCopy[]
}

export interface SingleCopy {
    text: string
    isFavourite: boolean
}