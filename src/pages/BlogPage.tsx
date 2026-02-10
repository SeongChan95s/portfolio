import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { BlogCardList } from '@/components/blog/BlogCardList';
import { Spinner } from '@/components/common/Spinner';
import { fetchVelogPostsFromRSS } from '@/services/velog';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import './../assets/styles/pages/blog.scss';
import { Button } from '@/components/common/Button';
import type { VelogPost } from '@/types/velog';

const VELOG_USERNAME = 'chanseong';

export default function BlogPage() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['velogPosts', VELOG_USERNAME],
		queryFn: () => fetchVelogPostsFromRSS(VELOG_USERNAME),
		staleTime: 24 * 60 * 60 * 1000,
		gcTime: 24 * 60 * 60 * 1000
	});

	const {
		displayedItems,
		hasMore,
		targetRef,
		isLoading: isLoadingMore
	} = useInfiniteScroll<VelogPost, HTMLButtonElement>({
		items: data || [],
		initialCount: 4,
		loadMoreCount: 4,
		trigger: 'click'
	});

	return (
		<>
			<Helmet>
				<title>SeongChan | Blog</title>
			</Helmet>
			<div className="blog-page">
				<header className="blog-header">
					<h1 className="blog-header-title">Blog</h1>
				</header>

				<div className="blog-contents">
					{isLoading && (
						<div className="contents-loading">
							<Spinner />
						</div>
					)}

					{error && (
						<div className="contents-error">
							<p>블로그 글을 불러오는데 실패했습니다.</p>
							<pre>{error instanceof Error ? error.message : '알 수 없는 오류'}</pre>
						</div>
					)}

					{displayedItems && displayedItems.length > 0 && (
						<>
							<BlogCardList posts={displayedItems} />

							{hasMore && (
								<div className="button-wrap">
									<Button className="more-button" variant="outlined" fill ref={targetRef}>
										{isLoadingMore ? (
											<div>
												<Spinner />
											</div>
										) : (
											'More'
										)}
									</Button>
								</div>
							)}
						</>
					)}

					{data && data.length === 0 && (
						<div className="empty">
							<p>아직 작성된 글이 없습니다.</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
