import { useMatchMediaStore } from '../stores/useMatchMediaStore';

export const matchMediaListener = () => {
	const desktopQuery = window.matchMedia('(min-width: 1025px)');
	useMatchMediaStore.getState().setDesktopMatch(desktopQuery.matches);
	desktopQuery.addEventListener('change', () =>
		useMatchMediaStore.getState().setDesktopMatch(desktopQuery.matches)
	);

	const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width:1024px)');
	useMatchMediaStore.getState().setTabletMatch(tabletQuery.matches);
	tabletQuery.addEventListener('change', () =>
		useMatchMediaStore.getState().setTabletMatch(tabletQuery.matches)
	);
	const mobileQuery = window.matchMedia('(max-width: 767px)');
	useMatchMediaStore.getState().setMobileMatch(mobileQuery.matches);
	mobileQuery.addEventListener('change', () =>
		useMatchMediaStore.getState().setMobileMatch(mobileQuery.matches)
	);
};
