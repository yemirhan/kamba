import { z } from "zod";
import { slug } from "../../idGenerate";
import { protectedProcedure, router } from "../../trpc";

export const inventoryRoutes = router({
  all: protectedProcedure
    .input(
      z.object({
        workspaceSlug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.inventoryItem.findMany({
        where: {
          workspace: {
            slug: input.workspaceSlug,
          },
        },
      });
    }),
  getLastUpdatedTen: protectedProcedure
    .input(
      z.object({
        workspaceSlug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.inventoryItem.findMany({
        where: {
          workspace: {
            slug: input.workspaceSlug,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 10,
      });
    }),
  stockCount: protectedProcedure
    .input(
      z.object({
        workspaceSlug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.inventoryItem.count({
        where: {
          workspace: {
            slug: input.workspaceSlug,
          },
        },
      });
    }),
  byId: protectedProcedure
    .input(
      z.object({
        workspaceSlug: z.string(),
        inventoryId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.inventoryModule.findUnique({
        where: {
          id: input.inventoryId,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        workspaceSlug: z.string(),

        name: z.string(),
        amount: z.number(),
        price: z.number(),
        image: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let image: string | undefined = undefined;
      if (input.image) {
        const { url } = await ctx.cloudinary.uploader.upload(input.image, {
          upload_preset: "influshop_comments",
        });
        image = url;
      }
      return await ctx.prisma.inventoryItem.create({
        data: {
          name: input.name,
          amount: input.amount,
          price: input.price,
          image: image,
          InventoryModule: {
            connect: {
              slug: input.workspaceSlug,
            },
          },
          slug: slug(),
          workspace: {
            connect: {
              slug: input.workspaceSlug,
            },
          },
        },
      });
    }),
});
