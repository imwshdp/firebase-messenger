import { MutableRefObject, useEffect, useRef } from 'react';

export function useIntersectionObserver<T extends Element>({
	ref,
	callback,
	isUnobserve,
}: {
	ref: MutableRefObject<T | null>;
	callback: () => void;
	isUnobserve: boolean;
}) {
	const observer = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		if (!ref.current) return;

		const callbackFunction = function (entries: IntersectionObserverEntry[]) {
			if (entries[0].isIntersecting) {
				callback();
			}
		};

		observer.current = new IntersectionObserver(callbackFunction);
		observer.current.observe(ref.current);

		return () => {
			if (ref.current) observer.current?.unobserve(ref.current);
		};
	}, [ref.current]);

	useEffect(() => {
		if (isUnobserve && ref.current) observer.current?.unobserve(ref.current);
	}, [isUnobserve]);
}
