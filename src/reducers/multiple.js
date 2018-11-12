import {
	MULTIPLE_MODE,
	MODIFY_SELECTED_UNIT
 } from "../constants/action-types";

import { Modification } from '../constants/enumerables';

const initialState = {
	mode: 0,
	selectedUnits: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case MULTIPLE_MODE:
			return {
				...state,
				mode: action.payload.mode
			}
		case MODIFY_SELECTED_UNIT:
			if (action.payload.modification === Modification.Add) {
				return {
					...state,
					selectedUnits: [...state.selectedUnits, action.payload.unitId]
				}
			} else if (action.payload.modification === Modification.Remove) {
				return {
					...state,
					selectedUnits: deleteSingleUnit(state.selectedUnits, action.payload.unitId)
				}

			} else if (action.payload.modification === Modification.Empty) {
				newState = [];
				return {
					...state,
					selectedUnits: []
				}
			} else {
				console.log("you made a grave error my friend...")
				return;
			}

		default:
			return state;
	}
};
export default reducer;

function deleteSingleUnit(selectedUnits, unitId) {
	return selectedUnits.filter((unit) => {
		return unit !== unitId
	});
}