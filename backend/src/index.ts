import { config } from 'dotenv';
import { APIServer } from './APIServer';
import { MongoProcess } from './DBConnection';

// Initializes .ENV Config
config();

// Initializes PORT number
const getPortNumber = () => {
	let PORT: number = 5000;

	if(typeof process.env.PORT === "number") PORT = process.env.PORT;

	return PORT;
}

// Initializes MongoDB Process
const connectionURI = process.env.MONGO_CONNECTION;
if(connectionURI !== undefined) new MongoProcess(connectionURI);

// Initializes API Server
export const server = new APIServer(getPortNumber());
