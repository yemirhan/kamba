import { TablesLayout } from "@/components/Tables/TablesLayout";
import { MenuIcon } from "@/utils/menuIcons";
import { placeholder } from "@/utils/placeholder";
import { api } from "@acme/api/src/client";
import {
  ActionIcon,
  Button,
  createStyles,
  Flex,
  Grid,
  Group,
  Modal,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronLeft, IconPlus } from "@tabler/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
const useStyles = createStyles((theme, _params, getRef) => {
  const image = getRef("image");

  return {
    card: {
      position: "relative",
      height: 280,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],

      [`&:hover .${image}`]: {
        transform: "scale(1.03)",
      },
    },

    image: {
      ref: image,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: "cover",
      transition: "transform 500ms ease",
    },

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
  const { classes, theme } = useStyles();
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
      </Group>
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
          <Paper onClick={open} withBorder p={"lg"} radius="lg">
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
      </Grid>
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
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Yeni Seçenek Ekle"
      size={"xl"}
    >
      <div>SEÇENEK</div>
    </Modal>
  );
};
