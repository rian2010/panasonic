import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAuth } from "@/libs/mysql/user/mysql"; // Update the import path as needed

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        try {
          const user = await getAuth(username, password);
          if (user) {
            return {
              id: user.id,
              username: user.username,
              role: user.role,
            };
          } else {
            throw new Error("Invalid username or password");
          }
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Invalid username or password");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials" && user) {
        token.username = user.username;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (token.username) {
        session.user.username = token.username;
      }
      if (token.role) {
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
