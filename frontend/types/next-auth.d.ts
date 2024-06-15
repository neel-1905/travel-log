import { DefaultSession, DefaultUser } from "next-auth";

import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      username: string;
      email: string;
      profileImg: string;
      role: "ADMIN" | "USER";
      access_token: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    _id: string;
    username: string;
    email: string;
    profileImg: string;
    role: "ADMIN" | "USER";
    access_token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    _id: string;
    username: string;
    email: string;
    profileImg: string;
    role: "ADMIN" | "USER";
    access_token: string;
  }
}
