import type { VelogPost } from '@/types/velog';
import styles from './BlogCard.module.scss';

interface BlogCardProps {
	post: VelogPost;
}

export function BlogCard({ post }: BlogCardProps) {
	const postUrl = `https://velog.io/@${post.user.username}/${post.url_slug}`;
	const displayDate = new Date(post.released_at).toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	return (
		<a href={postUrl} target="_blank" rel="noopener noreferrer" className={styles.card}>
			<div className={styles.thumbnail}>
				{post.thumbnail ? (
					<img src={post.thumbnail} alt={post.title} />
				) : (
					<div className={styles.placeholder}>
						<span>{post.title.charAt(0)}</span>
					</div>
				)}
			</div>
			<div className={styles.content}>
				<h3 className={styles.title}>{post.title}</h3>
				<p className={styles.description}>
					{post.short_description || '설명이 없습니다.'}
				</p>
				<time className={styles.date}>{displayDate}</time>
			</div>
		</a>
	);
}
