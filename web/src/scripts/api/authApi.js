module.exports = {
	authLocal: `mutation authLocal($user: AuthLocalInput!, $isSignup: Boolean) {
		authLocal(user: $user, isSignup: $isSignup) {
                        id
                        email
                        firstName
                        lastName
                        defaultView
                }
	    }`,
	authFB: `mutation authFB($code: String!){
                authFB(code: $code){
                        id
                        email
                        firstName
                        lastName
                        defaultView
                }
        }`,
	authGoogle: `mutation authGoogle($code: String!){
                authGoogle(code: $code){
                        id
                        email
                        firstName
                        lastName
                        defaultView
                }
        }`,
	logout: `mutation logout { 
                        logout 
                }`,
};
