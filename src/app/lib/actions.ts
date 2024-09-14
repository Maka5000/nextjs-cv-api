"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
  const userName = formData.get("username");
  const userAbout = formData.get("userabout");
  try {
    await sql`
    INSERT INTO Users VALUES (
      uuid_generate_v4(), 
      ${userName?.toString()}, 
      ${userAbout?.toString()}, 
      '/images/user/defaultavatar.jpg'
  );`;
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function deleteUser(userid: string) {
  try {
    await sql`DELETE FROM users WHERE id = ${userid}`;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to delete user.");
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/users");
}

export async function createEducation(userId: string, ...args: string[]) {
  try {
    await sql`
    INSERT INTO Educations VALUES (
      uuid_generate_v4(),
      ${userId},
      ${args[0]},
      ${args[1]},
      ${args[2]}
    );
    `;
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/users/${userId}`);
}

export async function deleteEducation(userId: string, educationId: string) {
  try {
    await sql`DELETE FROM educations WHERE id = ${educationId} AND user_id = ${userId}`;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to delete Education.");
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/users/${userId}`);
}

export async function createSkill(
  userId: string,
  inputFileName?: string,
  ...args: string[]
) {
  try {
    await sql`
    INSERT INTO Skills VALUES (
      uuid_generate_v4(),
      ${userId},
      ${inputFileName ?? null},
      ${args[0]},
      ${args[1]}
    );`;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Skill.");
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/users/${userId}`);
}

export async function deleteSkill(userId: string, skillId: string) {
  try {
    await sql`DELETE FROM skills WHERE id = ${skillId} AND user_id = ${userId}`;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to delete Education.");
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/users/${userId}`);
}

export async function createProject(
  userId: string,
  inputFileName?: string,
  ...args: string[]
) {
  try {
    await sql`
    INSERT INTO projects VALUES (
      uuid_generate_v4(),
      ${userId},
      ${args[0]},
      ${inputFileName ?? null},
      ${args[1]}
    );`;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Project.");
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/users/${userId}`);
}

export async function deleteProject(userId: string, projectId: string) {
  try {
    await sql`DELETE FROM projects WHERE id = ${projectId} AND user_id = ${userId}`;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to delete Project.");
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/users/${userId}`);
}

export async function createContact(
  userId: string,
  inputFileName?: string,
  ...args: string[]
) {
  try {
    await sql`
    INSERT INTO contacts VALUES (
      uuid_generate_v4(),
      ${userId},
      ${inputFileName ?? null},
      ${args[0]},
      ${args[1]}
    );`;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Contact.");
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/users/${userId}`);
}

export async function deleteContact(userId: string, contactId: string) {
  try {
    await sql`DELETE FROM contacts WHERE id = ${contactId} AND user_id = ${userId}`;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to delete Contact.");
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/users/${userId}`);
}

export async function createLanguage(userId: string, ...args: string[]) {
  try {
    await sql`
    INSERT INTO languages VALUES (
      uuid_generate_v4(),
      ${userId},
      ${args[0]},
      ${args[1]}
    );`;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Language.");
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/users/${userId}`);
}

export async function deleteLanguage(userId: string, langId: string) {
  try {
    await sql`DELETE FROM languages WHERE id = ${langId} AND user_id = ${userId}`;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to delete Language.");
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/users/${userId}`);
}

export async function changeUserAvatar(userId: string, avatar_url: string) {
  try {
    await sql`UPDATE users SET avatar_url = ${avatar_url} WHERE id = ${userId}`;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to change user's avatar");
  }

  revalidatePath(`/dashboard/users/${userId}`);
}
