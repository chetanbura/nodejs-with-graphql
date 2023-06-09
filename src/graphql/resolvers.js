import {
  deleteUserResolver,
  updateUserResolver,
  userResolver,
  usersResolver,
} from './resolvers/usersResolver.js';
import { signInResolver, signUpResolver } from './resolvers/authResolver.js';
import {
  blogResolver,
  blogsResolver,
  updateBlogResolver,
  deleteBlogResolver,
  createBlogResolver,
} from './resolvers/blogsResolver.js';
import {
  commentResolver,
  commentsResolver,
  createCommentResolver,
  deleteCommentResolver,
  updateCommentResolver,
} from './resolvers/commentsResolver.js';

export const resolvers = {
  Query: {
    user: userResolver,
    users: usersResolver,
    blog: blogResolver,
    blogs: blogsResolver,
    comment: commentResolver,
    comments: commentsResolver,
  },
  Mutation: {
    signIn: signInResolver,
    signUp: signUpResolver,
    updateUser: updateUserResolver,
    deleteUser: deleteUserResolver,
    createBlog: createBlogResolver,
    updateBlog: updateBlogResolver,
    deleteBlog: deleteBlogResolver,
    createComment: createCommentResolver,
    updateComment: updateCommentResolver,
    deleteComment: deleteCommentResolver,
  },
};
