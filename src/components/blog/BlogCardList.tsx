import type { VelogPost } from '@/types/velog';
import styles from './BlogCard.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';
import 'swiper/swiper-bundle.css';
import { useMatchMediaStore } from '@/stores/useMatchMediaStore';

interface BlogCardProps {
	posts: VelogPost[];
}

export function BlogCardList({ posts }: BlogCardProps) {
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
			{posts && posts.length > 0 && (
				<Swiper className={styles.swiper} {...swiperOptions}>
					{posts.map(post => (
						<SwiperSlide className={styles.card} key={post.id}>
							<a
								href={`https://velog.io/@${post.user.username}/${post.url_slug}`}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.cardLink}>
								<div className={styles.cardThumbnail}>
									{post.thumbnail ? (
										<img src={post.thumbnail} alt={post.title} />
									) : (
										<div className={styles.placeholder}>
											<span>{post.title.charAt(0)}</span>
										</div>
									)}
								</div>
								<div className={styles.cardContent}>
									<h5 className={styles.title}>{post.title}</h5>
									<p className={styles.description}>
										{post.short_description || '설명이 없습니다.'}
									</p>
									<div className={styles.bottom}>
										<time className={styles.date}>
											{new Date(post.released_at)
												.toLocaleString()
												.split('.')
												.slice(0, 3)
												.join('.')}
										</time>
									</div>
								</div>
							</a>
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</div>
	);
}
