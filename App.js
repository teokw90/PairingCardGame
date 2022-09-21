import React, { Component } from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import PairCardGame from './app/features/pairingCard';

class App extends Component {
  render() {
    return (
      <View style={styles.sectionContainer}>
        <PairCardGame />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 38 : 0
  }
})

export default App;
