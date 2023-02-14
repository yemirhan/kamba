import { TablesLayout } from "@/components/Tables/TablesLayout";
import { MenuIcon } from "@/utils/menuIcons";
import { placeholder } from "@/utils/placeholder";
import { RouterOutputs } from "@acme/api";
import { api } from "@acme/api/src/client";
import { CreateMenuItem } from "@acme/api/src/router/tables/menuItems";
import {
  ActionIcon,
  Button,
  createStyles,
  Flex,
  Grid,
  Group,
  Loader,
  Modal,
  Paper,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import {
  IconChevronLeft,
  IconPencil,
  IconPlus,
  IconTrash,
  IconX,
} from "@tabler/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
const useStyles = createStyles((theme, _params, getRef) => {
  return {
    overlay: {
      position: "absolute",
      top: "20%",
      left: 0,
      zIndex: 10,
      right: 0,
      bottom: 0,
      backgroundImage:
        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)",
    },

    content: {
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      zIndex: 1,
    },

    title: {
      color: theme.white,
      position: "absolute",
      fontSize: 32,
      bottom: 10,
      left: 20,
      zIndex: 20,
    },

    addNew: {
      backgroundColor: theme.colors.gray,
      color: theme.white,
      cursor: "pointer",
      transition: "background-color 200ms ease",
      "&:hover": {
        backgroundColor: theme.colors.teal[8],
      },
    },

    bodyText: {
      color: theme.colors.dark[2],
      marginLeft: 7,
    },

    author: {
      color: theme.colors.dark[2],
    },
  };
});
const Category = () => {
  const { query, isReady, back } = useRouter();

  const [opened, { open, close }] = useDisclosure(false);
  const { data: menuCategory, isLoading } = api.newMenuCategories.byId.useQuery(
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
        <Button leftIcon={<IconPencil />} disabled={isLoading}>
          Kategoriyi Düzenle
        </Button>
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
    </TablesLayout>
  );
};

export default Category;

const AddNewMenuItemModal = ({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) => {
  const { query } = useRouter();
  const { mutate, isLoading } = api.newMenuItems.create.useMutation({
    onSuccess: () => {
      showNotification({
        title: "İşlem Başarılı",
        message: "Yeni seçenek eklendi",
        autoClose: 3000,
        onClose: () => {
          close();
        },
      });
    },
  });
  const form = useForm<CreateMenuItem>({
    initialValues: {
      name: "",
      categoryId: query.categoryId as string,
      workspaceId: query.workspaceId as string,
      description: "",
      price: 0,
      images: [],
      ingredients: [],
    },
  });
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Yeni Seçenek Ekle"
      size={"xl"}
    >
      <form
        onSubmit={form.onSubmit((values) => {
          mutate(values);
        })}
      >
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              placeholder="Seçenek Adı"
              label="Seçenek Adı"
              {...form.getInputProps("name")}
            />
          </Grid.Col>
        </Grid>
        <Group mt={"lg"} position="right">
          <Button
            type="button"
            onClick={() => {
              form.reset();
              close();
            }}
            leftIcon={<IconX />}
            loading={isLoading}
          >
            İptal Et
          </Button>
          <Button type="submit" leftIcon={<IconPlus />} loading={isLoading}>
            Ekle
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
const MenuDetails = ({
  menuCategory,
  openModal,
}: {
  menuCategory: RouterOutputs["newMenuCategories"]["byId"] | undefined;
  openModal: () => void;
}) => {
  const { classes, theme } = useStyles();
  return (
    <>
      <Paper
        w="100%"
        h={300}
        pos="relative"
        radius={"lg"}
        className="overflow-hidden"
      >
        <Text size="lg" className={classes.title} weight={500}>
          <MenuIcon icon={menuCategory?.icon} className="mr-2" />
          {menuCategory?.name}
        </Text>
        <div className={classes.overlay}></div>
        <Image
          fill={true}
          alt="menucategoryimage"
          src={menuCategory?.image || placeholder}
        ></Image>
      </Paper>
      <Grid>
        <Grid.Col span={12} md={6} lg={4}>
          <Paper
            className={classes.addNew}
            onClick={openModal}
            w="full"
            withBorder
            p={"lg"}
            radius="lg"
          >
            <Flex
              direction={"column"}
              w="full"
              h={200}
              align="center"
              justify={"center"}
            >
              <IconPlus size={32} />
              <Text fw={500}>Yeni ekle</Text>
            </Flex>
          </Paper>
        </Grid.Col>
        {(menuCategory?.menuItems || []).map((item) => (
          <Grid.Col span={12} md={6} lg={4} key={item.id}>
            <MenuItem {...item} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

const MenuItem = ({
  _count,
  description,
  id,
  images,
  name,
  price,
}: NonNullable<
  RouterOutputs["newMenuCategories"]["byId"]
>["menuItems"][number]) => {
  const { classes, theme } = useStyles();
  return (
    <Paper
      pos={"relative"}
      withBorder
      w={"full"}
      radius="lg"
      className="overflow-hidden"
      h={240}
    >
      <div className={classes.overlay}></div>
      <div className="absolute top-3 right-3 z-20 flex flex-row gap-2">
        <ActionIcon variant="filled" size={"lg"}>
          <IconPencil size={20} stroke={3} />
        </ActionIcon>
        <ActionIcon variant="filled" size={"lg"}>
          <IconTrash size={20} stroke={3} />
        </ActionIcon>
      </div>
      <Image src={images?.[0]?.image || placeholder} fill={true} alt={name} />
      <Text className="absolute bottom-3 left-4 z-40 " size={"xl"} fw={500}>
        {name}
      </Text>
    </Paper>
  );
};
