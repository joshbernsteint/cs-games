import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import { config } from "dotenv";
import { createUser } from "../data/users.js";
config();
const db = await dbConnection();
await db.dropDatabase();

await createUser('admin', process.env.adminPass || 'CHANGE ME'); //Change password to something else (anything else)

console.log("Seed file completed");
await closeConnection();