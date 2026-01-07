import { Helmet } from 'react-helmet-async';

export default function AboutPage() {
	return (
		<>
			<Helmet>
				<title>About</title>
			</Helmet>
			<div>
				<h2>About의 본문입니다.</h2>
			</div>
		</>
	);
}
