import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const profileRouter = router({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findFirst({
      where: {
        id: ctx.session.user.id
      },
      include: {
        workspaces: {
          select: {
            id: true,
          }
        }
      }
    })
  }),
  updateProfile: protectedProcedure.input(z.object({
    name: z.string(),
    bio: z.string(),
  })).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id
      },
      data: {
        name: input.name,
        bio: input.bio,
        onboarded: true
      }
    })
  })
})