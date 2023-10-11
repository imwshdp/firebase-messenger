import { Dispatch, SetStateAction, useEffect } from 'react';

export function useHandleScrollEnd<T extends HTMLElement>({
	setIsScrollOnBottom,
	containerRef,
}: {
	setIsScrollOnBottom: Dispatch<SetStateAction<boolean>>;
	containerRef: React.MutableRefObject<T | null>;
}) {
	const handleScroll = () => {
		if (!containerRef.current) return;

		if (
			containerRef.current.scrollHeight - containerRef.current.scrollTop !==
			containerRef.current?.offsetHeight
		) {
			setIsScrollOnBottom(false);
		}

		if (
			containerRef.current.scrollHeight - containerRef.current.scrollTop ===
			containerRef.current?.offsetHeight
		) {
			setIsScrollOnBottom(true);
		}
	};

	useEffect(() => {
		containerRef.current?.addEventListener('scroll', handleScroll);

		return () => {
			containerRef.current?.removeEventListener('scroll', handleScroll);
		};
	}, [containerRef.current]);
}
