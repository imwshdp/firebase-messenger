import { FC, useEffect } from 'react';

import { COLOR_SCHEMES } from '@Shared/content/constants';
import { IconOfMoon, IconOfSun } from '@Shared/content/icons';

import { ButtonWithIcon } from '@Components';

interface PropsType {
	colorScheme: COLOR_SCHEMES;
	toggleColorScheme: () => void;
}

const ThemeSwitcher: FC<PropsType> = ({ colorScheme, toggleColorScheme }) => {
	const bodyElement = document.body;

	useEffect(() => {
		switch (colorScheme) {
			case COLOR_SCHEMES.light:
				bodyElement.classList.remove(COLOR_SCHEMES.dark);
				bodyElement.classList.add(COLOR_SCHEMES.light);
				break;

			case COLOR_SCHEMES.dark:
				bodyElement.classList.remove(COLOR_SCHEMES.light);
				bodyElement.classList.add(COLOR_SCHEMES.dark);
				break;
		}
	}, [colorScheme]);

	return (
		<ButtonWithIcon
			icon={colorScheme === COLOR_SCHEMES.light ? <IconOfSun /> : <IconOfMoon />}
			onClick={toggleColorScheme}
		/>
	);
};

export default ThemeSwitcher;
