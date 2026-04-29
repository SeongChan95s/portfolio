import { Helmet } from 'react-helmet-async';
import { Image } from '../components/common/Image';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';

export default function AboutPage() {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					toggleActions: 'restart pause reverse reset',
					trigger: '.timeline01',
					start: 'bottom bottom',
					pin: true,
					end: 'bottom top',
					scrub: true,
					markers: true
				}
			});

			tl.from('.visual-wrap', {
				clipPath: 'inset(24% 46% 24% 46%)'
			}).from(
				'.visual',
				{
					height: '60%'
				},
				'<'
			);
		},
		{ scope: containerRef }
	);

	return (
		<>
			<Helmet>
				<title>SeongChan | About</title>
			</Helmet>
			<div className="about-page h-[400vh]" ref={containerRef}>
				<section className="intro-section">
					<div className="inner pt-[12vh]">
						<h2 className="text-[clamp(32px,5.99vw,62px)] font-bold tracking-tight">
							About
						</h2>
					</div>

					<div className="timeline01 flex justify-center items-center w-screen h-svh">
						<div className="visual-wrap w-full h-svh mr-auto ml-auto">
							<Image
								src="https://firebasestorage.googleapis.com/v0/b/portfolio-bac70.firebasestorage.app/o/Home%2Fintro_bg.jpg?alt=media&token=e1aeb562-0610-493c-8cd2-2555095e7558"
								alt=""
								className="visual w-full h-full mr-auto ml-auto object-cover"
							/>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
