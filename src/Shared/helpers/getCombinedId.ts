export const getCombinedId = (firstId: string, secondId: string) => {
	return firstId > secondId ? firstId + secondId : secondId + firstId;
};
