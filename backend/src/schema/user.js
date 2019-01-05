import {gql} from 'apollo-server-express';

export default gql`
    directive @hasRole(role: String) on FIELD_DEFINITION

  extend type Query {
    users: [User!] @hasRole(role: "ADMIN")
    user(id: ID!): User! @isAuthenticated
    userInfo(token: String!): User! @isAuthenticated
  }
  
  extend type Mutation {
    createUser(input: UserInput!): User!
  }

  type User {
    id: ID
    username: String,
    firstName: String!,
    lastName: String!,
    email: String!,
    jwt: String,
    roles: [Role!]
  }
  
  input UserInput{
    username: String,
    firstName: String!,
    lastName: String!,
    email: String!,
    password: String!
  }   
`;
