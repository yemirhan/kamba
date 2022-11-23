import { itemRouter } from './item';
import { workspaceRouter } from './workspace';
import { router } from "../trpc";
import { authRouter } from "./auth";
import { statusRouter } from './status';

export const appRouter = router({
  auth: authRouter,
  workspaces: workspaceRouter,
  item: itemRouter,
  status: statusRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
