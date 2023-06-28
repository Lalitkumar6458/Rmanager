// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ConnectMongo from "../../Database/conn"
import User from "../../Database/Modal/user";
import { deleteUserData, getUserData,postUserData, searchUserData, updateUserData } from "../../Database/UserCon";
ConnectMongo()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    postUserData(req,res)
  } else if (req.method === 'GET'){
    if (req.query.search){
      searchUserData(req, res)
    }else{
      getUserData(req, res)
    }
  } else if (req.method === 'PUT'){
    updateUserData(req,res)
  } else if (req.method === 'DELETE') {
    deleteUserData(req,res)
  } 
  else {
    res.setHeader('Allow', 'PUT');
    res.setHeader('Allow', 'DELETE');
    res.status(405).json({ error: 'Method not allowed' });
  }
}
