import PlaylistModel from '../models/playlist.model';
import { Playlist } from '../@types/Playlist';
import { Song } from '../@types/Song';

export class PlaylistService {
	
	static getPlaylist(playlistID: string) {
		const playlist = PlaylistModel.findOne({ _id: playlistID });

		// If exists, simply return playlist
		return playlist;
	
	}

	static async createPlaylist(playlistData: Playlist) {
		
		// Uses playlist data to create Playlist Data in DB
		const newPlaylist = new PlaylistModel(playlistData);
		const savedPlaylist = await newPlaylist.save();

		// Returns new playlist data
		return savedPlaylist;
	}

	static async addSong(playlistID: string, songData: Song) {
		
		// Tries to find playlist with provided playlistID
		const playlist = await PlaylistModel.findOne({ _id: playlistID });

		// If does not exist in DB, return empty object
		if(!playlist) return playlist;

		// NOTE(vamp): i had to do this because typescript thinks that the songs list could be null.
		if(!playlist.songs) playlist.songs = [];
		
		// If does exist, add song to playlist songs array.
		playlist.songs.push(songData);
		return await playlist.save();
	}

}
