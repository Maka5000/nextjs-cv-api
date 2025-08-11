import { AuthUser } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

async function getAuthUser(email: string) {
  try {
    const user =
      await sql<AuthUser>`SELECT * FROM authusers WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch auth user: ", error);
    throw new Error("Failed to fetch auth user.");
  }
}

export const options: NextAuthOptions = {
  pages: {
    signIn: "/",
    error: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@email.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await getAuthUser(email);
        if (!user) return null;

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (email !== user.email && !passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
