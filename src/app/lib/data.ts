import { sql } from "@vercel/postgres";
import {
  Contact,
  Education,
  Language,
  Project,
  Skill,
  User,
} from "./definitions";
import { revalidatePath } from "next/cache";

export async function fetchUsers() {
  try {
    const data = await sql<User>`SELECT id, name from users`;

    return data.rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch users");
  }
}

export async function fetchUserByID(userid: string) {
  try {
    const data = await sql<User>`SELECT * FROM users WHERE id = ${userid}`;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch user by id");
  }
}

export async function fetchEducations(userid: string) {
  try {
    const data =
      await sql<Education>`SELECT * FROM educations WHERE user_id = ${userid}`;
    return data.rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch educations");
  }
}

export async function fetchSkills(userid: string) {
  try {
    const data =
      await sql<Skill>`SELECT * FROM skills WHERE user_id = ${userid}`;
    return data.rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch skills");
  }
}

export async function fetchProjects(userid: string) {
  try {
    const data =
      await sql<Project>`SELECT * FROM projects WHERE user_id = ${userid}`;
    return data.rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch projects");
  }
}

export async function fetchContacts(userid: string) {
  try {
    const data =
      await sql<Contact>`SELECT * FROM contacts WHERE user_id = ${userid}`;
    return data.rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch contacts");
  }
}

export async function fetchLanguages(userid: string) {
  try {
    const data =
      await sql<Language>`SELECT * FROM languages WHERE user_id = ${userid}`;
    return data.rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch contacts");
  }
}

export async function fetchCardData() {
  try {
    const usersCountPromise = sql`SELECT COUNT(*) FROM users`;
    const educationsCountPromise = sql`SELECT COUNT(*) FROM educations`;
    const skillsCountPromise = sql`SELECT COUNT(*) FROM skills`;
    const projectsCountPromise = sql`SELECT COUNT(*) FROM projects`;
    const contactsCountPromise = sql`SELECT COUNT(*) FROM contacts`;
    const jobsCountPromise = sql`SELECT COUNT(*) FROM jobs`;
    const langsCountPromise = sql`SELECT COUNT(*) FROM languages`;

    const data = await Promise.all([
      usersCountPromise,
      educationsCountPromise,
      skillsCountPromise,
      projectsCountPromise,
      contactsCountPromise,
      jobsCountPromise,
      langsCountPromise,
    ]);

    const numberOfUsers = Number(data[0].rows[0].count ?? "0");
    const numberOfEducations = Number(data[1].rows[0].count ?? "0");
    const numberOfSkills = Number(data[2].rows[0].count ?? "0");
    const numberOfProjects = Number(data[3].rows[0].count ?? "0");
    const numberOfContacts = Number(data[4].rows[0].count ?? "0");
    const numberOfJobs = Number(data[5].rows[0].count ?? "0");
    const numberOfLangs = Number(data[6].rows[0].count ?? "0");

    revalidatePath("/dashboard");
    return [
      { name: "Users", count: numberOfUsers },
      { name: "Educations", count: numberOfEducations },
      { name: "Skills", count: numberOfSkills },
      { name: "Projects", count: numberOfProjects },
      { name: "Contacts", count: numberOfContacts },
      { name: "Jobs", count: numberOfJobs },
      { name: "Languages", count: numberOfLangs },
    ];
  } catch (error) {
    console.error(`Database Error: `, error);
    throw new Error("Failed to fetch table length");
  }
}
