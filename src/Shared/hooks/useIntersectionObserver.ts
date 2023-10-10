import { MutableRefObject, useEffect, useRef } from 'react';

export function useIntersectionObserver<T extends Element>({
	ref,
	callback,
}: {
	ref: MutableRefObject<T | null>;
	callback: () => void;
}) {
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		if (observerRef.current) observerRef.current.disconnect();

		const callbackFunction = (entries: IntersectionObserverEntry[]) => {
			if (entries[0].isIntersecting) {
				callback();
			}
		};

		observerRef.current = new IntersectionObserver(callbackFunction);
	}, [callback]);

	useEffect(() => {
		if (!ref.current) return;

		observerRef.current?.observe(ref.current);

		return () => {
			observerRef.current?.disconnect();
		};
	}, [ref]);
}
