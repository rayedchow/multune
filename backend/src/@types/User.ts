import { prop } from '@typegoose/typegoose';

export class User {

	@prop({ required: true })
	public email?: string;
	
	@prop({ required: true })
	public playlistID?: string[];

	public _id?: string;

}
