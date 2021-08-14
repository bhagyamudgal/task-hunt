import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://dbAdmin:${process.env.MONGODB}@task-hunt.hr14h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  if (client) {
    console.log("Database Connected Successfully");
  }
  return client;
}
