import Staff from "../../Database/Modal/Staff";
import Rgroup from "../../Database/Modal/Rgroup";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { StaffEmail, RgName, Rgpassword } = req.body;
    try {

      const group = await Rgroup.findOne({ groupname: RgName }).maxTimeMS(
        15000
      );
      console.log("group boxfh", group);
      const staffMember = await Staff.findOne({
        staffemail: StaffEmail,
      }).maxTimeMS(15000);
        // Check if the group exists and its password matches
        if (
          group &&
          group.password === Rgpassword &&
          staffMember.groupId === group._id.toString()
        ) {
          // Both staff and group credentials match
          console.log("login Success")
          return res.status(200).json({
            message: "Login successful",
            User:staffMember,
          });
        } else {
      
          // Group not found or incorrect group password
          return res.status(401).json({ error: "Invalid group credentials" });
        }
  
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
