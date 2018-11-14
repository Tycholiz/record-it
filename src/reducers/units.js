import {
	GET_INITIAL_UNITS,
	CREATE_FOLDER,
	DELETE_UNIT,
	RENAME_UNIT,
	MOVE_UNITS
} from "../constants/action-types";

import { UnitType } from '../constants/enumerables';


const initialState = {
	files: {
		'944': {
			id: 944,
			title: 'solo',
			duration: 44356,
			parentId: 22,
			unitType: 'file',
		},
		'253': {
			id: 253,
			title: 'intro idea',
			duration: 22573,
			parentId: 22,
			unitType: 'file',
		},
		'265': {
			id: 265,
			title: 'piano overlay',
			duration: 23055,
			parentId: 22,
			unitType: 'file',
		},
		'774': {
			id: 774,
			title: 'drums',
			duration: 44356,
			parentId: 22,
			unitType: 'file',
		},
		'262': {
			id: 262,
			title: 'mid section drum solo',
			duration: 22573,
			parentId: 22,
			unitType: 'file',
		},
		'222': {
			id: 222,
			title: 'outro guitar',
			duration: 23055,
			parentId: 22,
			unitType: 'file',
		},
		'367': {
			id: 367,
			title: 'drums',
			duration: 44356,
			parentId: 32,
			unitType: 'file',
		},
		'237': {
			id: 237,
			title: 'mid section drum solo',
			duration: 22573,
			parentId: 32,
			unitType: 'file',
		},
		'969': {
			id: 969,
			title: 'outro guitar',
			duration: 23055,
			parentId: 32,
			unitType: 'file',
		},
		'286': {
			id: 286,
			title: 'outro guitar',
			duration: 23055,
			parentId: 1,
			unitType: 'file',
		},
		'287': {
			id: 287,
			title: 'outro guitar',
			duration: 23055,
			parentId: 1,
			unitType: 'file',
		},
	},
	folders: {
		'0': {
			id: 0,
			title: 'Home',
			dateCreated: 1502500102,
			parentId: null,
			unitType: 'folder',
		},
		'22': {
			id: 22,
			title: 'Chimera',
			dateCreated: 1502500102,
			parentId: 0,
			unitType: 'folder',
		},
		'29': {
			id: 29,
			title: 'Complete songs',
			dateCreated: 150237935,
			parentId: 0,
			unitType: 'folder',
		},
		'32': {
			id: 32,
			title: 'Law of the Jungle',
			dateCreated: 150238403,
			parentId: 0,
			unitType: 'folder',
		},
		'25': {
			id: 25,
			title: 'Compass',
			dateCreated: 150238403,
			parentId: 0,
			unitType: 'folder',
		},
		'59': {
			id: 59,
			title: 'Since You',
			dateCreated: 150238403,
			parentId: 0,
			unitType: 'folder',
		},
		'87': {
			id: 87,
			title: 'Alhambra',
			dateCreated: 150238403,
			parentId: 0,
			unitType: 'folder',
		},
		'14': {
			id: 14,
			title: 'Silk Road',
			dateCreated: 150238403,
			parentId: 0,
			unitType: 'folder',
		},
		'2': {
			id: 2,
			title: 'Hagia Sofia',
			dateCreated: 150238403,
			parentId: 0,
			unitType: 'folder',
		},
		'3': {
			id: 3,
			title: 'Block out the Sun',
			dateCreated: 150238403,
			parentId: 0,
			unitType: 'folder',
		},
		'1': {
			id: 1,
			title: 'Over Again',
			dateCreated: 150238403,
			parentId: 0,
			unitType: 'folder',
		},
		'4': {
			id: 4,
			title: 'Guitar parts',
			dateCreated: 150238403,
			parentId: 1,
			unitType: 'folder',
		},
		'5': {
			id: 5,
			title: 'Synth',
			dateCreated: 150238403,
			parentId: 22,
			unitType: 'folder',
		},
		'6': {
			id: 6,
			title: 'Drums',
			dateCreated: 150238403,
			parentId: 22,
			unitType: 'folder',
		},
		'7': {
			id: 7,
			title: 'Piano',
			dateCreated: 150238403,
			parentId: 22,
			unitType: 'folder',
		},
		'8': {
			id: 8,
			title: 'Vocals',
			dateCreated: 150238403,
			parentId: 4,
			unitType: 'folder',
		},
		'56': {
			id: 56,
			title: 'Even better Vocals',
			dateCreated: 150238403,
			parentId: 8,
			unitType: 'folder',
		},
		'57': {
			id: 57,
			title: 'Wayy better Vocals',
			dateCreated: 150238403,
			parentId: 56,
			unitType: 'folder',
		},
	}
};

const units = (state = initialState, action) => {
	switch (action.type) {
		case GET_INITIAL_UNITS:
			return {
				...state,
			};

		case CREATE_FOLDER:
			const { id, parentId } = action.payload

			const newFolder = {}
			newFolder[id] = {
				id: id,
				title: "New Folder",
				dateCreated: Date.now(),
				parentId: parentId,
				unitType: UnitType.Folder
			};
			return {
				...state,
				folders: Object.assign({}, state.folders, newFolder)
			};


		// case DELETE_UNIT:
		// 	const { unitType, unitId } = action.payload

		// 	const newState = state; //this is mutating state
		// 	const actualUnitType = unitType === UnitType.Folder ? 'folders' : 'files'

		// 	delete newState[actualUnitType][unitId]
		// 	return {
		// 		...state,
		// 		newState
		// 	};












		case DELETE_UNIT:
			const unitType = action.payload.unitType === UnitType.Folder ? 'folders' : 'files';
			const unitToDelete = action.payload.unitId;

			const { [unitType]: unitsOfType, ...oppositeUnitType } = state;
			const { [unitToDelete]: unitValue, ...objWithRemovedUnit } = unitsOfType;

			const newState = { ...oppositeUnitType, [unitType]: objWithRemovedUnit }

			return {
				...state,
				...newState
			}


















		// case RENAME_UNIT:
		// 	const { newTitle } = action.payload

		// 	let type = action.payload.unitType === UnitType.Folder ? 'folders' : 'files';
		// 	const newStateWithRenamedObj = state; //this is mutating state

		// 	const renamedUnit = state[type][action.payload.unitId]
		// 	renamedUnit.title = newTitle

		// 	newStateWithRenamedObj[type][action.payload.unitId] = renamedUnit;

		// 	return {
		// 		...state,
		// 		newStateWithRenamedObj
		// 	};





		case RENAME_UNIT:
			const unitToRename = action.payload.unitId
			const type = action.payload.unitType === UnitType.Folder ? 'folders' : 'files';
			const { newTitle } = action.payload;

			const { [type]: unitsOfType, ...opposingUnitType } = state;
			const { [unitToRename]: unit, ...restOfUnitType } = unitsOfType;
			const { title, ...unitDataWithoutTitle } = unit;

			const updatedUnit = unitDataWithoutTitle;
			updatedUnit.title = newTitle;

			const updatedUnitType = { [unitToRename]: updatedUnit, ...restOfUnitType };
			const newStateWithRenamedObj = { ...opposingUnitType, [type]: updatedUnitType }

			return {
				...state,
				...newStateWithRenamedObj
			}









		case MOVE_UNITS:
			return {
				...state,

			}

		default:
			return state;
	};
};
export default units;