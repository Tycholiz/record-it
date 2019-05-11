import { UnitType } from '../constants/enumerables';

export const getUnitsToDelete = (state, selectedUnits, unitType) => {
	unitType = unitType === UnitType.Folder ? 'folders' : 'files';
	const namesOfUnitsToDelete = [];

	for (let unit = 0; unit < selectedUnits.length; unit++) {
		if (selectedUnits[unit] in state.units[unitType]) {
			namesOfUnitsToDelete.push(state.units[unitType][selectedUnits[unit]])
		}
	}
	return namesOfUnitsToDelete;
}

export const duplicateTitles = (units, destinationFolderId, incomingUnitTitle, unitType) => {
	unitType = unitType === UnitType.Folder ? 'folders' : 'files';

	const allUnitIdsWithinFolder = Object.keys(units[unitType])
	const particularUnitsInDestination = allUnitIdsWithinFolder
		.filter(unitId => units[unitType][unitId].parentId === destinationFolderId)

		.map((id) => {
			return units[unitType][id].title
		});

	return particularUnitsInDestination.includes(incomingUnitTitle);
}

export const childrenOfParent = (state, folderId) => {
	const { folders, files } = state.units;

	const foldersWithinFolder = Object.keys(folders)
		.map((folderId) => folders[folderId])
		.filter((folder) => folder.parentId === folderId)
		.map((obj) => obj.id)

	const filesWithinFolder = Object.keys(files)
		.map((fileId) => files[fileId])
		.filter((file) => file.parentId === folderId)
		.map((obj) => obj.id)

	Array.prototype.push.apply(foldersWithinFolder, filesWithinFolder);
	return foldersWithinFolder;
}

export const getChildrenOfAllParents = (state, selectedUnits) => {
	const childrenToDelete = [];

	for (let parent of selectedUnits) {
		let children = childrenOfParent(state, parent);
		childrenToDelete.push.apply(childrenToDelete, children)
	}
	return childrenToDelete;
}

export const timeConverter = (timeStamp) => {
	var months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	var date = new Date(timeStamp);
	var year = date.getFullYear();
	var month = months_arr[date.getMonth()];
	var day = date.getDate();
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();

	var timeString = month + ' ' + day + ', ' + year + ' (' + hours + ':' + minutes.substr(-2) + ')';
	return timeString;
}

function hasLeadingSlash(path) {
	if (path[0] === '/') {
		return true;
	}
	return false;
}

function hasTrailingSlash(path) {
	if (path[path.length - 1] === '/') {
		return true;
	}
	return false
}

function addLeadingSlash(path) {
	return '/' + path
}

export const popCurrentDirectoryOffPath = (currentRelativePath) => {

	let workingString = currentRelativePath;
	if (hasLeadingSlash(workingString)) {
		workingString = workingString.slice(1)
	}
	if (hasTrailingSlash(workingString)) {
		workingString = workingString.slice(0, workingString.length - 1)
	}

	let workingArr = workingString.split('/')
	if (workingArr.length > 1) {
		workingArr.pop()
	}
	let newPath = workingArr.join('/')
	return addLeadingSlash(newPath);
}

export const addNewDirOnPath = (currentPath, nextDir) => {
	let workingCurrentPath = currentPath;
	if (hasTrailingSlash(currentPath)) {
		workingCurrentPath = workingCurrentPath.slice(0, workingCurrentPath.length - 1)
	}
	let workingNextDir = nextDir;
	if (!hasLeadingSlash(nextDir)) {
		workingNextDir = addLeadingSlash(workingNextDir)
	}
	return workingCurrentPath + workingNextDir;
}

export const chooseNameForNewUnit = (unitsInDir, unitType) => {
	let currentLevel;
	const baseAudioName = 'Audio'
	const baseFolderName = 'New Folder'
	let currentValue = 1;
	switch (unitType) {
		case 'folder':
			currentLevel = 'New Folder';
			while (unitsInDir.includes(currentLevel)) {
				currentValue++
				currentLevel = `${baseFolderName}(${currentValue})`
			}
			break;
		case 'file':
			currentLevel = 'Audio'
			while (unitsInDir.includes(currentLevel)) {
				currentValue++
				currentLevel = `${baseAudioName}(${currentValue})`
			}
			break;
		default:
			console.err("unit type not specified");
	}
	return currentLevel;
}

export const showShortDirPath = (dirPath) => {
	const shortPath = dirPath.split('/').slice(2).join('/')
	return '/' + shortPath
}

export const extractEndPoint = (path) => {
	if (hasTrailingSlash(path)) {
		path = path.slice(0, path.length - 1)
	}
	const endPoint = path.split('/')
	return endPoint[endPoint.length - 1]
}