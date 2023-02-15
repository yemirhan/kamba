import React from "react";
import { RouterOutputs } from "@acme/api";
import {
  Modal,
  Stack,
  Paper,
  Text,
  Group,
  Menu,
  Select,
  TextInput,
  Title,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { icons, MenuIcon } from "@/utils/menuIcons";
import Image from "next/image";
import { placeholder } from "@/utils/placeholder";
import { useStyles } from "@/pages/[workspaceId]/tables/menu/[categoryId]";
import { iconTranslations } from "@/utils/menuIcons";
import { IconItem } from "./CreateCategoryModal";
import { IconPencil } from "@tabler/icons";
import { useEffect } from "react";
import { useState } from "react";
import { MenuImage, Colors, Icon } from "@acme/db";
import { SetItemImage1 } from "./SetItemImage1";
import { UseFormReturnType } from "@mantine/form";
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
                  className="absolute top-0 right-0 left-0 z-30 h-[200px] opacity-40"
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
                  className="absolute top-0 right-0 left-0 z-30 h-[300px] opacity-40"
                >
                  {<IconPencil size={64} />}
                </Button>
              </>
            )}
          </Paper>
          <Title>İçerikler</Title>
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
