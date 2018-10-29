import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
	Button,
} from 'react-native';
import { } from 'expo';

import { toggleRecordPlayback } from '../../actions/index'

import RecordControl from './RecordControl';
import PlaybackControl from './PlaybackControl';

class Control extends Component {

	render() {
		return (
			<View style={styles.container}>
				{this.props.toggle.toggleRecord ?
					<RecordControl />
					:
					<PlaybackControl />
				}
			</View>
		);
	}
}

// If mapStateToProps is specified, the new component will subscribe to Redux store updates.This means that any time the store is updated, mapStateToProps will be called

//The mapStateToProps function's first argument is the entire Redux store’s state and it returns an object to be passed as props.
mapStateToProps = (state) => {
	return state;
};

// export default Control;
export default connect(mapStateToProps)(Control);

const styles = StyleSheet.create({
	container: {
		height: 160,
	},
});
