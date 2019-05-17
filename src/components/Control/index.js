import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	View,
} from 'react-native';

import T from 'prop-types'
import s from '../../styles/Control/index';

import RecordControl from './RecordControl';
import PlaybackControl from './PlaybackControl';
import { ControlView } from '../../constants/enumerables';

class Control extends Component {
	state = {
		isRecording: false,
		isPaused: false,
		stoppedRecording: false,
		finished: false,
		isPlaying: false,
		// hasPermission: undefined,
	};

	startRecording = (flag) => {
		this.setState({
			isRecording: flag
		})
	}

	pauseRecording = (flag) => {
		this.setState({
			isPaused: flag
		})
	}

	stopRecording = (flag) => {
		this.setState({
			stoppedRecording: flag
		})
	}

	finishRecording = (flag) => {
		this.setState({
			finished: flag
		})
	}

	startPlaying = (flag) => {
		this.setState({
			isPlaying: flag
		})
	}

	render() {
		const { controlView } = this.props;
		const { isRecording, isPaused, isPlaying, stoppedRecording, finished } = this.state;
		return (
			<View style={s.container}>
				{controlView === ControlView.Record ?
					<RecordControl
						isRecording={isRecording}
						isPaused={isPaused}
						stoppedRecording={stoppedRecording}
						finished={finished}
						startRecording={this.startRecording}
						pauseRecording={this.pauseRecording}
						stopRecording={this.stopRecording}
						finishRecording={this.finishRecording}
					/>
					:
					<PlaybackControl
						isRecording={isRecording}
						isPlaying={isPlaying}
						startRecording={this.startRecording}
						stopRecording={this.stopRecording}
						startPlaying={this.startPlaying}
					/>
				}
			</View>
		);
	}
}

Control.propTypes = {
	controlView: T.string.isRequired
}

mapStateToProps = (state) => {
	return {
		controlView: state.toggle.controlView,
		selectMultipleMode: state.multiple.selectMultiple,
	}
}

export default connect(mapStateToProps)(Control);
