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
import { bindActionCreators } from 'redux';


import { startRecording } from '../../actions/index'

import Icon from 'react-native-vector-icons/FontAwesome';
const cancelIcon = (<Icon name="times" size={40} color='white' />)
const microphoneIcon = (<Icon name="microphone" size={50} color='black' />)
const pauseIcon = (<Icon name="pause" size={50} color='black' />)
const acceptIcon = (<Icon name="check" size={40} color='white' />)



class RecordControl extends Component {
	sayHi = () => {
		console.log(this.props.recording)
	}
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity>
					{cancelIcon}
				</TouchableOpacity>
				<TouchableOpacity style={styles.icon} onPress={this.props.startRecording}>
					{this.props.recording ? pauseIcon : microphoneIcon}
				</TouchableOpacity>
				<TouchableOpacity onPress={this.sayHi}>
					{acceptIcon}
				</TouchableOpacity>
			</View>
		);
	}
}

mapStateToProps = (state) => {
	return {
		recording: state.recording.recording
	}
}

mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ startRecording }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordControl);


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'hsla(253, 14%, 26%, 0.8)',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	icon: {
		backgroundColor: 'red',
		width: 80,
		height: 80,
		borderRadius: 80 / 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 60,
	},
});
