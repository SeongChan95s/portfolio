import { Helmet } from 'react-helmet-async';
import { Button } from '../components/common/Button';
import { Tab } from '../components/common/Tab';

export default function ProjectPage() {
	return (
		<>
			<Helmet>
				<title>SeongChan | Project</title>
			</Helmet>
			<main className="inner pt-[12vw]">
				<Tab defaultKey="1">
					<header>
						<h2 className="text-[6vw] font-bold tracking-tight">Project</h2>
						<Tab.Pane eventKey="1">All</Tab.Pane>
					</header>
				</Tab>
			</main>
		</>
	);
}
