const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const BASE_URL = 'https://api.spotify.com/v1/me'
const CURRENTLY_PLAYING_URL = `${BASE_URL}/player/currently-playing`
const TOP_TRACKS_URL = `${BASE_URL}/top/tracks`
const PLAYLISTS_URL = `${BASE_URL}/playlists`

type SpotifySong = {
  name: string
  album: { images: { url: string }[] }
  artists: { name: string }[]
  external_urls: { spotify: string }
  preview_url?: string
}

type SpotifyPlaylist = {
  name: string
  href: string
  images: { url: string }[]
  external_urls: { spotify: string }
  owner: { id: string }
  public: boolean
  tracks: { total: number }
}

type Song = {
  image?: string
  title: string
  url: string
  artist: string
  isPlaying?: boolean
  type: 'song'
  previewUrl?: string
}

type Playlist = {
  image?: string
  title: string
  url: string
  count: number
  public: boolean
  type: 'playlist'
  owner: string
}

type CurrentSong = { isPlaying: false } | Song

type SpotifyConfig = {
  clientId: string
  clientSecret: string
  refreshToken: string
}

let config: SpotifyConfig | null = null

function initializeSpotify(spotifyConfig: SpotifyConfig) {
  config = spotifyConfig
}

function getAuthorization() {
  if (!config) throw new Error('Spotify not initialized')
  return Buffer.from(`${config.clientId}:${config.clientSecret}`).toString(
    'base64'
  )
}

async function fetchSpotifyAPI<T>(url: string): Promise<T> {
  const accessToken = await getAccessToken()
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  if (!response.ok)
    throw new Error(`Spotify API request failed: ${response.statusText}`)
  return response.json() as Promise<T>
}

async function getAccessToken(): Promise<string> {
  if (!config) throw new Error('Spotify not initialized')

  type TokenResponse = {
    access_token: string
  }

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: config.refreshToken
  })

  const response = await fetch(`${TOKEN_URL}?${params}`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${getAuthorization()}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  if (!response.ok)
    throw new Error(`Failed to get access token: ${response.statusText}`)

  const { access_token: accessToken } =
    (await response.json()) as TokenResponse

  return accessToken
}

function getSongData(item: SpotifySong): Song {
  return {
    artist: item.artists.map(({ name }) => name).join(', '),
    image: item.album.images[2]?.url,
    title: item.name,
    url: item.external_urls.spotify,
    type: 'song',
    previewUrl: item.preview_url
  }
}

function getPlaylistData(item: SpotifyPlaylist): Playlist {
  const imageUrl = item.images
    ? item.images[2]?.url ||
      item.images[1]?.url ||
      item.images[0]?.url ||
      'default_image_url'
    : 'default_image_url'
  return {
    image: imageUrl,
    title: item.name,
    url: item.external_urls.spotify,
    count: item.tracks.total,
    public: item.public,
    owner: item.owner.id,
    type: 'playlist'
  }
}

async function getNowPlaying(): Promise<CurrentSong> {
  type CurrentlyPlayingResponse = {
    is_playing: boolean
    item: SpotifySong
  }

  try {
    const { item, is_playing: isPlaying } =
      await fetchSpotifyAPI<CurrentlyPlayingResponse>(CURRENTLY_PLAYING_URL)

    if (!item) {
      return { isPlaying: false }
    }

    const song: Song = { isPlaying, ...getSongData(item) }
    return song
  } catch (error) {
    return { isPlaying: false }
  }
}

async function getPlaylists(): Promise<Playlist[]> {
  type PlaylistsResponse = { items: SpotifyPlaylist[] }

  try {
    const params = new URLSearchParams({ limit: '50' }).toString()
    const { items } = await fetchSpotifyAPI<PlaylistsResponse>(
      `${PLAYLISTS_URL}?${params}`
    )
    const playlists = items
      ? items
          .map(getPlaylistData)
          .filter(
            (playlist) =>
              playlist.public && playlist.owner === 'qat10h1tw0e8pq7rkf3rui3d1'
          )
      : []
    return playlists
  } catch (error) {
    console.error(`Error fetching playlists: ${error}`)
    return []
  }
}

async function getTopSongs(): Promise<Song[]> {
  type TopTracksResponse = { items: SpotifySong[] }

  try {
    const params = new URLSearchParams({
      time_range: 'short_term',
      limit: '10'
    }).toString()
    const { items } = await fetchSpotifyAPI<TopTracksResponse>(
      `${TOP_TRACKS_URL}?${params}`
    )
    const topSongs = items.map(getSongData)
    return topSongs
  } catch (error) {
    console.error(`Error fetching top songs: ${error}`)
    return []
  }
}

export type { Playlist, Song, CurrentSong }
export { getNowPlaying, getPlaylists, getTopSongs, initializeSpotify }