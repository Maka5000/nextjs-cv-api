import { sql } from "@vercel/postgres";
import { Education, Skill, User } from "./definitions";

export async function fetchUsers() {
  try {
    const data = await sql<User>`SELECT id, name from users`;

    return data.rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch users");
  }
}

export async function fetchUserByID(userid : string) {
  try {
    const data = await sql<User>`SELECT * FROM users WHERE id = ${userid}`;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch user by id")
  }
}

export async function fetchEducations(userid : string) {
  try {
    const data = await sql<Education>`SELECT * FROM educations WHERE user_id = ${userid}`;
    return data.rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch educations");
  }
}

export async function fetchSkills(userid : string) {
  try {
    const data =
      await sql<Skill>`SELECT * FROM skills WHERE user_id = ${userid}`;
    return data.rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch skills");
  }
}