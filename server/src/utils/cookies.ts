import { CookieOptions, Response } from "express";
import { NODE_ENV } from "../constant/env";
import { fifteenMinuteFromNow, thirtyDaysFromNow } from "./date";

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

const secure = NODE_ENV !== "development";

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure,
};

const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: fifteenMinuteFromNow(),
});

const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyDaysFromNow(),
  path: "/auth/refresh",
});

const setAuthCookies = ({ res, accessToken, refreshToken }: Params) => {
  console.log(accessToken, refreshToken);
  return res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());
};

export { setAuthCookies };
