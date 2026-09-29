import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISetting extends Document {
  key: string;
  value: any;
  description?: string;
  type: "string" | "number" | "boolean" | "image" | "json";
}

const SettingSchema = new Schema<ISetting>(
  {
    key: { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed, required: true },
    description: { type: String },
    type: { type: String, enum: ["string", "number", "boolean", "image", "json"], default: "string" },
  },
  { timestamps: true }
);

// Prevent Next.js hot-reload compilation error
const Setting: Model<ISetting> =
  mongoose.models.Setting || mongoose.model<ISetting>("Setting", SettingSchema);

export default Setting;
