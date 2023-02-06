import React from "react";
import { RouterOutputs } from "@acme/api";
import {
  Card,
  Group,
  Text,
  Image,
  Badge,
  Button,
  ActionIcon,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons";
import { useMenu } from "providers/useMenu";
import { EditCard } from "./EditCard";
export const CategoryCard = ({
  categoryValues,
}: {
  categoryValues: RouterOutputs["menu"]["all"][0];
}) => {
  const SetEditCard = useMenu((state) => state.SetEditCard);
  return (
    <>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={categoryValues.image} height={160} alt="Norway" />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{categoryValues.name}</Text>
          <Badge color="pink" variant="light">
            {categoryValues.menuItems.length}
          </Badge>
        </Group>

        <div className="flex w-full flex-row items-center gap-2">
          <Button
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            className="w-[70%]"
          >
            İçeriği Gör
          </Button>
          <ActionIcon>
            <IconTrash size={24} className="mt-4" />
          </ActionIcon>
          <ActionIcon onClick={() => SetEditCard()}>
            <IconPencil size={24} className="mt-4" />
          </ActionIcon>
        </div>
      </Card>
      <EditCard categoryValues={categoryValues} />
    </>
  );
};
