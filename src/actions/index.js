import {
	TOGGLE_CONTROL_VIEW,
	START_RECORDING,
	START_PLAYING,
	POPULATE_FOLDERS,
} from "../constants/action-types";

export const toggleControlView = toggleRecord => ({
	type: TOGGLE_CONTROL_VIEW,
});

export const startRecording = () => ({
	type: START_RECORDING,
});

export const startPlaying = () => ({
	type: START_PLAYING,
});

export const populateFolderStructure = () => ({
	type: POPULATE_FOLDERS,
});