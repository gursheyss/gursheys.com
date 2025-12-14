import { allPosts } from 'content-collections';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const post = allPosts.find((post) => post.slug === params.slug);
	if (!post) error(404, `Post not found: ${params.slug}`);
	return { post };
};
