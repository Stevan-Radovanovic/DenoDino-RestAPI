import { MongoClient, Database } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

let db: Database;

export function connect() {
  const client = new MongoClient();
  client.connectWithUri(
    "mongodb+srv://stevan:Stevan.1@dinosaurs-uxl9h.mongodb.net/dinosaurs?retryWrites=true&w=majority",
  );

  db = client.database("dinosaurs");
  console.log("Connected to Mongo Database...");
}

export function getDb() {
  return db;
}
