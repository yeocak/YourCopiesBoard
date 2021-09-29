import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Clipboard} from 'react-native';
import Colors from '../Colors';
import { SingleCopy } from '../model/CopyModels';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { changeFavourite } from '../service/RealmServices';

interface Props {
    data: SingleCopy,
    isSelected: boolean,
    onPressCard: () => void,
    onPressDelete: () => void
}

interface State {
    currentData: SingleCopy
}

export default class FavouriteCopyCard extends React.Component<Props, State> {

    componentDidMount() {
        this.setState({
            currentData: this.props.data
        })
    }

    onClickedFavourite = () => {
        const newData: SingleCopy = {
            text: this.state.currentData.text,
            isFavourite: !this.state.currentData.isFavourite,
        }

        changeFavourite(this.state.currentData)

        this.setState({
            currentData: newData
        })
    }

    render() {
        return (
            <TouchableOpacity disabled={this.props.isSelected}
                onPress={this.props.onPressCard}>
                <View style={styles.container}>
                    <Text style={styles.text}>{this.props.data.text}</Text>
                    {this.props.isSelected && <View style={styles.bottomBar}>
                        <TouchableOpacity
                            onPress={this.props.onPressDelete}>
                            <Icon name="delete"
                                size={22}
                                color={Colors.customYellow}
                                style={styles.icons} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.onClickedFavourite()
                            }}>
                            <Icon name="heart"
                                size={22}
                                color={this.state &&
                                    this.state.currentData &&
                                    !this.state.currentData.isFavourite ?
                                    Colors.customYellow :
                                    'red'}
                                style={styles.icons} />
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress = {() => {
                            Clipboard.setString(this.state.currentData.text)
                        }}>
                            <Icon name="cards"
                                size={22}
                                color={Colors.customYellow}
                                style={styles.icons} />
                        </TouchableOpacity>
                    </View>}
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.customBlack,
        borderRadius: 15,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 4,
        flexDirection: 'column'
    },
    text: {
        color: Colors.customWhite,
        fontFamily: "monospace"
    },
    bottomBar: {
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    icons: {
        marginTop: 10,
        marginBottom: -5,
        marginHorizontal: 10
    }
})