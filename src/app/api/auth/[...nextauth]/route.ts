import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { db } from '../../../db/db';
import { users, sessions } from '../../../db/schema';

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }

      return token;
    },
  },
  events: {
    signIn: async ({ user: _user, account }) => {
      const user = await db.insert(users).values({
        email: _user.email,
        name: _user.name,
        profilePicture: _user.image,
      }).returning({ userId: users.id });

      await db.insert(sessions).values({
        user: user[0].userId,
        accessToken: account?.access_token,
        active: true,
        expiresAt: account?.expires_at,
      });
    }
  }
});

export { handler as GET, handler as POST };