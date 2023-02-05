import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { v4 as uuidv4 } from "uuid";

const createMenuItemSchema = z.object({
  categoryName: z.string(),
  image: z.string(),
  workspaceSlug: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      description: z.string(),
      images: z.array(z.string()).nullish(),
      ingredients: z.array(z.string()).nullish(),
    }),
  ),
});

const updateMenuItemSchema = z.object({
  menuCategoryId: z.string(),
  menuItemId: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  images: z.array(z.string()).nullish(),
  ingredients: z.array(z.string()).nullish(),
});

export type CreateMenuItem = z.infer<typeof createMenuItemSchema>;
export type UpdateMenuItem = z.infer<typeof updateMenuItemSchema>;

export const menuRoutes = router({
  all: protectedProcedure
    .input(
      z.object({
        workspaceSlug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.menuCategory.findMany({
        where: {
          workspaceId: input.workspaceSlug,
        },
        select: {
          name: true,
          id: true,
          menuItems: true,
          image: true,
        },
      });
    }),
  create: protectedProcedure
    .input(createMenuItemSchema)
    .mutation(async ({ ctx, input }) => {
      const categoryImage = await ctx.cloudinary.uploader.upload(input.image, {
        upload_preset: "influshop_comments",
      });

      return await ctx.prisma.menuCategory.create({
        data: {
          name: input.categoryName,
          slug: uuidv4(),
          image: categoryImage.url,
          workspaceId: input.workspaceSlug,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        workspaceSlug: z.string(),
        menuCategoryId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.menuCategory.deleteMany({
        where: {
          workspaceId: input.workspaceSlug,
          id: input.menuCategoryId,
        },
      });
    }),
  updateMenuItem: protectedProcedure
    .input(updateMenuItemSchema)
    .mutation(async ({ ctx, input }) => {
      const images: string[] = [];
      if ((input.images || [])?.length > 0) {
        for (const image of input?.images || []) {
          const categoryImage = await ctx.cloudinary.uploader.upload(image, {
            upload_preset: "influshop_comments",
          });
          images.push(categoryImage.url);
        }
      }

      return await ctx.prisma.menuItem.update({
        where: {
          id: input.menuItemId,
        },
        data: {
          name: input.name,
          price: input.price,
          description: input.description,
          images: {
            createMany: {
              data: images.map((image) => ({
                image: image,
              })),
            },
          },
        },
      });
    }),
  deleteMenuItem: protectedProcedure
    .input(
      z.object({
        menuItemId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.menuItem.delete({
        where: {
          id: input.menuItemId,
        },
      });
    }),
  update: protectedProcedure
    .input(
      createMenuItemSchema.extend({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const categoryImage = await ctx.cloudinary.uploader.upload(input.image, {
        upload_preset: "influshop_comments",
      });

      return await ctx.prisma.menuCategory.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.categoryName,
          slug: uuidv4(),
          image: categoryImage.url,
          workspaceId: input.workspaceSlug,
          menuItems: {
            createMany: {
              data: input.items.map((item) => ({
                name: item.name,
                price: item.price,
                icon: "",
                description: item.description,
                slug: uuidv4(),
                order: 0,
                workspaceId: input.workspaceSlug,
              })),
            },
          },
        },
      });
    }),
});
