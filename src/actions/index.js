import {
	TOGGLE_CONTROL_VIEW,
	START_RECORDING,
	START_PLAYING,
	ENTER_FOLDER,
	GET_INITIAL_UNITS,
	SET_ACTIVE_FILE,
	CREATE_FOLDER,
	TOGGLE_OPTIONS,
	DELETE_UNIT,
	RENAME_UNIT
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

export const deleteUnit = (unitId, unitType) => ({
	type: DELETE_UNIT,
	payload: {
		unitId,
		unitType,
	}
});

export const renameUnit = (unitId, unitType, newTitle) => ({
	type: RENAME_UNIT,
	payload: {
		unitId,
		unitType,
		newTitle
	}
});

export const toggleOptions = () => ({
	type: TOGGLE_OPTIONS,
});