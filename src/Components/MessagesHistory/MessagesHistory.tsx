import { FC } from 'react';

import { Message } from '@Shared/model';

import { MessageView } from '@Components';

interface PropsType {
	className?: string;
	messages: Message[];
}

const MessagesHistory: FC<PropsType> = ({ className, messages }) => {
	return (
		<div className={className}>
			{messages.map((message, index) => (
				<MessageView key={index} message={message} />
			))}
		</div>
	);
};

export default MessagesHistory;
