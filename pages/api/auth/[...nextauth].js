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
        return {
          name: user.name,
          email: user.email,
          username: user.username,
          organization: user.organization,
          usertype: user.usertype,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      //  "user" parameter is the object received from "authorize"
      //  "token" is being send below to "session" callback...
      //  ...so we set "user" param of "token" to object from "authorize"...
      //  ...and return it...
      user && (token.user = user);
      return Promise.resolve(token); // ...here
    },
    session: async (session, token) => {
      //  "session" is current session object
      //  below we set "user" param of "session" to value received from "jwt" callback
      session.user = token.user;
      return Promise.resolve(session);
    },
  },
});
