import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RadialGradient from 'react-native-radial-gradient';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Constants } from 'expo';

import TopBar from './components/TopBar';
import FolderStructure from './components/FolderStructure';
import Control from './components/Control';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TopBar />
        <FolderStructure />
        <Control />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: 'hsla(253, 14%, 24%, 1)',
  },
});
