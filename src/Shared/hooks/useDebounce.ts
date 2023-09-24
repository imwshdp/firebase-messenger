import { useEffect, useState } from 'react';

import { DEBOUNCE_DELAY } from '@Shared/content/constants';

export default function useDebounce<T>(value: T, delay: number = DEBOUNCE_DELAY): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
}
