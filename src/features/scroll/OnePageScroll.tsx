import React, { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { useOnePageScroll } from './useOnePageScroll';

interface OnePageScrollProps {
	children: ReactNode;
	onSectionChange?: (index: number) => void;
	animationDuration?: number;
	disabled?: boolean;
}

/**
 * 원 페이지 스크롤 구성요소
 * @function useOnePageScroll 과 함께 사용
 */
function OnePageScroll({
	children,
	onSectionChange,
	animationDuration = 0.7,
	disabled = false
}: OnePageScrollProps) {
	const sections = React.Children.toArray(children);

	const { activeSection, scrollToSection, controls } = useOnePageScroll({
		sectionCount: sections.length,
		onSectionChange,
		animationDuration,
		disabled
	});

	const switchBulletClassName = (index: number, activeIndex: number) => {
		switch (index) {
			case activeIndex - 1:
			case activeIndex + 1:
				return 'peer w-8 h-8 bg-white/30 hover:bg-white/80';
			case activeIndex - 2:
			case activeIndex + 2:
				return 'w-5 h-5 ml-1.5 mr-1.5 bg-white/30';
			case activeIndex:
				return 'active-bullet w-8 h-32 bg-white';
			default:
				return '';
		}
	};

	return (
		<>
			<div className="one-page-scroll relative w-full h-svh overflow-hidden  text-white">
				<motion.div
					className="one-page-scroll-section-wrapper w-full h-full"
					animate={controls}>
					{sections.map((child, index) => (
						<div
							key={index}
							className="section h-screen w-full shrink-0 relative overflow-hidden">
							{child}
						</div>
					))}
				</motion.div>
			</div>
			<div className="one-page-scroll-nav fixed right-16 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-6 rounded-full transition-transform duration-250 hover:scale-120 z-(--z-nav-bar)">
				{sections.map((_, index) => (
					<button
						key={index}
						onClick={() => scrollToSection(index)}
						className={`rounded-full transition-all duration-300 backdrop-blur-sm ${switchBulletClassName(
							index,
							activeSection
						)}`}
					/>
				))}
			</div>
		</>
	);
}

export default OnePageScroll;
