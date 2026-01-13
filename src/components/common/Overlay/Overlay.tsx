import { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Overlay.module.scss';
import { useLenis } from 'lenis/react';

interface OverlayProps {
	visible: boolean;
	scroll?: boolean;
	className?: string;
	onClick?: (value: React.MouseEvent) => void;
}

export default function Overlay({
	visible = false,
	scroll = false,
	className = '',
	onClick
}: OverlayProps) {
	const targetRef = useRef(null);
	const lenis = useLenis();

	useEffect(() => {
		if (visible && !scroll) {
			lenis?.stop();
		} else {
			lenis?.start();
		}
	}, [visible]);

	return (
		<CSSTransition
			nodeRef={targetRef}
			in={visible}
			classNames={styles.overlay}
			timeout={{ enter: 400, exit: 400 }}
			mountOnEnter
			unmountOnExit>
			<div
				className={`${styles.overlay} overlay ${className}`}
				ref={targetRef}
				onClick={onClick}></div>
		</CSSTransition>
	);
}
