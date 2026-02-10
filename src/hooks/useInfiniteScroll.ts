import { useState, useCallback, useRef, useEffect } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

interface UseInfiniteScrollOptions<T> {
	items: T[];
	initialCount: number;
	loadMoreCount: number;
	trigger?: 'click' | 'observe';
}

interface UseInfiniteScrollReturn<T, E extends HTMLElement> {
	displayedItems: T[];
	hasMore: boolean;
	targetRef: React.RefObject<E | null>;
	isLoading: boolean;
	loadMore: () => void;
}

/**
 * 전체 아이템 중 초기에 일부만 보여주고, 트리거에 따라 추가 아이템을 로드하는 훅
 * @param trigger 'click': 클릭 시 로드, 'observe': 요소가 뷰포트에 보일 때 로드 (기본값: 'observe')
 * @return hasMore 전체 아이템에 비해 아이템이 더 남았는지 여부
 * @return targetRef 클릭 대상 또는 관찰 대상 (trigger='click'일 때는 클릭 가능한 요소에 할당)
 * @return loadMore 수동으로 더 로드하는 함수
 */
export default function useInfiniteScroll<T, E extends HTMLElement = HTMLDivElement>({
	items,
	initialCount,
	loadMoreCount,
	trigger = 'observe'
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T, E> {
	const [displayCount, setDisplayCount] = useState(initialCount);
	const [isLoading, setIsLoading] = useState(false);
	const clickTargetRef = useRef<E | null>(null);

	const hasMore = displayCount < items.length;

	const loadMore = useCallback(() => {
		if (!hasMore || isLoading) return;

		setIsLoading(true);

		setTimeout(() => {
			setDisplayCount(prev => Math.min(prev + loadMoreCount, items.length));
			setIsLoading(false);
		}, 300);
	}, [hasMore, isLoading, items.length, loadMoreCount]);

	const observeTargetRef = useIntersectionObserver<E>(
		() => {
			if (trigger === 'observe') {
				loadMore();
			}
		},
		{
			threshold: 0.1,
			rootMargin: '100px'
		}
	);

	useEffect(() => {
		if (trigger === 'click') {
			const element = clickTargetRef.current;
			if (!element) return;

			const handleClick = () => {
				loadMore();
			};

			element.addEventListener('click', handleClick);

			return () => {
				element.removeEventListener('click', handleClick);
			};
		}
	}, [trigger, loadMore]);

	const targetRef = trigger === 'click' ? clickTargetRef : observeTargetRef;

	return {
		displayedItems: items.slice(0, displayCount),
		hasMore,
		targetRef,
		isLoading,
		loadMore
	};
}
