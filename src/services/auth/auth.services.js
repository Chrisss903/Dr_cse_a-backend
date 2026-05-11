import User from "../../models/auth/auth.models.js";
import { sendEmail } from "../../utils/sendEmail.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const signUpService = async (data) => {
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const verificationToken = crypto.randomBytes(32).toString("hex");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await User.create({
    ...data,
    password: hashedPassword,
    verification_code: verificationToken,
    is_verified: false,
  });

  console.log(newUser, "newUser");

  const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
  console.log(verificationLink, "verificationLinkverificationLink");

  try {
    await sendEmail(data.email, verificationLink);
  } catch (err) {
    console.error("Email failed:", err);
    throw new Error("Failed to send verification email");
  }

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

export const verifyEmailService = async (token) => {
  console.log(token);
  const user = await User.findOne({
    verification_code: token,
  });

  console.log(user, "user finding");

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  user.is_verified = true;
  user.verification_code = null;

  await user.save();

  return user;
};
