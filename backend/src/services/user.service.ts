import UserModel from '../models/user.model';

export class UserService {

	static async getUserData(email: string) {
		const user = await UserModel.findOne({ email });

		return user;
	}

	static async createUser(email: string) {
		const user = await UserModel.findOne({ email });

		if(!user) {
			const newUser = new UserModel({
				email,
				playlistID: []
			});

			// Saves the new user into the database
			const savedUser = await newUser.save();
			return savedUser;
		}

		return user;
	}

}
