import { Colors, Icon } from "@acme/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { slug } from "../../idGenerate";
import { protectedProcedure, router } from "../../trpc";

const createMenuCategory = z.object({
  workspaceId: z.string(),
  name: z.string(),
  image: z.string(),
  icon: z.nativeEnum(Icon).optional(),
  color: z.nativeEnum(Colors).optional(),
});

export type CreateMenuCategory = z.infer<typeof createMenuCategory>;

export const menuCategoryRoutes = router({
  all: protectedProcedure
    .input(
      z.object({
        workspaceSlug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const workspace = await ctx.prisma.workspace.findUnique({
        where: {
          slug: input.workspaceSlug,
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
            slug: input.workspaceSlug,
          },
        },
        select: {
          name: true,
          color: true,
          icon: true,
          image: true,
          id: true,
          slug: true,
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
          slug: input.categoryId,
        },
        select: {
          name: true,
          image: true,

          color: true,
          icon: true,
          id: true,
          menuItems: {
            select: {
              name: true,
              price: true,
              archived: true,
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
    .input(createMenuCategory)
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
      let image: undefined | string = undefined;
      try {
        if (input.image.length > 0) {
          const a = await ctx.cloudinary.uploader.upload(input.image, {
            upload_preset: "influshop_comments",
          });
          image = a.url;
        }
      } catch (error) {
        return new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error uploading image",
        });
      }
      return await ctx.prisma.menuCategory.create({
        data: {
          name: input.name,
          image: image
            ? image
            : "https://res.cloudinary.com/yemirhan-bucket/image/upload/v1676136679/influshop_comments/Group_10placeholder_yldivb.png",
          slug: slug(),
          icon: input.icon || "APPLE",
          color: input.color || "GREEN",
          workspace: {
            connect: {
              slug: input.workspaceId,
            },
          },
        },
      });
    }),
});
