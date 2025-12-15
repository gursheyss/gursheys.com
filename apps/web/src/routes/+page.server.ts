import { LASTFM_API_KEY, LASTFM_USERNAME } from '$env/static/private';
import { allPosts } from 'content-collections';
import type { PageServerLoad } from './$types';

interface LastFmTrack {
	name: string;
	artist: {
		'#text': string;
	};
	album: {
		'#text': string;
	};
	image: Array<{
		'#text': string;
		size: string;
	}>;
	date?: {
		uts: string;
		'#text': string;
	};
	'@attr'?: {
		nowplaying: string;
	};
	url: string;
}

interface LastFmResponse {
	recenttracks: {
		track: LastFmTrack[];
		'@attr': {
			user: string;
			totalPages: string;
			page: string;
			perPage: string;
			total: string;
		};
	};
}

export interface Track {
	name: string;
	artist: string;
	album: string;
	image: string;
	playedAt: Date | null;
	isNowPlaying: boolean;
	url: string;
	playCount: number;
}

async function fetchMusicTracks(fetch: typeof globalThis.fetch): Promise<{ tracks: Track[]; error: string | null }> {
	const startOfToday = new Date();
	startOfToday.setHours(0, 0, 0, 0);
	const fromTimestamp = Math.floor(startOfToday.getTime() / 1000);

	const url = new URL('https://ws.audioscrobbler.com/2.0/');
	url.searchParams.set('method', 'user.getRecentTracks');
	url.searchParams.set('user', LASTFM_USERNAME);
	url.searchParams.set('api_key', LASTFM_API_KEY);
	url.searchParams.set('format', 'json');
	url.searchParams.set('limit', '200');
	url.searchParams.set('from', fromTimestamp.toString());

	try {
		const response = await fetch(url.toString(), {
			headers: {
				'User-Agent': 'gursheys.com/1.0'
			}
		});

		if (!response.ok) {
			console.error('Last.fm API error:', response.status);
			return { tracks: [], error: 'Failed to fetch tracks' };
		}

		const data: LastFmResponse = await response.json();

		// Aggregate tracks by name + artist
		const trackMap = new Map<string, Track>();

		for (const track of data.recenttracks.track) {
			const key = `${track.name}|||${track.artist['#text']}`;
			const existing = trackMap.get(key);

			if (existing) {
				existing.playCount++;
				if (track['@attr']?.nowplaying === 'true') {
					existing.isNowPlaying = true;
					existing.playedAt = null;
				}
			} else {
				trackMap.set(key, {
					name: track.name,
					artist: track.artist['#text'],
					album: track.album['#text'],
					image: track.image.find((img) => img.size === 'large')?.['#text'] || '',
					playedAt: track.date ? new Date(parseInt(track.date.uts) * 1000) : null,
					isNowPlaying: track['@attr']?.nowplaying === 'true',
					url: track.url,
					playCount: 1
				});
			}
		}

		// Sort by now playing first, then play count descending
		const tracks = Array.from(trackMap.values()).sort((a, b) => {
			if (a.isNowPlaying && !b.isNowPlaying) return -1;
			if (!a.isNowPlaying && b.isNowPlaying) return 1;
			return b.playCount - a.playCount;
		});

		return { tracks, error: null };
	} catch (error) {
		console.error('Failed to fetch Last.fm data:', error);
		return { tracks: [], error: 'Failed to fetch tracks' };
	}
}

export const load: PageServerLoad = async ({ fetch }) => {
	// Load posts
	const posts = allPosts
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	const categories = [...new Set(allPosts.flatMap((post) => post.categories))].sort();

	// Load music tracks
	const { tracks, error: musicError } = await fetchMusicTracks(fetch);

	return {
		posts,
		categories,
		tracks,
		musicError
	};
};
