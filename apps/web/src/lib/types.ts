export type Post = {
	title: string;
	slug: string;
	date: Date;
	summary: string;
	categories: string[];
};

export type Track = {
	name: string;
	artist: string;
	album: string;
	image: string;
	playedAt: Date | null;
	isNowPlaying: boolean;
	url: string;
	playCount: number;
};
