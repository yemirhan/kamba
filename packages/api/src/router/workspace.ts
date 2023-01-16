import { z } from 'zod';
import { protectedProcedure, router } from './../trpc';
import { v4 as uuidv4 } from 'uuid';


export const workspaceRouter = router({
  createNewWorkspace: protectedProcedure.input(z.object({
    name: z.string().min(5),
    tables: z.boolean(),
    inventory: z.boolean(),

  })).mutation(async ({ ctx, input }) => {
    const randomId = uuidv4()

    return await ctx.prisma.workspace.create({
      data: {
        name: input.name,
        slug: randomId,
        users: {
          connect: {
            email: ctx.clerkuser.emailAddresses[0]?.emailAddress
          }
        },
        ...(input.tables ? {
          TableModule: {
            create: {
              name: input.name,
              slug: randomId,

            }
          }
        } : {}),
        ...(input.inventory ? {
          InventoryModule: {
            create: {
              name: input.name,
              slug: randomId,
            }
          }
        } : {})
      }
    })
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.workspace.findMany({
      where: {
        users: {
          some: {
            email: ctx.clerkuser.emailAddresses[0]?.emailAddress
          }
        }
      },
      include: {
        _count: {
          select: {
            boards: true,
            users: true
          }
        },

      }
    })
  }),
  getWorkspaceBySlug: protectedProcedure.input(z.object({
    slug: z.string()
  })).query(async ({ ctx, input }) => {
    return await ctx.prisma.workspace.findFirst({
      where: {
        slug: input.slug,
        users: {
          some: {
            email: ctx.clerkuser.emailAddresses[0]?.emailAddress
          }
        }
      }
    })
  })
})