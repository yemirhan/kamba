import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      onboarded: boolean
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    onboarded: boolean
  }
}
