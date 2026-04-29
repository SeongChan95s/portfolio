import type { VelogPost } from '@/types/velog';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';
import 'swiper/swiper-bundle.css';
import { useMatchMediaStore } from '@/stores/useMatchMediaStore';
import { BlogCard } from './BlogCard';
import styles from './BlogCardList.module.scss';
import { Skeleton } from '../common/Skeleton';

interface BlogCardListProps {
	posts: VelogPost[];
	hasMore: boolean;
	observeRef: React.RefObject<HTMLDivElement | null>;
	isFetching: boolean;
}

export function BlogCardList({
	posts,
	hasMore,
	isFetching,
	observeRef
}: BlogCardListProps) {
	const swiperOptions: SwiperOptions = {
		slidesPerView: 'auto',
		spaceBetween: 0,
		enabled:
			useMatchMediaStore.getState().media == 'sm'
				? false
				: useMatchMediaStore.getState().media == 'md'
				? false
				: true
	};

	return (
		<div className={styles.blogCardList}>
			<Swiper className={styles.swiper} {...swiperOptions}>
				{posts.map(post => (
					<SwiperSlide className={styles.slide} key={post.id}>
						<BlogCard post={post} />
					</SwiperSlide>
				))}

				{isFetching && (
					<>
						<SwiperSlide className={styles.slide}>
							<BlogCardSkeleton />
						</SwiperSlide>
						<SwiperSlide className={styles.slide}>
							<BlogCardSkeleton />
						</SwiperSlide>
						<SwiperSlide className={styles.slide}>
							<BlogCardSkeleton />
						</SwiperSlide>
						<SwiperSlide className={styles.slide}>
							<BlogCardSkeleton />
						</SwiperSlide>
					</>
				)}
				{hasMore && (
					<SwiperSlide className={styles.slide}>
						<BlogCardSkeleton ref={observeRef} />
					</SwiperSlide>
				)}
			</Swiper>
		</div>
	);
}

function BlogCardSkeleton({ ref }: { ref?: React.RefObject<HTMLDivElement | null> }) {
	return (
		<div ref={ref}>
			<Skeleton className={styles.skeletonThumbnail} variant="rect" />
			<Skeleton className={styles.skeletonTitle} fontSize="17" />
			<Skeleton className={styles.skeletonBody} fontSize="11" count={2} />
		</div>
	);
}
