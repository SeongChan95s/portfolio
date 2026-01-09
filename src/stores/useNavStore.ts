import { create } from 'zustand';

interface NavState {
	isNavOpen: boolean;
	setNavOpen: (open: boolean) => void;
	toggleNav: () => void;
}

export const useNavStore = create<NavState>(set => ({
	isNavOpen: false,
	setNavOpen: open => set({ isNavOpen: open }),
	toggleNav: () => set(state => ({ isNavOpen: !state.isNavOpen }))
}));
