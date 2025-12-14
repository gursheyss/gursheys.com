import { allPosts } from 'content-collections';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const posts = allPosts.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
	const categories = [...new Set(allPosts.flatMap((post) => post.categories))].sort();
	return { posts, categories };
};
