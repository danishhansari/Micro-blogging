import { z } from "zod";
import { NOT_FOUND, OK } from "../constant/http";
import SessionModel from "../models/session.models";
import { catchErrors } from "../utils/catchErrors";
import appAssert from "../utils/appAssert";

const getSessionsHandler = catchErrors(async (req, res) => {
  const sessions = await SessionModel.find(
    {
      userId: req.userId,
      expiresAt: { $gt: new Date() },
    },
    { _id: 1, userAgent: 1, createdAt: 1 },
    { sort: { createdAt: -1 } }
  );

  return res.status(OK).json(
    sessions.map((session) => ({
      ...session.toObject(),
      ...(session._id === req.sessionId && {
        isCurrent: true,
      }),
    }))
  );
});

const deleteSessionHandler = catchErrors(async (req, res) => {
  const sessionId = z.string().parse(req.params.id);
  const deleted = await SessionModel.findOneAndDelete({
    _id: sessionId,
    userId: req.userId,
  });

  appAssert(deleted, NOT_FOUND, "Session not Found");
  return res.status(OK).json({ message: "Session removed" });
});

export { getSessionsHandler, deleteSessionHandler };
