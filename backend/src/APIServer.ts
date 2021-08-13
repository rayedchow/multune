import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';

export class APIServer {
	app: Express;
	
	constructor(PORT: number) {
		this.app = express();

		// Implementing HELMET Security as Middleware
		this.app.use(helmet());

		// If PRODUCTION Status, Use CORS
		if(PORT !== 5000) {
			this.app.use(cors());
		}
		
		// Starts API Server
		this.app.listen(PORT, () => {
			console.log(`🚀 Backend API Server Started on Port ${PORT}`);
		});
	}

	get GetExpressServer(): Express {
		return this.app;
	}

}
