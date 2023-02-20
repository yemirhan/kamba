import { placeholder } from "@/utils/placeholder";
import { api } from "@acme/api/src/client";
import { CreateMenuItem } from "@acme/api/src/router/tables/menuItems";

import {
  Button,
  Grid,
  Modal,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconPencil } from "@tabler/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export const AddNewMenuItemModal = ({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) => {
  const { query } = useRouter();
  const queryContext = api.useContext();
  const { mutate, isLoading } = api.newMenuItems.create.useMutation({
    onSuccess: () => {
      showNotification({
        title: "İşlem Başarılı",
        message: "Yeni seçenek eklendi",
        autoClose: 3000,
        onClose: () => {
          close();
        },
      });
      queryContext.newMenuItems.all.invalidate();
    },
  });
  const form = useForm<CreateMenuItem>({
    initialValues: {
      name: "",
      categoryId: query.categoryId as string,
      workspaceId: query.workspaceId as string,
      description: "",
      price: 0,
      images: [placeholder],
      ingredients: [],
    },
  });
  const [hoverImage, setHoverImage] = useState(false);
  const [ingredientsAdd, setIngredientsAdd] = useState(false);
  return (
    <Modal opened={opened} onClose={close} size={"60%"}>
      <form
        onSubmit={form.onSubmit((values) => {
          mutate({
            ...values,
            workspaceId: query.workspaceId as string,
            categoryId: query.categoryId as string,
          });
        })}
      >
        <div
          className={`relative flex w-full flex-col ${
            ingredientsAdd ? "h-[550px]" : "h-[400px]"
          }`}
        >
          <div className="flex w-full flex-row">
            <div className="flex w-auto flex-row p-2">
              <div className="relative h-[300px] w-[300px] overflow-hidden rounded-xl">
                {!hoverImage ? (
                  <Image
                    src={form.values?.images?.[0] || placeholder}
                    alt="İçerik Resmi"
                    fill
                    onMouseEnter={() => setHoverImage(true)}
                  />
                ) : (
                  <>
                    <Image
                      src={form.values?.images?.[0] || placeholder}
                      alt="İçerik Resmi"
                      fill
                    />
                    <Button
                      onMouseLeave={() => setHoverImage(false)}
                      color="gray"
                      className="absolute top-0 right-0 left-0 z-10 flex h-full items-center justify-center font-semibold text-white opacity-50"
                    >
                      <IconPencil size={36} />
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="p-4">
              <Grid gutter="xl">
                <Grid.Col span={6}>
                  <TextInput
                    label="İçerik Adı"
                    radius="lg"
                    size="md"
                    withAsterisk
                    {...form.getInputProps("name")}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <NumberInput
                    label="Fiyat"
                    radius="md"
                    size="md"
                    withAsterisk
                    {...form.getInputProps("price")}
                  />
                </Grid.Col>
                <Grid.Col span={12} className="h-full">
                  <Textarea
                    label="Açıklama"
                    radius="md"
                    size="md"
                    minRows={4}
                  />
                </Grid.Col>
              </Grid>
            </div>
          </div>
          <div className="absolute bottom-2 right-2 flex flex-row gap-2">
            <Button
              color="teal"
              radius="md"
              disabled={
                !(form.values.name.length !== 0 && form.values.price !== 0)
              }
            >
              Kaydet
            </Button>
            <Button
              onClick={() => setIngredientsAdd(true)}
              color="teal"
              radius="md"
              hidden={ingredientsAdd}
            >
              Malzeme Ekle
            </Button>
          </div>
          {ingredientsAdd ? (
            <div className="h-full w-full bg-slate-500"></div>
          ) : null}
        </div>
      </form>
    </Modal>
  );
};
