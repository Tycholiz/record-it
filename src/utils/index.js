import { UnitType } from '../constants/enumerables';

export const getChildrenOfFolder = (state, folderId) => {
	const { folders, files } = state.units;

	const foldersWithinFolder = Object.keys(folders)
		.map((folderId) => folders[folderId])
		.filter((folder) => folder.parentId === folderId)
	const filesWithinFolder = Object.keys(files)
		.map((fileId) => files[fileId])
		.filter((file) => file.parentId === folderId)

	// const allChildrenOfFolder = { ...foldersWithinFolder, ...filesWithinFolder }
	Array.prototype.push.apply(foldersWithinFolder, filesWithinFolder);
	return foldersWithinFolder;
}

export const getUnitsToDelete = (state, selectedUnits, unitType) => {
	// UnitType.Folder = 'folder'
	unitType = unitType === UnitType.Folder ? 'folders' : 'files';
	const namesOfUnitsToDelete = [];

	for (let unit = 0; unit < selectedUnits.length; unit++) {
		if (selectedUnits[unit] in state.units[unitType]) {
			namesOfUnitsToDelete.push(state.units[unitType][selectedUnits[unit]])
		}
	}
	return namesOfUnitsToDelete;
}

export const displayBreadCrumb = (state) => {
	let currentFolderId = state.currentFolder
	const { folders } = state.units;

	const LENGTH_LIMIT = 45;
	const path = [];

	let currentParent = folders[currentFolderId]['parentId']
	if (currentParent == null) {
		return "Home";
	}

	do {
		if (folders[currentFolderId]) path.push(folders[currentFolderId].title)
		currentFolderId = currentParent;
		if (currentParent != null) currentParent = folders[currentParent]['parentId']
	} while (currentParent != null)
	path.push("Home")

	let breadcrumbString = ''
	for (let i = path.length - 1; i >= 0; i--) {
		breadcrumbString += path[i]
		if (i > 0) breadcrumbString += ' > '
	}
	if (breadcrumbString.length <= LENGTH_LIMIT) {
		return breadcrumbString;
	} else {
		const START_POINT = breadcrumbString.length - LENGTH_LIMIT;
		const amountOverLimit = breadcrumbString.length - LENGTH_LIMIT
		let truncatedBreadcrumbString = breadcrumbString.substring(START_POINT, LENGTH_LIMIT + amountOverLimit);

		return `...${truncatedBreadcrumbString}`;
	}
}
