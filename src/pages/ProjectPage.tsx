import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import * as motion from 'motion/react-client';
import type { Transition } from 'motion';
import { AnimatePresence } from 'motion/react';

const initialContents = [
	{
		id: 1,
		name: '핫플로',
		category: ['Personal', 'Responsive'],
		desc: '핫플로는 트렌디한 핫플레이스 탐색 및 예약 & 웨이팅 플랫폼 입니다.',
		link: '#none'
	},
	{
		id: 2,
		name: '인생맥주',
		category: ['Personal', 'a'],
		desc: '핫플로는 트렌디한 핫플레이스 탐색 및 예약 & 웨이팅 플랫폼 입니다.',
		link: '#none'
	},
	{
		id: 3,
		name: '핫플로',
		category: ['Personal', 'Responsive'],
		desc: '핫플로는 트렌디한 핫플레이스 탐색 및 예약 & 웨이팅 플랫폼 입니다.',
		link: '#none'
	},
	{
		id: 4,
		name: '인생맥주',
		category: ['Personal', 'a'],
		desc: '핫플로는 트렌디한 핫플레이스 탐색 및 예약 & 웨이팅 플랫폼 입니다.',
		link: '#none'
	}
];

const spring: Transition = {
	type: 'spring',
	damping: 20,
	stiffness: 300
};

export default function ProjectPage() {
	const [contents, setContents] = useState(initialContents);

	return (
		<>
			<Helmet>
				<title>SeongChan | Project</title>
			</Helmet>
			<main className="inner pt-[12vw]">
				<header>
					<h2 className="text-[6vw] font-bold tracking-tight">Project</h2>
					<button onClick={() => setContents(initialContents)}>All</button>
					<button
						onClick={() =>
							setContents(() => contents.filter(el => el.category.includes('Responsive')))
						}>
						Responsive
					</button>
					<button
						onClick={() =>
							setContents(() => contents.filter(el => el.category.includes('Personal')))
						}>
						Personal
					</button>
				</header>

				<ul className="grid grid-cols-2">
					<AnimatePresence initial={false}>
						{contents.map(cont => (
							<motion.li
								key={cont.id}
								layout
								transition={spring}
								initial={{ y: 100, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}>
								{cont.name}
							</motion.li>
						))}
					</AnimatePresence>
				</ul>
			</main>
		</>
	);
}
