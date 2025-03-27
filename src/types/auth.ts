import { JWT } from "next-auth/jwt";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export interface ExtendedJWT extends JWT {
  signed?: string;
}
