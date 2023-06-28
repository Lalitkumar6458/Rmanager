// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ConnectMongo from "../../Database/conn"
import { postUserData, getpostData, deletePost, updateUserData, searchPostData } from "../../Database/PostCon";
ConnectMongo()

export default async function handler(req, res) {
    if (req.method === 'POST') {
        postUserData(req, res)
    } else if (req.method === 'GET') {
        if (req.query.search) {
            searchPostData(req, res)
        } else {
            getpostData(req, res)
        }
    } else if (req.method === 'PUT') {
        updateUserData(req, res)
    } else if (req.method === 'DELETE') {
        deletePost(req, res)
    }
    else {
        res.setHeader('Allow', 'PUT');
        res.setHeader('Allow', 'DELETE');
        res.status(405).json({ error: 'Method not allowed' });
    }
}
