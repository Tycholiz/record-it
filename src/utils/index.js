export const getChildrenOfFolder = (state, folderId) => {

	const foldersWithinFolder = Object.keys(state.units.folders)
		.map((folderId) => state.units.folders[folderId])
		.filter((folder) => folder.parentId === folderId)
	const filesWithinFolder = Object.keys(state.units.files)
		.map((fileId) => state.units.files[fileId])
		.filter((file) => file.parentId === folderId)

	const allChildrenOfFolder = { ...foldersWithinFolder, ...filesWithinFolder }
	return allChildrenOfFolder;
}
