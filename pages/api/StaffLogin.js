import Staff from "../../Database/Modal/Staff";
import Rgroup from "../../Database/Modal/Rgroup";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { StaffEmail, RgName, Rgpassword } = req.body;
    console.log(req.body, "req.body");

    try {
      // Find the staff member by email
      
      // Check if the staff member exists and the provided password matches
      
      // Find the group by name
      const group = await Rgroup.findOne({ groupname: RgName }).maxTimeMS(
        15000
      );
      const staffMember = await Staff.findOne({
        staffemail: StaffEmail,
      }).maxTimeMS(15000);
console.log("group", group, staffMember );
        // Check if the group exists and its password matches
        // if (group && group.password === Rgpassword) {
        //   // Both staff and group credentials match
        //   return res.status(200).json({ message: "Login successful" });
        // } else {
        //   // Group not found or incorrect group password
        //   return res.status(401).json({ error: "Invalid group credentials" });
        // }
  
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
