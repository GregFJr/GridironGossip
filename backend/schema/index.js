const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar DateTime

  type Game {
    id: ID!
    teams: [String!]!
    startTime: DateTime!
    
  }

  type Message {
    id: ID!
    content: String!
    user: String!
    timestamp: DateTime!
    chatRoomId: ID!
    game: Game
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    favoriteTeam: String!
  }

  type Query {
    messages(chatRoomId: ID!): [Message!]
    games: [Game!]!
    game(id: ID!): Game
    users: [User!]!
  }

  type Mutation {
    postMessage(content: String!, user: String!, chatRoomId: ID!): Message!
    createUser(username: String!, email: String!, password: String!, favoriteTeam: String!): User!
    createGame(teams: [String!]!, startTime: DateTime!): Game
    signUp(username: String!, email: String!, password: String!): String
    signIn(email: String!, password: String!): String
    
  }

  type Subscription {
    messagePosted(chatRoomId: ID!): Message!
    
  }
`;

module.exports = typeDefs;

