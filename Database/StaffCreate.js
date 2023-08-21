import Post from "./Modal/product";
import Rgroup from "./Modal/Rgroup";
import Staff from "./Modal/Staff";
export const CreateStaff = async (req, res) => {
  const { groupname, category, userId, password } = req.body;
  console.log(req.body, "req.body");
  try {
    const newUser = new Staff({
      groupId: "64e2e6d93184735129f858ae",
      userId: "64cc9f51f909a6cade9ebf8a",
      staffname: "Vira Ram",
      staffemail: "vira@gmail.com",
      category: {"participate_1":"InFood","participate_2":"InRoom"},
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
      .json({ message: "post registered successfully", data: { status: 200 } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error registering user" });
  }
};
