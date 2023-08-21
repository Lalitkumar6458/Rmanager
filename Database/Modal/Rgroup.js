import mongoose from "mongoose";

const RgroupSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: false },
    groupname: { type: String, required: true },
    category: { type: Object, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Rgroup = mongoose.models.Rgroup || mongoose.model("Rgroup", RgroupSchema);

export default Rgroup;
