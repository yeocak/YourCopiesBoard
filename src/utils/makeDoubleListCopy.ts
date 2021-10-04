import SingleCopy from "../model/SingleCopy"
import MultiColumnCopies from '../model/MultiColumnCopies'

// Takes your SingleCopy array and divides to two array and inserts to new CopyModel
const makeDoubleListCopy = (copyList : SingleCopy[]) => {
    let isFirst = true

    let value: MultiColumnCopies = {
        columnOne: [],
        columnTwo: []
    }

    for (let a = 0; a < copyList.length; a++) {
        const currentObject = new SingleCopy(copyList[a].text,copyList[a].date, copyList[a].isFavourite)

        if (isFirst) {
            value.columnOne.push(currentObject)
        } else {
            value.columnTwo.push(currentObject)
        }

        isFirst = !isFirst
    }

    return value
}

export default makeDoubleListCopy;