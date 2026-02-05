import { Outlet } from 'react-router-dom';
import { Footer } from '../components/global/Footer';

export default function SubLayout() {
	return (
		<>
			<Outlet />
			<Footer />
		</>
	);
}
