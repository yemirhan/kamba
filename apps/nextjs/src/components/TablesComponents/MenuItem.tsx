import { useMenuSort } from "@/hooks/useMenuSort";
import { placeholder } from "@/utils/placeholder";
import { RouterOutputs } from "@acme/api";
import { api } from "@acme/api/src/client";
import { ActionIcon, createStyles, Paper, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconPencil, IconTrash } from "@tabler/icons";
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

export const MenuItem = ({
  _count,
  description,
  id,
  images = [],
  name = "",
  price,
  sortableComponent,
}: Partial<
  NonNullable<RouterOutputs["newMenuCategories"]["byId"]>["menuItems"][number]
> & { sortableComponent?: React.ReactNode }) => {
  const queryContext = api.useContext();
  const { mutate: deleteMenuItem, isLoading } =
    api.newMenuItems.delete.useMutation({
      onSuccess: () => {
        showNotification({
          message: "İşlem Başarılı",
          color: "red",
          autoClose: 2000,
        });
        queryContext.newMenuItems.all.invalidate();
      },
    });
  const { query } = useRouter();
  const { classes, theme } = useStyles();
  const { sortEnabled } = useMenuSort();
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
        {sortEnabled ? (
          sortableComponent
        ) : (
          <>
            <ActionIcon variant="filled" size={"lg"}>
              <IconPencil size={20} stroke={3} />
            </ActionIcon>
            <ActionIcon
              onClick={() =>
                deleteMenuItem({
                  categoryId: query.categoryId as string,
                  itemId: id || "",
                  workspaceSlug: query.workspaceId as string,
                })
              }
              variant="filled"
              size={"lg"}
            >
              <IconTrash size={20} stroke={3} />
            </ActionIcon>
          </>
        )}
      </div>
      <Image src={images?.[0]?.image || placeholder} fill={true} alt={name} />
      <Text className="absolute bottom-3 left-4 z-40 " size={"xl"} fw={500}>
        {name}
      </Text>
    </Paper>
  );
};
