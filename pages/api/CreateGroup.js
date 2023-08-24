import ConnectMongo from "../../Database/conn";

import {
  CreateRoomGroup,
  getRGroupData,
  updateGroupData,
  deleteGroup,
} from "../../Database/RGroupCon";
ConnectMongo();

export default async function handler(req, res) {
  if (req.method === "POST") {
    CreateRoomGroup(req, res);
  } else if (req.method === "GET") {
   getRGroupData(req, res);
  } else if (req.method === "PUT") {
  updateGroupData(req, res);
  } else if (req.method === "DELETE") {
   deleteGroup(req, res);
  } else {
    res.setHeader("Allow", "PUT");
    res.setHeader("Allow", "DELETE");
    res.status(405).json({ error: "Method not allowed" });
  }
}
