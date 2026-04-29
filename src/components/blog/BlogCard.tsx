import type { VelogPost } from '@/types/velog';
import styles from './BlogCard.module.scss';

interface BlogCardProps {
	post: VelogPost;
}

export function BlogCard({ post }: BlogCardProps) {
	return (
		<a
			href={`https://velog.io/@${post.user.username}/${post.url_slug}`}
			target="_blank"
			rel="noopener noreferrer"
			className={styles.card}>
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
						{new Date(post.released_at).toLocaleString().split('.').slice(0, 3).join('.')}
					</time>
				</div>
			</div>
		</a>
	);
}
