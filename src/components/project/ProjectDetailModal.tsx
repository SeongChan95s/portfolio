import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { Overlay } from '../common/Overlay';
import { Image } from '../common/Image';
import { create } from 'zustand';
import { Link } from 'react-router-dom';

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
			delayChildren: 0.5,
			staggerChildren: 0.2
		}
	},
	exit: {
		opacity: 1,
		transition: {
			when: 'afterChildren',
			staggerChildren: 0.5,
			staggerDirection: -1
		}
	}
};

const containerVariants = {
	hidden: { opacity: 0, x: -40 },
	visible: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: 40 }
};

export default function ProjectDetailModal() {
	const project = useProjectDetailModalStore(state => state.project);
	const imageSize = useProjectDetailModalStore(state => state.imageSize);

	const handleClose = (e: React.MouseEvent) => {
		e.stopPropagation();
		useProjectDetailModalStore.getState().setProject(null);
	};

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
						className="project-detail-modal fixed inset-[50%] transform-[translate(-50%,-50%)] flex flex-col justify-center gap-14 w-fit h-fit text-surface-01 z-90 md:flex-row md:items-center md:w-[clamp(300px,75.521vw,1200px)] md:gap-[4%]"
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
								src={project.image}
								alt={project.name}
							/>
						</motion.div>

						<motion.div className="flex-1" variants={containerVariants}>
							<h5 className="text-[clamp(24px,4.948vw,52px)]">{project.name}</h5>
							<p className="text-[clamp(15px,2.083vw,18px)] mt-[clamp(4px,0.911vw,10px)]">
								{project.desc}
							</p>
							<Link
								to={`/detail/${project.id}`}
								className="block mt-[clamp(12px,3.125vw,24px)] text-[15px] text-gray-300 font-semibold">
								View More
							</Link>
						</motion.div>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
	);
}
