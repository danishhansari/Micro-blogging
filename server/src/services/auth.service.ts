import { CONFLICT, UNAUTHORIZED } from "../constant/http";
import VerificationCodeType from "../constant/verificationCodeType";
import SessionModel from "../models/session.models";
import UserModel from "../models/user.models";
import verificationCodeModel from "../models/verificationCode.models";
import appAssert from "../utils/appAssert";
import { oneYearFromNow, ONE_DAY_MS, thirtyDaysFromNow } from "../utils/date";
import {
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
  verifyToken,
} from "../utils/jwt";

export type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

const createAccount = async (data: CreateAccountParams) => {
  // verifing existing user doesn't exist
  const existingUser = await UserModel.exists({ email: data.email });

  appAssert(!existingUser, CONFLICT, "Email already in use");

  //   create user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  const userId = user._id;

  // create verification code
  const verificationCode = await verificationCodeModel.create({
    userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  // send verification email

  // create session
  const session = await SessionModel.create({
    userId,
    userAgent: data.userAgent,
  });

  // sign access token && refresh token
  const accessToken = signToken({ userId, sessionId: session._id });

  const refreshToken = signToken(
    {
      sessionId: session._id,
    },
    refreshTokenSignOptions
  );

  // return user
  return { user: user.omitPassword(), accessToken, refreshToken };
};

export type LoginParams = {
  email: string;
  password: string;
  userAgent?: string;
};

const loginUser = async ({ email, password, userAgent }: LoginParams) => {
  // get the user by email
  const user = await UserModel.findOne({ email });
  appAssert(user, UNAUTHORIZED, "Invalid email or password");

  // validate the password from the request
  const isValid = user.comparePassword(password);
  appAssert(isValid, UNAUTHORIZED, "Invalid email or password");

  const userId = user._id;
  // create a session
  const session = await SessionModel.create({ userId, userAgent });

  const sessionInfo = {
    sessionId: session._id,
  };

  // sign a access and refresh token
  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);

  const accessToken = signToken({ ...sessionInfo, userId: user._id });

  // return user & tokens
  return { user: user.omitPassword(), accessToken, refreshToken };
};

const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });
  appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

  const session = await SessionModel.findById(payload.sessionId);
  const now = Date.now();
  appAssert(
    session && session.expiresAt.getTime() > now,
    UNAUTHORIZED,
    "Session expired"
  );

  // Refresh the session if it expires in the next 24hrs
  const sessionNeedsRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS;

  if (sessionNeedsRefresh) {
    session.expiresAt = thirtyDaysFromNow();
    await session.save();
  }

  const newRefreshToken = sessionNeedsRefresh
    ? signToken({ sessionId: session._id }, refreshTokenSignOptions)
    : undefined;

  const accessToken = signToken({
    userId: session.userId,
    sessionId: session._id,
  });

  return { accessToken, newRefreshToken };
};

export { createAccount, loginUser, refreshUserAccessToken };
