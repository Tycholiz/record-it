// TOGGLE_CONTROL_VIEW
import {
	TOGGLE_RECORD_PLAYBACK,
	START_RECORDING,
} from "../constants/action-types";

export const toggleRecordPlayback = toggleRecord => ({
	type: TOGGLE_RECORD_PLAYBACK,
	// payload: {
		// toggleRecord: !toggleRecord,
		// toggleText: toggleRecord ? "Record" : "Playback",
	// }
});

export const startRecording = () => ({
	type: START_RECORDING,
	// payload: {
	// 	recording: recording ? false : true,
	// }
});