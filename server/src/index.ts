import express, { json, urlencoded } from "express";
import { connectToDatabase } from "./config/db";
import { PORT, NODE_ENV, APP_ORIGIN } from "./constant/env";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";
import { OK } from "./constant/http";
import authRoutes from "./routes/auth.route";

const app = express();
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);

app.get("/", (req, res, next) => {
  res.status(OK).json("Hello world");
});

app.use("/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`App is running on port ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});
