import { connectToDatabase } from "../../../lib/db";
import { getSession } from "next-auth/client";
import { hash } from "bcryptjs";
import { compare } from "bcryptjs";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not Authenticated" });
    return;
  }

  const username = session.user.username;
  const userType = session.user.usertype;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();

  const db = client.db("users");

  let usersCollection;
  if (userType === "student") {
    usersCollection = db.collection("students");
  } else {
    usersCollection = db.collection("teachers");
  }

  const user = await usersCollection.findOne({ username: username });

  if (!user) {
    res.status(404).json({ message: "User not found!" });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const isPasswordEquals = await compare(oldPassword, currentPassword);

  if (!isPasswordEquals) {
    res.status(403).json({ message: "Wrong Old Password." });
    client.close();
    return;
  }

  const hashedNewPassword = await hash(newPassword, 12);
  const result = await usersCollection.updateOne(
    { username: username },
    { $set: { password: hashedNewPassword } }
  );
  if (result) {
    res.status(200).json({ message: "Password Successfully Changed." });
  }
  client.close();
}

export default handler;
