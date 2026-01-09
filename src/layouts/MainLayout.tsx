import { Outlet } from 'react-router-dom';
import { ToggleNav } from '../components/global/Nav';
import CursorFollower from '../components/global/Cursor/CursorFollower';

export default function MainLayout() {
	return (
		<>
			<ToggleNav />
			<Outlet />
			<CursorFollower />
		</>
	);
}
