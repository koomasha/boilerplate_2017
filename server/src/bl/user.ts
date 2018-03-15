import * as Bcrypt from 'bcrypt';
import GqlTypes from '../api/_generated/gqlTypes';
import {User, UserModel} from '../dal/models/user';
import {eExceptionTypes, Exception} from '../exception';
class UserBL {
	public static async getUserById(id: string): Promise<User> {
		return await UserModel.findById(id);
	}
	public static async createUser(user: GqlTypes.IAuthLocalInput): Promise<User> {
		let newUser = await UserBL.getUserByEmail(user.email);
		if (newUser) {
			throw new Exception('User with this email already exist', eExceptionTypes.Show);
		}
		user.password =  Bcrypt.hashSync(user.password.toString(), 10);
		newUser =  await new UserModel(user).save();
		return newUser;
	}
	public static async updateUserById(id: string, user: GqlTypes.IUserInput): Promise<User> {
		return await UserModel.findOneAndUpdate({_id: id }, {$set: user}, {new: true});
	}
	public static async getUserByEmail(email: string): Promise<User|null> {
		return await UserModel.findOne({email});
	}

	public static async getOrCreateUser(user: GqlTypes.IAuthLocalInput): Promise<User> {
		let existingUser = await UserBL.getUserByEmail(user.email);
		if (!existingUser) {
			existingUser = await UserBL.createUser(user);
		}
		return existingUser;
	}
}

export default UserBL;
