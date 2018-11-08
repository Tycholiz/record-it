export const getChildrenOfFolder = (state, folderId) => {

	const foldersWithinFolder = Object.keys(state.units.folders)
		.map((folderId) => state.units.folders[folderId])
		.filter((folder) => folder.parentId === folderId)
	const filesWithinFolder = Object.keys(state.units.files)
		.map((fileId) => state.units.files[fileId])
		.filter((file) => file.parentId === folderId)

	// const allChildrenOfFolder = { ...foldersWithinFolder, ...filesWithinFolder }
	Array.prototype.push.apply(foldersWithinFolder, filesWithinFolder);
	return foldersWithinFolder;
}

export const displayBreadCrumb = (state) => {
	let currentFolderId = state.currentFolder
	const { folders } = state.units;

	let currentParent = folders[currentFolderId].parentId

	const LENGTH_LIMIT = 45;
	const path = [];

	if (currentParent === null) {
		return "Home";
	}

	do {
		path.push(folders[currentFolderId].title)
		currentFolderId = currentParent;
		if (currentParent != null) currentParent = folders[currentParent].parentId
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
