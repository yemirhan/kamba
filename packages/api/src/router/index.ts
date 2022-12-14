import { router } from "../trpc";
import { workspaceRouter } from './workspace';
import { profileRouter } from './profile';
import { itemRouter } from './item';
import { boardRouter } from './boards';
import { authRouter } from "./auth";
import { statusRouter } from './status';
import { tableRoutes } from './tables';
import { storyRoutes } from './story';

export const appRouter = router({
  auth: authRouter,
  boards: boardRouter,
  item: itemRouter,
  status: statusRouter,
  profile: profileRouter,
  workspace: workspaceRouter,
  tables: tableRoutes,
  story: storyRoutes
});

// export type definition of API
export type AppRouter = typeof appRouter;
