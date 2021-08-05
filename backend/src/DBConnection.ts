import { connect } from 'mongoose';

export class MongoProcess {
	
	constructor(connectionURI: string) {

		connect(
			connectionURI,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true
			},
			(err) => {
				if(err) return console.error(err);
				console.log('🚀 Backend MongoDB Process Started');
			}
		);

	}

}
