import { create } from 'zustand';

interface UseProjectDetailModalStore {
	project: Project | null;
	imageSize: { width: number; height: number } | null;
	setProject: (
		project: Project | null,
		imageSize?: { width: number; height: number } | null
	) => void;
}

export const useProjectDetailModalStore = create<UseProjectDetailModalStore>(set => ({
	project: null,
	imageSize: null,
	setProject: (project, imageSize = null) =>
		set({
			project,
			imageSize
		})
}));
