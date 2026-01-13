import { create } from 'zustand';

interface UseMatchMediaStore {
	desktopMatch: boolean;
	tabletMatch: boolean;
	mobileMatch: boolean;
	setDesktopMatch: (value: boolean) => void;
	setTabletMatch: (value: boolean) => void;
	setMobileMatch: (value: boolean) => void;
}

export const useMatchMediaStore = create<UseMatchMediaStore>(set => ({
	desktopMatch: false,
	tabletMatch: false,
	mobileMatch: false,
	setDesktopMatch: value =>
		set({
			desktopMatch: value
		}),
	setTabletMatch: value =>
		set({
			tabletMatch: value
		}),
	setMobileMatch: value =>
		set({
			mobileMatch: value
		})
}));
