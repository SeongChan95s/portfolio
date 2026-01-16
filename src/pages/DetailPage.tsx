import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import * as motion from 'motion/react-client';
import { projectsData } from '../constants/project';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { Divider } from '../components/common/Divider';
import { RollupButton } from '../components/global/Button';
import '@/assets/styles/pages/detail.scss';

export default function DetailPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const project = projectsData.find(p => p.id === Number(id));
	const containerRef = useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			const visualTl = gsap.timeline({
				scrollTrigger: {
					toggleActions: 'start pause reverse reset',
					trigger: '.visual-timeline',
					start: 'top top',
					end: 'bottom 80%',
					// pin: true,
					scrub: 0.2
					// markers: true
				}
			});
			visualTl
				.from('.visual', {
					clipPath: 'inset(0% 16% 0% 16%)',
					duration: 2
				})
				.fromTo(
					'.project-slogan',
					{
						x: '100%'
					},
					{
						x: '-50%',
						duration: 3
					},
					'<'
				);
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
			<main ref={containerRef}>
				<div className="visual-timeline w-full min-h-svh flex justify-center items-center pt-[50vh]">
					<motion.div
						className={`visual relative w-full h-svh overflow-hidden bg-no-repeat bg-position-[center_top] bg-fixed bg-cover`}
						style={{ backgroundImage: `url(${project.thumbnail})` }}>
						<p className="project-slogan absolute top-[30%] left-0 font-bebasNeue text-[16vw] text-white whitespace-nowrap mix-blend-difference transition-[transform] ease-linear duration-2400">
							{project.slogan}
						</p>
					</motion.div>
				</div>
				<h2 className="hidden">프로젝트 상세</h2>

				<section className="detail-section inner mt-[4vw]">
					<header>
						<h3 className="project-title text-[clamp(27px,4.167vw,50px)] font-extrabold">
							{project.name}
						</h3>
					</header>
					<div className="flex mt-[clamp(12px,1.953vw,24px)]">
						<div className="project-detail-left flex-1">
							<div className="project-detail-left-top grid grid-cols-[1fr_2.5fr] gap-y-8 text-[clamp(14px,1.823vw,17px)] ">
								<h5 className="sub-title">Category</h5>
								<p className="flex gap-8">
									{project.categories.map(el => (
										<span key={el}>{el}</span>
									))}
								</p>
								<h5>Date</h5>
								<p>{project.date}</p>
								<h5>Contribution</h5>
								<p>{project.contribution}%</p>
							</div>

							<div className="project-tasks mt-[4vw]">
								<h5>Links</h5>
								<ul>
									{project.links.map(link => (
										<li className="flex gap-5">
											{Object.entries(link).map(([key, value]) => (
												<RollupButton
													className=""
													shape="round"
													size="sm"
													onClick={() => navigate(value)}>
													{key}
												</RollupButton>
											))}
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="project-detail-right flex-1">
							<div className="project-brief text-gray-900">
								<h5>Brief</h5>
								<Divider className="mt-[clamp(4px,7.997px,9px)] mb-[clamp(4px,7.997px,9px)] bg-gray-800" />
								<p>{project.desc}</p>
							</div>
							<div className="project-concept mt-[3vw]">
								<h5 className="mt-[clamp(4px,7.997px,9px)] mb-[clamp(4px,7.997px,9px)]">
									Concept
								</h5>
								<Divider className="bg-gray-800" />
								<p>{project.concept}</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
