import Post from "./Modal/product";
import Rgroup from "./Modal/Rgroup";
export const CreateRoomGroup = async (req, res) => {


  const { groupname, category, userId,password } = req.body;
console.log(req.body, "req.body");
  try {
    const newUser = new Rgroup({
      userId,
      groupname,
      category,
      password
    });

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
      .json({ message: "post registered successfully", data: {"status":200} });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error registering user" });
  }
};
