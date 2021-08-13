import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const expressRouter = Router();

expressRouter.get('/', async (req, res) => {
	const { email } = req.body;
	return res.json(await UserController.getUser(email));
});

module.exports = expressRouter;
