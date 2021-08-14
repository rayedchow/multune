import UserModel from '../models/user.model';
import { User } from '../@types/User';

export class UserService {

	static async getUserData(email: string) {
		const user = await UserModel.findOne({ email });

		return user;
	}

	static async createUser(email: string) {
		const user = await UserModel.findOne({ email });

		if(!user) {
			const newUserObj: User = {
				email,
				playlistID: []
			}
			const newUser = new UserModel(newUserObj);

			// Saves the new user into the database
			const savedUser = await newUser.save();
			return { ...newUserObj, _id: savedUser._id };
		}

		return user;
	}

}
