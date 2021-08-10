import { PlaylistService } from '../services/playlist.service';
import { UserService } from '../services/user.service';
import { Playlist } from '../@types/Playlist';
import {Song} from '../@types/Song';

export class PlaylistController {
	
	static async getPlaylist(playlistID: string) {

		try {
			const playlistData = PlaylistService.getPlaylist(playlistID);

			// If playlist is not found, return error
			if(!playlistData) return ({
				error: 'Playlist with given playlistID does not exist.'
			});

			// However, if it does exist, simply return the playlist object.
			return playlistData;
		} catch (err) {
			
			// Throws/returns Error
			console.error(err);
			return ({
				error: 'Error when using PlaylistService to get playlist data.'
			});

		}
	}

	static async createPlaylist(playlistData: Playlist) {
		
		try {

			if(playlistData.userID === undefined) return ({error: 'UserID not defined'});
			const user = await UserService.getUserData(playlistData.userID);
			if(!user) return ({error: 'UserID provided does not exist in database.'});

			if(!user.playlistID || !user._id) return ({ error: 'User possibly does not own this playlist.' });
			if(user.playlistID.includes(user._id)) {
				
				// Creates new playlist usind PlaylistService
				const newPlaylist = await PlaylistService.createPlaylist(playlistData);
				
				// Adding playlist to user's owned playlists
				user.playlistID.push(newPlaylist._id);
				await user.save();

				return newPlaylist;
			}

		} catch(err) {
			
			// Throws/returns Error
			console.error(err);
			return ({
				error: 'Error when creating playlist using given data.'
			});
		}

	}

	static async addSong(userID: string, playlistID: string, songData: Song) {
		
		try {
			// Error checking
			if(await PlaylistService.getPlaylist(playlistID) === null) return { error: 'Playlist does not exist' };
			
			const user = await UserService.getUserData(userID);

			if((user === null) || ((user.playlistID) && (user.playlistID.includes(playlistID)))) {
				return ({
					error: 'Either user data or playlist data does not exist using provided userID/playlistID'
				});
			}

			// Using PlaylistService to add song to playlist
			const updatedPlaylist = await PlaylistService.addSong(playlistID, songData);

			if(updatedPlaylist === null) return { error: 'Error when using PlaylistService to add song to playist using given data.' };
			return updatedPlaylist;

		} catch (err) {
			
			// Throws/returns Error
			console.error(err);
			return ({
				error: 'Error when adding a song to playlist using given data.'
			});
		}

	}

}
