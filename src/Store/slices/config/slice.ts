import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { COLOR_SCHEMES, LOCAL_STORAGE_KEYS } from '@Shared/content/constants';
import { ConfigState } from '@Shared/model';

const initialState: ConfigState = {
	colorScheme: COLOR_SCHEMES.light,
	isNavbarCollapsed: false,
};

const configSlice = createSlice({
	name: 'config',
	initialState,
	reducers: {
		getLocalStorageConfig(state) {
			const colorScheme = localStorage.getItem(LOCAL_STORAGE_KEYS.colorScheme);
			const navbarState = localStorage.getItem(LOCAL_STORAGE_KEYS.navbarCollapsedStatus);

			const themeFromColorSchemes = () =>
				Object.values(COLOR_SCHEMES).filter((value) => {
					return value === colorScheme;
				})[0];

			return {
				...state,
				...(colorScheme && { colorScheme: themeFromColorSchemes() }),
				...(navbarState && { isNavbarCollapsed: navbarState == 'false' ? false : true }),
			};
		},

		setColorScheme(state, { payload }: PayloadAction<COLOR_SCHEMES>) {
			localStorage.setItem(LOCAL_STORAGE_KEYS.colorScheme, payload);
			return {
				...state,
				colorScheme: payload,
			};
		},

		setNavbarStatus(state, { payload }: PayloadAction<boolean>) {
			localStorage.setItem(LOCAL_STORAGE_KEYS.navbarCollapsedStatus, String(payload));
			return {
				...state,
				isNavbarCollapsed: payload,
			};
		},
	},
});

export const { getLocalStorageConfig, setColorScheme, setNavbarStatus } = configSlice.actions;
export default configSlice.reducer;
