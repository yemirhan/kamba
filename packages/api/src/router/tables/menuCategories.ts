import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { slug } from "../../idGenerate";
import { protectedProcedure, router } from "../../trpc";

export const menuCategoryRoutes = router({
  all: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
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
      return await ctx.prisma.menuCategory.findMany({
        where: {
          workspace: {
            slug: input.workspaceId,
          },
        },
        select: {
          name: true,
          image: true,
          id: true,
          _count: {
            select: {
              menuItems: true,
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
      return await ctx.prisma.menuCategory.findUnique({
        where: {
          id: input.categoryId,
        },
        select: {
          name: true,
          image: true,
          id: true,
          menuItems: {
            select: {
              name: true,
              price: true,
              description: true,
              images: true,
              id: true,
              _count: {
                select: {
                  ingredients: true,
                },
              },
            },
          },
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        name: z.string(),
        image: z.string(),
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
      return await ctx.prisma.menuCategory.create({
        data: {
          name: input.name,
          image:
            input.image.length > 0
              ? input.image
              : "https://res.cloudinary.com/yemirhan-bucket/image/upload/v1676136679/influshop_comments/Group_10placeholder_yldivb.png",
          slug: slug(),
          workspace: {
            connect: {
              slug: input.workspaceId,
            },
          },
        },
      });
    }),
});
