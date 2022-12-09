import { Code } from '@mantine/core';
import { z } from 'zod';
import { protectedProcedure, router } from './../trpc';
import crypto from "crypto"


export const workspaceRouter = router({
  createNewWorkspace: protectedProcedure.input(z.object({
    name: z.string().min(5),
    tables: z.boolean(),
    inventory: z.boolean(),

  })).mutation(async ({ ctx, input }) => {
    const randomId = crypto.randomUUID()
    return await ctx.prisma.workspace.create({
      data: {
        name: input.name,
        slug: randomId,
        users: {
          connect: {
            id: ctx.session.user.id
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
            id: ctx.session.user.id
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
            id: ctx.session.user.id
          }
        }
      }
    })
  })
})