import { BlogModel } from '../../model/blogModel.js';
import { isUserAuthorizeCheck } from '../../utils/auth.js';

export const blogResolver = async (parent, { id }) => {
  const error = new Error('Blog not found!');
  try {
    const blog = await BlogModel.findById(id);
    if (blog) {
      return blog;
    } else {
      throw error;
    }
  } catch {
    throw error;
  }
};

export const blogsResolver = async () => {
  const blogs = await BlogModel.find();
  return blogs;
};

export const createBlogResolver = async (
  parent,
  { input: { title, content } },
  { authUserId }
) => {
  try {
    isUserAuthorizeCheck(authUserId);
    const blog = await new BlogModel({
      title,
      content,
      userId: authUserId,
    }).save();
    return {
      message: 'Blog successfully created!',
      blog: {
        id: blog._id.toString(),
        title: blog.title,
        content: blog.content,
        userId: blog.userId,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      },
    };
  } catch (e) {
    const error = new Error('Blog creation failed!');
    throw error;
  }
};

export const updateBlogResolver = async (
  parent,
  { input: { id, title, content } },
  { authUserId }
) => {
  try {
    isUserAuthorizeCheck(authUserId);
    const blog = await BlogModel.findByIdAndUpdate(id, {
      title,
      content,
      userId: authUserId,
    });
    if (blog) {
      blog.save();
      return {
        message: 'Blog successfully updated!',
        blog: {
          id: blog._id.toString(),
          title: blog.title,
          content: blog.content,
          userId: blog.userId,
          createdAt: blog.createdAt,
          updatedAt: blog.updatedAt,
        },
      };
    } else {
      return {
        message: 'Blog not found!',
        blog: null,
      };
    }
  } catch (e) {
    const error = new Error('Blog update failed!');
    throw error;
  }
};

export const deleteBlogResolver = async (parent, { id }) => {
  try {
    isUserAuthorizeCheck(authUserId);
    const blog = await BlogModel.findByIdAndDelete(id);
    if (blog) {
      return {
        message: 'Blog deleted successfully!',
        blogId: id,
      };
    } else {
      return {
        message: 'Blog not found!',
        blogId: null,
      };
    }
  } catch {
    const error = new Error('Blog delete failed!');
    throw error;
  }
};
