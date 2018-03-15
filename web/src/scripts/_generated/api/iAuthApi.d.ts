export interface AuthLocalInput {
  user: {
    email?: string;
    password?: string;
    firstName?: string | null;
    lastName?: string | null;
    fbId?: number | null;
  };
  isSignup?: boolean | null;
}

export interface SelectionOnAuthLocal {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  defaultView: string;
}

export interface AuthLocal {
  authLocal: SelectionOnAuthLocal;
}
export interface AuthFBInput {
  code: string;
}

export interface SelectionOnAuthFB {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  defaultView: string;
}

export interface AuthFB {
  authFB: SelectionOnAuthFB;
}
export interface AuthGoogleInput {
  code: string;
}

export interface SelectionOnAuthGoogle {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  defaultView: string;
}

export interface AuthGoogle {
  authGoogle: SelectionOnAuthGoogle;
}
export interface Logout {
  logout: boolean | null;
}