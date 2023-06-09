import { UserModel } from '../../model/usersModel.js';
import { generateJWT } from '../../utils/auth.js';

export const signInResolver = async (
  parent,
  { input: { email, password } }
) => {
  const user = await UserModel.findOne({ email, password });
  if (user) {
    const token = generateJWT({
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
    });
    return { token };
  } else {
    const error = new Error('Unauthorize, please verify your credentials!');
    throw error;
  }
};

export const signUpResolver = async (
  parent,
  { input: { firstName, lastName, email, password } }
) => {
  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    const error = new Error('User already exists!');
    throw error;
  }
  const user = await new UserModel({
    firstName,
    lastName,
    email,
    password,
    status: 'active',
  }).save();
  if (user) {
    return { ...user, id: user._id.toString() };
  } else {
    const error = new Error('User creation failed!');
    throw error;
  }
};
