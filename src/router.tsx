import NotFoundPage from './pages/NotFoundPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GuideLayout from './layouts/GuideLayout';
import MainLayout from './layouts/MainLayout';
import DetailPage from './pages/DetailPage';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
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
	// {
	// 	element: <SubLayout />,
	// 	children: [
	// 		{
	// 			path: '/project/:id',
	// 			element: <DetailPage />
	// 		}
	// 	]
	// },
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
