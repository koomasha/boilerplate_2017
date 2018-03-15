import UserBL from '../../bl/user';
import {User} from '../../dal/models/user';
import GqlTypes from '../_generated/gqlTypes';
import IContext from '../iContext';
const resolverMap = {
	Mutation: {
		userUpdate(obj, args: {user: GqlTypes.IUserInput}, context: IContext, info): Promise<User> {
			return UserBL.updateUserById(context.userId, args.user);
		},
	},

	Query: {
		user(obj, args: {id: string}, context: IContext, info): Promise<User> {
			return UserBL.getUserById(args.id);
		},
		myUser(obj, args: {}, context: IContext, info): Promise<User> {
			return UserBL.getUserById(context.userId);
		},
	},
};

export = resolverMap;
