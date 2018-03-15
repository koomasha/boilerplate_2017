module.exports = {
	myUser: `query myUser {
		      myUser {
                        id
                        email
                        firstName
                        lastName
                        defaultView
		      }
	      }`,
	user: `query user($id: ID!){
                  user(id: $id) {
                  id
                  email
                  firstName
                  lastName
                  defaultView
                  }
            }`,
	userUpdate: `mutation userUpdate($id: ID!, $user: UserInput!){
                  userUpdate(id: $id, user: $user) {
                  id
                  email
                  firstName
                  lastName
                  defaultView
                  }
            }`
};
