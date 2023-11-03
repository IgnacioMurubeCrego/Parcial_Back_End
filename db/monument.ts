import mongoose from "npm:mongoose@7.6.3";
import { Monument } from "../types.ts";

const Schema = mongoose.Schema;

const monumentSchema = new Schema(
  {
    name: { type: String, required: true, unique : true},
    description : { type: String, required: true },
    postCode : { type: String, required: true },
    city : { type: String, required: false },
    country : { type: String, required: true },
    continent : { type: String, required: false },
    time : { type: String, required: false },
    weather : { type: String, required: false }
  },
  { timestamps: true }
);

export type MonumentModelType = mongoose.Document & Omit<Monument, "id">;

export const MonumentModel =  mongoose.model<MonumentModelType>("Monument", monumentSchema);