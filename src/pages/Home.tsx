import { motion } from 'motion/react';
import OnePageScroll from '../features/scroll/OnePageScroll';
import { Helmet } from 'react-helmet-async';
import { useNavStore } from '../stores/useNavStore';
import { ParticleNetwork } from '../components/global/ParticleNetwork';
import { Splitting } from '../components/global/Splitting';
import './../../src/assets/styles/pages/home.scss';

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

						<div className="intro-content">
							<div className="intro-bracket-wrap">
								<span className="intro-bracket font-bebasNeue">{'{'}</span>
								<h1 className="logo -mb-18">
									<Splitting
										className="intro-title font-bebasNeue"
										animation="slide-vertical"
										trigger="view"
										alternate>
										<span>SEONG CHAN</span>
										<span>SMART CODE</span>
									</Splitting>
								</h1>
								<span className="intro-bracket font-bebasNeue">{'}'}</span>
							</div>

							<div className="intro-line" />

							<p className="intro-subtitle font-heebo">Frontend Developer Portfolio</p>

							<div className="intro-terminal">
								<span className="intro-terminal-prompt">{'>'}_</span>
								<span className="intro-terminal-text font-heebo">
									Building UIUX with smart code
								</span>
								<span className="intro-terminal-cursor" />
							</div>

							<div className="intro-tags">
								{['체계적인', '능동적인', '책임을 다하는'].map(tag => (
									<span key={tag} className="intro-tag">
										{tag}
									</span>
								))}
							</div>
						</div>

						<div className="intro-scroll-indicator">
							<span className="intro-scroll-indicator-text font-heebo">SCROLL</span>
							<span className="intro-scroll-indicator-line" />
						</div>
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
