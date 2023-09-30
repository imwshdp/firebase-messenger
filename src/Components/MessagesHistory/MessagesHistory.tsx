import { FC } from 'react';

interface PropsType {
	className?: string;
}

const MessagesHistory: FC<PropsType> = ({ className }) => {
	return <div className={className}></div>;
};

export default MessagesHistory;
