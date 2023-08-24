import Post from "./Modal/product";
import Rgroup from "./Modal/Rgroup";
import Staff from "./Modal/Staff";
export const CreateStaff = async (req, res) => {
  const { groupname, category, userId, password } = req.body;
  console.log(req.body, "req.body");
  try {
    const newUser = new Staff(req.body);

    await newUser.save();
    console.log(newUser, "newUser");
    // const response = {
    //   _id: newUser._id,
    //   userId: newUser.userId,
    //   title: newUser.title,
    //   desc: newUser.desc,
    // };

    res
      .status(200)
      .json({ message: "post registered successfully", data: { status: 200 } });
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