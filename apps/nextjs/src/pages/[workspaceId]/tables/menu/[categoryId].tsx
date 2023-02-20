import { AddNewMenuItemModal } from "@/components/Tables/AddMenuItemModal";
import { MenuDetails } from "@/components/Tables/MenuDetails";
import { TablesLayout } from "@/components/Tables/TablesLayout";
import { EditCategory } from "@/components/TablesComponents/EditCategory";
import { useMenuSort } from "@/hooks/useMenuSort";
import { api } from "@acme/api/src/client";
import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Loader,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronLeft, IconGridDots, IconPencil } from "@tabler/icons";
import { useRouter } from "next/router";
import { useState } from "react";

const Category = () => {
  const { query, isReady, back } = useRouter();
  const [edit, setEdit] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const { sortEnabled, setSortEnabled } = useMenuSort();
  const {
    data: menuCategory,
    isLoading,
    isFetched,
  } = api.newMenuCategories.byId.useQuery(
    {
      categoryId: query.categoryId as string,
      workspaceId: query.workspaceId as string,
    },
    {
      enabled: isReady,
    },
  );
  return (
    <TablesLayout>
      <Group position="apart">
        <Group>
          <ActionIcon>
            <IconChevronLeft
              size={20}
              stroke={3}
              onClick={() => {
                back();
              }}
            />
          </ActionIcon>
          <Title>Menü İçerikleri</Title>
        </Group>
        <Group>
          <Button
            leftIcon={<IconGridDots />}
            onClick={() => setSortEnabled(!sortEnabled)}
            disabled={!isFetched}
            color={sortEnabled ? "red" : "blue"}
          >
            Sıralamayı Düzenle
          </Button>
          <Button
            leftIcon={<IconPencil />}
            onClick={() => setEdit(true)}
            disabled={!isFetched}
          >
            Kategoriyi Düzenle
          </Button>
        </Group>
      </Group>
      {isLoading ? (
        <Paper withBorder p={"lg"}>
          <Flex direction={"column"} align="center" justify={"center"}>
            <Loader />
            <Text>Yükleniyor...</Text>
          </Flex>
        </Paper>
      ) : (
        <MenuDetails menuCategory={menuCategory} openModal={open} />
      )}
      <AddNewMenuItemModal opened={opened} close={close} />
      <EditCategory menuCategory={menuCategory} edit={edit} setEdit={setEdit} />
    </TablesLayout>
  );
};

export default Category;
