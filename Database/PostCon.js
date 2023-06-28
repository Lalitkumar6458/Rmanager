
import Post from "./Modal/product";
export const postUserData = async (req, res) => {
    const {userId, title, desc} = req.body;

    try {
        const newUser = new Post({
            userId,
            title,
            desc,
        });

        await newUser.save()
        const response = {
            _id: newUser._id,
            userId: newUser.userId,
            title: newUser.title,
            desc: newUser.desc
        };


        res.status(200).json({ message: 'post registered successfully', data: response });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
}

export const getpostData = async (req, res) => {

    const { userId } = req.query;

    try {
        // Find posts by userId
        const posts = await Post.find({ userId });

        if (posts.length > 0) {
            res.status(200).json({post:posts});
        } else {
            res.status(404).json({ error: 'No posts found for the user',post:[] });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving posts',post:[] });
    }
}

export const deletePost = async (req,res) => {
    try {
        // Find the user by userId
        const{id,userId}=req.body
        console.log("req.body",req.body)
        const user = await Post.findById(id);
        if (!user) {
            res.status(200).json({ error: 'User not found' });
        }
        await user.deleteOne();
        res.status(200).json({ message: 'Post deleted successfully' });

    } catch (error) {

        res.status(405).json( { error: 'Error deleting post' });

    }
};

export const updateUserData = async (req, res) => {
    const { id, userId, title, desc } = req.body;

    try {
        // Find the user document based on the unique identifier (e.g., user ID)
        const user = await Post.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user document with the new data
        user.userId = userId;
        user.title = title;
        user.desc = desc;

        // Save the updated user document
        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
}


export const searchPostData = async (req, res) => {
    const { search, userId } = req.query;

    try {
        console.log("Keyword:", search);
        console.log("User ID:", userId);
        const query = {
            userId: userId
        };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { desc: { $regex: search, $options: 'i' } }
            ];
        }

        // Find posts matching the search criteria
        // const postD = await Post.find(query);
        // const query = { title: { $regex: search, $options: 'i' }, desc: { $regex: search, $options: 'i' },userId };

      
        const postD = search === "" ? await Post.find() : await Post.find(query);
        console.log("postD",postD)
        res.status(200).json({ post: postD });
    } catch (error) {
        res.status(500).json({ error: 'Error searching users' });
    }
} 