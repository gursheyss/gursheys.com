export const navBlocks = [
	{ href: '/', label: 'about', description: 'who i am' },
	{ href: '/music', label: 'music', description: 'what i listen to' },
	{ href: '/writings', label: 'writings', description: 'blog posts' },
	{ href: '/history', label: 'history', description: 'timeline' }
];

export type NavBlock = (typeof navBlocks)[number];
