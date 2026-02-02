import {
	useEffect,
	useRef,
	Children,
	isValidElement,
	type CSSProperties,
	type ReactNode,
	useState
} from 'react';
import styles from './Splitting.module.scss';

interface SplittingProps {
	className?: string;
	animation?: 'slide-vertical' | 'slide-horizontal';
	trigger?: 'hover' | 'view';
	alternate?: boolean;
	children: ReactNode;
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
	className: classNameProp,
	animation,
	trigger = 'hover',
	alternate = false,
	children,
	interval = 3000
}: SplittingProps) {
	const texts = extractTexts(children);
	const [isActive, setIsActive] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const ref = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		let timerId: ReturnType<typeof setInterval> | null = null;
		if (trigger == 'hover' && !alternate) {
			isHover ? setIsActive(true) : setIsActive(false);
		} else if (trigger == 'hover' && alternate) {
			if (isHover) {
				if (!timerId) {
					setIsActive(prev => !prev);
					timerId = setInterval(() => {
						setIsActive(prev => !prev);
					}, interval);
				}
			} else {
				setIsActive(false);
				if (timerId) clearInterval(timerId);
			}
		}
		return () => {
			if (timerId) clearInterval(timerId);
		};
	}, [isHover]);

	useEffect(() => {
		if (!ref.current) return;
		const el = ref.current;

		if (trigger === 'view' && !alternate) {
			const observer = new IntersectionObserver(entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setIsActive(true);
					} else {
						setIsActive(false);
					}
				});
			});

			observer.observe(el);
			return () => observer.disconnect();
		} else if (trigger === 'view' && alternate) {
			let timerId: ReturnType<typeof setInterval> | null = null;

			const observer = new IntersectionObserver(entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						if (!timerId) {
							timerId = setInterval(() => {
								setIsActive(prev => !prev);
							}, interval);
						}
					} else {
						if (timerId) {
							clearInterval(timerId);
							timerId = null;
						}
						setIsActive(false);
					}
				});
			});

			observer.observe(el);
			return () => {
				observer.disconnect();
				if (timerId) clearInterval(timerId);
			};
		}
	}, [trigger, alternate, interval]);

	const primaryChars = toChars(texts[0] || '');
	const altChars = texts.length > 1 ? toChars(texts[1] || '') : [];
	const className = [
		styles.splitting,
		animation && styles[animation],
		alternate && styles.alternating,
		isActive && styles.active,
		classNameProp
	]
		.filter(Boolean)
		.join(' ');

	return (
		<span
			className={className}
			ref={ref}
			onMouseEnter={() => trigger == 'hover' && setIsHover(true)}
			onMouseLeave={() => trigger == 'hover' && setIsHover(false)}>
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
			{altChars && (
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
