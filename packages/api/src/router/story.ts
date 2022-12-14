
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { v4 as uuidv4 } from "uuid";
export const storyRoutes = router({
  getStoryBySlug: protectedProcedure.input(z.object({
    slug: z.string()
  })).query(async ({ ctx, input }) => {
    return await ctx.prisma.story.findUnique({
      where: {
        slug: input.slug
      },
      include: {
        tables: {
          select: {
            name: true,
            _count: {
              select: {
                orders: true,
              }
            },
            color: true,
            id: true,
            icon: true,
            chairs: true,
            slug: true,
          }
        }
      }
    })
  }),
  getStories: protectedProcedure.input(z.object({
    slug: z.string()
  })).query(async ({ ctx, input }) => {
    return await ctx.prisma.story.findMany({
      where: {
        slug: input.slug
      }
    })
  }),
  getStoriesBySlug: protectedProcedure.input(z.object({
    slug: z.string()
  })).query(async ({ ctx, input }) => {
    return await ctx.prisma.tableModule.findUnique({
      where: {
        slug: input.slug
      },
      select: {
        stories: {
          select: {
            name: true,
            id: true,
            slug: true,
            _count: {
              select: {
                tables: true,
              }
            }
          }
        },
        _count: {
          select: {
            tables: true,
          }
        }
      }
    })
  }),
  createStory: protectedProcedure.input(z.object({
    name: z.string(),
    slug: z.string()
  })).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.tableModule.update({
      where: {
        slug: input.slug
      },
      data: {
        stories: {
          create: {
            slug: uuidv4(),
            name: input.name,
          }
        }

      }
    })
  }),
})