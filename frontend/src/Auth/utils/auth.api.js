import axios from "axios";
import {backendHost} from '../../App/utils/constants';

export default {
    async registerUser(user) {
         const mutateUserQuery = ` 
            mutation CreateUser($input: UserInput!){
              result: createUser(input: $input) {
                id
                email
              }
            }`;

        let variables = {input: user};

        return await axios.post(`${backendHost}/graphql`, {query: mutateUserQuery, variables: JSON.stringify(variables)});
    },

    async passwordAuth(user) {
        return await axios.post(`${backendHost}/login`, user);
    },

    async facebookAuth(token) {
        return await axios.post(`${backendHost}/login/facebook`, {access_token: token});
    },

    async verifyToken(token) {
        const getLoginTokenQuery = ` 
           query {
                userInfo(token: "${token}") {
                    jwt
                    email
                }
           }`;


        return await axios.post(`${backendHost}/graphql`, {query: getLoginTokenQuery},
            {headers: {Authorization: `JWT ${token}`}});
    },
}