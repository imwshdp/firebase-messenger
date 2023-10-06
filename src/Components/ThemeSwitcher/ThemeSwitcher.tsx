import { FC, useEffect } from 'react';

import { ColorSchemes } from '@Shared/content/constants';
import { IconOfUser } from '@Shared/content/icons';

import { ButtonWithIcon } from '@Components';

interface PropsType {
	colorScheme: ColorSchemes;
	toggleColorScheme: () => void;
}

const ThemeSwitcher: FC<PropsType> = ({ colorScheme, toggleColorScheme }) => {
	const bodyElement = document.body;

	useEffect(() => {
		switch (colorScheme) {
			case ColorSchemes.light:
				bodyElement.classList.remove(ColorSchemes.dark);
				bodyElement.classList.add(ColorSchemes.light);
				break;

			case ColorSchemes.dark:
				bodyElement.classList.remove(ColorSchemes.light);
				bodyElement.classList.add(ColorSchemes.dark);
				break;
		}
	}, [colorScheme]);

	return <ButtonWithIcon icon={<IconOfUser />} onClick={toggleColorScheme} />;
};

export default ThemeSwitcher;
