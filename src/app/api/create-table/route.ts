import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

// async function createProfilesTable() {
//   await sql`CREATE TABLE IF NOT EXISTS profiles (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         about VARCHAR(255) NOT NULL,
//         avatar_url VARCHAR(255)
//     )`;
// }

// async function createEducationsTable() {
//   await sql`CREATE TABLE IF NOT EXISTS educations (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         user_id UUID DEFAULT NOT NULL,
//         establishment VARCHAR(255),
//         program VARCHAR(255) NOT NULL,
//         degree VARCHAR(255)
//     )`;
// }

// async function createSkillsTable() {
//   await sql`CREATE TABLE IF NOT EXISTS skills (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         user_id UUID DEFAULT NOT NULL,
//         iconurl VARCHAR(255),
//         name VARCHAR(255) NOT NULL,
//         level VARCHAR(255) NOT NULL
//     )`;
// }

// async function createProjectsTable() {
//   await sql`CREATE TABLE IF NOT EXISTS projects (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         user_id UUID DEFAULT NOT NULL,
//         name VARCHAR(255) NOT NULL,
//         imageurl VARCHAR(255),
//         link VARCHAR(255)
//     )`;
// }

// async function createContactsTable() {
//   await sql`CREATE TABLE IF NOT EXISTS contacts (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         user_id UUID DEFAULT NOT NULL,
//         iconurl VARCHAR(255),
//         type VARCHAR(255),
//         contact VARCHAR(255) NOT NULL
//     )`;
// }

// async function createLanguagesTable() {
//   await sql`CREATE TABLE IF NOT EXISTS languages (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         user_id UUID DEFAULT NOT NULL,
//         language VARCHAR(255) NOT NULL,
//         level VARCHAR(255) NOT NULL
//     )`;
// }

// async function createJobsTable() {
//   await sql`CREATE TABLE IF NOT EXISTS jobs (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         user_id UUID DEFAULT NOT NULL,
//         company VARCHAR(255) NOT NULL,
//         position VARCHAR(255) NOT NULL,
//         experience VARCHAR(255)
//     )`;
// }

// async function createAuthUsersTable() {
//   await sql`CREATE TABLE IF NOT EXISTS authusers (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email TEXT NOT NULL UNIQUE,
//         password TEXT NOT NULL
//     )`;
// }

// async function createApiKeysTable() {
//   await sql`CREATE TABLE IF NOT EXISTS apikeys (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         user_id UUID NOT NULL,
//         user_email TEXT NOT NULL UNIQUE,
//         api_key_hash VARCHAR(255) NOT NULL,
//         lastUsedAt TIMESTAMP
//     )`;
// }

// export async function GET(req: NextRequest) {
//   if (!req.headers.get("x-authenticated")) {
//     return NextResponse.json({ error: "You are not authorized!" });
//   }

//   try {
//     // await createProfilesTable();
//     // await createEducationsTable();
//     // await createSkillsTable();
//     // await createProjectsTable();
//     // await createContactsTable();
//     // await createLanguagesTable();
//     // await createJobsTable();
//     // await createAuthUsersTable();

//     await createApiKeysTable().then(res => console.log(res));

//     return Response.json({ message: "Database tables created" });
//     return Response.json({ message: null });
//   } catch (error) {
//     await sql`ROLLBACK`;
//     return Response.json({ error }, { status: 500 });
//   }
// }
