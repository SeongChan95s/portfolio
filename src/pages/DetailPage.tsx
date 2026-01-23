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
import { useMatchMediaStore } from '../stores/useMatchMediaStore';

export default function DetailPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const project = projectsData.find(p => p.id === Number(id));
	const containerRef = useRef<HTMLDivElement | null>(null);
	const mediaQuery = useMatchMediaStore(state => state.media);

	useGSAP(
		() => {
			const matchMedia = gsap.matchMedia();

			matchMedia.add('(min-width: 768px)', () => {
				const visualTl = gsap.timeline({
					scrollTrigger: {
						toggleActions: 'start pause reverse reset',
						trigger: '.visual-wrap',
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
			});
		},
		{ scope: containerRef }
	);

	if (!project) {
		return (
			<>
				<Helmet>
					<title>프로젝트를 찾을 수 없습니다</title>
				</Helmet>
				<div className="inner detail-not-found">
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
			<main className="detail-page" ref={containerRef}>
				<div className="visual-wrap">
					<motion.div
						className="visual"
						style={{ backgroundImage: `url(${project.thumbnail})` }}>
						<p className="project-slogan">{project.slogan}</p>
					</motion.div>
				</div>
				<h2 className="hidden">프로젝트 상세</h2>

				<section className="basic-info-section inner">
					<header>
						<h3 className="title">{project.name}</h3>
					</header>
					<div className="overview">
						<h5 className="sub-title">Category</h5>
						<p>
							{project.categories.map(el => (
								<span key={el}>{el}</span>
							))}
						</p>
						<h5 className="sub-title">Date</h5>
						<p>{project.date}</p>

						<h5 className="sub-title">Contribution</h5>
						<p>{project.contribution}%</p>
					</div>

					<div className="project-tasks">
						<h5 className="sub-title">Links</h5>
						<ul className="link-wrap">
							{project.links.map((link, i) => (
								<li key={`links_${i}`}>
									{Object.entries(link).map(([key, value]) => (
										<RollupButton
											shape="round"
											size={mediaQuery == 'sm' ? 'xs' : mediaQuery == 'md' ? 'md' : 'lg'}
											key={value}
											onClick={() => window.open(value)}>
											{key}
										</RollupButton>
									))}
								</li>
							))}
						</ul>
					</div>

					<div className="project-detail-right">
						<div className="project-brief">
							<h5>Brief</h5>
							<Divider className="divider" />
							<p>{project.desc}</p>
						</div>
						<div className="project-concept">
							<h5>Concept</h5>
							<Divider className="divider" />
							<p>{project.concept}</p>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
