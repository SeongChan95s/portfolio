import { useMatchMediaStore } from '../stores/useMatchMediaStore';

export const matchMediaListener = () => {
	const xlQuery = window.matchMedia('(min-width: 1280px)');
	useMatchMediaStore.getState().setMedia('xl');
	xlQuery.addEventListener('change', () => useMatchMediaStore.getState().setMedia('xl'));

	const lgQuery = window.matchMedia('(min-width: 1024px)');
	useMatchMediaStore.getState().setMedia('lg');
	lgQuery.addEventListener('change', () => useMatchMediaStore.getState().setMedia('lg'));

	const mdQuery = window.matchMedia('(min-width: 768px) and (max-width:1023px)');
	useMatchMediaStore.getState().setMedia('md');
	mdQuery.addEventListener('change', () => useMatchMediaStore.getState().setMedia('md'));
	const smQuery = window.matchMedia('(max-width: 767px)');
	useMatchMediaStore.getState().setMedia('sm');
	smQuery.addEventListener('change', () => useMatchMediaStore.getState().setMedia('sm'));
};
