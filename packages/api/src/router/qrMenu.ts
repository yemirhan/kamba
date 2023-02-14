import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const qeMenuRouter = router({
  all: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.menuCategory.findMany({
        where: {
          workspace: {
            slug: input.slug,
          },
        },
        include: {
          menuItems: true,
        },
      });
    }),
});
