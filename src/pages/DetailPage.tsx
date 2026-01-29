import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { projectsData } from '../constants/project';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { Divider } from '../components/common/Divider';
import { RollupButton } from '../components/global/Button';
import '@/assets/styles/pages/detail.scss';
import { useMatchMediaStore } from '../stores/useMatchMediaStore';
import Marquee from '../components/global/Marquee/Marquee';

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
						start: '10% top',
						end: 'bottom bottom',
						// pin: true,
						scrub: 0.2
						// markers: true
					}
				});
				visualTl.from('.visual', {
					clipPath: 'inset(0% 20% 0% 20%)'
				});
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
					<div
						className="visual"
						style={{ backgroundImage: `url(${project.thumbnail})` }}>
						<Marquee className="project-slogan" speed={30000}>
							{project.slogan}
						</Marquee>
					</div>
				</div>

				<header className="project-header">
					<h2 className="project-name">{project.name}</h2>
				</header>

				<section className="basic-info-section ">
					<h3 className="hidden">프로젝트 기본정보</h3>
					<div className="inner">
						<div className="box">
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

						<div className="link-box box">
							<h5 className="sub-title">Links</h5>
							<ul className="link-wrap">
								{project.links.map((link, i) => (
									<li key={`links_${i}`}>
										{Object.entries(link).map(([key, value]) => (
											<RollupButton
												shape="round"
												size={
													mediaQuery == 'sm' ? 'xs' : mediaQuery == 'md' ? 'md' : 'lg'
												}
												key={value}
												onClick={() => window.open(value)}>
												{key}
											</RollupButton>
										))}
									</li>
								))}
							</ul>
						</div>

						<div className="desc-box box">
							<div className="row">
								<h5 className="sub-title">Brief</h5>
								<Divider className="divider" />
								<p className="text">{project.desc}</p>
							</div>
							<div className="row">
								<h5 className="sub-title">Concept</h5>
								<Divider className="divider" />
								<p className="text">{project.concept}</p>
							</div>
						</div>
					</div>
				</section>

				<section className="spec-section">
					<div className="inner">
						<h3 className="hidden">프로젝트 명세</h3>
						<div className="box">
							<h5 className="sub-title">Tasks</h5>
							<ul className="text-wrap">
								{project.tasks.map(task => (
									<li>{task}</li>
								))}
							</ul>
						</div>
						<div className="box">
							<h5 className="sub-title">Languages</h5>
							<ul className="text-wrap">
								{project.languages.map(lng => (
									<li>{lng}</li>
								))}
							</ul>
						</div>
						{project.libraries && (
							<div className="box">
								<h5 className="sub-title">Libraries</h5>
								<ul className="text-wrap">
									{project.libraries.map(lib => (
										<li>{lib}</li>
									))}
								</ul>
							</div>
						)}
						<div className="box">
							<h5 className="sub-title">Tools</h5>
							<ul className="text-wrap">
								{project.tools.map(tool => (
									<li>{tool}</li>
								))}
							</ul>
						</div>
					</div>
				</section>

				<section className="feature-section">
					<div className="inner">
						<h3 className="section-title">Features</h3>

						<div className="section-body">
							{project.features.map(feat => (
								<article>
									{feat.image && (
										<div className="feature-img">
											<img src={feat.image} alt="" />
										</div>
									)}
									<h4 className="title">{feat.title}</h4>
									<p className="desc">{feat.desc}</p>
								</article>
							))}
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
