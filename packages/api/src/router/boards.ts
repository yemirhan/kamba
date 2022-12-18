import { z } from "zod";
import { protectedProcedure, router } from "../trpc";


export const boardRouter = router({
  getUserBoards: protectedProcedure
    .input(z.object({
      workspaceId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const boards = await ctx.prisma.board.findMany({
        where: {
          workspaceId: input.workspaceId,
          users: {
            some: {
              email: ctx.clerkuser.emailAddresses[0]?.emailAddress
            }
          }
        },
        include: {
          users: {
            select: {
              id: true,
              name: true,
              image: true
            }
          },
          items: {
            select: {
              id: true,
            }
          }
        }
      })
      return boards;
    }),
  createNewBoard: protectedProcedure
    .input(z.object({
      name: z.string().min(5),
      workspaceId: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.board.create({
        data: {
          name: input.name,
          workspaceId: input.workspaceId,
          slug: input.name.slice(0, 3).toUpperCase(),
          users: {
            connect: {
              email: ctx.clerkuser.emailAddresses[0]?.emailAddress
            }
          }
        }
      })
    }),
  getBoardBySlug: protectedProcedure.input(z.object({ slug: z.string(), workspaceId: z.string() })).query(async ({ ctx, input }) => {
    const workspace = await ctx.prisma.board.findFirst({
      where: {
        slug: input.slug,
        workspaceId: input.workspaceId
      },
      include: {
        items: {
          select: {
            id: true,
            name: true,
            assignees: {
              select: {
                avatar: true,
                id: true,
              }
            },
            startDate: true,
            endDate: true,
            status: {
              select: {
                name: true,
              }
            },
            images: {
              select: {
                url: true,
              }
            },
            slug: true,
          }
        }
      }
    })
    return workspace;
  })
})