import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const statusRouter = router({
  getStatusesOfBoard: protectedProcedure.input(z.object({ boardId: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.prisma.board.findMany({
      where: {
        id: input.boardId
      },
      include: {
        statuses: true
      }
    })
  }),
  createNewStatus: protectedProcedure.input(z.object({
    name: z.string(),
    boardId: z.string()
  })).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.status.create({
      data: {
        name: input.name,
        boards: {
          connect: {
            id: input.boardId
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