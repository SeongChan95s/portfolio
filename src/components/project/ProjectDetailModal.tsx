import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { Overlay } from '../common/Overlay';
import { Image } from '../common/Image';
import { create } from 'zustand';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLenis } from 'lenis/react';

interface UseProjectDetailModalStore {
	project: Project | null;
	imageSize: { width: number; height: number } | null;
	setProject: (
		project: Project | null,
		imageSize?: { width: number; height: number } | null
	) => void;
}

export const useProjectDetailModalStore = create<UseProjectDetailModalStore>(set => ({
	project: null,
	imageSize: null,
	setProject: (project, imageSize = null) =>
		set({
			project,
			imageSize
		})
}));

const modalVariants = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 0.4,
			staggerChildren: 0.2
		}
	},
	exit: {
		opacity: 1,
		transition: {
			when: 'afterChildren',
			staggerChildren: 0.4,
			staggerDirection: -1
		}
	}
};

const containerVariants = {
	hidden: { opacity: 0, x: -40 },
	visible: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: 40 }
};

export default function ProjectDetailModal({ gridCols }: { gridCols: number }) {
	const project = useProjectDetailModalStore(state => state.project);
	const imageSize = useProjectDetailModalStore(state => state.imageSize);
	const lenis = useLenis();

	const handleClose = (e: React.MouseEvent) => {
		e.stopPropagation();
		useProjectDetailModalStore.getState().setProject(null);
	};

	useEffect(() => {
		return () => {
			useProjectDetailModalStore.getState().setProject(null);
			lenis?.start();
		};
	}, []);

	return (
		<>
			<Overlay
				className="z-89"
				visible={!!project}
				scroll={false}
				onClick={handleClose}
			/>
			<AnimatePresence>
				{project && (
					<motion.aside
						key="project-detail-modal"
						className={`project-detail-modal fixed inset-[50%] transform-[translate(-50%,-50%)] flex justify-center gap-y-14 w-full h-fit inner text-surface-01 z-90 gap-x-[4%] ${
							gridCols == 1 ? 'flex-col' : 'flex-row items-center'
						}`}
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit">
						<motion.div
							className="visual flex-none rounded-xl overflow-hidden"
							style={
								imageSize
									? { width: imageSize.width, height: imageSize.height }
									: undefined
							}
							layoutId={`project-image-${project.id}`}>
							<Image
								className="w-full h-full object-cover"
								src={project.thumbnail}
								alt={project.name}
							/>
						</motion.div>

						<motion.div variants={containerVariants}>
							<h5 className="text-[clamp(24px,3.906vw,42px)] font-semibold">
								{project.name}
							</h5>
							<p className="text-[clamp(15px,2.083vw,18px)] mt-[clamp(4px,4px,10px)] font-light">
								{project.desc}
							</p>
							<p className="project-language flex flex-wrap gap-x-12 mt-6 text-[15px] font-medium text-gray-200">
								{project.languages.map(el => (
									<span key={`language-${el}`}>{el}</span>
								))}
							</p>
							<ul className="project-features flex flex-col gap-3 mt-24 text-[14px] font-light text-gray-100">
								{project.features.map(el => (
									<li key={`feature-${el}`}>- {el.title}</li>
								))}
							</ul>
							<Link
								to={`/project/${project.id}`}
								className="block mt-[clamp(12px,3.385vw,30px)] text-[15px] text-gray-300 font-semibold">
								View More
							</Link>
						</motion.div>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
	);
}
