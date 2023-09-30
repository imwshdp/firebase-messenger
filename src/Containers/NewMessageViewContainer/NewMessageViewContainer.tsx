import { FC } from 'react';

import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { setText } from '@Store/slices/message';

import { NewMessageView } from '@Components';

const NewMessageViewContainer: FC = () => {
	const dispatch = useAppDispatch();
	const messageText = useAppSelector((state) => state.message.text);

	const handleSetValue = (newValue: string) => {
		dispatch(setText(newValue));
	};

	return <NewMessageView value={messageText} setValue={handleSetValue} />;
};

export default NewMessageViewContainer;
