import { Document, Schema, Types, model } from "mongoose";
import VerificationCodeType from "../constant/verificationCodeType";

export interface VerificationCodeDocument extends Document {
  userId: Types.ObjectId;
  type: VerificationCodeType;
  createdAt: Date;
  expiresAt: Date;
}

const verficationSchema = new Schema<VerificationCodeDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  type: {
    type: String,
    requried: true,
  },
  createdAt: { type: Date, required: true, default: Date.now() },
  expiresAt: { type: Date, required: true },
});

const verificationCodeModel = model<VerificationCodeDocument>(
  "VerificationCode",
  verficationSchema,
  "verification_codes"
);

export default verificationCodeModel;
