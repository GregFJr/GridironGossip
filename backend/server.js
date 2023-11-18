const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
require('dotenv').config();


const MONGO_DB_URI = process.env.MONGO_DB_URI;

// Connect to MongoDB
mongoose.connect(MONGO_DB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    //For future development
  },
  subscriptions: {
    onConnect: (connectionParams, webSocket) => {
     //For future development
    },
  },
});

// Start the server
server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
