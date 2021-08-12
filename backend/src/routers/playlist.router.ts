import { Router } from 'express';
import { PlaylistController } from '../controllers/playlist.controller';

const expressRouter = Router();

expressRouter.get('/', async (req, res) => {
	const { playlistID } = req.body;
	return PlaylistController.getPlaylist(playlistID);
});

module.exports = expressRouter;
