import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const profileRouter = router({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findFirst({
      where: {
        email: ctx.clerkuser.emailAddresses[0]?.emailAddress
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
        email: ctx.clerkuser.emailAddresses[0]?.emailAddress
      },
      data: {
        name: input.name,
        bio: input.bio,
        onboarded: true
      }
    })
  })
})