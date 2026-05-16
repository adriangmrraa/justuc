import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

// Demo user para testing sin Google OAuth
const DEMO_USER = {
  id: "demo-user-123",
  name: "Usuario Demo",
  email: "demo@justiciatucuman.gob.ar",
  image: null,
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google,
    // Provider de demo para testing del MVP
    Credentials({
      name: "Demo",
      credentials: {},
      async authorize() {
        return DEMO_USER;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        // Si es demo, no tiene googleId
        if (account?.provider === "google") {
          token.googleId = user.googleId;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.googleId = (token.googleId as string) || undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});