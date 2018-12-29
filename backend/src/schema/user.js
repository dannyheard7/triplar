import {gql} from 'apollo-server-express';

export default gql`
    directive @hasRole(role: String) on FIELD_DEFINITION

  extend type Query {
    users: [User!] @hasRole(role: "ADMIN")
    user(id: ID!): User!
  }
  
  extend type Mutation {
    createUser(input: UserInput!): User!
    tokenAuth(email: String!, password: String!): User!
    verifyToken(token: String!): User!
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
