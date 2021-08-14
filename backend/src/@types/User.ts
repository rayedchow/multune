import { prop, modelOptions, Severity } from '@typegoose/typegoose';

@modelOptions({
	options: {
		allowMixed: Severity.ALLOW
	}
})
export class User {

	@prop({ required: true })
	public email?: string;
	
	@prop({ required: true })
	public playlistID?: string[];

	public _id?: string;

}
