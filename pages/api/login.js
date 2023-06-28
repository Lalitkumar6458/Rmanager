// pages/api/login.js
import User from "../../Database/Modal/user";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            // Find the user by email
            const user = await User.findOne({ email });

            // Check if the user exists and the password is correct
            if (user && user.password === password) {
                // Successful login
                const { password, ...userData } = user._doc;

                // Successful login
                res.status(200).json({ message: 'Login successful',data: userData });
            } else {
                // Invalid credentials
                res.status(401).json({ error: 'Invalid email or password' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error logging in' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}