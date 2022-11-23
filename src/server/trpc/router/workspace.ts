import { z } from "zod";
import { protectedProcedure, router } from "../trpc";


export const workspaceRouter = router({
  getUserWorkspaces: protectedProcedure.query(async ({ ctx }) => {
    const workspaces = await ctx.prisma.workspace.findMany({
      where: {
        users: {
          some: {
            id: ctx.session.user.id
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
    return workspaces;
  }),
  createNewWorkspace: protectedProcedure
    .input(z.object({
      name: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const workspace = await ctx.prisma.workspace.create({
        data: {
          name: input.name,
          slug: input.name.slice(0, 3).toUpperCase(),
          users: {
            connect: {
              id: ctx.session.user.id
            }
          }
        }
      })

      return workspace;
    }),
  getWorkspaceBySlug: protectedProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
    const workspace = await ctx.prisma.workspace.findUnique({
      where: {
        slug: input.slug
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