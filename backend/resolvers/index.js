const Message = require('../models/Message');
const User = require('../models/User');
const Game = require('../models/Game');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();
const MESSAGE_POSTED = 'MESSAGE_POSTED';

const resolvers = {
  Query: {
    messages: async (_, { chatRoomId }) => {
      return Message.find({ chatRoomId }).populate('game');
    },
    games: async () => {
      return Game.find({});
    },
    users: async () => {
      return User.find({});
    },
    
  },
  Mutation: {
    postMessage: async (_, { content, user, chatRoomId, gameId }) => {
      const message = new Message({ content, user, chatRoomId, gameId });
      await message.save();

      pubsub.publish(MESSAGE_POSTED, { messagePosted: message });

      return message;
    },
    createUser: async (_, { username, email, password, favoriteTeam }) => {
      const user = new User({ username, email, password, favoriteTeam });
      await user.save();
      return user;
    },
    createGame: async (_, { teams, startTime }) => {
      const game = new Game({ teams, startTime });
      await game.save();
      return game;
    },

  },
  Subscription: {
    messagePosted: {
      subscribe: () => pubsub.asyncIterator([MESSAGE_POSTED]),
    },
    
  },
  
  Message: {
    game: async (message) => {
      
      return message.gameId ? Game.findById(message.gameId) : null;
    }
  },

};

module.exports = resolvers;