import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { type NextAuthOptions } from "next-auth";
import { mockUsers } from "@/entities/auth/lib/mockUsers";
import { SessionUser } from "@/shared/types";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<SessionUser | null> {
        try {
          const email = credentials?.email || "";
          const password = credentials?.password || "";

          const user = mockUsers.find((u) => u.email === email);
          if (!user) return null;

          const passwordMatch = await compare(password, user.password);
          if (!passwordMatch) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      if (token?.user) session.user = token.user as SessionUser;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
