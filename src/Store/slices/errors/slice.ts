import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isRejectedAction } from '@Shared/helpers/rejectedActions';
import { ErrorState } from '@Shared/model';

const initialState: ErrorState[] = [];

export const errorSlice = createSlice({
	name: 'errors',
	initialState,
	reducers: {
		closeError(state, { payload }: PayloadAction<number>) {
			return state.filter((_, index) => index !== payload);
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(isRejectedAction, (state, { payload }: PayloadAction<ErrorState>) => {
			return [...state, payload];
		});
	},
});

export const { closeError } = errorSlice.actions;
export default errorSlice.reducer;
