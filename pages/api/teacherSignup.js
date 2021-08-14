import { connectToDatabase } from "../../../lib/db";
import { hash } from "bcryptjs";
const validator = require("validator");
const generator = require("generate-password");

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;

  const { name, email, gender, subject, post, organization } = data;

  if (validator.isEmail(email) !== true) {
    res.status(422).json({ message: "Invalid Email" });
    return;
  }
  const client = await connectToDatabase();

  const db = client.db("users");

  const existingUser = await db
    .collection("teachers")
    .findOne({ email: email, organization: organization });

  if (existingUser) {
    res.status(422).json({ message: "Teacher already exist." });
    client.close();
    return;
  }

  const username = email;
  const password = generator.generate({
    length: 10,
    numbers: true,
  });
  console.log(username);
  console.log(password);
  const hashPassword = await hash(password, 12);

  const result = await db.collection("teachers").insertOne({
    name: name,
    email: email,
    gender: gender,
    subject: subject,
    post: post,
    organization: organization,
    username: username,
    password: hashPassword,
    usertype: "teacher",
    newuser: true,
  });
  if (result) {
    res.status(201).json({ message: "Teacher registered successfully" });
  }
  client.close();
}

export default handler;
