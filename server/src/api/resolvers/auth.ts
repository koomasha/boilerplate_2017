import * as Bcrypt from 'bcrypt';
import * as Configuration from 'config';
import * as Fetch from 'node-fetch';
import UserBL from '../../bl/user';
import {User} from '../../dal/models/user';
import { eExceptionTypes, Exception } from '../../exception';
import GqlTypes from '../_generated/gqlTypes';
import IContext from '../iContext';

const resolverMap = {
	Mutation: {
		async authLocal(
			obj,
			args: {user: GqlTypes.IAuthLocalInput, isSignup: boolean},
			context: IContext,
			info,
		): Promise<User> {
			try {
				let user: User;
				if (args.isSignup) {
					user = await UserBL.createUser(args.user);
				} else {
					user = await UserBL.getUserByEmail(args.user.email);
					if (!user) {
						throw new Exception('User with this email does not exist', eExceptionTypes.Show);
					} else if (!Bcrypt.compareSync(args.user.password, user.password)) {
						throw new Exception('Invalid password', eExceptionTypes.Show);
					}
				}
				context.req.session.userId = user.id;
				return user;
			} catch (err) {
				context.req.session.destroy();
				throw err;
			}
		},
		async authFB(obj, args: {code: string}, context: IContext, info): Promise<User> {
			try {
				const tokenResponse = await (
					await Fetch(Configuration.get('PROJECT_NAME.serverConfig').fbAccessTokenReqUrl + args.code)
				).json();
				const profileResponse = await (
					await Fetch(Configuration.get('PROJECT_NAME.serverConfig').fbGetUserProfileUrl + tokenResponse.access_token)
				).json();
				const user = await UserBL.getOrCreateUser({
					email: profileResponse.email.replace('\\u0040', '@'),
					fbId: profileResponse.id,
					firstName: profileResponse.first_name,
					lastName: profileResponse.last_name,
					password: Configuration.get('PROJECT_NAME.serverConfig').socialLoginGenericPassword,
				});
				context.req.session.userId = user.id;
				return user;
			} catch (err) {
				context.req.session.destroy();
				throw err;
			}
		},
		async authGoogle(obj, args: {code: string}, context: IContext, info): Promise<User> {
			try {
				const tokenResponse = await (
					await Fetch(Configuration.get('PROJECT_NAME.serverConfig').googleAccessTokenReqUrl + args.code, { method: 'POST'})
				).json();

				const profileResponse = await (
					await Fetch(Configuration.get('PROJECT_NAME.serverConfig').googleGetUserProfileUrl + tokenResponse.access_token)
				).json();
				const user = await UserBL.getOrCreateUser({
					email: profileResponse.email,
					fbId: profileResponse.id,
					firstName: profileResponse.name.split(' ')[0],
					lastName: (profileResponse.name.split(' ')[1]) ? (profileResponse.name.split(' ')[1]) : '',
					password: Configuration.get('PROJECT_NAME.serverConfig').socialLoginGenericPassword,
				});
				context.req.session.userId = user.id;
				return user;
			} catch (err) {
				context.req.session.destroy();
				throw err;
			}
		},
		logout(obj, args: {}, context: IContext, info) {
			context.req.session.destroy();
		},
	},
};

export = resolverMap;
