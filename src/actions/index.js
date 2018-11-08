import {
	TOGGLE_CONTROL_VIEW,
	START_RECORDING,
	START_PLAYING,
	ENTER_FOLDER,
	GET_INITIAL_UNITS,
	SET_ACTIVE_FILE,
	CREATE_FOLDER,
} from "../constants/action-types";

import uuid from 'uuid/v4'

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
		currentFolder,
	}
});

export const getInitialUnits = (currentFolder) => ({
	type: GET_INITIAL_UNITS,
	payload: {
		currentFolder,
	}
});

export const setActiveFile = (fileId) => ({
	type: SET_ACTIVE_FILE,
	payload: {
		fileId,
	}
});

export const createFolder = (currentFolder) => ({
	type: CREATE_FOLDER,
	payload: {
		id: uuid(),
		title: "New folder",
		dateCreated: Date.now(),
		parentId: currentFolder,
		unitType: 'folder'
	}
});