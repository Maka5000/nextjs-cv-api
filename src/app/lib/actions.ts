"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
  const lastUser =
    await sql`SELECT id, name FROM Users ORDER BY id DESC LIMIT 1`;
  const userName = formData.get("username");

  try {
    await sql`INSERT INTO Users VALUES (${
      lastUser.rows[0].id + 1
    }, ${userName?.toString()});`;
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function deleteUser(formData: FormData) {
  try {
    const userid = formData.get("userid");

    await sql`DELETE FROM users WHERE id = ${Number(userid)}`;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to delete user.");
  }

  revalidatePath("/dashboard/users");
}
