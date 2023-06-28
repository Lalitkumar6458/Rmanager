
import ConnectMongo from "../../Database/conn"
import User from "../../Database/Modal/user";
ConnectMongo()
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { keyword } = req.query;
        try {
            // Construct the search query using the keyword
            const query = { name: { $regex: keyword, $options: 'i' } };

            // Find users matching the search criteria
            const users = await User.find(query);

            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Error searching users' });
        }
    } else {
        res.setHeader('Allow', 'GET');
        res.status(405).end('Method Not Allowed');
    }
}