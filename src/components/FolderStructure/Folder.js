import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	TouchableOpacity,
	View,
	TextInput,
	TouchableHighlight,
	TouchableWithoutFeedback,
	Alert,
	KeyboardAvoidingView,
	Dimensions
} from 'react-native';
const screen = Dimensions.get('window');
import s from '../../styles/FolderStructure/Folder'
import { Ionicons } from '@expo/vector-icons';

import { Mode, ControlView, UnitType } from '../../constants/enumerables';

import { deleteUnit, renameUnit } from '../../actions';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

// import {
// 	MenuProvider,
// 	Menu,
// 	MenuOptions,
// 	MenuOption,
// 	MenuTrigger,
// } from 'react-native-popup-menu';

import Modal from "react-native-modal";

// import Icon from 'react-native-vector-icons/FontAwesome';
// const barsIcon = (<Icon name="bars" size={25} color='black' />)

class Folder extends Component {
	state = {
		_menu: null,
		renaming: false,
		deleteConfirmation: false,
		title: this.props.text,
	};

	setMenuRef = ref => {
		this.state._menu = ref;
	};

	hideMenu = () => {
		this.state._menu.hide();
	};

	showMenu = () => {
		this.state._menu.show();
	};

	handleOpenModal = (modal) => {
		this.hideMenu()
		this.setState(() => {
			return {
				[modal]: true
			};
		});
	};

	handleCloseModal = (modal) => {
		this.setState(() => {
			return {
				[modal]: false
			};
		});
	}

	handleDelete = (unitId, unitType) => {
		const { dispatch } = this.props;

		dispatch(deleteUnit(unitId, unitType));
		this.handleCloseModal('deleteConfirmation');
	};

	handleRename = (unitId, unitType) => {
		const { dispatch } = this.props;
		const { title } = this.state;

		this.handleCloseModal('renaming');
		title ? dispatch(renameUnit(unitId, unitType, title)) : null
	}

	render() {
		const { renaming, deleteConfirmation } = this.state;
		const { id, text, icon, handleUnitPress, unitType, selected, mode } = this.props;

		return (
			<View>

				{/* USER FOLDER */}
				<TouchableOpacity>
					<View
						// style={{width: 60, height: 40, backgroundColor: 'green'}}
						style={[
							s.container, //styles applied to all units
							unitType === undefined && s.navContainer,
							unitType === UnitType.File && s.fileContainer,
							unitType === UnitType.Folder && s.folderContainer,
							mode === Mode.Select && unitType ? s.containerMultipleMode : null,
							selected && s.containerSelected
						]}
						onPress={handleUnitPress}
					>
						{icon}
						<Text icon={icon}>
							{text}
						</Text>
					</View>

				</TouchableOpacity>

					{/* FOLDER OPTIONS */}
					{unitType &&
						<TouchableOpacity
							style={s.folderOptionsContainer}
							onPress={this.showMenu}
						>
							<Menu
								ref={this.setMenuRef}
								button={<Ionicons name="md-microphone" size={10} color="green" />}
							>
								<MenuItem onPress={() => this.handleOpenModal('renaming')}>Rename</MenuItem>
								<MenuDivider />
								<MenuItem onPress={() => this.handleOpenModal('deleteConfirmation')}>Delete</MenuItem>
								<MenuDivider />
								<MenuItem onPress={this.hideMenu}>Favorite</MenuItem>
								{unitType === UnitType.File &&
									<View>
										<MenuDivider />
										<MenuItem onPress={this.hideMenu}>Share</MenuItem>
									</View>
								}
								<MenuDivider />
								<MenuItem onPress={this.hideMenu}>More info...</MenuItem>
								<MenuDivider />
								<MenuItem onPress={this.hideMenu}>Close</MenuItem>
							</Menu>
						</TouchableOpacity>
					}

					{/* {unitType &&

							<View>
								<Menu>
									<MenuTrigger>
										<TouchableWithoutFeedback delayLongerPress={3000} onLongPress={() => console.log("hey buddy")}>
											<View
												// style={{width: 60, height: 40, backgroundColor: 'green'}}
												style={[
													s.container, //styles applied to all units
													unitType === undefined && s.navContainer,
													unitType === UnitType.File && s.fileContainer,
													unitType === UnitType.Folder && s.folderContainer,
													mode === Mode.Select && unitType ? s.containerMultipleMode : null,
													selected && s.containerSelected
												]}
												onPress={handleUnitPress}
											>
												{icon}
												<Text icon={icon}>
													{text}
												</Text>
											</View>

										</TouchableWithoutFeedback>
									</MenuTrigger>
									<MenuOptions>
										<MenuOption value={1} text='One' />
										<MenuOption value={2} text='two' />
										<MenuOption value={3} disabled={true} text='Three' />
									</MenuOptions>

								</Menu>

							</View>


					} */}


				{/* RENAME MODAL */}
				<Modal
					onBackdropPress={() => this.setState({ renaming: false })}
					isVisible={renaming}
					style={s.modalContainer}
					avoidKeyboard={true}
				>
					<View style={s.modalContainerInner}>
						{unitType === UnitType.File ?
							<Text style={s.modalHeader}>Rename clip:</Text>
								:
							<Text style={s.modalHeader}>Rename folder:</Text>
						}
						<TextInput
							style={s.modalInput}
							onChangeText={(newTitle) =>
								this.setState({
									title: newTitle
								})
							}
							defaultValue={text !== 'New Folder' ? text : ''}
							autoFocus={true}
							selectTextOnFocus={true}
							keyboardAppearance={'dark'}
							maxLength={30}
							underlineColorAndroid='transparent'
						/>

						<View style={s.modalOptions}>
							<TouchableHighlight
								onPress={() => {
									this.handleCloseModal('renaming');
								}}
								style={s.modalOption}
							>
								<Text>CANCEL</Text>
							</TouchableHighlight>

							<TouchableHighlight
								onPress={() => {
									this.handleRename(id, unitType)}
								}
								style={[s.modalOption, s.renameOption]}
							>
								<Text style={{color: 'white'}}>RENAME</Text>
							</TouchableHighlight>
						</View>

					</View>
				</Modal>

				{/* DELETE CONFIRMATION MODAL */}
				<Modal
					animationType="slide"
					transparent={true}
					visible={deleteConfirmation}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}
				>
					<KeyboardAvoidingView style={s.modalMask} behavior="padding">
						<View style={s.modalContainer}>
							<Text>Are you sure you want to delete {text}?</Text>
							<View style={s.modalOptions}>
								<TouchableHighlight
									onPress={() => {
										this.handleCloseModal('deleteConfirmation');
									}}
									style={s.modalOption}
									>
									<Text>CANCEL</Text>
								</TouchableHighlight>

								<TouchableHighlight
									onPress={() => {
										this.handleDelete(id, unitType)
									}}
									style={[s.modalOption, s.renameOption]}
									>
									<Text style={{ color: 'white' }}>CONFIRM</Text>
								</TouchableHighlight>
							</View>
							<Text>This action is not reversible</Text>
						</View>
					</KeyboardAvoidingView>
				</Modal>
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		currentFolder: state.currentFolder,
		units: state.units,
		mode: state.multiple.mode
	};
}

export default connect(mapStateToProps)(Folder);

// const styles = StyleSheet.create({
// 	container: {
// 		width: 140,
// 		height: 80,
// 		borderRadius: 15,
// 		backgroundColor: '#fff',
// 		alignItems: 'center',
// 		justifyContent: 'flex-end',
// 		margin: 6,
// 	},
// 	containerSelected: {
// 		backgroundColor: 'green'
// 	},
// 	containerMultipleMode: {
// 		borderWidth: 1,
// 		borderColor: 'red',
// 	},
// 	folderOptionsContainer: {
// 		flex: 1,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// 	modalMask: {
// 		flex: 1,
// 		backgroundColor: 'rgba(0, 0, 0, 0.4)',
// 	},
// 	modalContainer: {
// 		flex: 0,
// 		width: 330,
// 		height: 150,
// 		backgroundColor: '#2B2B2B',
// 		// marginHorizontal: 40,
// 		// justifyContent: 'center',
// 		// alignItems: 'center',
// 		borderRadius: 4,
// 		// flexDirection: 'column',
// 		// flexWrap: 'wrap',
// 		// flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	modalContainerInner: {
// 		// flex: 1,
// 		backgroundColor: 'white',
// 		padding: 22,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		borderRadius: 4,
// 		borderColor: 'rgba(0, 0, 0, 0.1)',
// 	},
// 	modalHeader: {
// 		flex: 1,
// 		fontSize: 25
// 	},
// 	modalInput: {
// 		flex: 1,
// 	},
// 	modalOptions: {
// 		flex: 1,
// 		flexDirection: 'row',
// 		justifyContent: 'flex-end',
// 	},
// 	modalOption: {
// 	},
// 	renameOption: {
// 		borderRadius: 4,
// 		backgroundColor: 'red',
// 	},
// 	icon: {
// 		justifyContent: 'center',
// 	},
// 	barsIcon: {
// 		alignSelf: 'flex-end',
// 		marginRight: 20,
// 		marginTop: 80,
// 	},
// });
