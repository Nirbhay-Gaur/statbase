import mongoose from "mongoose";

const ipListSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true },
    uag: { type: String, required: true },
    freq: { type: Number, required: true },
  },
  { timestamps: true }
);

const IpList = mongoose.model("IpList", ipListSchema);

export default IpList;
