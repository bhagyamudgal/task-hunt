import { connectToDatabase } from "../../lib/db";
import sgMail from "@sendgrid/mail";
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
  // console.log(username);
  // console.log(password);
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
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "taskhuntweb@gmail.com",
      subject: `Student Registration Details - ${name} | Task Hunt`,
      text: `Thanks for signing up as a student on Task Hunt, please find your Username and Password below: Username: ${username}, Password: ${password}`,
      html: `<h3>Thanks for signing up as a student on Task Hunt, please find your Username and Password below:</h3><br><br><h4>Username: ${username}</h4><br><br><h4>Password: ${password}</h4><br><br><h5>This is one time login password after login you will have to change your password.</h5>`,
    };
    try {
      await sgMail.send(msg);
      console.log(`Email has been sent`);
    } catch (error) {
      console.log(error);
    }
  }
  client.close();
}

export default handler;
