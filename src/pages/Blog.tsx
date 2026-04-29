import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { BlogCardList } from '@/components/blog/BlogCardList';
import { fetchVelogPostsFromRSS } from '@/services/velog';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import './../assets/styles/pages/blog.scss';
import type { VelogPost } from '@/types/velog';

const VELOG_USERNAME = 'chanseong';

export default function BlogPage() {
	const { data, isFetching, error } = useQuery({
		queryKey: ['post', 'velog', VELOG_USERNAME],
		queryFn: () => fetchVelogPostsFromRSS(VELOG_USERNAME),
		staleTime: 24 * 60 * 60 * 1000,
		gcTime: 24 * 60 * 60 * 1000
	});

	const { displayedItems, hasMore, targetRef } = useInfiniteScroll<
		VelogPost,
		HTMLDivElement
	>({
		items: data || [],
		initialCount: 4,
		loadMoreCount: 4,
		trigger: 'observe'
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
					{error && (
						<div className="contents-error">
							<p>블로그 글을 불러오는데 실패했습니다.</p>
							<pre>{error instanceof Error ? error.message : '알 수 없는 오류'}</pre>
						</div>
					)}

					<BlogCardList
						posts={displayedItems}
						hasMore={hasMore}
						observeRef={targetRef}
						isFetching={isFetching}
					/>

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
