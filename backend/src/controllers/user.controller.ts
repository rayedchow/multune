import { UserService } from "../services/user.service";

export class UserController {
	
	static async getUser(userEmail: string) {
		
		// Use the User Service to be able to get the user data that is linked with the email provided
		try {
			const user = await UserService.getUserData(userEmail);

			// Return a new user if user associated with given email does not exist
			if(!user) {
				const newUser = await UserService.createUser(userEmail);
				return {...newUser, new: true};
			}

			// If exists, simply return retrieved user.
			return user;
		} catch(err) {

			// Throws/returns Error
			console.error(err);
			return ({
				error: 'Error when using UserService to get user data.'
			});
		
		}

	}
}
