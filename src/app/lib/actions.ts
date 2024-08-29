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

export async function deleteUser(formData: FormData) {
  try {
    const userid = formData.get("userid");

    await sql`DELETE FROM users WHERE id = ${userid?.toString()}`;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to delete user.");
  }

  revalidatePath("/dashboard/users");
}

export async function createEducation(formData: FormData) {
  const userId = formData.get("userid");
  const establishment = formData.get("establishment");
  const EdProgram = formData.get("program");
  const EdDegree = formData.get("degree");
  try {
    await sql`
    INSERT INTO Educations VALUES (
      uuid_generate_v4(),
      ${userId?.toString()},
      ${establishment?.toString()},
      ${EdProgram?.toString()},
      ${EdDegree?.toString()}
    );
    `
  } catch (error) {
    console.log(error);
  }

  revalidatePath(`/dashboard/users/${userId?.toString()}`);
}

export async function deleteEducation(formData: FormData) {
  try {
    const userid = formData.get("userid");
    const educationId = formData.get('edId');

    await sql`DELETE FROM educations WHERE id = ${educationId?.toString()} AND user_id = ${userid?.toString()}`;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to delete Education.");
  }

  revalidatePath("/dashboard/users");
}