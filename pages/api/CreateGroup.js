import ConnectMongo from "../../Database/conn";

import { CreateRoomGroup } from "../../Database/RGroupCon";
ConnectMongo();

export default async function handler(req, res) {
  if (req.method === "POST") {
    CreateRoomGroup(req, res);
  } else if (req.method === "GET") {
   
  } else if (req.method === "PUT") {
  
  } else if (req.method === "DELETE") {
   
  } else {
    res.setHeader("Allow", "PUT");
    res.setHeader("Allow", "DELETE");
    res.status(405).json({ error: "Method not allowed" });
  }
}