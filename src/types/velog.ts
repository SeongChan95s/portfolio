export interface VelogPost {
	id: string;
	title: string;
	short_description: string;
	thumbnail: string | null;
	url_slug: string;
	released_at: string;
	user: {
		username: string;
	};
}

export interface VelogPostsResponse {
	posts: VelogPost[];
}
