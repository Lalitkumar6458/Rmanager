import User from "./Modal/user";

export const getUserData = async (req, res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving users' });
    }
}
export const postUserData = async (req,res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({
            name,
            email,
            password,
        });

     await newUser.save()
        const response = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        };

        res.status(200).json({ message: 'User registered successfully', data: response });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
}
export const updateUserData = async (req, res) => {
    const { id, name, email, password } = req.body;

    try {
        // Find the user document based on the unique identifier (e.g., user ID)
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user document with the new data
        user.name = name;
        user.email = email;
        user.password = password;

        // Save the updated user document
        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
}

export const deleteUserData = async (req, res) => {
  
        const { id } = req.body;

        try {
            // Find the user document based on the unique identifier (e.g., user ID)
            const user = await User.findById(id);
            console.log("user", user)
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Delete the user document
            await user.deleteOne();

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting user' });
        }
    }

export const searchUserData = async (req, res) => {
    const { search } = req.query;

    try {
        console.log("keyword", search)
        // Construct the search query using the keyword
        const query = { name: { $regex: search, $options: 'i' } };

        // Find users matching the search criteria
        const users = await User.find(query);

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error searching users' });
    }
} 

