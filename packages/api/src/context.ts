import { prisma } from "@acme/db";
import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { User } from "@clerk/nextjs/dist/api";
import { v2 as cloudinary } from "cloudinary";
/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type CreateContextOptions = {
  clerkuser: User | null;
};
cloudinary.config({
  cloud_name: "yemirhan-bucket",
  api_key: "289348551665956",
  api_secret: "9eda3cj1khr_2YR0ZSyQUia-8Uk"
});
/** Use this helper for:
 *  - testing, where we dont have to Mock Next.js' req/res
 *  - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://beta.create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    clerkuser: opts.clerkuser,
    prisma,
    cloudinary
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  async function getClerkUser() {
    const { userId } = getAuth(opts.req);

    const user = userId ? await clerkClient.users.getUser(userId) : null;
    return user;
  }
  const clerkuser = await getClerkUser();

  return await createContextInner({
    clerkuser,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
