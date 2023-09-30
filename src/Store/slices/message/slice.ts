import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageState } from '@Shared/model';

const initialState: MessageState = {
	text: '',
	images: [],
};

const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		setText(state, { payload }: PayloadAction<string>) {
			return { ...state, text: payload };
		},
	},
});

export const { setText } = messageSlice.actions;
export default messageSlice.reducer;
