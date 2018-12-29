import Q from "q";
import axios from "axios";
import {backendHost} from 'App/utils/constants';

export default {
    registerUser(user) {
         const mutateUserQuery = ` 
            mutation CreateUser($input: UserInput!){
              result: createUser(input: $input) {
                id
                email
              }
            }`;

        let variables = {input: user};

        return Q.when(axios.post(`${backendHost}/graphql`, {query: mutateUserQuery, variables: JSON.stringify(variables)}));
    },

    getLoginToken(user) {
        const getLoginTokenQuery = ` 
           mutation TokenAuth($email: String!, $password: String!) {
                result: tokenAuth(email: $email, password: $password) {
                    jwt
                    email
                }
           }`;

        return Q.when(axios.post(`${backendHost}/graphql`, {query: getLoginTokenQuery, variables: user}));
    },

    verifyToken(token) {
        const getLoginTokenQuery = ` 
           mutation VerifyToken($token: String!) {
                result: verifyToken(token: $token) {
                    jwt
                    email
                }
           }`;


        return Q.when(axios.post(`${backendHost}/graphql`, {query: getLoginTokenQuery, variables: {token: token}}));
    },
}