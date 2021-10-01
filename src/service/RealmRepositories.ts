import * as Services from './RealmServices';

export const takeNotFavouriteCopies = async () => Services.takeNotFavouriteCopies
export const takeLastCopy = async () => Services.takeLastCopy
export const takeFavouritesCopies = async () => Services.takeFavouritesCopies
export const takeCopyWithText = async (text: string) => Services.takeCopyWithText(text)