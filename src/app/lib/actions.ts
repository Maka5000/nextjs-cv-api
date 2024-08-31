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

  revalidatePath(`/dashboard/users/${userId}`);
}

export async function deleteEducation(userId: string, educationId: string) {
  try {
    await sql`DELETE FROM educations WHERE id = ${educationId} AND user_id = ${userId}`;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to delete Education.");
  }

  revalidatePath(`/dashboard/users/${userId}`);
}

export async function createSkill(userId: string, ...args: string[]) {
  try {
    await sql`
    INSERT INTO Skills VALUES (
      uuid_generate_v4(),
      ${userId},
      'iconUrl',
      ${args[0]},
      ${args[1]}
    );`;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Skill.");
  }

  revalidatePath(`/dashboard/users/${userId?.toString()}`);
}

export async function deleteSkill(userId: string, skillId: string) {
  try {
    await sql`DELETE FROM skills WHERE id = ${skillId} AND user_id = ${userId}`;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to delete Education.");
  }

  revalidatePath(`/dashboard/users/${userId}`);
}
