import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColorSchemes, localStorageKeys } from '@Shared/content/constants';
import { ConfigState } from '@Shared/model';

const initialState: ConfigState = {
	colorScheme: ColorSchemes.light,
	isNavbarCollapsed: false,
};

const configSlice = createSlice({
	name: 'config',
	initialState,
	reducers: {
		getLocalStorageConfig(state) {
			const colorScheme = localStorage.getItem(localStorageKeys.colorScheme);
			const navbarState = localStorage.getItem(localStorageKeys.navbarCollapsedStatus);

			const themeFromColorSchemes = () =>
				Object.values(ColorSchemes).filter((value) => {
					return value === colorScheme;
				})[0];

			return {
				...state,
				...(colorScheme && { colorScheme: themeFromColorSchemes() }),
				...(navbarState && { isNavbarCollapsed: navbarState == 'false' ? false : true }),
			};
		},

		setColorScheme(state, { payload }: PayloadAction<ColorSchemes>) {
			localStorage.setItem(localStorageKeys.colorScheme, payload);
			return {
				...state,
				colorScheme: payload,
			};
		},

		setNavbarStatus(state, { payload }: PayloadAction<boolean>) {
			localStorage.setItem(localStorageKeys.navbarCollapsedStatus, String(payload));
			return {
				...state,
				isNavbarCollapsed: payload,
			};
		},
	},
});

export const { getLocalStorageConfig, setColorScheme, setNavbarStatus } = configSlice.actions;
export default configSlice.reducer;
