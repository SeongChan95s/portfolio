import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import * as motion from 'motion/react-client';
import type { Transition } from 'motion';
import { AnimatePresence } from 'motion/react';
import { RollupButton } from '../components/global/Button';
import { Image } from '../components/common/Image';
import { projectsData } from '../constants/project';
import { useMatchMediaStore } from '../stores/useMatchMediaStore';
import ProjectDetailModal from '../components/project/ProjectDetailModal';
import './../assets/styles/pages/project.scss';
import { IconButton } from '../components/common/IconButton';
import {
	IconGridCol1Filled,
	IconGridCol2,
	IconGridCol3
} from '../components/common/Icon';
import { useProjectDetailModalStore } from '../stores/project';

const initialProjectTabs = {
	all: true,
	service: false,
	clone: false,
	creative: false,
	server: false,
	interactive: false,
	parallax: false,
	responsive: false,
	web: false,
	mobile: false,
	bootstrap: false,
	'tailwind css': false
};

const spring: Transition = {
	type: 'spring',
	damping: 20,
	stiffness: 300
};

export default function ProjectPage() {
	const [projects, setProjects] = useState(projectsData);
	const [tabs, setTabs] = useState(initialProjectTabs);
	const selectedProject = useProjectDetailModalStore(state => state.project);
	const [gridCols, setGridCols] = useState(3);

	const changeTab = (tab: Category) => {
		setTabs(() => ({ ...initialProjectTabs, all: false, [tab]: true }));
		if (tab != 'all') {
			setProjects(() => projectsData.filter(el => el.categories.includes(tab)));
		} else {
			setProjects(projectsData);
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

	const mediaQuery = useMatchMediaStore(state => state.media);

	return (
		<>
			<Helmet>
				<title>SeongChan | Project</title>
			</Helmet>
			<main className="project-page inner">
				<header className="main-header">
					<h2 className="page-title">Project</h2>
					<div className="main-header-container">
						<ul className="tab-menu">
							<li>
								{(['all', 'service', 'clone', 'creative'] as Category[]).map(tab => (
									<RollupButton
										size={mediaQuery == 'sm' ? 'xs' : mediaQuery == 'md' ? 'sm' : 'md'}
										shape="round"
										active={tabs[tab]}
										onClick={() => changeTab(tab)}
										key={tab}>
										{tab}
									</RollupButton>
								))}
							</li>
							<li>
								{(
									['interactive', 'parallax', 'bootstrap', 'tailwind css'] as Category[]
								).map(tab => (
									<RollupButton
										size={mediaQuery == 'sm' ? 'xs' : mediaQuery == 'md' ? 'sm' : 'md'}
										shape="round"
										active={tabs[tab]}
										onClick={() => changeTab(tab)}
										key={tab}>
										{tab}
									</RollupButton>
								))}
							</li>
							<li>
								{(['responsive', 'web', 'mobile', 'server'] as Category[]).map(tab => (
									<RollupButton
										size={mediaQuery == 'sm' ? 'xs' : mediaQuery == 'md' ? 'sm' : 'md'}
										shape="round"
										active={tabs[tab]}
										onClick={() => changeTab(tab)}
										key={tab}>
										{tab}
									</RollupButton>
								))}
							</li>
						</ul>

						<div className="grid-button-wrap">
							<IconButton
								className={gridCols == 3 ? 'active' : undefined}
								icon={<IconGridCol3 onClick={() => setGridCols(3)} />}
							/>
							<IconButton
								className={gridCols == 2 ? 'active' : undefined}
								icon={<IconGridCol2 onClick={() => setGridCols(2)} />}
							/>
							<IconButton
								className={gridCols == 1 ? 'active' : undefined}
								icon={<IconGridCol1Filled onClick={() => setGridCols(1)} />}
							/>
						</div>
					</div>
				</header>

				<ul className={`project-container grid-cols-${gridCols}`}>
					<AnimatePresence initial={false}>
						{projects.map((project, index) => (
							<motion.li
								className="project-item"
								key={`${project.id}-${gridCols}`}
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
										className="project-image-container">
										<Image src={project.thumbnail} alt="" />
									</motion.div>
								) : (
									<div></div>
								)}
								<h4 className="project-title">{project.name}</h4>
								<p className="project-category">
									{project.categories.map(el => (
										<span key={el}>{el}</span>
									))}
								</p>
								<p className="project-desc">{project.desc}</p>
							</motion.li>
						))}
					</AnimatePresence>
				</ul>
			</main>
			<ProjectDetailModal gridCols={gridCols} />
		</>
	);
}
