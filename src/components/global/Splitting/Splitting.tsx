import {
	useEffect,
	useRef,
	Children,
	isValidElement,
	type CSSProperties,
	type ReactNode
} from 'react';
import styles from './Splitting.module.scss';

interface SplittingProps {
	className?: string;
	animation?: 'slide-vertical' | 'slide-horizontal';
	trigger?: 'hover' | 'view';
	children: ReactNode;
	/** 교대 애니메이션 간격 (ms) */
	interval?: number;
}

function extractTexts(children: ReactNode): string[] {
	const texts: string[] = [];
	Children.forEach(children, child => {
		if (typeof child === 'string') {
			const trimmed = child.trim();
			if (trimmed) texts.push(trimmed);
		} else if (isValidElement(child)) {
			const props = child.props as { children?: ReactNode };
			if (typeof props.children === 'string') {
				texts.push(props.children);
			}
		}
	});
	return texts;
}

function toChars(text: string) {
	return text.split('').map(c => (c === ' ' ? '\u00a0' : c));
}

export default function Splitting({
	className,
	animation,
	trigger = 'view',
	children,
	interval = 3000
}: SplittingProps) {
	const texts = extractTexts(children);
	const isAlternating = texts.length > 1;

	const classes = [
		styles.splitting,
		animation && styles[animation],
		isAlternating && styles.alternating,
		className
	]
		.filter(Boolean)
		.join(' ');

	const ref = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		const el = ref.current;

		if (isAlternating) {
			let timerId: ReturnType<typeof setInterval> | null = null;

			const observer = new IntersectionObserver(entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						if (!timerId) {
							timerId = setInterval(() => {
								el.classList.toggle('active');
							}, interval);
						}
					} else {
						if (timerId) {
							clearInterval(timerId);
							timerId = null;
						}
						el.classList.remove('active');
					}
				});
			});

			observer.observe(el);
			return () => {
				observer.disconnect();
				if (timerId) clearInterval(timerId);
			};
		}

		if (trigger === 'view') {
			const observer = new IntersectionObserver(entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						el.classList.add('active');
					} else {
						el.classList.remove('active');
					}
				});
			});

			observer.observe(el);
			return () => observer.disconnect();
		}
	}, [trigger, isAlternating, interval]);

	const primaryChars = toChars(texts[0] || '');
	const altChars = isAlternating ? toChars(texts[1] || '') : [];

	return (
		<span className={classes} ref={ref}>
			<span className={styles.textPrimary}>
				{primaryChars.map((char, i) => (
					<span
						className={styles.charWrap}
						key={i}
						style={{ '--char-index': i + 1 } as CSSProperties}>
						<span className={styles.char}>{char}</span>
					</span>
				))}
			</span>
			{isAlternating && (
				<span className={styles.textAlt}>
					{altChars.map((char, i) => (
						<span
							className={styles.charWrap}
							key={i}
							style={{ '--char-index': i + 1 } as CSSProperties}>
							<span className={styles.char}>{char}</span>
						</span>
					))}
				</span>
			)}
		</span>
	);
}
