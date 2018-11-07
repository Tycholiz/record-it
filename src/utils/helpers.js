export const getChildrenOfFolder = (folderId) => {

	const filesWithinFolder = Object.keys(state.files)
		.map((fileId) => state.files[fileId])
		.filter((file) => file.parentId === folderId)

	const foldersWithinFolder = Object.keys(state.folders)
		.map((folderId) => state.folders[folderId])
		.filter((folder) => folder.parentId === folderId)

	const allChildrenOfFolder = { ...foldersWithinFolder, ...filesWithinFolder }
	return allChildrenOfFolder;
}