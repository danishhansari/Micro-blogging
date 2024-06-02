import { CookieOptions, Response } from "express";
import { NODE_ENV } from "../constant/env";
import { fifteenMinuteFromNow, thirtyDaysFromNow } from "./date";

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

const secure = NODE_ENV !== "development";

export const REFRESH_PATH = "/auth/refresh";

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
  path: REFRESH_PATH,
});

const setAuthCookies = ({ res, accessToken, refreshToken }: Params) => {
  return res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());
};

const clearAuthCookies = (res: Response) =>
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken", { path: REFRESH_PATH });

export {
  setAuthCookies,
  clearAuthCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
};
