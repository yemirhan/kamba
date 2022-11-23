import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const statusRouter = router({
  getStatusesOfWorkspace: protectedProcedure.input(z.object({ workspaceId: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.prisma.workspace.findMany({
      where: {
        id: input.workspaceId
      },
      include: {
        statuses: true
      }
    })
  }),
  createNewStatus: protectedProcedure.input(z.object({
    name: z.string(),
    workspaceId: z.string()
  })).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.status.create({
      data: {
        name: input.name,
        workspaces: {
          connect: {
            id: input.workspaceId
          }
        }
      },
    })
  }),
  deleteStatus: protectedProcedure.input(z.object({
    id: z.string()
  })).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.status.delete({
      where: {
        id: input.id
      }
    })
  }),
  updateStatus: protectedProcedure.input(z.object({
    id: z.string(),
    name: z.string()
  })).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.status.update({
      where: {
        id: input.id
      },
      data: {
        name: input.name
      }
    })
  }),
})