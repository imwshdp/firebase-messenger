import { FC } from 'react';

import { getCombinedId } from '@Shared/helpers/getCombinedId';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { openChat } from '@Store/slices/chats';
import { setChatUser } from '@Store/slices/messages';

import { ChatLink } from '@Components';

interface PropsType {
	uid: string;
	displayName: string;
	photoURL: string | null;

	lastMessage?: {
		text: string;
	};
	date?: string;
}

const ChatLinkContainer: FC<PropsType> = (props) => {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector((state) => state.user);

	const handleClick = () => {
		dispatch(
			setChatUser({
				chatId: getCombinedId(currentUser.uid, props.uid),
				user: props,
			}),
		);

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

	return <ChatLink {...props} onClick={handleClick} />;
};

export default ChatLinkContainer;
