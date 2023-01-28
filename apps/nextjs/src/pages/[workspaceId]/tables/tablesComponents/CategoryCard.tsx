import { RouterOutputs } from "@acme/api";
import React from "react";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { ActionIcon } from "@mantine/core";
import { IconPencil } from "@tabler/icons";
export const CategoryCard = ({
  image,
  menuItems,
  name,
}: RouterOutputs["menu"]["all"][0]) => {
  return (
    <Card shadow="sm" p="lg" radius="md" className="w-[300px]" withBorder>
      <Card.Section>
        <Image
          src={image || "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="xl" mb="xs">
        <Text weight={500}>{name}</Text>
        <Badge color="pink" variant="light">
          {(menuItems || []).length}
        </Badge>
      </Group>

      <Group mt="xl">
        <Button variant="light" color="blue" style={{ flex: 1 }} radius="md">
          Tüm içeriği gör
        </Button>
        <ActionIcon color="red" variant="filled">
          <IconTrash size={18} />
        </ActionIcon>
        <ActionIcon color="teal" variant="filled">
          <IconPencil size={18} />
        </ActionIcon>
      </Group>
    </Card>
  );
};
