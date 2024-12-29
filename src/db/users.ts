import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
    sessionToken: {
      type: String,
      select: false,
    },
  },
});

export const User = mongoose.model("User", userSchema);

export const getUsers = () => {
  return User.find();
};
export const getUserByEmail = (email: string) => {
  return User.findOne({ email });
};
export const getUserBySessionToken = (sessionToken: string) => {
  return User.findOne({
    "authentication.sessionToken": sessionToken,
  });
};
export const getUserById = (id: string) => {
  return User.findById(id);
};
export const createUser = (values: Record<string, any>) => {
  return new User(values).save().then((user) => user.toObject());
};
export const deleteUserById = (id: string) => {
  return User.findByIdAndDelete(id);
};
export const updateUserById = (id: string, values: Record<string, any>) => {
  return User.findByIdAndUpdate(id, values);
};
