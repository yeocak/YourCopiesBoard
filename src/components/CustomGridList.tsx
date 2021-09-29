import * as React from 'react';
import { FlatList, ScrollView, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { CopyModel, SingleCopy } from '../model/CopyModels';
import AnyCopyCard from './AnyCopyCard';
import { deleteCopy, makeDoubleListCopy, takeNotFavouriteCopies } from '../service/RealmServices'

type CustomProps = {
    style: StyleProp<ViewStyle>,
    data: CopyModel,
    selectedItem: SingleCopy,
    onPressDelete: (item: SingleCopy) => void,
    onPressCard: (item: SingleCopy) => void
}

export default class CustomGridList extends React.Component<CustomProps> {

    render() {
        return <View style={this.props.style}>
            <ScrollView contentContainerStyle={styles.container}>
                {this.props.data && <FlatList
                    style={styles.singleList}
                    data={this.props.data.columnOne}
                    renderItem={(item) => (<AnyCopyCard
                        onPressDelete={() => { this.props.onPressDelete(item.item) }}
                        onPressCard={() => this.props.onPressCard(item.item)}
                        isSelected={item.item === this.props.selectedItem}
                        data={item.item} />)}
                />}
                {this.props.data && <FlatList
                    style={styles.singleList}
                    data={this.props.data.columnTwo}
                    renderItem={(item) => (<AnyCopyCard
                        onPressDelete={() => { this.props.onPressDelete(item.item) }}
                        onPressCard={() => this.props.onPressCard(item.item)}
                        isSelected={item.item === this.props.selectedItem}
                        data={item.item} />)}
                />}
            </ScrollView>
        </View>
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    container: {
        flexDirection: 'row',
        paddingHorizontal: 5
    },
    singleList: {
        flex: 1
    },
    list: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 10,
        paddingHorizontal: 5
    }
})