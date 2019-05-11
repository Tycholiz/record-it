import React from 'react';
import {
	View,
} from 'react-native';
import s from '../../styles/TopBar/index';

import ToggleControlButton from './ToggleControlButton';
import Settings from './Settings';
import BreadcrumbBar from './BreadcrumbBar';

const TopBar = () => (
	<View style={s.container}>
		<View style={s.topbarUpper}>
			<ToggleControlButton />
			<Settings />
		</View>
		<BreadcrumbBar />
	</View>
);
export default TopBar;