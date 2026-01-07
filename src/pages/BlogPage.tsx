import { Helmet } from 'react-helmet-async';

export default function BlogPage() {
	return (
		<>
			<Helmet>
				<title>Blog</title>
			</Helmet>
			<div>
				<h2>Blog의 본문입니다.</h2>
			</div>
		</>
	);
}
