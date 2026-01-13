import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import * as motion from 'motion/react-client';
import type { Transition } from 'motion';
import { AnimatePresence } from 'motion/react';
import { RollupButton } from '../components/global/Button';
import { Image } from '../components/common/Image';
import { initialProjects } from '../constants/project';
import { useMatchMediaStore } from '../stores/useMatchMediaStore';
import ProjectDetailModal, {
	useProjectDetailModalStore
} from '../components/project/ProjectDetailModal';
import './../assets/styles/pages/project.scss';

const initialProjectTabs = {
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

type TabKey = keyof typeof initialProjectTabs;

const spring: Transition = {
	type: 'spring',
	damping: 20,
	stiffness: 300
};

export default function ProjectPage() {
	const [projects, setProjects] = useState(initialProjects);
	const [tabs, setTabs] = useState(initialProjectTabs);
	const [currentTab, setCurrentTab] = useState<TabKey>('All');
	const selectedProject = useProjectDetailModalStore(state => state.project);

	const changeTab = (tab: TabKey) => {
		setTabs(() => ({ ...initialProjectTabs, All: false, [tab]: true }));
		setCurrentTab(tab);
		if (tab != 'All') {
			setProjects(() => initialProjects.filter(el => el.category.includes(tab)));
		} else {
			setProjects(initialProjects);
		}
	};

	const handleOpenModal = (id: number) => (e: React.MouseEvent) => {
		const target = e.currentTarget as HTMLElement;
		const imageElement = target.closest('li')?.querySelector('.project-image-container');
		if (imageElement) {
			const rect = imageElement.getBoundingClientRect();
			useProjectDetailModalStore
				.getState()
				.setProject(projects.find(el => el.id == id) as Project, {
					width: rect.width,
					height: rect.height
				});
		} else {
			useProjectDetailModalStore.getState().setProject(projects[id - 1]);
		}
	};

	const mobileMatch = useMatchMediaStore(state => state.mobileMatch);
	const tabletMatch = useMatchMediaStore(state => state.tabletMatch);

	return (
		<>
			<Helmet>
				<title>SeongChan | Project</title>
			</Helmet>
			<main className="project-page inner pt-[12vh] pb-[24vh]">
				<header className="main-header">
					<h2 className="text-[clamp(32px,7.292vw,82px)] font-bold tracking-tight">
						Project
					</h2>
					<div className="tab mt-[2.5vw]">
						<div className="flex gap-8">
							{(['All', 'Service', 'Clone', 'Creative'] as TabKey[]).map(tab => (
								<RollupButton
									size={mobileMatch ? 'xs' : tabletMatch ? 'sm' : 'md'}
									shape="round"
									active={tabs[tab]}
									onClick={() => changeTab(tab)}
									key={tab}>
									{tab}
								</RollupButton>
							))}
						</div>
						<div className="flex gap-8 mt-8">
							{(['Interactive', 'Parallax', 'Bootstrap', 'Tailwind'] as TabKey[]).map(
								tab => (
									<RollupButton
										size={mobileMatch ? 'xs' : tabletMatch ? 'sm' : 'md'}
										shape="round"
										active={tabs[tab]}
										onClick={() => changeTab(tab)}
										key={tab}>
										{tab}
									</RollupButton>
								)
							)}
						</div>
						<div className="flex gap-8 mt-8">
							{(['Responsive', 'Web', 'Mobile', 'Server'] as TabKey[]).map(tab => (
								<RollupButton
									size={mobileMatch ? 'xs' : tabletMatch ? 'sm' : 'md'}
									shape="round"
									active={tabs[tab]}
									onClick={() => changeTab(tab)}
									key={tab}>
									{tab}
								</RollupButton>
							))}
						</div>
					</div>
				</header>

				<ul className="project-container grid grid-cols-2 gap-[6vw] mt-[4vw]">
					<AnimatePresence initial={false}>
						{projects.map((project, index) => (
							<motion.li
								className="project-item flex flex-col"
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
								viewport={{ once: true, amount: 0.3 }}
								onClick={handleOpenModal(project.id)}>
								{selectedProject?.id !== project.id ? (
									<motion.div
										layoutId={`project-image-${project.id}`}
										className="project-image-container h-[clamp(150px,39.063vw,50vh)] rounded-xl overflow-hidden">
										<Image
											className="w-full h-full object-cover"
											src={project.image}
											alt=""
										/>
									</motion.div>
								) : (
									<div className="h-[clamp(150px,39.063vw,50vh)] rounded-xl overflow-hidden"></div>
								)}
								<h4 className="mt-[clamp(8px,1.563vw,22px)] text-[clamp(14.5px,2.344vw,22px)] font-semibold">
									{project.name}
								</h4>
								<p className="flex flex-wrap gap-x-8 mt-[clamp(2px,0.521vw,22px)] text-[clamp(11px,1.563vw,14px)] font-medium text-gray-500">
									{project.category.map(el => (
										<span key={el}>{el}</span>
									))}
								</p>
								<p className="mt-[0.5vw] text-[clamp(13px,1.823vw,16px)] font-normal text-gray-800">
									{project.desc}
								</p>
							</motion.li>
						))}
					</AnimatePresence>
				</ul>
			</main>
			<ProjectDetailModal />
		</>
	);
}
