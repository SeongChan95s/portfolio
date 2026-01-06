import { useState, useRef, useEffect, useCallback } from 'react';
import { useAnimation, type LegacyAnimationControls } from 'motion/react';

interface UseOnePageScrollProps {
	sectionCount: number;
	onSectionChange?: (index: number) => void;
	animationDuration?: number;
}

interface UseOnePageScrollReturn {
	activeSection: number;
	scrollToSection: (index: number) => void;
	controls: LegacyAnimationControls;
	isScrolling: boolean;
}

/**
 * 원 페이지 스크롤 환경을 만드는 훅
 */
export function useOnePageScroll({
	sectionCount,
	onSectionChange,
	animationDuration = 0.7
}: UseOnePageScrollProps): UseOnePageScrollReturn {
	const [activeSection, setActiveSection] = useState(0);
	const [isScrolling, setIsScrolling] = useState(false);
	const controls = useAnimation();
	const touchStartY = useRef<number>(0);

	const scrollToSection = useCallback(
		(index: number) => {
			if (index < 0 || index >= sectionCount) return;
			setActiveSection(index);
			onSectionChange?.(index);
		},
		[sectionCount, onSectionChange]
	);

	// 섹션 이동
	useEffect(() => {
		setIsScrolling(true);
		controls
			.start({
				y: -activeSection * 100 + '%',
				transition: { duration: animationDuration, ease: [0.6, 0.05, -0.01, 0.9] }
			})
			.then(() => {
				setIsScrolling(false);
			});
	}, [activeSection, controls, animationDuration]);

	const handleWheel = useCallback(
		(e: WheelEvent) => {
			if (isScrolling) return;

			if (e.deltaY > 50) {
				scrollToSection(activeSection + 1);
			} else if (e.deltaY < -50) {
				scrollToSection(activeSection - 1);
			}
		},
		[activeSection, isScrolling, scrollToSection]
	);

	const handleTouchStart = (e: TouchEvent) => {
		touchStartY.current = e.touches[0].clientY;
	};

	const handleTouchEnd = useCallback(
		(e: TouchEvent) => {
			if (isScrolling) return;
			const touchEndY = e.changedTouches[0].clientY;
			const deltaY = touchStartY.current - touchEndY;

			if (Math.abs(deltaY) > 50) {
				if (deltaY > 0) {
					scrollToSection(activeSection + 1);
				} else {
					scrollToSection(activeSection - 1);
				}
			}
		},
		[activeSection, isScrolling, scrollToSection]
	);

	useEffect(() => {
		const handleWheelEvent = (e: WheelEvent) => handleWheel(e);
		const handleTouchStartEvent = (e: TouchEvent) => handleTouchStart(e);
		const handleTouchEndEvent = (e: TouchEvent) => handleTouchEnd(e);

		window.addEventListener('wheel', handleWheelEvent, { passive: false });
		window.addEventListener('touchstart', handleTouchStartEvent, { passive: false });
		window.addEventListener('touchend', handleTouchEndEvent, { passive: false });

		return () => {
			window.removeEventListener('wheel', handleWheelEvent);
			window.removeEventListener('touchstart', handleTouchStartEvent);
			window.removeEventListener('touchend', handleTouchEndEvent);
		};
	}, [handleWheel, handleTouchEnd]);

	// 키보드 조작
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (isScrolling) return;
			if (e.key === 'ArrowDown' || e.key === 'PageDown') {
				e.preventDefault();
				scrollToSection(activeSection + 1);
			} else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
				e.preventDefault();
				scrollToSection(activeSection - 1);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [activeSection, isScrolling, scrollToSection]);

	return {
		activeSection,
		scrollToSection,
		controls,
		isScrolling
	};
}
