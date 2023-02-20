import { icons, MenuIcon } from "@/utils/menuIcons";
import { placeholder } from "@/utils/placeholder";
import { RouterOutputs } from "@acme/api";
import {
  Button,
  ColorSwatch,
  createStyles,
  Group,
  Modal,
  Paper,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Image from "next/image";
import React from "react";
import { ColorItem } from "./CreateCategoryModal";

import { colors, colorTranslations } from "@/utils/colors";
import { iconTranslations } from "@/utils/menuIcons";
import { Colors, Icon, MenuImage } from "@acme/db";
import { UseFormReturnType } from "@mantine/form";
import { IconPencil } from "@tabler/icons";
import { useEffect, useState } from "react";
import { IconItem } from "./CreateCategoryModal";
import { SetItemImage1 } from "./SetItemImage1";
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
export type formType = UseFormReturnType<
  {
    image: string | null;
    id: string;
    name: string;
    color: Colors;
    menuItems: {
      _count: {
        ingredients: number;
      };
      id: string;
      name: string;
      images: MenuImage[];
      description: string | null;
      price: number;
    }[];
    icon: Icon;
  } | null,
  (
    values: {
      image: string | null;
      id: string;
      name: string;
      color: Colors;
      menuItems: {
        _count: {
          ingredients: number;
        };
        id: string;
        name: string;
        images: MenuImage[];
        description: string | null;
        price: number;
      }[];
      icon: Icon;
    } | null,
  ) => {
    image: string | null;
    id: string;
    name: string;
    color: Colors;
    menuItems: {
      _count: {
        ingredients: number;
      };
      id: string;
      name: string;
      images: MenuImage[];
      description: string | null;
      price: number;
    }[];
    icon: Icon;
  } | null
>;
export const EditCategory = ({
  menuCategory,
  edit,
  setEdit,
}: {
  menuCategory: RouterOutputs["newMenuCategories"]["byId"] | undefined;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { classes, theme } = useStyles();
  const form = useForm({
    initialValues: menuCategory,
  });
  const [hoverImage, setHoverImage] = useState(false);
  const [editImage, setEditImage] = useState(false);

  useEffect(() => {
    form.setValues(menuCategory!);
  }, [menuCategory]);

  return (
    <>
      <Modal opened={edit} onClose={() => setEdit(false)} size={"70%"}>
        <div className="flex flex-col justify-center">
          <Paper
            w="100%"
            h={300}
            pos="relative"
            radius={"lg"}
            className="overflow-hidden"
          >
            {/* <Text size="lg" className={classes.title} weight={500}>
            <MenuIcon icon={menuCategory?.icon} className="mr-2" />
            {menuCategory?.name}
          </Text> */}
            <Group className={classes.title}>
              <Group position="apart">
                <div className="flex flex-row items-center justify-between">
                  <Select
                    label="İkon"
                    data={Object.entries(icons).map(([key, value]) => ({
                      value: key,
                      label: iconTranslations[key as keyof typeof icons],
                      icon: key,
                    }))}
                    itemComponent={IconItem}
                    icon={<MenuIcon icon={form.values?.icon} />}
                    {...form.getInputProps("icon")}
                  />
                  <TextInput
                    icon={<IconPencil />}
                    label="Kategori Adı"
                    {...form.getInputProps("name")}
                  />
                  <Select
                    label="Renk"
                    data={Object.entries(colors).map(([key, value]) => ({
                      value: key,
                      label: colorTranslations[key as keyof typeof colors],
                      color: key,
                    }))}
                    itemComponent={ColorItem}
                    icon={
                      <ColorSwatch
                        color={colors[form.values?.color || "GREEN"]}
                      />
                    }
                    {...form.getInputProps("color")}
                  />
                </div>
              </Group>
            </Group>
            <div className={classes.overlay}></div>
            {!hoverImage ? (
              <>
                <Image
                  fill={true}
                  alt="menucategoryimage"
                  className="relative"
                  src={form.values?.image || placeholder}
                ></Image>
                <div
                  className="absolute top-0 right-0 left-0 z-10 h-[200px] opacity-40"
                  onMouseEnter={() => setHoverImage(true)}
                ></div>
              </>
            ) : (
              <>
                <Image
                  fill={true}
                  alt="menucategoryimage"
                  className="relative"
                  src={form.values?.image || placeholder}
                ></Image>

                <Button
                  color="teal"
                  onMouseLeave={() => setHoverImage(false)}
                  onClick={() => setEditImage(true)}
                  className="absolute top-0 right-0 left-0 z-10 h-[300px] bg-white opacity-40"
                >
                  {<IconPencil size={64} />}
                </Button>
              </>
            )}
          </Paper>
          <div className="mt-5 flex w-full flex-col">
            <Title>İçerikler</Title>
          </div>
        </div>
      </Modal>
      <SetItemImage1
        form={form}
        editImage={editImage}
        setEditImage={setEditImage}
      />
    </>
  );
};
