export interface IMessage {
	id: string;
	text: string;
	date: string;
	author: {
		displayName: string;
		userId: number;
	};
}
