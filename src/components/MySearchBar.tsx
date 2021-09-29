
import * as React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import Colors from '../Colors';

interface Props {
  style: StyleProp<ViewStyle>
  onSearchPress: ((text: string) => void)
  onClearPress: () => void
}

interface State {
  value: string
}

export default class MySearchBar extends React.Component<Props, State> {
  state: State = {
    value: "",
  };

  render() {
    return <View style={this.props.style}>
      <SearchBar style={styles.searchBar}
        placeholder="Search"
        onSearchPress={() => { this.props.onSearchPress(this.state.value) }}
        onChangeText={(text: string) => { this.setState({ value: text }) }}
        onClearPress = {() => {
          this.setState({
            value: ""
          })
          this.props.onClearPress()
        }}
      />
    </View>
  }
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: Colors.customYellow,
    borderRadius: 100
  }
})