import { connectToDatabase } from "../../../lib/db";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not Authenticated" });
    return;
  }
  const data = req.body;

  const { assignmentId } = data;

  const client = await connectToDatabase();

  const db = client.db("assignments");

  const result = await db
    .collection("teacher")
    .deleteOne({ _id: ObjectId(assignmentId) });

  // console.log(result.deletedCount);
  res.status(201).json({ message: "Assignment Deleted Successfully" });
  client.close();
}

export default handler;
