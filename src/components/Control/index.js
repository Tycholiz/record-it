import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toggleRecord from '../../actions/index';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import { } from 'expo';

import RecordControl from './RecordControl';
import PlaybackControl from './PlaybackControl';

class Control extends Component {
	render() {
		return (
			<View style={styles.container}>
				{/* <RecordControl /> */}
				<PlaybackControl />
			</View>
		);
	}
}

export default Control;

mapStateToProps = (state) => {
	return {

	}
}

// export default connect(mapStateToProps)(Control);

const styles = StyleSheet.create({
	container: {
		height: 160,
	},
});
