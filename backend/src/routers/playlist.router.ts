import { Router } from 'express';
import { PlaylistController } from '../controllers/playlist.controller';

const expressRouter = Router();

expressRouter.get('/', async (req, res) => {
	const { playlistID } = req.body;
	return res.json(PlaylistController.getPlaylist(playlistID));
});

module.exports = expressRouter;
