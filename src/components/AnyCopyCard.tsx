import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Clipboard } from 'react-native';
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

export default class AnyCopyCard extends React.Component<Props, State>{

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
        return <TouchableOpacity disabled={this.props.isSelected}
            onPress={() => {
                this.props.onPressCard()
            }}
            style={styles.container}>
            <Text style={styles.text}>{this.props.data.text}</Text>
            {this.props.isSelected &&
                <View style={styles.bottomBar}>
                    <TouchableOpacity
                        onPress={() => { this.props.onPressDelete() }}>
                        <Icon name="delete"
                            size={22}
                            color={Colors.customBlack}
                            style={styles.icons} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { this.onClickedFavourite() }}>
                        <Icon name="heart"
                            size={22}
                            color={(this.state && this.state.currentData && !this.state.currentData.isFavourite) ? Colors.customBlack : 'red'}
                            style={styles.icons} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            Clipboard.setString(this.state.currentData.text)
                        }}>
                        <Icon name="cards"
                            size={22}
                            color={Colors.customBlack}
                            style={styles.icons} />
                    </TouchableOpacity>
                </View>
            }
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.customYellow,
    },
    text: {
        color: Colors.customBlack,
        fontFamily: "monospace"
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
    },
    icons: {
        marginTop: 10,
        marginBottom: -5
    }
})