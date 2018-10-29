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
import {bindActionCreators} from 'redux';

import { toggleRecordPlayback } from '../../actions/index'

class ToggleScreenButton extends Component {
	render() {

		return (
			<TouchableOpacity
				style={styles.container}
				onPress={this.props.toggleRecordPlayback}
			>
				<View>
					<Text style={styles.buttonText}>
						RECORD
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

mapStateToProps = (state) => {
	return state;
}

mapDispatchToProps = (dispatch) => {
	return bindActionCreators({toggleRecordPlayback}, dispatch)
}

// export default ToggleScreenButton;
// // it seems we need mapStateToProps here, since we want the button to re-render to display the opposite Record/Playback whenever it is pressed
// export default connect(mapStateToProps, mapDispatchToProps)(ToggleScreenButton);
export default connect(mapStateToProps, mapDispatchToProps)(ToggleScreenButton);

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
