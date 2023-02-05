import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { v4 as uuidv4 } from "uuid";

export const inventoryRouter = router({
  add: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        name: z.string(),
        amount: z.number(),
        price: z.number(),
        file: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.inventoryModule.update({
        where: {
          workspaceId: input.workspaceId,
        },
        data: {
          InventoryItem: {
            create: {
              name: input.name,
              amount: input.amount,
              price: input.price,
              slug: uuidv4(),
            },
          },
        },
      });
    }),
  all: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.inventoryModule.findMany({
        where: {
          workspaceId: input.workspaceId,
        },
        include: {
          InventoryItem: true,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        slug: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.inventoryModule.update({
        where: {
          workspaceId: input.workspaceId,
        },
        data: {
          InventoryItem: {
            delete: {
              slug: input.slug,
            },
          },
        },
      });
    }),
});
