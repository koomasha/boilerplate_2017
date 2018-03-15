// tslint:disable
// graphql typescript definitions

declare namespace GqlTypes {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation | ISubscription;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    message: string;            // Required for all errors
    locations?: Array<IGraphQLResponseErrorLocation>;
    [propName: string]: any;    // 7.2.2 says 'GraphQL servers may provide additional entries to error'
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