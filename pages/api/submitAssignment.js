import { connectToDatabase } from "../../lib/db";
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
    subject,
    course,
    year,
    semester,
    fileURL,
    orignalFilename,
    username,
    name,
    submitDate,
    assignmentId,
  } = data;

  const client = await connectToDatabase();

  const db = client.db("assignments");

  await db.collection("student").insertOne({
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
    studentName: name,
    submitDate: submitDate,
    assignmentId: assignmentId,
  });

  res.status(201).json({ message: "Assignment Submitted Successfully" });
  client.close();
}

export default handler;
