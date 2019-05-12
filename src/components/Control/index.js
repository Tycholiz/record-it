import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	View,
	Text,
} from 'react-native';

import T from 'prop-types'
import s from '../../styles/Control/index';

import RecordControl from './RecordControl';
import PlaybackControl from './PlaybackControl';
import { ControlView } from '../../constants/enumerables';

class Control extends Component {
	state = {
		recording: false,
		// paused: false,
		// stoppedRecording: false,
		// finished: false,
		// hasPermission: undefined,
	};

	startRecording = () => {
		this.setState({
			recording: true
		})
	}

	render() {
		const { controlView } = this.props;
		const { recording } = this.state;
		return (
			<View style={s.container}>
				{controlView === ControlView.Record ?
					<RecordControl
						recording={recording}
						startRecording={this.startRecording}
					/>
					:
					<PlaybackControl
						recording={recording}
						startRecording={this.startRecording}
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
