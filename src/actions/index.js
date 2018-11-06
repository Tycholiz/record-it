import {
	TOGGLE_CONTROL_VIEW,
	START_RECORDING,
	START_PLAYING,
	POPULATE_FOLDERS,
} from "../constants/action-types";

export const toggleControlView = () => ({
	type: TOGGLE_CONTROL_VIEW,
});

export const startRecording = () => ({
	type: START_RECORDING,
});

export const startPlaying = () => ({
	type: START_PLAYING,
});

export const populateFolders = () => ({
	type: POPULATE_FOLDERS,
});