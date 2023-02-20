import { MenuIcon } from "@/utils/menuIcons";
import { placeholder } from "@/utils/placeholder";
import { RouterOutputs } from "@acme/api";
import { createStyles, Flex, Paper, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import Image from "next/image";
import { Sortable } from "../Grid/Sort";
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
      <Sortable
        menuItems={menuCategory?.menuItems || []}
        addNew={
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
        }
      />
      {/* <Grid>
        <Grid.Col span={12} md={6} lg={4}></Grid.Col>
        {(menuCategory?.menuItems || []).map((item) => (
          <Grid.Col span={12} md={6} lg={4} key={item.id}>
            <MenuItem {...item} />
          </Grid.Col>
        ))}
      </Grid> */}
    </>
  );
};
