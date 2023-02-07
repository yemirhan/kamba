import React from "react";
import { UseFormReturnType } from "@mantine/form";
import { MenuItem } from "@acme/db";
import {
  Group,
  Image,
  Modal,
  Paper,
  Button,
  Stack,
  TextInput,
  Grid,
  Textarea,
  NumberInput,
} from "@mantine/core";
import { useMenu } from "providers/useMenu";
import { SetItemImage } from "./SetItemImage";
import { IconCurrencyLira } from "@tabler/icons";
import { useState } from "react";
import { useEffect } from "react";

export const EditItem = ({
  form,
  index,
}: {
  form: UseFormReturnType<
    {
      name: string;
      id: string;
      image: string;
      menuItems: MenuItem[];
    },
    (values: {
      name: string;
      id: string;
      image: string;
      menuItems: MenuItem[];
    }) => {
      name: string;
      id: string;
      image: string;
      menuItems: MenuItem[];
    }
  >;
  index: number;
}) => {
  const editItemState = {
    SetEditItem: useMenu((state) => state.setEditItem),
    editItem: useMenu((state) => state.editItem),
    hoverItemImage: useMenu((state) => state.hoverItemImage),
    SetHoverItemImage: useMenu((state) => state.SetHoverItemImage),
    editItemImage: useMenu((state) => state.editItemImage),
    SetEditItemImage: useMenu((state) => state.SetEditItemImage),
  };
  const [itemName, setItemName] = useState(
    form.values.menuItems[index]?.name || "",
  );
  const [itemImage, setItemImage] = useState(
    form.values.menuItems[index]?.icon || "",
  );
  const [itemPrice, setItemPrice] = useState(
    form.values.menuItems[index]?.price || 0,
  );
  const [itemDescription, setItemDescription] = useState(
    form.values.menuItems[index]?.description || "",
  );

  useEffect(() => {
    setItemImage(form.values.menuItems[index]?.icon || "");
    setItemName(form.values.menuItems[index]?.name || "");
    setItemPrice(form.values.menuItems[index]?.price || 0);
    setItemDescription(form.values.menuItems[index]?.description || "");
  }, [index, form.values.menuItems]);

  console.log(form.values.menuItems);
  console.log(form.values.menuItems[index]);
  console.log(itemName);
  return (
    <>
      <Modal
        opened={editItemState.editItem}
        onClose={() => editItemState.SetEditItem()}
        size="50%"
      >
        <Paper className="h-full w-full">
          <Group position="apart">
            {!editItemState.hoverItemImage ? (
              <Image
                src={
                  itemImage === ""
                    ? "https://static.thenounproject.com/png/1211233-200.png"
                    : itemImage
                }
                alt="içerik resmi"
                width="400px"
                height="400px"
                radius="xl"
                onMouseEnter={() => editItemState.SetHoverItemImage()}
              />
            ) : (
              <div className="relative flex flex-col">
                <Image
                  src={
                    itemImage === ""
                      ? "https://static.thenounproject.com/png/1211233-200.png"
                      : itemImage
                  }
                  alt="içerik resmi"
                  width="400px"
                  height="400px"
                  radius="xl"
                />
                <Button
                  onMouseLeave={() => editItemState.SetHoverItemImage()}
                  onClick={() => editItemState.SetEditItemImage()}
                  radius="xl"
                  className="absolute top-0 right-0 left-0 z-30 flex h-full flex-col items-center justify-center text-6xl font-light opacity-60 transition-all duration-100"
                >
                  +
                </Button>
              </div>
            )}
            <Stack>
              <TextInput
                label="Ürün Adı"
                radius="lg"
                withAsterisk
                w={450}
                value={itemName}
                onChange={(e) => setItemName(e.currentTarget.value)}
              />
              <Grid>
                <Grid.Col span={6}>
                  <Textarea
                    label="Ürün Açıklaması"
                    radius="lg"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.currentTarget.value)}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <NumberInput
                    label="Ürünün Fiyatı"
                    icon={<IconCurrencyLira size={18} />}
                    value={itemPrice}
                    onChange={(val) => setItemPrice(val!)}
                  />
                </Grid.Col>
              </Grid>
            </Stack>
          </Group>
          <Group position="right" className="mt-4">
            <Button
              color="teal"
              radius="lg"
              onClick={() => {
                form.insertListItem(
                  "menuItems",
                  {
                    ...form.values.menuItems[index],
                    icon: itemImage,
                    name: itemName,
                    price: itemPrice,
                    description: itemDescription,
                  },
                  index,
                );
                form.removeListItem("menuItems", index + 1);
                editItemState.SetEditItem();
              }}
            >
              Kaydet
            </Button>
          </Group>
        </Paper>
      </Modal>
      <SetItemImage setItemImage={setItemImage} />
    </>
  );
};
