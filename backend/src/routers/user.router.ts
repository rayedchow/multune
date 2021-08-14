import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const expressRouter = Router();

expressRouter.get('/', async (req, res) => {
	const { email } = req.body;
	if(!email) return res.status(400).json({ error: 'EMAIL Param is not defined.' });
	return res.json(await UserController.getUser(email));
});

export default expressRouter;
