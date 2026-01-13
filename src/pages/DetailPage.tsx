import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import * as motion from 'motion/react-client';
import { Image } from '../components/common/Image';
import { initialProjects } from '../constants/project';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export default function DetailPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const project = initialProjects.find(p => p.id === Number(id));
	const containerRef = useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			const visualTl = gsap.timeline({
				scrollTrigger: {
					toggleActions: 'start pause reverse reset',
					trigger: '.visual-timeline',
					start: 'top top',
					end: 'bottom top',
					pin: true,
					scrub: true,
					markers: true
				}
			});

			// visualTl.from('.visual', {
			// 	width: '10%',
			// 	height: '50%'
			// });
		},
		{ scope: containerRef }
	);

	if (!project) {
		return (
			<>
				<Helmet>
					<title>프로젝트를 찾을 수 없습니다</title>
				</Helmet>
				<div className="inner pb-[12vh]">
					<h2>프로젝트를 찾을 수 없습니다.</h2>
					<button onClick={() => navigate('/project')}>프로젝트 목록으로 돌아가기</button>
				</div>
			</>
		);
	}

	return (
		<>
			<Helmet>
				<title>SeongChan | {project.name}</title>
			</Helmet>
			<main className="h-[300vh] pb-[12vh]" ref={containerRef}>
				<div className="visual-timeline">
					<motion.div
						className="visual w-full h-screen overflow-hidden"
						layoutId={`project-image-${project.id}`}>
						<Image
							className="w-screen h-svh object-cover"
							src={project.image}
							alt={project.name}
						/>
					</motion.div>
				</div>

				<div className="mt-[4vw]">
					<h2 className="text-[clamp(28px,5vw,64px)] font-bold">{project.name}</h2>
					<p className="flex flex-wrap gap-x-8 mt-[1vw] text-[clamp(12px,1.5vw,16px)] font-medium text-gray-500">
						{project.category.map(el => (
							<span key={el}>{el}</span>
						))}
					</p>
					<p className="mt-[2vw] text-[clamp(14px,2vw,20px)] text-gray-900">
						{project.desc}
					</p>
				</div>
			</main>
		</>
	);
}
