import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema(
  {
    groupId: { type: String, required: true},
    userId: { type: String, required: true},
    staffname: { type: String, required: true },
    staffemail: { type: String, required: true, unique: true },
    category: { type: Object, required: true },
  },
  { timestamps: true }
);

const Staff = mongoose.models.Staff || mongoose.model("Staff", StaffSchema);

export default Staff;
