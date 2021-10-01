import * as React from 'react';
import { FlatList, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Colors from '../consts/Colors';
import FavouriteCopyCard from '../components/FavouriteCopyCard';
import { SingleCopy } from '../model/CopyModels';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { takeFavouritesCopies } from '../service/RealmServices';

interface Props {
    onClickBack: () => void
}

type State = {
    data: SingleCopy[],
    selectedItem: SingleCopy
}

export default class Favourites extends React.Component<Props, State> {
    state: State = {
        selectedItem: null,
        data: null
    }

    componentDidMount() {
        takeFavouritesCopies().then((item: SingleCopy[]) => {
            this.setState({
                data: item
            })
        })
    }

    deleteACopy = (copy: SingleCopy) => {
        copy.deleteFromDatabase()

        const newData = this.state.data.filter((item: SingleCopy) => {
            return item !== copy
        })

        this.setState({
            data: newData
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity
                        onPress={this.props.onClickBack}>
                        <Icon
                            name="arrow-left-drop-circle" size={34}
                            color={Colors.customWhite} />
                    </TouchableOpacity>
                    <Text style={styles.topBarText}>Your Favourites</Text>
                </View>
                {this.state && this.state.data && <FlatList
                    data={this.state.data}
                    renderItem={(item) =>
                    (<FavouriteCopyCard
                        data={item.item}
                        onPressCard={() => {
                            this.setState({
                                selectedItem: item.item
                            })
                        }}
                        isSelected={item.item === this.state.selectedItem}
                        onPressDelete={() => {
                            this.deleteACopy(item.item)
                        }} />)
                    } />}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.customYellow,
        flex: 1
    },
    topBar: {
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: Colors.customBlack,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6
    },
    topBarText: {
        color: Colors.customWhite,
        fontSize: 23,
        marginLeft: 10,
        fontFamily: 'sans-serif-condensed',
        fontWeight: 'bold'
    }
})