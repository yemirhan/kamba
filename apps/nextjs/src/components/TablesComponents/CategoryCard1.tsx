import React from "react";
import {
  Card,
  Image,
  Group,
  Badge,
  Text,
  Button,
  ActionIcon,
} from "@mantine/core";
import { RouterOutputs } from "@acme/api";
import { IconPencil, IconTrash } from "@tabler/icons";
import { useMenu } from "providers/useMenu";
import { api } from "@acme/api/src/client";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

export const CategoryCard1 = ({
  categoryInfo,
}: {
  categoryInfo: RouterOutputs["newMenuCategories"]["all"][0];
}) => {
  const apiContext = api.useContext();
  const SetIsEditMenu = useMenu((state) => state.SetIsEditMenu);
  const { mutate: deleteMenu, isLoading: deleteLoading } =
    api.menu.delete.useMutation({
      onSuccess: () => {
        showNotification({
          message: "İşlem Başarılı",
          color: "green",
          autoClose: 2000,
          onClose: () => apiContext.newMenuCategories.all.invalidate(),
        });
      },
    });

  const { query } = useRouter();
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={categoryInfo.image} height={160} alt="Kategori Resmi" />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{categoryInfo.name}</Text>
        <Badge color="pink" variant="light">
          {categoryInfo._count.menuItems}
        </Badge>
      </Group>

      <Group position="apart">
        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          İçeriği Gör
        </Button>
        <div className="flex flex-row justify-center">
          <ActionIcon
            radius="lg"
            variant="filled"
            onClick={() => SetIsEditMenu()}
          >
            <IconPencil size={16} />
          </ActionIcon>
          <ActionIcon
            color="red"
            radius="lg"
            variant="filled"
            onClick={() =>
              deleteMenu({
                menuCategoryId: categoryInfo.id,
                workspaceSlug: query.workspaceId as string,
              })
            }
          >
            <IconTrash size={16} />
          </ActionIcon>
        </div>
      </Group>
    </Card>
  );
};
