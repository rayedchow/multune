import { config } from 'dotenv';
import { APIServer } from './APIServer';
import { MongoProcess } from './DBConnection';
import UserRouter from './routers/user.router';
import PlaylistRouter from './routers/playlist.router';

// Initializes .ENV Config
config();

// Initializes PORT number
const getPortNumber = () => {
	let PORT: number = 80;

	if(typeof process.env.PORT === "number") PORT = process.env.PORT;

	return PORT;
}

// Initializes MongoDB Process
const connectionURI = process.env.MONGO_CONNECTION;
if(connectionURI !== undefined) new MongoProcess(connectionURI);

// Initializes API Server
export const server = new APIServer(getPortNumber());

server.GetExpressServer().use('/user/', UserRouter);
server.GetExpressServer().use('/playlist/', PlaylistRouter);
