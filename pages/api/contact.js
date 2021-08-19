import { connectToDatabase } from "../../lib/db";
const validator = require("validator");

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;

  const { name, email, message } = data;

  if (validator.isEmail(email) !== true) {
    res.status(422).json({ message: "Invalid Email" });
    return;
  }
  const client = await connectToDatabase();

  const db = client.db("contactform");

  const result = await db.collection("submissions").insertOne({
    name: name,
    email: email,
    message: message,
  });

  if (result) {
    res.status(201).json({ message: "Contact Form Submitted Successfully" });
  }
  client.close();
}

export default handler;
