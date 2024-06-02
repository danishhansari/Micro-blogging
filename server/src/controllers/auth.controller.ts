import { CREATED, OK } from "../constant/http";
import { createAccount, loginUser } from "../services/auth.service";
import { catchErrors } from "../utils/catchErrors";
import { setAuthCookies } from "../utils/cookies";
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
  const request = loginSchema.parse({ ...req.body });

  const { accessToken, refreshToken } = await loginUser(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json({ message: "Login successful" });
});

export { registerHandler, loginHandler };
