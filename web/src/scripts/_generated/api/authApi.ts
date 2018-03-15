
	// tslint:disable
	declare var window: any;
	import * as inter from './iAuthApi';
	import GqlTypes from '../gqlTypes';
	export default class AuthApi {
		public static async authLocal(args: inter.AuthLocalInput): Promise<GqlTypes.IMutation> {
			const query = "mutation authLocal($user: AuthLocalInput!, $isSignup: Boolean) {\n\t\tauthLocal(user: $user, isSignup: $isSignup) {\n                        id\n                        email\n                        firstName\n                        lastName\n                        defaultView\n                }\n\t    }";
			const res:GqlTypes.IGraphQLResponseRoot = await window.__fetch.query({ query, variables: args });
			return res.data as GqlTypes.IMutation;
		}
		public static async authFB(args: inter.AuthFBInput): Promise<GqlTypes.IMutation> {
			const query = "mutation authFB($code: String!){\n                authFB(code: $code){\n                        id\n                        email\n                        firstName\n                        lastName\n                        defaultView\n                }\n        }";
			const res:GqlTypes.IGraphQLResponseRoot = await window.__fetch.query({ query, variables: args });
			return res.data as GqlTypes.IMutation;
		}
		public static async authGoogle(args: inter.AuthGoogleInput): Promise<GqlTypes.IMutation> {
			const query = "mutation authGoogle($code: String!){\n                authGoogle(code: $code){\n                        id\n                        email\n                        firstName\n                        lastName\n                        defaultView\n                }\n        }";
			const res:GqlTypes.IGraphQLResponseRoot = await window.__fetch.query({ query, variables: args });
			return res.data as GqlTypes.IMutation;
		}
		public static async logout(): Promise<GqlTypes.IMutation> {
			const query = "mutation logout { \n                        logout \n                }";
			const res:GqlTypes.IGraphQLResponseRoot = await window.__fetch.query({ query, variables: {} });
			return res.data as GqlTypes.IMutation;
		}
		
	}
	// tslint:enable
	