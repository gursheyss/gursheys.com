import { allLogs } from 'content-collections';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const log = allLogs.find((log) => log.slug === params.slug);
	if (!log) error(404, `Log not found: ${params.slug}`);
	return { post: log };
};

