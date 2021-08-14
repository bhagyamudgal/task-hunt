import { connectToDatabase } from "../../lib/db";
import { hash } from "bcryptjs";
const validator = require("validator");
const generator = require("generate-password");

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;

  const {
    studentID,
    name,
    email,
    gender,
    course,
    year,
    semester,
    organization,
  } = data;

  if (validator.isEmail(email) !== true) {
    res.status(422).json({ message: "Invalid Email" });
    return;
  }
  const client = await connectToDatabase();

  const db = client.db("users");

  const existingUser = await db.collection("students").findOne({
    studentID: studentID,
    email: email,
    organization: organization,
  });

  if (existingUser) {
    res.status(422).json({ message: "Student already exist." });
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

  const result = await db.collection("students").insertOne({
    studentID: studentID,
    name: name,
    email: email,
    gender: gender,
    course: course,
    year: year,
    semester: semester,
    organization: organization,
    username: username,
    password: hashPassword,
    usertype: "student",
    newuser: true,
  });
  if (result) {
    res.status(201).json({ message: "Student registered successfully" });
  }
  client.close();
}

export default handler;
