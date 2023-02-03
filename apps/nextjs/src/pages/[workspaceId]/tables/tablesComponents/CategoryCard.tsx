import { RouterOutputs } from "@acme/api";
import React from "react";
import { Card, Image, Text, Badge, Button, Group, Stack } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { ActionIcon } from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import { Modal } from "@mantine/core";
import { useState } from "react";
import { IconCheck } from "@tabler/icons";
import { IconBan } from "@tabler/icons";
import { api } from "@acme/api/src/client";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { EditCard } from "./EditCard";
import { SeeContent } from "./SeeContent";
export const CategoryCard = ({
  image,
  menuItems,
  name,
  id,
}: RouterOutputs["menu"]["all"][0]) => {
  const [opened, setopened] = useState(false);
  const [edit, setedit] = useState(false);
  const [seeContent, setSeeContent] = useState(false)
  return (
    <>
      <Card shadow="sm" p="lg" radius="md" className="w-[300px]" withBorder>
        <Card.Section>
          <Image
            src={
              image ||
              "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            }
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
          <Button onClick={()=>setSeeContent(true)} variant="light" color="blue" style={{ flex: 1 }} radius="md">
            Tüm içeriği gör
          </Button>
          <ActionIcon
            onClick={() => setopened(true)}
            color="red"
            variant="filled"
          >
            <IconTrash size={18} />
          </ActionIcon>
          <ActionIcon onClick={() => setedit(true)}>
            <IconPencil size={18} />
          </ActionIcon>
        </Group>
      </Card>
      <TrashModal opened={opened} setopened={setopened} id={id} />
      <EditCard
        id={id}
        image={image}
        menuItems={menuItems}
        name={name}
        edit={edit}
        setedit={setedit}
      />
      <SeeContent menuItems = {menuItems} seeContent={seeContent} setSeeContent={setSeeContent} name={name} image={image}/>
    </>
  );
};

const TrashModal = ({
  opened,
  setopened,
  id,
}: {
  opened: boolean;
  setopened: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}) => {
  const queryContext = api.useContext();
  const { query } = useRouter();
  const { mutate: mutateCategoryDelete, isLoading } =
    api.menu.delete.useMutation({
      onSuccess: () => {
        showNotification({
          title: "İşlem Başarılı",
          message: "",
          autoClose: 2000,
        });
        setopened(false);
        queryContext.menu.all.invalidate();
      },
    });
  return (
    <Modal opened={opened} onClose={() => setopened(false)}>
      <Stack align="center">
        <p>Kategoriyi silmek istediğinize emin misiniz?</p>
        <Group position="apart">
          <ActionIcon
            onClick={() =>
              mutateCategoryDelete({
                workspaceSlug: query.workspaceId as string,
                menuCategoryId: id,
              })
            }
            color="green"
            size="lg"
            radius="xl"
            variant="filled"
          >
            <IconCheck size={26} />
          </ActionIcon>
          <ActionIcon color="red" size="lg" radius="xl" variant="filled">
            <IconBan size={26} />
          </ActionIcon>
        </Group>
      </Stack>
    </Modal>
  );
};
