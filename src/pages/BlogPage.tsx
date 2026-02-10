import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { BlogCard } from '@/components/blog/BlogCard';
import { Spinner } from '@/components/common/Spinner';
import { fetchVelogPostsFromRSS } from '@/services/velog';
import styles from './BlogPage.module.scss';

const VELOG_USERNAME = 'chanseong';

export default function BlogPage() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['velogPosts', VELOG_USERNAME],
		queryFn: () => fetchVelogPostsFromRSS(VELOG_USERNAME)
	});

	return (
		<>
			<Helmet>
				<title>SeongChan | Blog</title>
			</Helmet>
			<div className={styles.page}>
				<div className={styles.inner}>
					<h1 className={styles.heading}>Blog</h1>
					<p className={styles.description}>
						기술 블로그에서 작성한 글들을 확인하실 수 있습니다.
					</p>

					{isLoading && (
						<div className={styles.loading}>
							<Spinner />
						</div>
					)}

					{error && (
						<div className={styles.error}>
							<p>블로그 글을 불러오는데 실패했습니다.</p>
							<pre>{error instanceof Error ? error.message : '알 수 없는 오류'}</pre>
						</div>
					)}

					{data && data.length > 0 && (
						<div className={styles.grid}>
							{data.map(post => (
								<BlogCard key={post.id} post={post} />
							))}
						</div>
					)}

					{data && data.length === 0 && (
						<div className={styles.empty}>
							<p>아직 작성된 글이 없습니다.</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
