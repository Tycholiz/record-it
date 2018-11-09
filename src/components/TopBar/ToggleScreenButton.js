import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { } from 'expo';

import { toggleControlView } from '../../actions'

class ToggleScreenButton extends Component {
	render() {

		return (
			<TouchableOpacity
				style={styles.container}
				onPress={this.props.toggleControlView}
			>
				<View>
					<Text style={styles.buttonText}>
						{this.props.toggleText}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

mapStateToProps = (state) => {
	return {
		toggleText: state.toggle.toggleText
	}
}

export default connect(mapStateToProps, { toggleControlView })(ToggleScreenButton);

const styles = StyleSheet.create({
	container: {
		flex: 4,
		height: 60,
		alignItems: 'center',
		backgroundColor: 'red',
		borderRadius: 7,
	},
	buttonText: {
		fontWeight: '700',
		fontSize: 40,

	}
});
