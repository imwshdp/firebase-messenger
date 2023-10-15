import { useEffect, useRef, useState } from 'react';

export function useScrollAtEnd<T, D>(items: Array<T>, resetDependency: D) {
	const [isScrollEnd, setIsScrollEnd] = useState<boolean>(false);

	const containerRef = useRef<HTMLDivElement | null>(null);
	const [isScrollDirty, setIsScrollDirty] = useState<boolean>(false);

	useEffect(() => {
		setIsScrollDirty(false);
	}, [resetDependency]);

	useEffect(() => {
		if (!containerRef.current || (isScrollDirty && !isScrollEnd)) return;

		if (isScrollDirty) {
			containerRef.current?.scrollTo({
				top: containerRef.current.scrollHeight,
				behavior: 'smooth',
			});
		} else {
			containerRef.current?.scrollTo({
				top: containerRef.current.scrollHeight,
				behavior: 'instant',
			});

			setIsScrollDirty(true);
		}
	}, [items]);

	const triggerScroll = () => {
		if (
			containerRef.current &&
			containerRef.current.scrollHeight - containerRef.current.scrollTop ===
				containerRef.current?.offsetHeight + 80
		) {
			containerRef.current?.scrollTo({
				top: containerRef.current.scrollHeight,
				behavior: 'smooth',
			});
		}
	};

	const setScrollEnd = () => {
		if (
			containerRef.current &&
			containerRef.current.scrollHeight - containerRef.current.scrollTop ===
				containerRef.current?.offsetHeight
		) {
			setIsScrollEnd(true);
		}
	};

	const setScrollNotEnd = () => {
		if (
			containerRef.current &&
			containerRef.current.scrollHeight - containerRef.current.scrollTop !==
				containerRef.current?.offsetHeight
		) {
			setIsScrollEnd(false);
		}
	};

	useEffect(() => {
		containerRef.current?.addEventListener('scroll', setScrollNotEnd);
		containerRef.current?.addEventListener('scrollend', setScrollEnd);

		return () => {
			containerRef.current?.removeEventListener('scroll', setScrollNotEnd);
			containerRef.current?.removeEventListener('scrollend', setScrollEnd);
		};
	}, []);

	return { containerRef, triggerScroll };
}
