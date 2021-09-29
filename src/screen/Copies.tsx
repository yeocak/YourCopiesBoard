import * as React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import Colors from '../Colors';
import CustomGridList from '../components/CustomGridList';
import MySearchBar from '../components/MySearchBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CopyModel, SingleCopy } from '../model/CopyModels';
import { deleteCopy, makeDoubleListCopy, takeCopyWithText, takeNotFavouriteCopies } from '../service/RealmServices';

interface Props {
    onClickStar: () => void
}

const Copies: React.FC<Props> = (props: Props) => {

    const [selectedItem, setSelectedItem] = React.useState(null)
    const [data, setData] = React.useState(null)

    React.useEffect(() => {
        takeAllData()
    }, ["0"])

    const deleteACopy = (copy: SingleCopy) => {
        deleteCopy(copy)

        const newColOne = data.columnOne.filter((item: SingleCopy) => {
            return item !== copy
        })
        const newColTwo = data.columnTwo.filter((item: SingleCopy) => {
            return item !== copy
        })

        const newData: CopyModel = {
            columnOne: newColOne,
            columnTwo: newColTwo
        }

        setData(newData)
    }

    const takeAllData = () => {
        takeNotFavouriteCopies().then((item) => {
            setData(makeDoubleListCopy(item))
        })
    }

    const filterWithText = (text: string) => {
        takeCopyWithText(text).then((item) => {
            setData(makeDoubleListCopy(item))
        })
    }

    return <View style={styles.container}>
        <MySearchBar
            style={styles.searchBar}
            onClearPress = {takeAllData}
            onSearchPress={(text: string) => {
                filterWithText(text)
            }} />
        <CustomGridList
            onPressCard={(item: SingleCopy) => { setSelectedItem(item) }}
            onPressDelete={(item: SingleCopy) => { deleteACopy(item) }}
            style={{ margin: 10 }}
            data={data}
            selectedItem={selectedItem}
        />
        <TouchableHighlight
            onPress={props.onClickStar}
            underlayColor={Colors.customYellowDarker}
            style={styles.favouritesButton}>
            <Icon name="star" size={40} color={Colors.customBlack} style={{ alignSelf: 'center' }} />
        </TouchableHighlight>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.customBlack
    },
    searchBar: {
        marginTop: 15
    },
    favouritesButton: {
        borderRadius: 100,
        backgroundColor: Colors.customYellow,
        borderColor: Colors.customBlack,
        borderWidth: 1,
        height: 55,
        width: 55,
        right: 20,
        bottom: 20,
        position: 'absolute',
        justifyContent: 'center'
    }
})

export default Copies