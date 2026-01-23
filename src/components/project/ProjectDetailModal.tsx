import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { Overlay } from '../common/Overlay';
import { Image } from '../common/Image';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import styles from './ProjectDetailModal.module.scss';
import { useProjectDetailModalStore } from '../../stores/project';

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
						className={`${styles.modal} inner ${
							gridCols == 1 ? styles.vertical : styles.horizontal
						}`}
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit">
						<motion.div
							className={styles.visual}
							style={
								imageSize
									? { width: imageSize.width, height: imageSize.height }
									: undefined
							}
							layoutId={`project-image-${project.id}`}>
							<Image
								className={styles.image}
								src={project.thumbnail}
								alt={project.name}
							/>
						</motion.div>

						<motion.div className={styles.content} variants={containerVariants}>
							<h5 className={styles.title}>{project.name}</h5>
							<p className={styles.desc}>{project.desc}</p>
							<p className={styles.languages}>
								{project.languages.map(el => (
									<span key={`language-${el}`}>{el}</span>
								))}
							</p>
							<ul className={styles.features}>
								{project.features.map(el => (
									<li key={`feature-${el.title}`}>- {el.title}</li>
								))}
							</ul>
							<Link to={`/project/${project.id}`} className={styles.link}>
								View More
							</Link>
						</motion.div>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
	);
}
