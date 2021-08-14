import { prop, modelOptions, Severity } from '@typegoose/typegoose';
import { Song } from './Song';

@modelOptions({
	options: {
		allowMixed: Severity.ALLOW
	}
})
export class Playlist {

	@prop({ required: true })
	public name?: string;

	@prop({ required: true })
	public userID?: string;

	@prop({ required: true })
	public cover?: string;

	@prop({ required: true })
	public isPublic?: string;

	@prop({ required: true })
	public songs?: Song[];

	public _id?: string;
}
