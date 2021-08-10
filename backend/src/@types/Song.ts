type SongPlatform = 'SPOTIFY' | 'YOUTUBE' | 'SOUNDCLOUD';

export class Song {
	public name?: string;
	public index?: number;
	public platform?: SongPlatform;
}

