import { useMatchMediaStore } from '../stores/useMatchMediaStore';

export const matchMediaListener = () => {
	const xlQuery = window.matchMedia('(min-width: 1280px)');
	if (xlQuery.matches) useMatchMediaStore.getState().setMedia('xl');
	xlQuery.addEventListener('change', () => {
		if (xlQuery.matches) useMatchMediaStore.getState().setMedia('xl');
	});

	const lgQuery = window.matchMedia('(min-width: 1024px) and (max-width: 1279px)');
	if (lgQuery.matches) useMatchMediaStore.getState().setMedia('lg');
	lgQuery.addEventListener('change', () => {
		if (lgQuery.matches) useMatchMediaStore.getState().setMedia('lg');
	});

	const mdQuery = window.matchMedia('(min-width: 768px) and (max-width:1023px)');
	if (mdQuery.matches) useMatchMediaStore.getState().setMedia('md');
	mdQuery.addEventListener('change', () => {
		if (mdQuery.matches) useMatchMediaStore.getState().setMedia('md');
	});

	const smQuery = window.matchMedia('(max-width: 767px)');
	if (smQuery.matches) useMatchMediaStore.getState().setMedia('sm');
	smQuery.addEventListener('change', () => {
		if (smQuery.matches) useMatchMediaStore.getState().setMedia('sm');
	});
};
