import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Constants } from 'expo';

import Playback from './screens/Playback';
import Record from './screens/Record';
import FolderStructure from './components/FolderStructure';
import TopBar from './components/TopBar';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TopBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   marginTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
