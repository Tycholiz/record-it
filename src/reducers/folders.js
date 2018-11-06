import { POPULATE_FOLDERS } from "../constants/action-types";

const initialState = {
	'22': {
		id: 22,
		title: 'Chimera',
		dateCreated: 1502500102,
		children: {
			'944': 944,
			'253': 253,
			'265': 265,
		},
	},
	'29': {
		id: 29,
		title: 'Complete songs',
		dateCreated: 150237935,
		children: {
			'32': 32,
			'25': 25,
			'59': 59,
			'87': 87,
			'2': 2,
			'3': 3,
			'1': 1,
			'99': 99,
		}
	},
	'32': {
		id: 32,
		title: 'Law of the Jungle',
		dateCreated: 150238403,
		children: {
			'774': 774,
			'262': 262,
			'222': 222,
		},
	},
	'25': {
		id: 25,
		title: 'Compass',
		dateCreated: 150238403,
		children: {
			'367': 367,
			'237': 237,
			'969': 969,
		},
	},
	'59': {
		id: 59,
		title: 'Since You',
		dateCreated: 150238403,
		children: {}
	},
	'87': {
		id: 87,
		title: 'Alhambra',
		dateCreated: 150238403,
		children: {}
	},
	'14': {
		id: 14,
		title: 'Silk Road',
		dateCreated: 150238403,
		children: {}
	},
	'2': {
		id: 2,
		title: 'Hagia Sofia',
		dateCreated: 150238403,
		children: {}
	},
	'3': {
		id: 3,
		title: 'Bloack out the Sun',
		dateCreated: 150238403,
		children: {}
	},
	'1': {
		id: 1,
		title: 'Over Again',
		dateCreated: 150238403,
		children: {}
	},
	'99': {
		id: 99,
		title: 'One More Time',
		dateCreated: 150238403,
		children: {}
	}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case POPULATE_FOLDERS:
			return {
				...state,
			};
		default:
			return state;
	}
};
export default reducer;