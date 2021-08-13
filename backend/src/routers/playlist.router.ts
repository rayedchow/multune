import { Router } from 'express';
import { PlaylistController } from '../controllers/playlist.controller';

const expressRouter = Router();

expressRouter.get('/', async (req, res) => {
	const { playlistID } = req.body;
	return res.json(await PlaylistController.getPlaylist(playlistID));
});

expressRouter.post('/createPlaylist', async (req, res) => {
	const { playlistData } = req.body;
	return res.json(await PlaylistController.createPlaylist(playlistData));
});

module.exports = expressRouter;
