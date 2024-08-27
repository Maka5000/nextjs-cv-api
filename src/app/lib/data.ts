import { sql } from "@vercel/postgres";
import { User } from "./definitions";

export async function fetchUsers() {
  try {
    const data = await sql<User>`SELECT id, name from users`;

    return data.rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch users");
  }
}
