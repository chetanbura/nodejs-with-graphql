import { CommentModel } from '../../model/commentModel.js';
import { isUserAuthorizeCheck } from '../../utils/auth.js';

export const commentResolver = async (parent, { id }) => {
  const error = new Error('Comment not found!');
  try {
    const comment = await CommentModel.findById(id);
    if (comment) {
      return comment;
    } else {
      throw error;
    }
  } catch {
    throw error;
  }
};

export const commentsResolver = async () => {
  const comments = await CommentModel.find();
  return comments;
};

export const createCommentResolver = async (
  parent,
  { input: { blogId, title, content } },
  { authUserId }
) => {
  try {
    isUserAuthorizeCheck(authUserId);
    const comment = await new CommentModel({
      userId: authUserId,
      blogId,
      title,
      content,
    }).save();
    return {
      message: 'Comment successfully created!',
      comment: {
        id: comment._id.toString(),
        blogId: comment.blogId,
        userId: comment.userId,
        title: comment.title,
        content: comment.content,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      },
    };
  } catch (e) {
    const error = new Error('Comment creation failed!');
    throw error;
  }
};

export const updateCommentResolver = async (
  parent,
  { input: { id, blogId, title, content } },
  { authUserId }
) => {
  try {
    isUserAuthorizeCheck(authUserId);
    const comment = await CommentModel.findByIdAndUpdate(id, {
      userId: authUserId,
      blogId,
      title,
      content,
    });
    if (comment) {
      comment.save();
      return {
        message: 'Comment successfully updated!',
        comment: {
          id: comment._id.toString(),
          blogId: comment.blogId,
          userId: comment.userId,
          title: comment.title,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        },
      };
    } else {
      return {
        message: 'Comment not found!',
        comment: null,
      };
    }
  } catch (e) {
    const error = new Error('Comment update failed!');
    throw error;
  }
};

export const deleteCommentResolver = async (parent, { id }, { authUserId }) => {
  try {
    isUserAuthorizeCheck(authUserId);
    const blog = await CommentModel.findByIdAndDelete(id);
    if (blog) {
      return {
        message: 'Blog deleted successfully!',
        commentId: id,
      };
    } else {
      return {
        message: 'Blog not found!',
        commentId: null,
      };
    }
  } catch {
    const error = new Error('Blog delete failed!');
    throw error;
  }
};
