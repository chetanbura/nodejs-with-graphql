import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  status: { type: String, enum: ['active', 'blocked'] }
}, {
  timestamps: true,
})

export const UserModel = mongoose.model('user', userSchema);

export const getUsers = (id) => {
  return User.find().where({ blogId: id });
}

export const getUser = (id) => {
  return UserModel.findById(id);
}

export const insertUser = (firstName, lastName, email, password) => {
  return new User({ firstName, lastName, email, password, status: 'active' });
}

export const updateUser = (id, firstName, lastName, email, password, status) => {
  return UserModel.findByIdAndUpdate(id, { firstName, lastName, email, password, status });
}

export const deleteUser = (id) => {
  return UserModel.findByIdAndDelete(id);
}

