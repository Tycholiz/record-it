import {
	MULTIPLE_MODE,
	MODIFY_SELECTED_UNIT
 } from "../constants/action-types";

import { Modification } from '../constants/enumerables';

const initialState = {
	mode: 0,
	selectedUnits: [],
};

const multipleReducer = (state = initialState, action) => {
	switch (action.type) {
		case MULTIPLE_MODE:
			return {
				...state,
				mode: action.payload.mode
			}
		case MODIFY_SELECTED_UNIT:

			switch (action.payload.modification) {
				case Modification.Add:
					return {
						...state,
						selectedUnits: [...state.selectedUnits, action.payload.unitId]
					}
				case Modification.Remove:
					return {
						...state,
						selectedUnits: deleteSingleUnit(state.selectedUnits, action.payload.unitId)
					}
				case Modification.Empty:
					return {
						...state,
						selectedUnits: []
					}
				default:
					return;
			}

			default:
				return state;
		}
	};
	export default multipleReducer;

function deleteSingleUnit(selectedUnits, unitId) {
	return selectedUnits.filter((unit) => {
		return unit !== unitId
	});
}