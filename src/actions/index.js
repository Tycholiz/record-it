import {
	TOGGLE_CONTROL_VIEW,
	ENTER_FOLDER,
	SET_ACTIVE_FILE,
	// DELETE_UNITS,
	MODIFY_SELECTED_UNIT,
	MULTIPLE_MODE,
	READ_DIRECTORY
} from "../constants/action-types";

export const toggleControlView = () => ({
	type: TOGGLE_CONTROL_VIEW,
});

export const enterFolder = (newPath) => ({
	type: ENTER_FOLDER,
	payload: {
		newPath
	}
});

export const setActiveFile = (fullAudioPath) => ({
	type: SET_ACTIVE_FILE,
	payload: {
		fullAudioPath,
	}
});

// export const deleteUnits = (unitIds) => ({
// 	type: DELETE_UNITS,
// 	payload: {
// 		unitIds,
// 	}
// });

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

export const readDirectory = (units) => ({
	type: READ_DIRECTORY,
	payload: {
		units
	}
})
