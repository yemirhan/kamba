import React from "react";
import { UseFormType } from "./EditCard";
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

export const EditItem = ({
  form,
  index,
}: {
  form: UseFormType;
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
  console.log(index);
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
                  form.values.menuItems[index]?.icon === ""
                    ? "https://static.thenounproject.com/png/1211233-200.png"
                    : form.values.menuItems[index]?.icon
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
                    form.values.menuItems[index]?.icon === ""
                      ? "https://static.thenounproject.com/png/1211233-200.png"
                      : form.values.menuItems[index]?.icon
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
                value={form.values.menuItems[index]?.name}
                onChange={(e) =>
                  form.insertListItem(
                    "menuItems",
                    {
                      ...form.values.menuItems[index],
                      name: e.currentTarget.value,
                    },
                    index,
                  )
                }
              />
              <Grid>
                <Grid.Col span={6}>
                  <Textarea
                    label="Ürün Açıklaması"
                    radius="lg"
                    value={form.values.menuItems[index]?.description || ""}
                    onChange={(e) =>
                      form.insertListItem(
                        "menuItems",
                        {
                          ...form.values.menuItems[index],
                          description: e.currentTarget.value,
                        },
                        index,
                      )
                    }
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <NumberInput
                    label="Ürünün Fiyatı"
                    icon={<IconCurrencyLira size={18} />}
                    value={form.values.menuItems[index]?.price}
                    onChange={(val) =>
                      form.insertListItem(
                        "menuItems",
                        {
                          ...form.values.menuItems[index],
                          price: val,
                        },
                        index,
                      )
                    }
                  />
                </Grid.Col>
              </Grid>
            </Stack>
          </Group>
          <Group position="right" className="mt-4">
            <Button
              color="teal"
              radius="lg"
              onClick={() => editItemState.SetEditItem()}
            >
              Kaydet
            </Button>
          </Group>
        </Paper>
      </Modal>
      <SetItemImage form={form} index={index} />
    </>
  );
};
