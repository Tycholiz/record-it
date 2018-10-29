import { TOGGLE_RECORD } from "../constants/action-types";

export const toggleRecord = article => ({
	type: TOGGLE_RECORD,
	payload: article
});