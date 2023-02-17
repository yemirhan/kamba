import { placeholder } from "@/utils/placeholder";
import { RouterOutputs } from "@acme/api";
import { ActionIcon, createStyles, Paper, Text } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons";
import Image from "next/image";
import { useState } from "react";

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

export const MenuItem = ({
  _count,
  description,
  id,
  images = [],
  name = "",
  price,
}: Partial<
  NonNullable<RouterOutputs["newMenuCategories"]["byId"]>["menuItems"][number]
>) => {
  const [editCategoryItem, setEditCategoryItem] = useState(false);
  const [deleteCategoryItem, setDeleteCategoryItem] = useState(false);
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
        <ActionIcon
          onClick={() => setEditCategoryItem(true)}
          variant="filled"
          size={"lg"}
        >
          <IconPencil size={20} stroke={3} />
        </ActionIcon>
        <ActionIcon
          onClick={() => setDeleteCategoryItem(true)}
          variant="filled"
          size={"lg"}
        >
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
