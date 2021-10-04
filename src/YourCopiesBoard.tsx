import * as React from 'react';
import { View } from 'react-native';
import Copies from './screen/Copies';
import Favourites from './screen/Favourites';
import { takeLastCopy } from './service/RealmMultiRepositories';
import SingleCopy from './model/SingleCopy';
import Clipboard from '@react-native-clipboard/clipboard';
import setClipboardListener from './utils/setClipboardListener';

async function takeCopyToDatabase() {
    const currentCopy = await Clipboard.getString()
    const lastCopy = await takeLastCopy()

    if (lastCopy != undefined && lastCopy.text != undefined && lastCopy.text == currentCopy) return

    const currentDate = Date.now()

    const copy = new SingleCopy(currentCopy, currentDate)
    copy.addToDatabase()
}

const YourCopiesBoard: React.FC = () => {
    React.useEffect(() => {
        setClipboardListener(() => { takeCopyToDatabase() })
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