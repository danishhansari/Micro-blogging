import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constant/env";
import VerificationCodeType from "../constant/verificationCodeType";
import SessionModel from "../models/session.models";
import UserModel from "../models/user.models";
import verificationCodeModel from "../models/verificationCode.models";
import { oneYearFromNow } from "../utils/date";
import jwt from "jsonwebtoken";

export type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

const createAccount = async (data: CreateAccountParams) => {
  // verifing existing user doesn't exist
  const existingUser = await UserModel.exists({ email: data.email });

  if (existingUser) {
    throw new Error("User is already exists");
  }

  //   create user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  // create verification code
  const verificationCode = await verificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  // send verification email

  // create session
  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });

  // sign access token && refresh token
  const refreshToken = jwt.sign(
    { sessionId: session._id },
    JWT_REFRESH_SECRET,
    { audience: ["user"], expiresIn: "30d" }
  );

  const accessToken = jwt.sign(
    { userId: user._id, sessionId: session._id },
    JWT_SECRET,
    {
      audience: ["user"],
      expiresIn: "15m",
    }
  );

  // return user
  return { user, accessToken, refreshToken };
};

export { createAccount };
