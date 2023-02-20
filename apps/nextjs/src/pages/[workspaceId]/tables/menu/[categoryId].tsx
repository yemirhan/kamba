import { TablesLayout } from "@/components/Tables/TablesLayout";
import { EditCategory } from "@/components/TablesComponents/EditCategory";
import { MenuItem } from "@/components/TablesComponents/MenuItem";
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
  NumberInput,
  Paper,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconChevronLeft, IconPencil, IconPlus } from "@tabler/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
export const useStyles = createStyles((theme, _params, getRef) => {
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
  const [edit, setEdit] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
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
        <Button
          leftIcon={<IconPencil />}
          onClick={() => setEdit(true)}
          disabled={!isFetched}
        >
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
      <EditCategory menuCategory={menuCategory} edit={edit} setEdit={setEdit} />
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
  const queryContext = api.useContext();
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
      queryContext.newMenuItems.all.invalidate();
    },
  });
  const form = useForm<CreateMenuItem>({
    initialValues: {
      name: "",
      categoryId: query.categoryId as string,
      workspaceId: query.workspaceId as string,
      description: "",
      price: 0,
      images: [placeholder],
      ingredients: [],
    },
  });
  const [hoverImage, setHoverImage] = useState(false);
  const [ingredientsAdd, setIngredientsAdd] = useState(false);
  return (
    <Modal opened={opened} onClose={close} size={"60%"}>
      <form
        onSubmit={form.onSubmit((values) => {
          mutate({
            ...values,
            workspaceId: query.workspaceId as string,
            categoryId: query.categoryId as string,
          });
        })}
      >
        <div
          className={`relative flex w-full flex-col ${
            ingredientsAdd ? "h-[550px]" : "h-[400px]"
          }`}
        >
          <div className="flex w-full flex-row">
            <div className="flex w-auto flex-row p-2">
              <div className="relative h-[300px] w-[300px] overflow-hidden rounded-xl">
                {!hoverImage ? (
                  <Image
                    src={form.values?.images?.[0] || placeholder}
                    alt="İçerik Resmi"
                    fill
                    onMouseEnter={() => setHoverImage(true)}
                  />
                ) : (
                  <>
                    <Image
                      src={form.values?.images?.[0] || placeholder}
                      alt="İçerik Resmi"
                      fill
                    />
                    <Button
                      onMouseLeave={() => setHoverImage(false)}
                      color="gray"
                      className="absolute top-0 right-0 left-0 z-10 flex h-full items-center justify-center font-semibold text-white opacity-50"
                    >
                      <IconPencil size={36} />
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="p-4">
              <Grid gutter="xl">
                <Grid.Col span={6}>
                  <TextInput
                    label="İçerik Adı"
                    radius="lg"
                    size="md"
                    withAsterisk
                    {...form.getInputProps("name")}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <NumberInput
                    label="Fiyat"
                    radius="md"
                    size="md"
                    withAsterisk
                    {...form.getInputProps("price")}
                  />
                </Grid.Col>
                <Grid.Col span={12} className="h-full">
                  <Textarea
                    label="Açıklama"
                    radius="md"
                    size="md"
                    minRows={4}
                  />
                </Grid.Col>
              </Grid>
            </div>
          </div>
          <div className="absolute bottom-2 right-2 flex flex-row gap-2">
            <Button
              color="teal"
              radius="md"
              disabled={
                !(form.values.name.length !== 0 && form.values.price !== 0)
              }
            >
              Kaydet
            </Button>
            <Button
              onClick={() => setIngredientsAdd(true)}
              color="teal"
              radius="md"
              hidden={ingredientsAdd}
            >
              Malzeme Ekle
            </Button>
          </div>
          {ingredientsAdd ? (
            <div className="h-full w-full bg-slate-500"></div>
          ) : null}
        </div>
      </form>
    </Modal>
  );
};
export const MenuDetails = ({
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
