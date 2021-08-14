import { connectToDatabase } from "../../../lib/db";
import { getSession } from "next-auth/client";
async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not Authenticated" });
    return;
  }
  const data = req.body;

  const {
    title,
    duedate,
    description,
    course,
    year,
    semester,
    subject,
    fileURL,
    orignalFilename,
    username,
  } = data;

  const client = await connectToDatabase();

  const db = client.db("assignments");

  await db.collection("teacher").insertOne({
    title: title,
    duedate: duedate,
    subject: subject,
    description: description,
    course: course,
    year: year,
    semester: semester,
    fileURL: fileURL,
    orignalFilename: orignalFilename,
    username: username,
  });

  res.status(201).json({ message: "Assignment Created Successfully" });
  client.close();
}

export default handler;
