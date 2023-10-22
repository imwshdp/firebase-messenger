// eslint-disable-next-line simple-import-sort/imports
import { FC } from 'react';

import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IconOfFile } from '@Shared/content/icons';

import { Modal } from '@Components';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styles from './MobileModalOfFilesView.module.scss';

interface PropsType {
	urls: string[];
	closeModal: () => void;
	activeUrlIndex: number;
}

const MobileModalOfFilesView: FC<PropsType> = ({ closeModal, urls, activeUrlIndex }) => {
	const slides = () =>
		urls.map((url, index) => {
			if (url.includes('.image')) {
				return (
					<SwiperSlide key={index} className={styles['slide']}>
						<img className={styles['slide__image']} src={url} alt={url} />
					</SwiperSlide>
				);
			} else {
				return (
					<SwiperSlide key={index} className={styles['slide']}>
						<a href={url} className={styles['slide__file']}>
							<IconOfFile />
							<span className={styles['slide__file__url']}>{url}</span>
						</a>
					</SwiperSlide>
				);
			}
		});

	return (
		<Modal closeModal={closeModal}>
			<div className={styles['container']}>
				<Swiper
					initialSlide={activeUrlIndex}
					className={styles['swiper']}
					modules={[Navigation, Pagination, Scrollbar, A11y]}
					spaceBetween={50}
					slidesPerView={1}
					navigation
					scrollbar={{ draggable: true }}
					style={{
						'--swiper-navigation-color': 'var(--color-4)',
						'--swiper-navigation-size': 25,
					}}
				>
					{slides()}
				</Swiper>

				<button className={styles['close_modal']} onClick={closeModal}>
					<div className={styles['close_modal__icon']} />
				</button>
			</div>
		</Modal>
	);
};

export default MobileModalOfFilesView;
