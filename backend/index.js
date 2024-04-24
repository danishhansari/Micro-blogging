import express, { json } from "express";
import { initialize, session } from "./library/auth.js";
import googleAuthRoute from "./route/index.js";
import { connectDB } from "./library/db.js";

export const app = express();

app.use(json());

app.use("/", googleAuthRoute);
app.use(initialize);
app.use(session);

app.get("/", (req, res) => {
  res.status(200).json("App is working fine");
});

// Db Connection

connectDB()
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App is running fine in ${PORT} port`);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err);

  return res.json({
    error: {
      message: err.message,
    },
  });
});
