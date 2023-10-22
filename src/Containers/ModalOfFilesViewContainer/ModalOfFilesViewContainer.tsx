import { FC, useEffect } from 'react';

import { TABLET_BREAKPOINT } from '@Shared/content/constants';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { closeModal, resetModalUrls, setModalActiveUrlIndex } from '@Store/slices/modal';

import { MobileModalOfFilesView, ModalOfFilesView } from '@Components';

const ModalOfFilesViewContainer: FC = () => {
	const dispatch = useAppDispatch();
	const urls = useAppSelector((state) => state.modal.urls);
	const activeUrlIndex = useAppSelector((state) => state.modal.activeUrlIndex);

	useEffect(() => {
		return () => {
			resetModalUrls();
		};
	}, []);

	const handleCloseModal = () => dispatch(closeModal());

	const isNextDisabled = activeUrlIndex === urls.length - 1;
	const isPreviousDisabled = activeUrlIndex === 0;

	const handleOpenPrevious = () => {
		if (!isPreviousDisabled) dispatch(setModalActiveUrlIndex(activeUrlIndex - 1));
	};

	const handleOpenNext = () => {
		if (!isNextDisabled) dispatch(setModalActiveUrlIndex(activeUrlIndex + 1));
	};

	const isDesktop = document.body.clientWidth > TABLET_BREAKPOINT;

	return (
		<>
			{!isDesktop ? (
				<MobileModalOfFilesView
					urls={urls}
					closeModal={handleCloseModal}
					activeUrlIndex={activeUrlIndex}
				/>
			) : (
				<ModalOfFilesView
					urls={urls}
					activeUrlIndex={activeUrlIndex}
					openPrevious={handleOpenPrevious}
					isPreviousDisabled={isPreviousDisabled}
					openNext={handleOpenNext}
					isNextDisabled={isNextDisabled}
					closeModal={handleCloseModal}
				/>
			)}
		</>
	);
};

export default ModalOfFilesViewContainer;
