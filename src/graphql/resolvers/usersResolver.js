import { UserModel } from '../../model/usersModel.js';
import { isUserAuthorizeCheck } from '../../utils/auth.js';

export const userResolver = async (parent, args, { authUserId }) => {
  const error = new Error('User not found!');
  try {
    isUserAuthorizeCheck(authUserId);
    const user = await UserModel.findById(authUserId);
    if (user) {
      return user;
    } else {
      throw error;
    }
  } catch {
    throw error;
  }
};

export const usersResolver = async (parent, args, { authUserId }) => {
  isUserAuthorizeCheck(authUserId);
  const users = await UserModel.find();
  return users;
};

export const updateUserResolver = async (
  parent,
  { input: { firstName, lastName, status } },
  { authUserId }
) => {
  try {
    isUserAuthorizeCheck(authUserId);
    const user = await UserModel.findByIdAndUpdate(authUserId, {
      firstName,
      lastName,
      status,
    });
    if (user) {
      user.save();
      return {
        message: 'User successfully updated!',
        user: {
          id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          status: user.status,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      };
    } else {
      return {
        message: 'User not found!',
        user: null,
      };
    }
  } catch (e) {
    const error = new Error('User update failed!');
    throw error;
  }
};

export const deleteUserResolver = async (parent, { id }, { authUserId }) => {
  try {
    isUserAuthorizeCheck(authUserId);
    const user = await UserModel.findByIdAndDelete(id);
    if (user) {
      return {
        message: 'User deleted successfully!',
        userId: id,
      };
    } else {
      return {
        message: 'User not found!',
        userId: null,
      };
    }
  } catch {
    const error = new Error('User delete failed!');
    throw error;
  }
};
