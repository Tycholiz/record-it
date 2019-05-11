import {
	TOGGLE_CONTROL_VIEW,
	START_RECORDING,
	START_PLAYING,
	ENTER_FOLDER,
	GET_INITIAL_UNITS,
	SET_ACTIVE_FILE,
	DELETE_UNIT,
	DELETE_UNITS,
	RENAME_UNIT,
	MODIFY_SELECTED_UNIT,
	MULTIPLE_MODE,
	MOVE_UNITS,
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

export const enterFolder = (newPath) => ({
	type: ENTER_FOLDER,
	payload: {
		newPath
	}
});

export const getInitialUnits = (currentFolder) => ({
	type: GET_INITIAL_UNITS,
	payload: {
		currentFolder,
	}
});

export const setActiveFile = (fullAudioPath) => ({
	type: SET_ACTIVE_FILE,
	payload: {
		fullAudioPath,
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

export const moveUnits = (unitIds, currentFolder) => ({
	type: MOVE_UNITS,
	payload: {
		unitIds,
		targetFolder: currentFolder
	}
});

export const deleteUnits = (unitIds) => ({
	type: DELETE_UNITS,
	payload: {
		unitIds,
	}
});

export const multipleMode = (mode) => ({
	type: MULTIPLE_MODE,
	payload: {
		mode
	}
});

export const modifySelectedUnit = (modification, unitId) => ({
	type: MODIFY_SELECTED_UNIT,
	payload: {
		modification,
		unitId
	}
});
