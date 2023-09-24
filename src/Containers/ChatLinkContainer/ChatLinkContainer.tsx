import { FC } from 'react';

import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { openChat } from '@Store/slices/chats';

import { ChatLink } from '@Components';

interface PropsType {
	uid: string;
	displayName: string;
	photoURL: string | null;
}

const ChatLinkContainer: FC<PropsType> = (props) => {
	const dispatch = useAppDispatch();

	const currentUser = useAppSelector((state) => state.user);

	const handleClick = () => {
		dispatch(
			openChat({
				chatUser: props,
				currentUser: {
					uid: currentUser.uid,
					displayName: currentUser.displayName,
					photoURL: currentUser.photoURL,
				},
			}),
		);
	};

	return (
		<ChatLink displayName={props.displayName} photoURL={props.photoURL} onClick={handleClick} />
	);
};

export default ChatLinkContainer;
