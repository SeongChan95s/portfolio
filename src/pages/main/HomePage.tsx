import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function HomePage() {
	return (
		<>
			<Helmet>
				<title>SeongChan</title>
				<meta name="description" content="박성찬의 포트폴리오" />
			</Helmet>
			<div className="home-page">
				<main>
					<div className="flex items-center">
						<h2 className="text-headline-1">홈 페이지</h2>
					</div>
					<Link to="/guide/common/component">가이드</Link>
					<Link to="/project">프로젝트</Link>
				</main>
			</div>
		</>
	);
}
