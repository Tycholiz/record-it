import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	StyleSheet,
	TouchableOpacity,
	View,
	TextInput,
	Modal,
	TouchableHighlight,
	Alert,
	KeyboardAvoidingView,
} from 'react-native';
import { Mode, ControlView, UnitType } from '../../constants/enumerables';

import { deleteUnit, renameUnit } from '../../actions';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import Icon from 'react-native-vector-icons/FontAwesome';
const barsIcon = (<Icon name="bars" size={25} color='black' />)

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
			<TouchableOpacity
				style={[
					styles.container,
					mode === Mode.Select && unitType ? styles.containerMultipleMode : null,
					selected && styles.containerSelected
				]}
				onPress={handleUnitPress}
			>

				{/* FOLDER OPTIONS */}
				{unitType &&
					<TouchableOpacity
						style={styles.folderOptionsContainer}
						onPress={this.showMenu}
					>
						<Menu
							ref={this.setMenuRef}
							button={barsIcon}
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

				{/* RENAME MODAL */}
				<Modal
					animationType="slide"
					transparent={true}
					visible={renaming}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}>
					<KeyboardAvoidingView style={styles.modalMask} behavior="padding">
						<View style={styles.modalContainer}>
							{unitType === UnitType.File ?
								<Text style={styles.modalHeader}>Rename clip:</Text>
									:
								<Text style={styles.modalHeader}>Rename folder:</Text>
							}

							<TextInput
								style={styles.modalInput}
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
							/>

							<View style={styles.modalOptions}>
								<TouchableHighlight
									onPress={() => {
										this.handleCloseModal('renaming');
									}}
									style={styles.modalOption}
								>
									<Text>CANCEL</Text>
								</TouchableHighlight>

								<TouchableHighlight
									onPress={() => {
										this.handleRename(id, unitType)}
									}
									style={[styles.modalOption, styles.renameOption]}
								>
									<Text style={{color: 'white'}}>RENAME</Text>
								</TouchableHighlight>
							</View>

						</View>
					</KeyboardAvoidingView>
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
					<KeyboardAvoidingView style={styles.modalMask} behavior="padding">
						<View style={styles.modalContainer}>
							<Text>Are you sure you want to delete {text}?</Text>
							<View style={styles.modalOptions}>
								<TouchableHighlight
									onPress={() => {
										this.handleCloseModal('deleteConfirmation');
									}}
									style={styles.modalOption}
									>
									<Text>CANCEL</Text>
								</TouchableHighlight>

								<TouchableHighlight
									onPress={() => {
										this.handleDelete(id, unitType)
									}}
									style={[styles.modalOption, styles.renameOption]}
									>
									<Text style={{ color: 'white' }}>CONFIRM</Text>
								</TouchableHighlight>
							</View>
							<Text>This action is not reversible</Text>
						</View>
					</KeyboardAvoidingView>
				</Modal>

				{icon}
				<Text icon={icon}>
					{text}
				</Text>
			</TouchableOpacity>
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

const styles = StyleSheet.create({
	container: {
		width: 140,
		height: 80,
		borderRadius: 15,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-end',
		margin: 6,
	},
	containerSelected: {
		backgroundColor: 'green'
	},
	containerMultipleMode: {
		borderWidth: 1,
		borderColor: 'red',
	},
	folderOptionsContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalMask: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
	},
	modalContainer: {
		flex: 1,
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginHorizontal: 43,
		marginTop: 240,
		marginBottom: 240,
		borderRadius: 4,
		backgroundColor: '#2B2B2B',
	},
	modalHeader: {
		flex: 1,
		fontSize: 25
	},
	modalInput: {
		flex: 1,
	},
	modalOptions: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	modalOption: {
	},
	renameOption: {
		borderRadius: 4,
		backgroundColor: 'teal',
	},
	icon: {
		justifyContent: 'center',
	},
	barsIcon: {
		alignSelf: 'flex-end',
		marginRight: 20,
		marginTop: 80,
	},
});
