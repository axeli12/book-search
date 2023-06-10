const { Book, User} = require('../models');
const {AuthenticationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user){
                const userData = await User.findOne({_id: context.user._id})
                    .select('-__v -password')
                    .populate('books')

                return userData;
            }

            throw new AuthenticationError('Please log in!')
        }
    },
    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user){
                throw new AuthenticationError('Email and Password are incorrect')
            }

            const token = signToken(user);
            return {token, user};
        }
    }
}

module.exports = resolvers;