import { motion, type Variants } from 'motion/react';
import OnePageScroll from '../features/scroll/OnePageScroll';
import { Helmet } from 'react-helmet-async';
import { useNavStore } from '../stores/useNavStore';
import { ParticleNetwork } from '../components/global/ParticleNetwork';
import { Splitting } from '../components/global/Splitting';
import './../../src/assets/styles/pages/home.scss';

/** intro 섹션 stagger 컨테이너 */
const introContainerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.3
		}
	}
};

/** intro 섹션 자식 요소 페이드업 */
const introItemVariants: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
	}
};

/** intro 섹션 수평 라인 확장 */
const lineVariants: Variants = {
	hidden: { scaleX: 0 },
	visible: {
		scaleX: 1,
		transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.8 }
	}
};

/** 스크롤 인디케이터 바운스 */
const scrollIndicatorVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { delay: 2, duration: 0.6 }
	},
	bounce: {
		y: [0, 8, 0],
		transition: {
			duration: 1.5,
			repeat: Infinity,
			ease: 'easeInOut'
		}
	}
};

export default function HomePage() {
	const isNavOpen = useNavStore(state => state.isNavOpen);

	return (
		<>
			<Helmet>
				<title>SeongChan | Home</title>
			</Helmet>
			<main className="home-page">
				<h2 className="hidden">홈 페이지</h2>
				<OnePageScroll disabled={isNavOpen}>
					<section className="intro-section">
						<ParticleNetwork
							particleCount={70}
							connectionDistance={140}
							color="238, 238, 238"
							maxSpeed={0.3}
						/>

						<motion.div
							variants={introContainerVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							className="intro-content">
							<motion.div variants={introItemVariants} className="intro-bracket-wrap">
								<span className="intro-bracket font-bebasNeue">{'{'}</span>
								<h1>
									<Splitting
										className="intro-title font-bebasNeue"
										animation="slide-vertical"
										trigger="hover"
										alternate>
										<span>SEONG CHAN</span>
										<span>SMART CODE</span>
									</Splitting>
								</h1>
								<span className="intro-bracket font-bebasNeue">{'}'}</span>
							</motion.div>

							<motion.div variants={lineVariants} className="intro-line" />

							<motion.p
								variants={introItemVariants}
								className="intro-subtitle font-heebo">
								Frontend Developer Portfolio
							</motion.p>

							<motion.div variants={introItemVariants} className="intro-terminal">
								<span className="intro-terminal-prompt">{'>'}_</span>
								<span className="intro-terminal-text font-heebo">
									Building UIUX with smart code &amp; creative motion
								</span>
								<span className="intro-terminal-cursor" />
							</motion.div>

							<motion.div variants={introItemVariants} className="intro-tags">
								{['체계적인', '능동적인', '책임을 다하는'].map(tag => (
									<span key={tag} className="intro-tag">
										{tag}
									</span>
								))}
							</motion.div>
						</motion.div>

						<motion.div
							variants={scrollIndicatorVariants}
							initial="hidden"
							animate={['visible', 'bounce']}
							className="intro-scroll-indicator">
							<span className="intro-scroll-indicator-text font-heebo">SCROLL</span>
							<span className="intro-scroll-indicator-line" />
						</motion.div>
					</section>

					<section className="animation-section">
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8 }}
							className="animation-content">
							<h2 className="animation-title">Powerful Animations</h2>
							<p className="animation-desc">
								Leverage the power of Motion.dev (Framer Motion) to create stunning
								entrance and exit animations for each section.
							</p>
						</motion.div>
						<div className="animation-cards">
							{[1, 2, 3].map(i => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 100 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 * i, duration: 0.6 }}
									className="animation-card">
									Card {i}
								</motion.div>
							))}
						</div>
					</section>

					<section className="responsive-section">
						<div className="responsive-inner">
							<motion.div
								initial={{ opacity: 0, x: -100 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
								className="responsive-text">
								<h2 className="responsive-title">Responsive Design</h2>
								<p className="responsive-desc">
									Works perfectly on desktop, tablet, and mobile devices with touch swipe
									support built-in.
								</p>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, x: 100 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
								className="responsive-visual">
								<div className="responsive-mockup">
									<div className="responsive-skeleton responsive-skeleton--w-3-4" />
									<div className="responsive-skeleton responsive-skeleton--w-1-2" />
									<div className="responsive-skeleton responsive-skeleton--w-full" />
									<div className="responsive-skeleton responsive-skeleton--lg responsive-skeleton--w-full" />
								</div>
							</motion.div>
						</div>
					</section>

					<section className="cta-section">
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ duration: 1 }}
							className="cta-content">
							<h2 className="cta-title">Next Level Experience</h2>
							<button className="cta-button">Get Started</button>
						</motion.div>
					</section>
				</OnePageScroll>
			</main>
		</>
	);
}
