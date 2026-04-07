import {
  signUpService,
  signInService,
} from "../../services/auth/auth.services.js";

export const signUpController = async (req, res) => {
  try {
    const user = await signUpService(req.body);

    res.status(201).json({
      message: "user successfully created",
      user,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

export const signInController = async (req, res) => {
  try {
    const user = await signInService(req.body);

    res.status(200).json({
      message: "user sucessfully logged in",
      user,
    });
  } catch (error) {
    res.status(401).json({
      message: "user not found",
    });
  }
};
