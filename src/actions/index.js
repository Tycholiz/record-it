import {
	TOGGLE_CONTROL_VIEW,
	START_RECORDING,
	START_PLAYING,
	ENTER_FOLDER,
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

export const enterFolder = (currentFolder) => ({
	type: ENTER_FOLDER,
	payload: {
		currentFolder: currentFolder,
		// currentFolder: state.currentFolder
	}
});