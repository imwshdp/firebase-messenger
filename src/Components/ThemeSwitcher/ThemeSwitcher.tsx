import { FC, useEffect, useState } from 'react';

import { ColorSchemes } from '@Shared/content/constants';
import { IconOfUser } from '@Shared/content/icons';

import { ButtonWithIcon } from '@Components';

const ThemeSwitcher: FC = () => {
	const [colorScheme, setColorScheme] = useState<ColorSchemes>(ColorSchemes.light);

	const toggleColorTheme = () => {
		setColorScheme((previousColorScheme) =>
			previousColorScheme === ColorSchemes.light ? ColorSchemes.dark : ColorSchemes.light,
		);
	};

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

	return <ButtonWithIcon icon={<IconOfUser />} onClick={toggleColorTheme} />;
};

export default ThemeSwitcher;
