import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const itemRouter = router({
  createItem: protectedProcedure
    .input(z.object({
      name: z.string().min(1).max(40),
      statusId: z.string(),
      description: z.string().optional(),
      boardId: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.item.create({
        data: {
          name: input?.name,
          slug: crypto.randomUUID(),
          statusId: input?.statusId,
          description: input?.description,
          boardId: input?.boardId,
        },
      })
    }),
  getItemDetailsBySlug: protectedProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.prisma.item.findUnique({
      where: {
        slug: input.slug
      },
      include: {
        board: {
          select: {
            id: true,
            name: true,
            slug: true,
            users: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          }
        },
        status: {
          select: {
            id: true,
            name: true,
          }
        },
        comments: {
          where: {
            personal: false
          },
          select: {
            id: true,
            text: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        }
      }
    })

  }),
  deleteItem: protectedProcedure.input(z.object({ slug: z.string() })).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.item.delete({
      where: {
        slug: input.slug
      }
    })

  }),
  assignUserToItem: protectedProcedure.input(z.object({ slug: z.string(), userId: z.string() })).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.item.update({
      where: {
        slug: input.slug
      },
      data: {
        assignees: {
          connect: {
            id: input.userId
          }
        }
      }
    })
  }),
  unassignUserFromItem: protectedProcedure.input(z.object({ slug: z.string(), userId: z.string() })).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.item.update({
      where: {
        slug: input.slug
      },
      data: {
        assignees: {
          disconnect: {
            id: input.userId
          }
        }
      }
    })
  }),
  updateItemStatus: protectedProcedure.input(z.object({ slug: z.string(), statusId: z.string() })).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.item.update({
      where: {
        slug: input.slug
      },
      data: {
        statusId: input.statusId
      }
    })
  }),
  addCommentToItem: protectedProcedure.input(z.object({ slug: z.string(), text: z.string() })).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.comment.create({
      data: {
        text: input.text,
        itemId: input.slug,
        personal: false,
        userId: ctx.session.user.id
      }
    })
  }),
  addPersonalCommentToItem: protectedProcedure.input(z.object({ slug: z.string(), text: z.string() })).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.comment.create({
      data: {
        text: input.text,
        itemId: input.slug,
        personal: true,
        userId: ctx.session.user.id
      }
    })
  }),
});