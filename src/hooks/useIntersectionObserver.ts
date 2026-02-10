import { useEffect, useRef } from 'react';

interface UseIntersectionObserverOptions {
	threshold?: number;
	root?: Element | null;
	rootMargin?: string;
}

/**
 * 대상이 브라우저에 보여지면 콜백 함수를 실행하는 훅
 */
export default function useIntersectionObserver<T extends HTMLElement>(
	callback: (entry: IntersectionObserverEntry) => void,
	options: UseIntersectionObserverOptions = {}
) {
	const targetRef = useRef<T | null>(null);
	const { threshold = 0, root = null, rootMargin = '0px' } = options;

	useEffect(() => {
		const target = targetRef.current;
		if (!target) return;

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						callback(entry);
					}
				});
			},
			{ threshold, root, rootMargin }
		);

		observer.observe(target);

		return () => {
			observer.disconnect();
		};
	}, [callback, threshold, root, rootMargin]);

	return targetRef;
}
