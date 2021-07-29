import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
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
  });

  res.status(201).json({ message: "Assignment Created Successfully" });
  client.close();
}

export default handler;
