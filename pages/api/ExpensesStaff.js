import ConnectMongo from "../../Database/conn";
import { CreateExpneses, getExpensesData,deleteExpenses,updateExpenses } from "../../Database/ExpensesStaff";



ConnectMongo();

export default async function handler(req, res) {
  if (req.method === "POST") {
    CreateExpneses(req, res);
  } else if (req.method === "GET") {
   getExpensesData(req, res);
  } else if (req.method === "PUT") {
   updateExpenses(req, res);
  } else if (req.method === "DELETE") {
    deleteExpenses(req, res);
  } else {
    res.setHeader("Allow", "PUT");
    res.setHeader("Allow", "DELETE");
    res.status(405).json({ error: "Method not allowed" });
  }
}
