const { gql } = require('apollo-server');
const typeDefs = gql`
  type SpaceshipProps {
    speed: Int
    capacity: Int
  }

  type Spaceship {
    _id: String!
    name: String
    model: String
    props: SpaceshipProps
  }

  type Query {
    spaceships: [Spaceship]
    spaceship(id: String!): Spaceship
  }

  input SpaceshipInput {
    name: String
    model: String
  }

  type Mutation {
    buildSpaceship(input: SpaceshipInput!): Spaceship
    upgradeSpaceship(id: String!, model: String!): Spaceship
  }
`;

module.exports = { typeDefs };
