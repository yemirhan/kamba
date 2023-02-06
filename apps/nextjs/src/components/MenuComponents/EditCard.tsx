import React, { useState } from "react";
import { useMenu } from "Providers/useMenu";
import { ActionIcon, Grid, Group, Modal } from "@mantine/core";
import { Stack } from "@mantine/core";
import { ImageSection } from "./ImageSection";
import { TextInput } from "@mantine/core";
import { Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { Paper } from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCurrencyLira } from "@tabler/icons";
import { NumberInput } from "@mantine/core";
import { Textarea } from "@mantine/core";
import { api } from "@acme/api/src/client";
import { showNotification } from "@mantine/notifications";
import { EditCardItem } from "./EditCardItem";
import { useEffect } from "react";

export const EditCard = ({ index }: { index: number }) => {
  const menuState = useMenu((state) => state.menu);
  const UseIsEdit = useMenu((state) => state.setIsEdit);
  const isEdit = useMenu((state) => state.isEdit);

  const UseItemIsEdit = useMenu((state) => state.setItemIsEdit);
  const [search, setSearch] = useState("");

  const form = useForm({
    initialValues: {
      categoryName: menuState[index]?.name,
      categoryImage: menuState[index]?.image,
      categoryItems: menuState[index]?.menuItems,
      ItemIndex: 0,
    },
  });

  useEffect(() => {
    form.values.categoryName = menuState[index]?.name;
    (form.values.categoryItems = menuState[index]?.menuItems),
      (form.values.categoryImage = menuState[index]?.image);
  }, [menuState]);

  const [ingredients, setIngredients] = useState("");
  const { mutate, isLoading } = api.menu.update.useMutation({
    onSuccess: () => {
      showNotification({
        title: "İşlem Başarılı",
        message: "",
        autoClose: 2000,
      });
      UseIsEdit();
    },
  });
  console.log({ ...form.values });
  return (
    <>
      <Modal opened={isEdit} onClose={() => UseIsEdit()} size="75%">
        <div className="flex h-auto max-h-[800px] flex-col items-center">
          <Stack className="w-3/4">
            <ImageSection form={form} index={index} />
            <TextInput
              {...form.getInputProps("categoryName")}
              withAsterisk
              radius="lg"
              label="Kategori Adı"
              className="mx-auto w-[75%]"
            />
            <div className="relative mt-4 flex flex-row items-center justify-center">
              <Text>Kategori İçerikleri</Text>
              <div className="absolute right-[1px] flex flex-col justify-center">
                <TextInput
                  label="Filtrele"
                  rightSection={<IconSearch size="20px" />}
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                />
              </div>
            </div>
          </Stack>
          <Grid>
            {menuState ? (
              menuState[index]?.menuItems
                .filter((value) => value.name.includes(search))
                .map((value, itemIndex) => {
                  return (
                    <Grid.Col key={itemIndex} span={4}>
                      <Paper
                        className="relative mt-14"
                        shadow="sm"
                        radius="lg"
                        p="md"
                        withBorder
                      >
                        <div className="flex flex-row gap-4">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/NCI_Visuals_Food_Hamburger.jpg/800px-NCI_Visuals_Food_Hamburger.jpg"
                            alt="içerik resmi"
                            className="h-full w-[25%]"
                          />
                          <div className="flex h-full w-full flex-col gap-y-1">
                            <div className="flex flex-row justify-between">
                              <Text fz="md">{value.name}</Text>
                              <Text fz="md">{`${value.price} ₺`}</Text>
                            </div>
                            <Text fz="sm">{value.description}</Text>
                          </div>
                        </div>
                        <ActionIcon
                          onClick={() => {
                            form.values.ItemIndex = itemIndex;
                            UseItemIsEdit();
                          }}
                          className="absolute bottom-4 right-4"
                        >
                          <IconPencil size={14} />
                        </ActionIcon>
                      </Paper>
                    </Grid.Col>
                  );
                })
            ) : (
              <></>
            )}
            <Grid.Col span={12}>
              <Group position="right">
                {form.values.categoryName !== menuState[index]?.name ||
                form.values.categoryImage !== menuState[index]?.image ||
                form.values.categoryItems !== menuState[index]?.menuItems ? (
                  <Button color="green" radius="xl" size="md">
                    Kaydet
                  </Button>
                ) : (
                  <Button color="green" radius="xl" size="md" disabled>
                    Kaydet
                  </Button>
                )}
              </Group>
            </Grid.Col>
          </Grid>
        </div>
      </Modal>
      <EditCardItem form={form} />
    </>
  );
};
