import { AnyAction } from '@reduxjs/toolkit';

export function isRejectedAction(action: AnyAction) {
	return action.type.endsWith('rejected');
}

export function isRejectedSliceAction(sliceName: string, action: AnyAction) {
	return action.type.startsWith(sliceName) && action.type.endsWith('rejected');
}
