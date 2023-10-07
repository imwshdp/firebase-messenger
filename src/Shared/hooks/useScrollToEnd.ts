import { useEffect, useRef, useState } from 'react';

export function useScrollToEnd<T, D>(items: T, dependency: D) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [isScrollDirty, setIsScrollDirty] = useState<boolean>(false);

	useEffect(() => {
		setIsScrollDirty(false);
	}, [dependency]);

	useEffect(() => {
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
		containerRef.current?.scrollTo({
			top: containerRef.current.scrollHeight,
			behavior: 'smooth',
		});
	};

	return { containerRef, triggerScroll };
}
