import User from "../../models/auth/auth.models.js";
import bcrypt from "bcrypt";

export const signUpService = async (data) => {
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new Error("User already Exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser = await User.create({ ...data, password: hashedPassword });
  return newUser;
};

export const signInService = async (data) => {
  const existingUser = await User.findOne({ email: data.email });

  if (!existingUser) {
    throw new Error("user does not exist");
  }

  const isPasswordCorrect = await bcrypt.compare(
    data.password,
    existingUser.password,
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid password");
  }

  return existingUser;
};
