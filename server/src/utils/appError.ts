import AppErrorCode from "../constant/appErrorCode";
import { HttpStatusCode } from "../constant/http";
export class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    public message: string,
    public errorCode?: AppErrorCode
  ) {
    super(message);
  }
}

export default AppError;
