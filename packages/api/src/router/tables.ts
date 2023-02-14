import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

import { Colors } from "@prisma/client";
import { slug } from "../idGenerate";
const createTableInput = z.object({
  name: z.string().min(1),
  slug: z.string(),
  chairs: z.number().min(1).max(20),
  color: z.nativeEnum(Colors),
});
export type CreateTableInput = z.infer<typeof createTableInput>;
export const tableRoutes = router({
  getTables: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.tableModule.findUnique({
        where: {
          slug: input.workspaceId,
        },
        select: {
          tables: {
            select: {
              id: true,
              name: true,
              orders: {
                select: {
                  _count: true,
                },
              },
              story: {
                select: {
                  name: true,
                },
              },
              slug: true,
            },
          },
        },
      });
    }),
  createNewTable: protectedProcedure
    .input(createTableInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.story.update({
        where: {
          slug: input.slug,
        },
        data: {
          tables: {
            create: {
              icon: "table",
              name: input.name,
              slug: slug(),
              chairs: input.chairs,
              color: input.color,
            },
          },
        },
      });
    }),
});
