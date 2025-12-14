import { allPosts } from 'content-collections';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const category = params.category;
	const posts = allPosts
		.filter((post) => post.categories.includes(category))
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	if (posts.length === 0) {
		error(404, `No posts found in category: ${category}`);
	}

	const categories = [...new Set(allPosts.flatMap((post) => post.categories))].sort();
	return { posts, category, categories };
};
