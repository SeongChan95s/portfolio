import { Outlet } from 'react-router-dom';
import { ToggleNav } from '../components/global/Nav';

export default function MainLayout() {
	return (
		<>
			<ToggleNav />
			<Outlet />
			{/* <TabBar /> */}
		</>
	);
}
