import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

import { slug } from "../idGenerate";
export const menuCategoriesRouter = router({
  all: protectedProcedure
    .input(
      z.object({
        workspaceSlug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.tableModule.findMany({
        where: {
          workspace: {
            slug: input.workspaceSlug,
          },
        },
        select: {
          menuCategories: {
            select: {
              menuItems: true,
              name: true,
              _count: {
                select: {
                  menuItems: true,
                },
              },
              slug: true,
            },
          },
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        workspaceSlug: z.string(),
        order: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.menuCategory.create({
        data: {
          slug: slug(),

          name: input.name,
          order: input.order,
          workspace: {
            connect: {
              slug: input.workspaceSlug,
            },
          },
        },
      });
    }),
});
