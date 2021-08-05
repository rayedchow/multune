import { APIServer } from './APIServer';
import { config } from 'dotenv';

// Initializes .ENV Config
config();

// Initializes PORT number
const getPortNumber = () => {
	let PORT: number = 5000;

	if(typeof process.env.PORT === "number") PORT = process.env.PORT;
	
	return PORT;
}

export const server = new APIServer(getPortNumber());
