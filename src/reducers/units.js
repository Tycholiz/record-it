import { GET_INITIAL_UNITS } from "../constants/action-types";

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

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_INITIAL_UNITS:
			console.log(action.payload.currentFolder)
			return {
				...state,
				// currentFolder: action.payload.currentFolder
			};
			// case CREATE_FOLDER:
			// return {
			// 	...state,
			// };
		default:
			return state;
	}
};
export default reducer;