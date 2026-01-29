import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import styles from './Marquee.module.scss';

interface MarqueeProps {
	className?: string;
	reverseDirection?: boolean;
	speed?: number;
	children: React.ReactNode;
}

export default function Marquee({
	className,
	reverseDirection = false,
	speed = 10000,
	children
}: MarqueeProps) {
	const swiperOptions: SwiperOptions = {
		spaceBetween: 0,
		slidesPerView: 'auto',
		loop: true,
		freeMode: {
			enabled: true,
			momentum: false
		},
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
			reverseDirection
		},
		speed,
		allowTouchMove: false,
		modules: [Autoplay, FreeMode]
	};

	return (
		<div className={`${styles.marquee} ${className}`}>
			<Swiper className={`${styles.swiper}`} {...swiperOptions}>
				<SwiperSlide>{children}</SwiperSlide>
				<SwiperSlide>{children}</SwiperSlide>
			</Swiper>
		</div>
	);
}
