import { itemRouter } from './item';
import { boardRouter } from './boards';
import { router } from "../trpc";
import { authRouter } from "./auth";
import { statusRouter } from './status';

export const appRouter = router({
  auth: authRouter,
  boards: boardRouter,
  item: itemRouter,
  status: statusRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
