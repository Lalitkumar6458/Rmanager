import Post from "./Modal/product";
import Rgroup from "./Modal/Rgroup";
import Staff from "./Modal/Staff";
import nodemailer from "nodemailer";
export const CreateStaff = async (req, res) => {
  const { staffemail } = req.body;
 
  const apppass = "nsaqtlxtwmzzpbep";
  const email = "lalitkumar6458@gmail.com";
  try {
    const newUser = new Staff(req.body);
    await newUser.save();

    const group = await Rgroup.findById(newUser.groupId);
     const transporter = nodemailer.createTransport({
       service: "gmail",
       auth: {
         user: email,
         pass: apppass,
       },
     });
      const mailOptions = {
        from: "lalitkumar6458@gmail.com",
        to: staffemail,
        subject: `Room Managment You Added in ${group.groupname} `,
        html: (
         ` <div className="">
            <h1>Group Name :  ${group.groupname} </h1>
            <br />
            <h3>Group Password: ${group.password}</h3> <br />
            <h3>Your Email:  ${staffemail}</h3> <br />
            <h3>
              Login <a href="https://nextjscurd.vercel.app/">Room Managment </a>
            </h3>
          </div>`
        ),
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "Email sent successfully. and save successfully" });
      } catch (error) {
        console.error("Error:", error);
        res
          .status(500)
          .json({ error: "An error occurred while sending the email." });
      }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error registering user" });
  }
};


export const getStaffData = async (req, res) => {
  const { userId,groupId } = req.query;
console.log("groupId", groupId);
  try {
    // Find posts by userId
    const posts = await Staff.find({ userId,groupId });

    if (posts.length > 0) {
      res.status(200).json({ data: posts });
    } else {
      res.status(404).json({ error: "No posts found for the user", data: [] });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving posts", data: [] });
  }
};

export const updateStaffData = async (req, res) => {
  const { id, groupId, userId, staffname, category, staffemail } = req.body;
  try {
    // Find the user document based on the unique identifier (e.g., user ID)
    const user = await Staff.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Update the user document with the new data
    user.staffname = staffname;
    user.staffemail = staffemail;
    user.category = category;
    // Save the updated user document
    await user.save();
    res.status(200).json({ message: "Staff updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const { id, userId } = req.body;

    // Find the group by its ID
    const group = await Staff.findById(id);

    // Check if the group exists
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    await group.deleteOne();

    return res
      .status(200)
      .json({ message: "staff deleted successfully" });
  } catch (error) {
    console.error("Error deleting group and staff:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};