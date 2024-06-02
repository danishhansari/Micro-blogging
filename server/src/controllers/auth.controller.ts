import { CREATED, OK } from "../constant/http";
import SessionModel from "../models/session.models";
import { createAccount, loginUser } from "../services/auth.service";
import { catchErrors } from "../utils/catchErrors";
import { setAuthCookies, clearAuthCookies } from "../utils/cookies";
import { verifyToken } from "../utils/jwt";
import { registerSchema, loginSchema } from "./auth.schemas";

const registerHandler = catchErrors(async (req, res) => {
  // validate request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  //   call services
  const { user, refreshToken, accessToken } = await createAccount(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});

const loginHandler = catchErrors(async (req, res) => {
  // validate the request
  const request = loginSchema.parse({ ...req.body });

  // call the service
  const { accessToken, refreshToken } = await loginUser(request);

  // return the token
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json({ message: "Login successful" });
});

const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const { payload } = verifyToken(accessToken);

  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }
  return clearAuthCookies(res)
    .status(OK)
    .json({ message: "Logout successful" });
});

export { registerHandler, loginHandler, logoutHandler };
