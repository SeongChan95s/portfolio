import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface CursorFollowerProps {
	size?: number;
	dotSize?: number;
	stiffness?: number;
	damping?: number;
	mass?: number;
}

/**
 * 커서를 따라다니는 원
 */
export default function CursorFollower({
	size = 34,
	dotSize = 10,
	stiffness = 150,
	damping = 20,
	mass = 0.1
}: CursorFollowerProps) {
	const [isVisible, setIsVisible] = useState(false);
	const [isClicked, setIsClicked] = useState(false);
	const [isHovering, setIsHovering] = useState(false);

	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);

	const springConfig = { stiffness, damping, mass };
	const cursorXSpring = useSpring(cursorX, springConfig);
	const cursorYSpring = useSpring(cursorY, springConfig);

	useEffect(() => {
		// 기본 커서 숨기기
		document.body.style.cursor = 'none';
		document.documentElement.style.cursor = 'none';

		const handleMouseMove = (e: MouseEvent) => {
			cursorX.set(e.clientX);
			cursorY.set(e.clientY);

			if (!isVisible) {
				setIsVisible(true);
			}

			// 클릭 가능한 요소 위에 있는지 확인
			const target = e.target as HTMLElement;
			const isClickable =
				target.tagName === 'A' ||
				target.tagName === 'BUTTON' ||
				target.closest('a') !== null ||
				target.closest('button') !== null ||
				target.onclick !== null ||
				window.getComputedStyle(target).cursor === 'pointer';

			setIsHovering(isClickable);
		};

		const handleMouseLeave = () => {
			setIsVisible(false);
		};

		const handleMouseEnter = () => {
			setIsVisible(true);
		};

		const handleMouseDown = () => {
			setIsClicked(true);
		};

		const handleMouseUp = () => {
			setIsClicked(false);
		};

		window.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseleave', handleMouseLeave);
		document.addEventListener('mouseenter', handleMouseEnter);
		document.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('mouseup', handleMouseUp);

		return () => {
			// 컴포넌트 언마운트 시 기본 커서 복원
			document.body.style.cursor = '';
			document.documentElement.style.cursor = '';
			window.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseleave', handleMouseLeave);
			document.removeEventListener('mouseenter', handleMouseEnter);
			document.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [cursorX, cursorY, size, isVisible]);

	return (
		<>
			{/* 테두리 원 */}
			<motion.div
				className="cursor-follower pointer-events-none fixed z-9999 rounded-full border border-white bg-transparent mix-blend-difference"
				style={{
					x: cursorXSpring,
					y: cursorYSpring,
					width: size,
					height: size,
					opacity: isVisible ? 1 : 0,
					translateX: '-50%',
					translateY: '-50%'
				}}
				initial={{ scale: 0 }}
				animate={{ scale: isVisible ? (isHovering ? 2 : 1) : 0 }}
				transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
			/>
			{/* 중앙 점 */}
			<motion.div
				className="cursor-dot pointer-events-none fixed z-9999 rounded-full bg-white mix-blend-difference"
				style={{
					x: cursorX,
					y: cursorY,
					width: dotSize,
					height: dotSize,
					opacity: isVisible ? 1 : 0,
					translateX: '-50%',
					translateY: '-50%'
				}}
				initial={{ scale: 0 }}
				animate={{ scale: isVisible ? (isClicked ? 2 : 1) : 0 }}
				transition={{ duration: isClicked ? 0.1 : 0.2 }}
			/>
		</>
	);
}
