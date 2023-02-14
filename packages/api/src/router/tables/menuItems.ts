import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { slug } from "../../idGenerate";
import { protectedProcedure, router } from "../../trpc";

const createMenuItem = z.object({
  workspaceId: z.string(),
  categoryId: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  images: z.array(z.string()).nullish(),
  ingredients: z.array(z.string().min(3).max(20)).nullish(),
});

export type CreateMenuItem = z.infer<typeof createMenuItem>;

export const menuItemsRoutes = router({
  all: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        categoryId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const workspace = await ctx.prisma.workspace.findUnique({
        where: {
          slug: input.workspaceId,
        },
        select: {
          users: {
            select: {
              externalId: true,
            },
          },
        },
      });
      if (!workspace)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workspace not found",
        });
      if (
        workspace.users.find((user) => user.externalId === ctx.clerkuser.id) ===
        undefined
      )
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to access this workspace",
        });

      return await ctx.prisma.menuItem.findMany({
        where: {
          menuCategoryId: input.categoryId,
          workspace: {
            slug: input.workspaceId,
          },
        },
        select: {
          name: true,
          price: true,
          images: true,
          _count: {
            select: {
              images: true,
              ingredients: true,
            },
          },
        },
      });
    }),
  byId: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        categoryId: z.string(),
        itemId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const workspace = await ctx.prisma.workspace.findUnique({
        where: {
          slug: input.workspaceId,
        },
        select: {
          users: {
            select: {
              externalId: true,
            },
          },
        },
      });
      if (!workspace)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workspace not found",
        });
      if (
        workspace.users.find((user) => user.externalId === ctx.clerkuser.id) ===
        undefined
      )
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to access this workspace",
        });

      return await ctx.prisma.menuItem.findUnique({
        where: {
          id: input.itemId,
        },
        select: {
          name: true,
          price: true,
          images: true,
          ingredients: {
            select: {
              name: true,
            },
          },
          description: true,
        },
      });
    }),
  create: protectedProcedure
    .input(createMenuItem)
    .mutation(async ({ ctx, input }) => {
      const workspace = await ctx.prisma.workspace.findUnique({
        where: {
          slug: input.workspaceId,
        },
        select: {
          users: {
            select: {
              externalId: true,
            },
          },
        },
      });
      if (!workspace)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workspace not found",
        });
      if (
        workspace.users.find((user) => user.externalId === ctx.clerkuser.id) ===
        undefined
      )
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to access this workspace",
        });
      const images: string[] = [];
      if (input.images && input.images.length > 0) {
        for (const image of input.images) {
          await ctx.cloudinary.uploader.upload(image, {
            upload_preset: "influshop_comments",
          });
        }
      }

      return await ctx.prisma.menuItem.create({
        data: {
          name: input.name,
          price: input.price,
          description: input.description,
          slug: slug(),
          images: {
            createMany: {
              data: images?.map((image) => ({
                image: image,
              })),
            },
          },
          ingredients: {
            createMany: {
              data: (input.ingredients || [])?.map((ingredient) => ({
                name: ingredient,
                slug: slug(),
              })),
            },
          },
          icon: "🍔",
          order: 0,
          MenuCategory: {
            connect: {
              slug: input.categoryId,
            },
          },
          workspace: {
            connect: {
              slug: input.workspaceId,
            },
          },
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        categoryId: z.string(),
        itemId: z.string(),
        name: z.string(),
        price: z.number(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const workspace = await ctx.prisma.workspace.findUnique({
        where: {
          slug: input.workspaceId,
        },
        select: {
          users: {
            select: {
              externalId: true,
            },
          },
        },
      });
      if (!workspace)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workspace not found",
        });
      if (
        workspace.users.find((user) => user.externalId === ctx.clerkuser.id) ===
        undefined
      )
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to access this workspace",
        });

      return await ctx.prisma.menuItem.update({
        where: {
          id: input.itemId,
        },
        data: {
          name: input.name,
          price: input.price,
          description: input.description,
        },
      });
    }),
  updatePhoto: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        categoryId: z.string(),
        itemId: z.string(),
        images: z.array(z.string()).nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const workspace = await ctx.prisma.workspace.findUnique({
        where: {
          slug: input.workspaceId,
        },
        select: {
          users: {
            select: {
              externalId: true,
            },
          },
        },
      });
      if (!workspace)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workspace not found",
        });
      if (
        workspace.users.find((user) => user.externalId === ctx.clerkuser.id) ===
        undefined
      )
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to access this workspace",
        });
      const images: string[] = [];
      if (input.images && input.images.length > 0) {
        for (const image of input.images) {
          await ctx.cloudinary.uploader.upload(image, {
            upload_preset: "influshop_comments",
          });
        }
      }

      return await ctx.prisma.menuItem.update({
        where: {
          id: input.itemId,
        },
        data: {
          images: {
            createMany: {
              data: images?.map((image) => ({
                image: image,
              })),
            },
          },
        },
      });
    }),
  updateIngredients: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        categoryId: z.string(),
        itemId: z.string(),
        ingredients: z
          .array(
            z.object({
              id: z.string().optional(),
              name: z.string().min(3).max(20),
            }),
          )
          .nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const workspace = await ctx.prisma.workspace.findUnique({
        where: {
          slug: input.workspaceId,
        },
        select: {
          users: {
            select: {
              externalId: true,
            },
          },
        },
      });
      if (!workspace)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workspace not found",
        });
      if (
        workspace.users.find((user) => user.externalId === ctx.clerkuser.id) ===
        undefined
      )
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to access this workspace",
        });

      return await ctx.prisma.menuItem.update({
        where: {
          id: input.itemId,
        },
        data: {
          ingredients: {
            upsert: input.ingredients?.map((ingredient) => ({
              where: {
                id: ingredient.id,
              },
              create: {
                name: ingredient.name,
                slug: slug(),
              },
              update: {
                name: ingredient.name,
                slug: slug(),
              },
            })),
          },
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        categoryId: z.string(),
        itemId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const workspace = await ctx.prisma.workspace.findUnique({
        where: {
          slug: input.workspaceId,
        },
        select: {
          users: {
            select: {
              externalId: true,
            },
          },
        },
      });
      if (!workspace)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workspace not found",
        });
      if (
        workspace.users.find((user) => user.externalId === ctx.clerkuser.id) ===
        undefined
      )
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to access this workspace",
        });

      return await ctx.prisma.menuItem.delete({
        where: {
          id: input.itemId,
        },
      });
    }),
});
