import Q from "q";
import axios from "axios";

export default {
    registerUser(user) {
         const mutateUserQuery = ` 
            mutation CreateUser($input: UserMutationInput!){
              result: createUser(input: $input) {
                user {
                    id
                    email
                }
                errors {
                  field
                  messages
                }
              }
            }`;

        let variables = {input: user};

        return Q.when(axios.post("/api/graphql", {query: mutateUserQuery, variables: JSON.stringify(variables)}));
    },

    getLoginToken(user) {
        const getLoginTokenQuery = ` 
           mutation TokenAuth($email: String!, $password: String!) {
                result: tokenAuth(email: $email, password: $password) {
                    token
                    user {
                        email
                    }
                }
           }`;

        return Q.when(axios.post("/api/graphql", {query: getLoginTokenQuery, variables: user}));
    },
}