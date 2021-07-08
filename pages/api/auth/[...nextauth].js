import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../lib/db";
import { compare } from "bcryptjs";
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const users = client.db("users");
        const students = users.collection("students");
        const teachers = users.collection("teachers");

        const student = await students.findOne({
          username: credentials.username.trimEnd(),
        });
        const teacher = await teachers.findOne({
          username: credentials.username.trimEnd(),
        });

        if (!student && !teacher) {
          client.close();
          throw new Error("No User Found.");
        }
        let user;
        let isValidPassword;
        if (student) {
          isValidPassword = await compare(
            credentials.password,
            student.password
          );
          user = student;
        }
        if (teacher) {
          isValidPassword = await compare(
            credentials.password,
            teacher.password
          );
          user = teacher;
        }

        if (!isValidPassword) {
          client.close();
          throw new Error("Invalid Password.");
        }
        client.close();
        return { username: user.username, organization: user.organization };
      },
    }),
  ],
});
