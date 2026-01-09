import { useEffect, useRef, useState } from 'react';
import useViewportDimensions from '../../../hooks/useViewportDimensions';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { type Variants } from 'motion';
import { NavLink } from 'react-router-dom';
import { useNavStore } from '../../../stores/useNavStore';

const navVariants: Variants = {
	open: {
		opacity: 1,
		transition: { delayChildren: 0.5, staggerChildren: 0.1 }
	},
	closed: {
		opacity: 0,
		transition: { duration: 0.3 }
	},
	navigating: {
		opacity: 0,
		transition: { duration: 0.4 }
	},
	reset: {
		opacity: 0,
		transition: { duration: 0 }
	}
};

const itemVariants: Variants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 }
		}
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 }
		}
	},
	navigating: {
		opacity: 0
	},
	reset: {
		opacity: 0,
		y: 50
	}
};

const backgroundVariants: Variants = {
	open: (height = 1000) => ({
		clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
		maskImage: 'radial-gradient(circle at 50% 100%, transparent 0%, black 0%)',
		transition: {
			type: 'spring',
			stiffness: 20,
			restDelta: 2
		}
	}),
	closed: {
		clipPath: 'circle(0px at 100vw 0px)',
		maskImage: 'radial-gradient(circle at 50% 100%, transparent 0%, black 0%)',
		transition: {
			delay: 0.2,
			type: 'spring',
			stiffness: 400,
			damping: 40
		}
	},
	navigating: {
		clipPath: `circle(${8000}px at 40px 40px)`,
		maskImage: 'radial-gradient(circle at 50% 100%, transparent 200%, black 200%)',
		transition: {
			duration: 1,
			ease: 'easeInOut'
		}
	},
	reset: {
		clipPath: 'circle(0px at 100vw 0px)',
		maskImage: 'radial-gradient(circle at 50% 100%, transparent 200%, black 200%)',
		transition: {
			duration: 0
		}
	}
};

export default function ToggleNav() {
	const { isNavOpen, setNavOpen } = useNavStore();
	const [isNavigating, setIsNavigating] = useState(false);
	const [isResetting, setIsResetting] = useState(false);
	const navBarRef = useRef<HTMLDivElement>(null);
	const { height } = useViewportDimensions();

	useEffect(() => {
		if (isNavOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isNavOpen]);

	const handleNavigate = () => {
		setIsNavigating(true);
		setTimeout(() => {
			setNavOpen(false);
			setIsNavigating(false);
			setIsResetting(true);
			setTimeout(() => setIsResetting(false), 300);
		}, 800);
	};

	return (
		<motion.nav
			className="fixed inset-0 z-99 select-none pointer-events-none"
			initial={false}
			animate={
				isNavigating
					? 'navigating'
					: isResetting
					? 'reset'
					: isNavOpen
					? 'open'
					: 'closed'
			}
			custom={height}
			ref={navBarRef}>
			<motion.div
				className="background absolute inset-y-0 left-0 w-full bg-gray-950 -z-1"
				variants={backgroundVariants}
			/>
			<AnimatePresence>
				{isNavOpen && (
					<ToggleContainer
						key="toggle-container"
						onNavigate={handleNavigate}
						isNavigating={isNavigating}
						isResetting={isResetting}
					/>
				)}
			</AnimatePresence>

			<ToggleButton toggle={() => setNavOpen(!isNavOpen)} />
		</motion.nav>
	);
}

function ToggleContainer({
	onNavigate,
	isNavigating,
	isResetting
}: {
	onNavigate: () => void;
	isNavigating: boolean;
	isResetting: boolean;
}) {
	const handleClick = () => {
		onNavigate();
	};

	const currentState = isNavigating ? 'navigating' : isResetting ? 'reset' : 'open';

	return (
		<motion.div
			className="toggle-nav-container relative w-full h-full pointer-events-auto"
			initial="closed"
			animate={currentState}
			exit="closed"
			variants={navVariants}>
			<motion.div className="flex flex-col justify-center items-start h-full pr-[10vw] pl-[10vw] gap-[clamp(12px,0.8vw,24px)]">
				<motion.div variants={itemVariants}>
					<NavLink
						to="/"
						className="block text-[clamp(32px,10vw,72px)] font-bold leading-none text-white hover:text-black hover:[-webkit-text-stroke-width:1px] hover:[-webkit-text-stroke-color:white] stroke- transition-colors [.active]:text-black! [.active]:[-webkit-text-stroke-width:1px] [.active]:[-webkit-text-stroke-color:white]"
						onClick={handleClick}>
						HOME
					</NavLink>
				</motion.div>
				<motion.div variants={itemVariants}>
					<NavLink
						to="/about"
						className="block text-[clamp(32px,10vw,72px)] font-bold leading-none text-white hover:text-black hover:[-webkit-text-stroke-width:1px] hover:[-webkit-text-stroke-color:white] stroke- transition-colors [.active]:text-black! [.active]:[-webkit-text-stroke-width:1px] [.active]:[-webkit-text-stroke-color:white]"
						onClick={handleClick}>
						ABOUT
					</NavLink>
				</motion.div>
				<motion.div variants={itemVariants}>
					<NavLink
						to="/project"
						className="block text-[clamp(32px,10vw,72px)] font-bold leading-none text-white hover:text-black hover:[-webkit-text-stroke-width:1px] hover:[-webkit-text-stroke-color:white] stroke- transition-colors [.active]:text-black! [.active]:[-webkit-text-stroke-width:1px] [.active]:[-webkit-text-stroke-color:white]"
						onClick={handleClick}>
						PROJECT
					</NavLink>
				</motion.div>
				<motion.div variants={itemVariants}>
					<NavLink
						to="/blog"
						className="block text-[clamp(32px,10vw,72px)] font-bold leading-none text-white hover:text-black hover:[-webkit-text-stroke-width:1px] hover:[-webkit-text-stroke-color:white] stroke- transition-colors [.active]:text-black! [.active]:[-webkit-text-stroke-width:1px] [.active]:[-webkit-text-stroke-color:white]"
						onClick={handleClick}>
						BLOG
					</NavLink>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}

function ToggleButton({ toggle }: { toggle: () => void }) {
	return (
		<button
			className="toggle-button cursor-pointer absolute top-9 right-9 w-52 h-52 flex justify-center items-center rounded-full bg-transparent pointer-events-auto backdrop-blur-[20px]"
			onClick={toggle}>
			<svg width="1.4375rem" height="1.4375rem" viewBox="0 0 23 23">
				<Path
					variants={{
						closed: { d: 'M 2 2.5 L 20 2.5' },
						open: { d: 'M 3 16.5 L 17 2.5' }
					}}
				/>
				<Path
					d="M 2 9.423 L 20 9.423"
					variants={{
						closed: { opacity: 1 },
						open: { opacity: 0 }
					}}
					transition={{ duration: 0.1 }}
				/>
				<Path
					variants={{
						closed: { d: 'M 2 16.346 L 20 16.346' },
						open: { d: 'M 3 2.5 L 17 16.346' }
					}}
				/>
			</svg>
		</button>
	);
}

interface PathProps {
	d?: string;
	variants: Variants;
	transition?: { duration: number };
}

function Path(props: PathProps) {
	return (
		<motion.path
			className="stroke-white"
			fill="transparent"
			strokeWidth="3"
			stroke="black"
			// stroke="hsl(0, 0%, 18%)"
			strokeLinecap="round"
			{...props}
		/>
	);
}
