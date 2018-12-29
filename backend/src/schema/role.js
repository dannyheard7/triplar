import {gql} from 'apollo-server-express';

export default gql`
  type Role {
    id: ID
    name: String
  }
`;
