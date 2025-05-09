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
          console.log("🔐 Received credentials:", credentials);

          const user = mockUsers.find((u) => u.email === credentials?.email);
          console.log("👤 User found:", user);

          if (!user) {
            console.log("❌ No user found with that email");
            return null;
          }

          const passwordMatch = await compare(
            credentials!.password,
            user.password
          );
          console.log("🔑 Password match:", passwordMatch);

          if (!passwordMatch) {
            console.log("❌ Password does not match");
            return null;
          }

          console.log("✅ Login successful");
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("💥 Error in authorize():", error);
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
  // 👇 NECESARIO para cifrado JWT
  secret: process.env.NEXTAUTH_SECRET,
};
