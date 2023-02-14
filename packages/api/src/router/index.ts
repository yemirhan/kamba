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
import { menuCategoryRoutes } from "./tables/menuCategories";
import { menuItemsRoutes } from "./tables/menuItems";
import { inventoryRoutes } from "./inventory/inventory";
import { qeMenuRouter } from "./qrMenu";

export const appRouter = router({
  auth: authRouter,
  boards: boardRouter,
  item: itemRouter,
  status: statusRouter,
  inventory: inventoryRoutes,
  profile: profileRouter,
  workspace: workspaceRouter,
  tables: tableRoutes,
  story: storyRoutes,
  menu: menuRoutes,
  menuCategories: menuCategoriesRouter,
  newMenuCategories: menuCategoryRoutes,
  newMenuItems: menuItemsRoutes,
  qrMenu: qeMenuRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
