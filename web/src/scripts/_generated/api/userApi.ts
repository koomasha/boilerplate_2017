
	// tslint:disable
	declare var window: any;
	import * as inter from './iUserApi';
	import GqlTypes from '../gqlTypes';
	export default class UserApi {
		public static async myUser(): Promise<GqlTypes.IQuery> {
			const query = "query myUser {\n\t\t      myUser {\n                        id\n                        email\n                        firstName\n                        lastName\n                        defaultView\n\t\t      }\n\t      }";
			const res:GqlTypes.IGraphQLResponseRoot = await window.__fetch.query({ query, variables: {} });
			return res.data as GqlTypes.IQuery;
		}
		public static async user(args: inter.UserInput): Promise<GqlTypes.IQuery> {
			const query = "query user($id: ID!){\n                  user(id: $id) {\n                  id\n                  email\n                  firstName\n                  lastName\n                  defaultView\n                  }\n            }";
			const res:GqlTypes.IGraphQLResponseRoot = await window.__fetch.query({ query, variables: args });
			return res.data as GqlTypes.IQuery;
		}
		public static async userUpdate(args: inter.UserUpdateInput): Promise<GqlTypes.IMutation> {
			const query = "mutation userUpdate($id: ID!, $user: UserInput!){\n                  userUpdate(id: $id, user: $user) {\n                  id\n                  email\n                  firstName\n                  lastName\n                  defaultView\n                  }\n            }";
			const res:GqlTypes.IGraphQLResponseRoot = await window.__fetch.query({ query, variables: args });
			return res.data as GqlTypes.IMutation;
		}
		
	}
	// tslint:enable
	