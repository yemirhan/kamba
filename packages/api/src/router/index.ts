import { menuRoutes } from "./menu";
import { router } from "../trpc";
import { workspaceRouter } from "./workspace";
import { profileRouter } from "./profile";
import { itemRouter } from "./item";
import { boardRouter } from "./boards";
import { authRouter } from "./auth";
import { statusRouter } from "./status";
import { tableRoutes } from "./tables";
import { storyRoutes } from "./story";
import { menuCategoriesRouter } from "./menuCategories";
import { inventoryRouter } from "./inventory";

export const appRouter = router({
  auth: authRouter,
  boards: boardRouter,
  item: itemRouter,
  status: statusRouter,
  profile: profileRouter,
  workspace: workspaceRouter,
  tables: tableRoutes,
  story: storyRoutes,
  menu: menuRoutes,
  menuCategories: menuCategoriesRouter,
  inventory: inventoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
