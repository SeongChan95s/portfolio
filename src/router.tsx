import NotFoundPage from './pages/NotFound';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GuideLayout from './layouts/GuideLayout';
import MainLayout from './layouts/MainLayout';
import DetailPage from './pages/Detail';
import AboutPage from './pages/About';
import HomePage from './pages/Home';
import ProjectPage from './pages/Project';
import BlogPage from './pages/Blog';
import ContactPage from './pages/Contact';
import { lazy } from 'react';
import SubLayout from './layouts/SubLayout';

const ComponentGuidePage = lazy(() => import('./pages/guide/common/ComponentGuidePage'));
const PopupGuidePage = lazy(() => import('./pages/guide/common/PopupGuidePage'));
const GlobalPopupGuidePage = lazy(
	() => import('./pages/guide/global/GlobalPopupGuidePage')
);
const SheetGuidePage = lazy(() => import('./pages/guide/common/SheetGuidePage'));

const router = createBrowserRouter([
	{
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <HomePage />
			},
			{
				element: <SubLayout />,
				children: [
					{
						path: '/about',
						element: <AboutPage />
					},
					{
						path: '/project',
						element: <ProjectPage />
					},
					{
						path: '/project/:id',
						element: <DetailPage />
					},
					{
						path: '/blog',
						element: <BlogPage />
					},
					{
						path: '/contact',
						element: <ContactPage />
					}
				]
			}
		]
	},
	{
		element: <GuideLayout />,
		path: '/guide',
		children: [
			{
				path: 'common/component',
				element: <ComponentGuidePage />
			},
			{
				path: 'common/popup',
				element: <PopupGuidePage />
			},
			{
				path: 'common/sheet',
				element: <SheetGuidePage />
			},
			{
				path: 'global/popup',
				element: <GlobalPopupGuidePage />
			}
		]
	},
	{
		path: '*',
		element: <NotFoundPage />
	}
]);

export default function Router() {
	return <RouterProvider router={router} />;
}
