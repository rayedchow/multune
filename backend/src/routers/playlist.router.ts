import { Router } from 'express';
import { PlaylistController } from '../controllers/playlist.controller';

const expressRouter = Router();

expressRouter.get('/', async (req, res) => {
	const { playlistID } = req.body;
	if(!playlistID) return res.status(400).json({ error: 'PLAYLISTID Param is not defined.' });
	return res.json(await PlaylistController.getPlaylist(playlistID));
});

expressRouter.post('/createPlaylist', async (req, res) => {
	const { playlistData } = req.body;
	return res.json(await PlaylistController.createPlaylist(playlistData));
});

expressRouter.post('/addSong', async (req, res) => {
	const { userID, playlistID, songData } = req.body;
	return res.json(await PlaylistController.addSong(userID, playlistID, songData));
});

export default expressRouter;
