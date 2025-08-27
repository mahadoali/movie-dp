import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "any" },
        password: { label: "Password", type: "password", placeholder: "any" },
      },
      async authorize(credentials) {
        if (!credentials?.username) return null;
        return { id: "1", name: credentials.username };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session }) {
      if (session.user) {
        delete session.user.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
