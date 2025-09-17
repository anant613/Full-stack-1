import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      id: string; // <-- tell TS user has an id
    };
  }

  interface User extends DefaultUser {
    id: string; // returned from authorize()
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // store user id in JWT
  }
}
