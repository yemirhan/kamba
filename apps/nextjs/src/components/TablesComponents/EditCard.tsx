import React, { useState } from "react";
import { RouterOutputs } from "@acme/api";
import { useMenu } from "providers/useMenu";
import {
  ActionIcon,
  Button,
  Grid,
  Group,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { TextInput } from "@mantine/core";
import { IconPencil, IconSearch, IconTrash } from "@tabler/icons";
import { Paper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SetCategoryImage } from "./SetCategoryImage";
import { UseFormReturnType } from "@mantine/form";
import { MenuItem } from "@acme/db";
import { EditItem } from "./EditItem";
import { api } from "@acme/api/src/client";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { Loader } from "@mantine/core";

export type UseFormType = UseFormReturnType<
  {
    name: string;
    id: string;
    image: string | null;
    menuItems: MenuItem[];
  },
  (values: {
    name: string;
    id: string;
    image: string | null;
    menuItems: MenuItem[];
  }) => {
    name: string;
    id: string;
    image: string | null;
    menuItems: MenuItem[];
  }
>;

export const EditCard = ({
  categoryValues,
}: {
  categoryValues: RouterOutputs["menu"]["all"][0];
}) => {
  const editCard = useMenu((state) => state.editCard);
  const SetEditCard = useMenu((state) => state.SetEditCard);
  const hoverImage = useMenu((state) => state.hoverImage);
  const SetHoverImage = useMenu((state) => state.SetHoverImage);
  const editCategoryImage = useMenu((state) => state.editCategoryImage);
  const SetEditCategoryImage = useMenu((state) => state.SetEditCategoryImage);
  const deleteItem = useMenu((state) => state.deleteItem);
  const SetDeleteItem = useMenu((state) => state.SetDeleteItem);
  const editItem = useMenu((state) => state.editItem);
  const SetEditItem = useMenu((state) => state.setEditItem);
  const editIndex = useMenu((state) => state.editIndex);
  const SetEditIndex = useMenu((state) => state.SetEditIndex);
  const [search, setsearch] = useState("");
  const { query } = useRouter();
  const queryContext = api.useContext();
  const { mutate: update, isLoading: updateLoading } =
    api.menu.update.useMutation({
      onSuccess: () => {
        showNotification({
          message: "İşlem Başarılı",
          color: "green",
          autoClose: 1000,
        });
        queryContext.menu.all.invalidate();
        SetEditCard();
      },
      onError: () => {
        showNotification({
          message: "İşlem Başarısız",
          color: "red",
          autoClose: 1000,
        });
      },
    });

  let indexById = 0;
  let indexByIdArray: number[] = [];

  const form = useForm({
    initialValues: {
      name: categoryValues.name,
      id: categoryValues.id,
      image:
        categoryValues.image ||
        "https://static.thenounproject.com/png/1211233-200.png",
      menuItems: categoryValues.menuItems,
    },
  });

  return (
    <>
      {!updateLoading ? (
        <>
          <Modal opened={editCard} onClose={() => SetEditCard()} size="75%">
            <div className="flex flex-col">
              <div className="relative flex flex-col">
                <div className="flex h-auto flex-col items-center">
                  <Stack className="w-3/4 items-center justify-center">
                    {!hoverImage ? (
                      <img
                        src={
                          form.values.image ||
                          "https://static.thenounproject.com/png/1211233-200.png"
                        }
                        alt="kategori resmi"
                        className="aspect-[7/6] w-[500px]"
                        onMouseEnter={() => SetHoverImage()}
                      />
                    ) : (
                      <div className="relative flex flex-col">
                        <img
                          src={
                            form.values.image ||
                            "https://static.thenounproject.com/png/1211233-200.png"
                          }
                          alt="kategori resmi"
                          className="relative aspect-[7/6] w-[500px]"
                        />
                        <Button
                          onMouseLeave={() => SetHoverImage()}
                          onClick={() => SetEditCategoryImage()}
                          className="absolute top-0 right-0 left-0 z-30 flex h-full flex-col items-center justify-center text-6xl font-light opacity-60 transition-all duration-100"
                        >
                          +
                        </Button>
                      </div>
                    )}
                    <TextInput
                      w={500}
                      label="Kategori Adı"
                      radius="md"
                      size="md"
                      value={form.values.name}
                    />
                    <div className="justfiy-between flex w-full flex-row">
                      <Text
                        size="xl"
                        className="relative text-2xl font-semibold"
                      >
                        Menü İçeriği
                      </Text>
                      <TextInput
                        className=""
                        label="Filtrele"
                        icon={<IconSearch size={14} />}
                        value={search}
                        onChange={(e) => setsearch(e.currentTarget.value)}
                      />
                    </div>
                    <Grid>
                      {categoryValues ? (
                        categoryValues.menuItems
                          .filter((item) => {
                            indexByIdArray = [];
                            return item.name.includes(search);
                          })
                          .map((item, index) => {
                            for (
                              let i = 0;
                              i < categoryValues.menuItems.length;
                              i++
                            ) {
                              if (categoryValues.menuItems[i]?.id === item.id) {
                                indexById = i;
                                indexByIdArray[index] = i;
                              }
                            }
                            return (
                              <>
                                <Grid.Col
                                  key={index}
                                  span={4}
                                  className="flex h-full w-full"
                                >
                                  <Paper
                                    className="relative mt-14"
                                    shadow="sm"
                                    radius="lg"
                                    p="md"
                                    bg="cyan"
                                  >
                                    <div className="flex flex-row gap-4">
                                      <img
                                        src={
                                          form.values.menuItems[
                                            indexByIdArray[index]
                                          ]?.icon ||
                                          "https://static.thenounproject.com/png/1211233-200.png"
                                        }
                                        alt="içerik resmi"
                                        className="h-full w-[40%]"
                                      />
                                      <div className="flex h-full w-full flex-col gap-y-1">
                                        <div className="flex flex-row justify-between">
                                          <Text fz="md">
                                            {
                                              form.values.menuItems[
                                                indexByIdArray[index] || 0
                                              ]?.name
                                            }
                                          </Text>
                                          <Text fz="md">{`${
                                            form.values.menuItems[
                                              indexByIdArray[index] || 0
                                            ]?.price
                                          } ₺`}</Text>
                                        </div>
                                        <Text fz="sm">
                                          {
                                            form.values.menuItems[
                                              indexByIdArray[index] || 0
                                            ]?.description
                                          }
                                        </Text>
                                      </div>
                                    </div>
                                    <Group position="right">
                                      <ActionIcon
                                        onClick={() => {
                                          SetEditIndex(index);
                                          SetEditItem();
                                        }}
                                      >
                                        <IconPencil size={18} />
                                      </ActionIcon>
                                      <ActionIcon>
                                        <IconTrash size={18} />
                                      </ActionIcon>
                                    </Group>
                                  </Paper>
                                </Grid.Col>
                              </>
                            );
                          })
                      ) : (
                        <></>
                      )}
                    </Grid>
                  </Stack>
                </div>
                <Group position="right">
                  <Stack>
                    <Button
                      onClick={() => {
                        update({
                          categoryName: form.values.name,
                          id: form.values.id,
                          image: form.values.image,
                          items: form.values.menuItems.map((item) => ({
                            description: item.description || "",
                            name: item.name,
                            price: item.price,
                            images: [item.icon] || [
                              "https://static.thenounproject.com/png/1211233-200.png",
                            ],
                            ingredients: [] || [],
                          })),
                          workspaceSlug: query.workspaceId as string,
                        });
                      }}
                      color="teal"
                      radius="lg"
                      size="md"
                    >
                      Kaydet
                    </Button>
                    <Button color="cyan" radius="lg" size="md">
                      Yeni İçerik
                    </Button>
                  </Stack>
                </Group>
              </div>
            </div>
          </Modal>
          <SetCategoryImage form={form} />
          {console.log(indexByIdArray[editIndex])}
          <EditItem form={form} index={indexByIdArray[editIndex] || 0} />
        </>
      ) : (
        <div className="fixed top-0 right-0 left-0 z-30 flex h-[100vh] flex-col items-center justify-center bg-slate-500 bg-opacity-20">
          <Loader color="teal" size="xl" variant="dots" />
        </div>
      )}
    </>
  );
};
