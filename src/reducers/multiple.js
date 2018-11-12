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
			const newState = state.selectedUnits;
			const index = newState.indexOf(action.payload.unitId);

			if (action.payload.modification === Modification.Add) {
				newState.push(action.payload.unitId)
				return {
					...state,
					selectedUnits: newState
				}
			} else if (action.payload.modification === Modification.Remove) {
				newState.splice(index, 1);
					return {
						...state,
						selectedUnits: newState
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
