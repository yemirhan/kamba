import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { v4 as uuidv4 } from "uuid";

const createMenuItemSchema = z.object({
  name: z.string(),
  images: z.array(z.string()),
  workspaceId: z.string(),
  price: z.number(),
  description: z.string().nullish()
})

export type CreateMenuItem = z.infer<typeof createMenuItemSchema>

export const menuRoutes = router({
  all: protectedProcedure.input(z.object({
    workspaceSlug: z.string()
  })).query(async ({ ctx, input }) => {
    return await ctx.prisma.tableModule.findMany({
      where: {
        workspace: {
          slug: input.workspaceSlug
        }
      },
      select: {
        menuCategories: {
          select: {
            menuItems: true,
            name: true,
            _count: {
              select: {
                menuItems: true
              }
            },
            slug: true,

          }
        }
      }
    })
  }),
  create: protectedProcedure.input(createMenuItemSchema).mutation(async ({ ctx, input }) => {
    const images: string[] = []
    input.images.forEach(async (image) => {
      const upload = await ctx.cloudinary.uploader.upload(image, {
        upload_preset: "menuItems"
      })
      images.push(upload.secure_url)
    })

    return await ctx.prisma.menuItem.create({
      data: {
        icon: "",
        name: input.name,
        slug: uuidv4(),
        images: images,
        order: 0,
        workspace: {
          connect: {
            slug: input.workspaceId
          }
        },
        price: input.price,
        description: input.description

      }
    })
  }
  ),
})