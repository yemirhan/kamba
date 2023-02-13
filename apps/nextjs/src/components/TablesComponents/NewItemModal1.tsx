import React from "react";
import {
  Modal,
  Button,
  Group,
  Stack,
  TextInput,
  Grid,
  Stepper,
} from "@mantine/core";
import { useMenu } from "providers/useMenu";
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";
import { DropDownSearch1 } from "./DropDownSearch1";
import { NewItemMakerCard1 } from "./NewItemMakerCard1";
import Image from "next/image";
import { Title } from "@mantine/core";
import { SetItemImage1 } from "./SetItemImage1";
import { UseFormReturnType } from "@mantine/form";
import { api } from "@acme/api/src/client";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";

export type formType = UseFormReturnType<
  {
    image: string;
    id: string;
    name: string;
  },
  (values: { image: string; id: string; name: string }) => {
    image: string;
    id: string;
    name: string;
  }
>;

export const NewItemModal1 = () => {
  const isNewMenu = useMenu((state) => state.isNewMenu);
  const SetIsNewMenu = useMenu((state) => state.SetIsNewMenu);
  const ModalMediaQuery = useMediaQuery("(min-width: 1000px)");
  const { query, push } = useRouter();
  const form = useForm({
    initialValues: {
      image:
        "https://res.cloudinary.com/yemirhan-bucket/image/upload/v1676136679/influshop_comments/Group_10placeholder_yldivb.png",
      id: query.workspaceId as string,
      name: "",
    },
  });
  useEffect(() => {
    form.setFieldValue("id", query.workspaceId as string);
  }, [query]);

  const [search, setSearch] = useState("");
  const [hoverImage, setHoverImage] = useState(false);
  const SetIsEditCategoryImage = useMenu(
    (state) => state.SetIsEditCategoryImage,
  );
  const [page, setPage] = useState(1);
  const queryContext = api.useContext();
  const { mutate, isLoading } = api.newMenuCategories.create.useMutation({
    onSuccess: (data) => {
      showNotification({
        message: "İşlem Başarılı",
        color: "green",
        autoClose: 1000,
      });
      queryContext.newMenuCategories.all.invalidate();
      SetIsNewMenu();
    },
    onError: () => {
      showNotification({
        message: "İşlem Başarısız",
        color: "red",
        autoClose: 1000,
      });
    },
  });
  return (
    <div className="flex h-[600] flex-col items-center lg:h-[1000px]">
      <Modal
        opened={isNewMenu}
        title="Yeni Kategori Ekle"
        onClose={() => SetIsNewMenu()}
        size={ModalMediaQuery ? 1200 : 700}
      >
        <div className="h-[450px] lg:h-[650px]">
          <Stack>
            <Grid gutter={"xl"}>
              <Grid.Col span={5} className="relative h-[400px] lg:h-[600px]">
                <Stack>
                  <TextInput
                    placeholder="Hamburgerler..."
                    label="Kategori Adı"
                    withAsterisk
                    {...form.getInputProps("name")}
                  />
                  <div className="absolute top-[80px] left-[15px] right-[10px] h-[320px] lg:h-[520px]">
                    <Image
                      src={form.values.image}
                      alt="Kategori ismi"
                      fill
                      onMouseEnter={() => setHoverImage(true)}
                    />
                    {hoverImage ? (
                      <Button
                        className="font-semilight z-30 h-full w-full text-center text-5xl opacity-50"
                        onMouseLeave={() => setHoverImage(false)}
                        onClick={() => SetIsEditCategoryImage()}
                      >
                        +
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                </Stack>
              </Grid.Col>
              <Grid.Col span={7} className="relative h-[400px] lg:h-[600px]">
                <Stack>
                  <TextInput
                    value={search}
                    onChange={(e) => setSearch(e.currentTarget.value)}
                    label="Filtrele"
                    rightSection={<DropDownSearch1 />}
                    rightSectionWidth={140}
                  />

                  <div className="overflow-x-hidden overflow-y-scroll">
                    <Grid>
                      <Grid.Col span={6} lg={4}>
                        <NewItemMakerCard1 />
                      </Grid.Col>
                    </Grid>
                  </div>
                  <div className="absolute top-[80px] right-0 left-[10px] bottom-0 flex items-center justify-center bg-slate-800 opacity-40">
                    <Title className="text-3xl">
                      Menü İçeriği Eklemek için Kategoriyi Oluşturun
                    </Title>
                  </div>
                </Stack>
              </Grid.Col>
            </Grid>
            <Group
              position="right"
              className={
                form.values.name.length === 0 ? "cursor-not-allowed" : ""
              }
            >
              <Button
                className={
                  form.values.name.length === 0
                    ? " pointer-events-none opacity-60"
                    : ""
                }
                onClick={() =>
                  mutate({
                    image: form.values.image,
                    name: form.values.name,
                    workspaceId: form.values.id,
                  })
                }
              >
                Kategori Oluştur
              </Button>
            </Group>
          </Stack>
        </div>
      </Modal>
      <SetItemImage1 form={form} />
    </div>
  );
};
