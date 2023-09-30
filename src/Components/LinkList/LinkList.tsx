import { FC } from 'react';

import { ChatLinkContainer } from '@Containers';
import { LinkListType } from '@Shared/content/constants';
import { UserChatInfo, UserInfo } from '@Shared/model';

import styles from './LinkList.module.scss';

interface PropsType {
	type: LinkListType;
	items: UserChatInfo[] | UserInfo[];
	isLoading: boolean;
}

const LinkList: FC<PropsType> = ({ type, items, isLoading }) => {
	return (
		<div className={styles['list']}>
			<div className={styles['list__items']}>
				{type === LinkListType.Chats &&
					(items as UserChatInfo[]).map(({ id, userInfo }) => (
						<ChatLinkContainer
							key={id}
							uid={userInfo.uid}
							displayName={userInfo.displayName}
							photoURL={userInfo.photoURL || null}
						/>
					))}

				{type === LinkListType.Users &&
					(items as UserInfo[]).map(({ uid, displayName, photoURL }) => (
						<ChatLinkContainer
							key={uid}
							uid={uid}
							displayName={displayName}
							photoURL={photoURL || null}
						/>
					))}
			</div>
			{isLoading && <div className={styles['list__overlay']} />}
		</div>
	);
};

export default LinkList;
