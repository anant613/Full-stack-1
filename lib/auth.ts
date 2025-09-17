import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/modals/User.modals";
import { connectToDatabase } from "./dt";
import nextAuth from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id; // store id in JWT
      return token;
    },
  
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id; // TS now recognizes id
      }
      return session;
    },
  
    async signIn({ user, account, profile, email, credentials }) {
      if (user.email && user.email.endsWith("@example.com")) {
        return true;
      }
      return false;
    },
  }
  
}
