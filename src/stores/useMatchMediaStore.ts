import { create } from 'zustand';

type Media = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface UseMatchMediaStore {
	media: Media;
	setMedia: (value: Media) => void;
}

export const useMatchMediaStore = create<UseMatchMediaStore>(set => ({
	media: 'md',
	setMedia: value =>
		set({
			media: value
		})
}));
