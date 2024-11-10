"use server";

import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { sql } from "@vercel/postgres";
import { revalidateTag } from "next/cache";
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

  revalidateTag("users");
  redirect("/dashboard/users");
}

export async function deleteUser(userid: string) {
  try {
    const AvatarKey =
      await sql`SELECT avatar_url FROM users WHERE id = ${userid} AND avatar_url != '/images/user/defaultavatar.jpg'`;

    if (AvatarKey.rows[0]) {
      await deleteAvatar(AvatarKey.rows[0].avatar_url);
      console.log("avatar deleted")
    }

    await sql`DELETE FROM users WHERE id = ${userid}`;
    await sql`DELETE FROM educations WHERE user_id = ${userid}`;
    await sql`DELETE FROM skills WHERE user_id = ${userid}`;
    await sql`DELETE FROM projects WHERE user_id = ${userid}`;
    await sql`DELETE FROM contacts WHERE user_id = ${userid}`;
    await sql`DELETE FROM jobs WHERE user_id = ${userid}`;
    await sql`DELETE FROM languages WHERE user_id = ${userid}`;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to delete user.");
  }

  revalidateTag("users");
  revalidateTag("educations");
  revalidateTag("skills");
  revalidateTag("projects");
  revalidateTag("contacts");
  revalidateTag("jobs");
  revalidateTag("languages");
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

  revalidateTag("educations");
}

export async function deleteEducation(userId: string, educationId: string) {
  try {
    await sql`DELETE FROM educations WHERE id = ${educationId} AND user_id = ${userId}`;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to delete Education.");
  }

  revalidateTag("educations");
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

  revalidateTag("skills");
}

export async function deleteSkill(userId: string, skillId: string) {
  try {
    await sql`DELETE FROM skills WHERE id = ${skillId} AND user_id = ${userId}`;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to delete Education.");
  }

  revalidateTag("skills");
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

  revalidateTag("projects");
}

export async function deleteProject(userId: string, projectId: string) {
  try {
    await sql`DELETE FROM projects WHERE id = ${projectId} AND user_id = ${userId}`;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to delete Project.");
  }

  revalidateTag("projects");
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

  revalidateTag("contacts");
}

export async function deleteContact(userId: string, contactId: string) {
  try {
    await sql`DELETE FROM contacts WHERE id = ${contactId} AND user_id = ${userId}`;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to delete Contact.");
  }

  revalidateTag("contacts");
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

  revalidateTag("languages");
}

export async function deleteLanguage(userId: string, langId: string) {
  try {
    await sql`DELETE FROM languages WHERE id = ${langId} AND user_id = ${userId}`;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to delete Language.");
  }

  revalidateTag("languages");
}

export async function createJob(userId: string, ...args: string[]) {
  try {
    await sql`
    INSERT INTO jobs VALUES (
      uuid_generate_v4(),
      ${userId},
      ${args[0]},
      ${args[1]},
      ${args[2]}
    );`;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Job.");
  }

  revalidateTag("jobs");
}

export async function deleteJob(userId: string, jobId: string) {
  try {
    await sql`DELETE FROM jobs WHERE id = ${jobId} AND user_id = ${userId}`;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to delete Job.");
  }

  revalidateTag("jobs");
}

export async function changeUserAvatar(userId: string, avatar_url: string) {
  try {
    await sql`UPDATE users SET avatar_url = ${avatar_url} WHERE id = ${userId}`;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to change user's avatar");
  }

  revalidateTag("users");
}

export async function changeUserName(userId: string, newUserName: string) {
  try {
    await sql`UPDATE users SET name = ${newUserName} WHERE id = ${userId}`;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to change user's name");
  }

  revalidateTag("users");
}

export async function changeUserAbout(userId: string, newAbout: string) {
  try {
    await sql`UPDATE users SET about = ${newAbout} WHERE id = ${userId}`;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to change user's about");
  }

  revalidateTag("users");
}

async function deleteAvatar(avatar_url: string) {
  let splittedAvatarUrl = avatar_url.split("/");

  splittedAvatarUrl?.shift();

  const avatarKey = splittedAvatarUrl!.join("/");

  try {
    const s3Client = new S3Client({
      region: process.env.NEXT_PUBLIC_AWS_IDENTITY_REGION,
      credentials: fromCognitoIdentityPool({
        clientConfig: { region: process.env.NEXT_PUBLIC_AWS_IDENTITY_REGION },
        identityPoolId: process.env.NEXT_PUBLIC_AWS_IDENTITY_ID!,
      }),
    });

    const command = new DeleteObjectCommand({
      Key: avatarKey,
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
    });

    await s3Client.send(command);
  } catch (error) {
    console.error("Avatar Error: ", error);
    throw new Error("Something went wrong! Coudn't delete avatar");
  }
}
