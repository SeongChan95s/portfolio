import { motion } from 'motion/react';
import OnePageScroll from '../features/scroll/OnePageScroll';
import { Helmet } from 'react-helmet-async';

export default function HomePage() {
	return (
		<>
			<Helmet>
				<title>SeongChan | Home</title>
			</Helmet>
			<OnePageScroll>
				<section className="h-full bg-indigo-600 flex items-center justify-center pr-[10vw] pl-[10vw]">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="flex flex-col items-center justify-center text-center bg-indigo-600">
						<h3 className="text-6xl font-bold mb-4">SMART CODE</h3>
					</motion.div>
				</section>

				<section className="flex flex-col h-full items-center justify-center text-center bg-purple-700">
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8 }}
						className="text-center">
						<h2 className="text-5xl font-bold mb-6">Powerful Animations</h2>
						<p className="text-xl max-w-2xl mx-auto text-purple-100 mb-8">
							Leverage the power of Motion.dev (Framer Motion) to create stunning entrance
							and exit animations for each section.
						</p>
					</motion.div>
					<div className="flex gap-4">
						{[1, 2, 3].map(i => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 100 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 * i, duration: 0.6 }}
								className="bg-purple-500/30 p-8 rounded-2xl backdrop-blur-sm">
								Card {i}
							</motion.div>
						))}
					</div>
				</section>

				<section className="flex flex-col h-full items-center justify-center text-center bg-rose-600">
					<div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl px-6">
						<motion.div
							initial={{ opacity: 0, x: -100 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							className="flex-1">
							<h2 className="text-5xl font-bold mb-6">Responsive Design</h2>
							<p className="text-xl text-rose-100">
								Works perfectly on desktop, tablet, and mobile devices with touch swipe
								support built-in.
							</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: 100 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							className="flex-1">
							<div className="bg-white/10 p-12 rounded-3xl backdrop-blur-md border border-white/20">
								<div className="h-4 bg-white/20 rounded w-3/4 mb-4"></div>
								<div className="h-4 bg-white/20 rounded w-1/2 mb-4"></div>
								<div className="h-4 bg-white/20 rounded w-full mb-4"></div>
								<div className="h-32 bg-white/10 rounded w-full"></div>
							</div>
						</motion.div>
					</div>
				</section>

				<section className="flex items-center justify-center h-full bg-black">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 1 }}
						className="text-center">
						<h2 className="text-5xl font-bold mb-6 bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
							Next Level Experience
						</h2>
						<button className="mt-8 px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
							Get Started
						</button>
					</motion.div>
				</section>
			</OnePageScroll>
		</>
	);
}
