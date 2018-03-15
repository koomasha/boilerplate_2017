export interface SelectionOnMyUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  defaultView: string;
}

export interface MyUser {
  myUser: SelectionOnMyUser | null;
}
export interface UserInput {
  id: string;
}

export interface SelectionOnUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  defaultView: string;
}

export interface User {
  user: SelectionOnUser | null;
}
export interface UserUpdateInput {
  id: string;
  user: {
    id?: string | null;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    startWeekOnMonday?: boolean | null;
    defaultView?: string | null;
  };
}

export interface SelectionOnUserUpdate {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  defaultView: string;
}

export interface UserUpdate {
  userUpdate: SelectionOnUserUpdate;
}