import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import { createUser } from "../data/users.js";
const db = await dbConnection();
await db.dropDatabase();

await createUser('admin', 'CHANGE ME'); //Change password to something else (anything else)

console.log("Seed file completed");
await closeConnection();