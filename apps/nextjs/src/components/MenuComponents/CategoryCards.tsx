import React, { useState } from "react";
import { useMenu } from "Providers/useMenu";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { IconTrash, IconPencil } from "@tabler/icons";
import { EditCard } from "./EditCard";

export const CategoryCards = ({ index }: { index: number }) => {
  const menuState = useMenu((state) => state.menu);
  const UseIsEdit = useMenu((state) => state.setIsEdit);
  const UseIsDelete = useMenu((state) => state.setIsDelete);
  return (
    <>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={menuState[index]?.image} alt="Kategori Resmi"></Image>
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{menuState[index]?.name}</Text>
          <Badge color="pink" variant="light">
            {menuState[index]?.menuItems.length}
          </Badge>
        </Group>

        <Group mt="xl">
          <Button
            onClick={() => setSeeContent(true)}
            variant="light"
            color="blue"
            style={{ flex: 1 }}
            radius="md"
          >
            Tüm içeriği gör
          </Button>
          <ActionIcon
            onClick={() => UseIsDelete()}
            color="red"
            variant="filled"
          >
            <IconTrash size={18} />
          </ActionIcon>
          <ActionIcon onClick={() => UseIsEdit()}>
            <IconPencil size={18} />
          </ActionIcon>
        </Group>
      </Card>
      <EditCard index={index} />
    </>
  );
};
