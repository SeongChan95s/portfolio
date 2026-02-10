import { httpsCallable } from 'firebase/functions';
import { functions } from '@/libs/firebase/config';
import type { VelogPost } from '@/types/velog';

export async function fetchVelogPostsFromRSS(username: string): Promise<VelogPost[]> {
	try {
		const getVelogRss = httpsCallable<{ username: string }, string>(
			functions,
			'velogRssProxy'
		);
		const result = await getVelogRss({ username });
		const xmlText = result.data;

		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

		const items = xmlDoc.querySelectorAll('item');
		const posts: VelogPost[] = [];

		items.forEach((item, index) => {
			const title = item.querySelector('title')?.textContent || '';
			const link = item.querySelector('link')?.textContent || '';
			const description = item.querySelector('description')?.textContent || '';
			const pubDate = item.querySelector('pubDate')?.textContent || '';

			const urlSlug = link.split('/').pop() || '';

			const tempDiv = document.createElement('div');
			tempDiv.innerHTML = description;
			const imgTag = tempDiv.querySelector('img');
			const thumbnail = imgTag?.src || null;

			const textContent = tempDiv.textContent || tempDiv.innerText || '';
			const shortDescription = textContent.trim().substring(0, 150);

			posts.push({
				id: `${username}-${index}`,
				title,
				short_description: shortDescription,
				thumbnail,
				url_slug: urlSlug,
				released_at: pubDate,
				user: {
					username
				}
			});
		});

		return posts;
	} catch (error) {
		console.error('RSS Fetch Error:', error);
		throw error;
	}
}
