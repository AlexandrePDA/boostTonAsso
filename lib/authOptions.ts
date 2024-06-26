import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const emailToLowerCase = credentials?.email?.toLowerCase();
        if (!emailToLowerCase || !credentials?.password) {
          return null;
        }
        const response = await prisma.user.findUnique({
          where: { email: emailToLowerCase },
        });
        const user = response;

        const passwordCorrect = await compare(
          credentials?.password || "",
          user?.password || ""
        );

        if (user === null) {
          return null;
        }

        if (passwordCorrect) {
          return {
            id: user.id,
            email: user.email,
            nameAsso: user.nameAsso,
            isPremium: user.isPremium,
            resetPasswordToken: user.resetPasswordToken,
            resetPasswordTokenExpiry: user.resetPasswordTokenExpiry,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }: { session: any; token: any }) => {
      if (session.user) {
        session.user.id = token.id;
        session.user.isPremium = token.isPremium;
        session.user.nameAsso = token.nameAsso;
        session.user.resetPasswordToken = token.resetPasswordToken;
        session.user.resetPasswordTokenExpiry = token.resetPasswordTokenExpiry;
      }
      return session;
    },
    async jwt({ token }) {
      const existingUser = await prisma.user.findUnique({
        where: { id: token.sub },
      });

      token.id = existingUser?.id;
      token.isPremium = existingUser?.isPremium;
      token.nameAsso = existingUser?.nameAsso;
      token.resetPasswordToken = existingUser?.resetPasswordToken;
      token.resetPasswordTokenExpiry = existingUser?.resetPasswordTokenExpiry;

      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
