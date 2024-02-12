import { User, Book } from '../models.js';
import { AuthenticationError } from 'apollo-server-express';
import { signToken } from '../utils/auth.js';

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).populate('savedBooks');
                return userData;
            }
            throw new AuthenticationError('Not logged in!');
        },
        searchBooks: async (parent, { searchTerm }, context) => {
            // Implement search functionality here
            const books = await Book.find({ $text: { $search: searchTerm } });
            return books;
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect email or password!');
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('Incorrect email or password!');
            }

            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookData } },
                    { new: true }
                ).populate('savedBooks');

                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in to save books!');
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } }, // Remove book from savedBooks array
                    { new: true }
                ).populate('savedBooks');

                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in to remove books!');
        }
    },
};

export { resolvers };