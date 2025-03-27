import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AuthError } from "@/types/auth";

import prisma from "@/../prisma/client";

const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";

const authHandler = NextAuth({
  jwt: {
    secret: JWT_SECRET,
  },
  secret: JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        if (credentials) {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email.toLowerCase() },
          });
          try {
            if (user) {
              const same = bcrypt.compareSync(
                credentials.password,
                user.password
              );
              if (same) {
                return user;
              } else {
                throw new AuthError("Nieprawidłowe hasło.");
              }
            } else {
              throw new AuthError("Nieprawidłowy email.");
            }
          } catch (error) {
            throw new Error("Niezidentyfikowany błąd.");
          }
        } else {
          throw new AuthError("Nie wysłano danych.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const unsigned = {
        id: token.sub,
        email: token.email,
      };
      token.signed = jwt.sign(unsigned, JWT_SECRET);
      return token;
    },
    async session({ session, token }) {
      session.token = token;
      return session;
    },
  },
});

export { authHandler as GET, authHandler as POST };
