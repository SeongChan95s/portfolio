import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import * as motion from 'motion/react-client';
import type { Transition } from 'motion';
import { AnimatePresence, stagger } from 'motion/react';
import { RollupButton } from '../components/global/Button';
import { Image } from '../components/common/Image';
import { Link } from 'react-router-dom';
import { IconArrowStick } from '../components/common/Icon';

const initialTabs = {
	All: true,
	Service: false,
	Clone: false,
	Creative: false,
	Server: false,
	Interactive: false,
	Parallax: false,
	Responsive: false,
	Web: false,
	Mobile: false,
	Bootstrap: false,
	Tailwind: false
};

type TabKey = keyof typeof initialTabs;

interface Project {
	id: number;
	name: string;
	category: TabKey[];
	desc: string;
	image: string;
	link: string;
}

const initialProjects: Project[] = [
	{
		id: 1,
		name: '핫플로',
		category: ['Creative', 'Responsive'],
		desc: '트렌디한 핫플레이스 탐색 및 예약 & 웨이팅 플랫폼',
		image:
			'https://firebasestorage.googleapis.com/v0/b/portfolio-bac70.firebasestorage.app/o/project%2Fhotflo%2Fthumbnail.jpg?alt=media&token=a452bfc3-9e13-4395-9cf2-9db69e5f2d14',
		link: '#none'
	},
	{
		id: 2,
		name: '아름다울 영화제',
		category: ['Creative', 'Parallax', 'Responsive'],
		desc: '몰입감 있는 영화제 사이트',
		image:
			'https://firebasestorage.googleapis.com/v0/b/portfolio-bac70.firebasestorage.app/o/project%2FbeautifulFilm%2Fthumbnail.jpg?alt=media&token=0a7fd796-1f24-40f4-9946-5b02e2f28537',
		link: '#none'
	},
	{
		id: 3,
		name: '인생맥주',
		category: ['Creative', 'Parallax', 'Responsive'],
		desc: '감성적인 수제맥주 프렌차이즈 웹사이트',
		image:
			'https://firebasestorage.googleapis.com/v0/b/portfolio-bac70.firebasestorage.app/o/project%2FlifesBeer%2Fthumbnail.jpg?alt=media&token=0e737488-cfa3-4c92-ae7d-69699b1c6d5e',
		link: '#none'
	},
	{
		id: 4,
		name: '오늘의 여행',
		category: ['Creative', 'Web'],
		desc: '편리하고 쉬운 여행 플랫폼',
		image:
			'https://firebasestorage.googleapis.com/v0/b/portfolio-bac70.firebasestorage.app/o/project%2FtodayTour%2Fthumbnail.jpg?alt=media&token=3a72d1b2-9164-4684-9e90-79db0cdbb418',
		link: '#none'
	}
];

const spring: Transition = {
	type: 'spring',
	damping: 20,
	stiffness: 300
};

export default function ProjectPage() {
	const [projects, setProjects] = useState(initialProjects);
	const [tabs, setTabs] = useState(initialTabs);

	const changeTab = (tab: TabKey) => {
		setTabs(() => ({ ...initialTabs, All: false, [tab]: true }));
		if (tab != 'All') {
			setProjects(() => initialProjects.filter(el => el.category.includes(tab)));
		} else {
			setProjects(initialProjects);
		}
	};

	return (
		<>
			<Helmet>
				<title>SeongChan | Project</title>
			</Helmet>
			<main className="inner pt-[12vw]">
				<header className="main-header">
					<h2 className="text-[max(5vw,42px)] font-bold tracking-tight">Project</h2>
					<div className="tab mt-[2.5vw]">
						<div className="flex gap-8">
							{(['All', 'Service', 'Clone', 'Creative'] as TabKey[]).map(tab => (
								<RollupButton
									size="sm"
									shape="round"
									active={tabs[tab]}
									onClick={() => changeTab(tab)}>
									{tab}
								</RollupButton>
							))}
						</div>
						<div className="flex gap-8 mt-8">
							{(['Interactive', 'Parallax', 'Bootstrap', 'Tailwind'] as TabKey[]).map(
								tab => (
									<RollupButton
										size="sm"
										shape="round"
										active={tabs[tab]}
										onClick={() => changeTab(tab)}>
										{tab}
									</RollupButton>
								)
							)}
						</div>
						<div className="flex gap-8 mt-8">
							{(['Responsive', 'Web', 'Mobile', 'Server'] as TabKey[]).map(tab => (
								<RollupButton
									size="sm"
									shape="round"
									active={tabs[tab]}
									onClick={() => changeTab(tab)}>
									{tab}
								</RollupButton>
							))}
						</div>
					</div>
				</header>

				<ul className="grid grid-cols-2 gap-[3vw] mt-[4vw]">
					<AnimatePresence initial={false}>
						{projects.map((project, index) => (
							<motion.li
								key={project.id}
								layout
								transition={spring}
								initial={{ y: 100, opacity: 0 }}
								whileInView={{
									y: 0,
									opacity: 1,
									transition: {
										duration: 0.5,
										delay: index * 0.1
									}
								}}
								viewport={{ once: false, amount: 0.3 }}>
								<div className="aspect-square rounded-xl overflow-hidden">
									<Image
										className="w-full h-full object-cover"
										src={project.image}
										alt=""
									/>
								</div>
								<h4 className="mt-[clamp(8px,1.563vw,22px)] text-[clamp(14.5px,2.344vw,22px)] font-semibold">
									{project.name}
								</h4>
								<p className="flex flex-wrap gap-x-8 mt-[clamp(2px,0.521vw,22px)] text-[clamp(11px,1.563vw,14px)] font-medium text-gray-500">
									{project.category.map(el => (
										<span key={el}>{el}</span>
									))}
								</p>
								<p className="mt-[0.5vw] text-[max(1.5vw,13px)] font-normal text-gray-900">
									{project.desc}
								</p>
								<Link
									to={project.link}
									className="flex gap-4 items-center text-[max(1.6vw,12px)]">
									자세히보기
									<IconArrowStick className="w-[max(1.6vw,12px)] h-auto" />
								</Link>
							</motion.li>
						))}
					</AnimatePresence>
				</ul>
			</main>
		</>
	);
}
