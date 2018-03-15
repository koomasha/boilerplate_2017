// tslint:disable
// graphql typescript definitions

declare namespace GqlTypes {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation | ISubscription;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
ping: string | null;
user: IUser | null;
myUser: IUser | null;
}

interface IUserOnQueryArguments {
id: string;
}

interface IUser {
__typename: "User";
id: string;
email: string;
password: string;
firstName: string;
lastName: string;
startWeekOnMonday: boolean;
defaultView: string;
}

interface IMutation {
__typename: "Mutation";
ping: string | null;
authLocal: IUser;
authFB: IUser;
authGoogle: IUser;
logout: boolean | null;
userUpdate: IUser;
}

interface IAuthLocalOnMutationArguments {
user: IAuthLocalInput;
isSignup?: boolean | null;
}

interface IAuthFBOnMutationArguments {
code: string;
}

interface IAuthGoogleOnMutationArguments {
code: string;
}

interface IUserUpdateOnMutationArguments {
id: string;
user: IUserInput;
}

interface IAuthLocalInput {
email: string;
password: string;
firstName?: string | null;
lastName?: string | null;
fbId?: number | null;
}

interface IUserInput {
id?: string | null;
email?: string | null;
firstName?: string | null;
lastName?: string | null;
startWeekOnMonday?: boolean | null;
defaultView?: string | null;
}

interface ISubscription {
__typename: "Subscription";
ping: string | null;
}
}

// tslint:enable

 export default GqlTypes;