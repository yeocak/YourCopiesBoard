import * as React from 'react';
import { Clipboard, View } from 'react-native';
import Copies from './screen/Copies';
import Favourites from './screen/Favourites';
import ClipboardListener from 'react-native-clipboard-listener';
import { addCopy, takeLastCopy } from './service/RealmServices';
import { SingleCopy } from './model/CopyModels';

async function setCopyListener() {
    const currentCopy = await Clipboard.getString()
    const lastCopy = await takeLastCopy()
    if (lastCopy != null && lastCopy.text == currentCopy) return
    const copy = new SingleCopy(currentCopy)
    addCopy(copy)
}

const YourCopiesBoard: React.FC = () => {
    React.useEffect(() => {
        ClipboardListener.removeListener()
        ClipboardListener.setListener(async () => {
            setCopyListener()
        })
    })

    const copiesScreen =
        (<View style={{ flex: 1 }}>
            <Copies onClickStar={() => { changeScreenToFavourites() }}></Copies>
        </View>)

    const favouritesScreen =
        (<View style={{ flex: 1 }}>
            <Favourites onClickBack={() => { changeScreenToCopies() }} />
        </View>)

    const [screen, setScreen] = React.useState(copiesScreen)

    const changeScreenToFavourites = () => {
        setScreen(favouritesScreen)
    }

    const changeScreenToCopies = () => {
        setScreen(copiesScreen)
    }

    return screen
}

export default YourCopiesBoard