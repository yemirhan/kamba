import { appRouter, createContext } from "@acme/api";
import { NextApiRequest, NextApiResponse } from "next";
import cors from "nextjs-cors";
import { createOpenApiNextHandler } from "trpc-openapi";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Setup CORS

  // Handle incoming OpenAPI requests
  return createOpenApiNextHandler({
    router: appRouter,
    createContext,
  })(req, res);
};

export default handler;
