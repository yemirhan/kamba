import React from "react";
import { Modal, Button, Group, Stack, Title } from "@mantine/core";
import ImageSection from "./ImageSection";
import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { Grid } from "@mantine/core";
import { KategoriPusher } from "./KategoriPusher";
import { RouterOutputs } from "@acme/api";
import { useForm } from "@mantine/form";
import { Items } from "./Items";
import { Router, useRouter } from "next/router";
import { api } from "@acme/api/src/client";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { categoryPusherTypes } from "./MenuAdder";
import { SearchBar } from "./SearchBar";

export type editCardType = {
  price: number;
  itemName: string;
  description?: string;
  image?: string;
};

export const EditCard = ({
  image,
  menuItems,
  name,
  id,
  edit,
  setedit,
}: RouterOutputs["menu"]["all"][0] & {
  edit: boolean;
  setedit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [opened, setOpened] = useState(false);
  const [kategoriBasligi, setKategoriBasligi] = useState(name);
  const [searchInput, setsearchInput] = useState("");
  const [itemList, setItemList] = useState<categoryPusherTypes[]>(
    menuItems.map((item) => ({
      itemName: item.name,
      price: item.price,
      description: item.description || "",
    })),
  );

  const [imageBase64, setImageBase64] = useState(image || "");
  const { query } = useRouter();
  const queryContext = api.useContext();
  const [newItem, setnewItem] = useState(false);
  const { mutate, isLoading } = api.menu.update.useMutation({
    onSuccess: () => {
      showNotification({
        title: "İşlem Başarılı",
        message: "",
        autoClose: 2000,
      });
      setedit(false);
      queryContext.menu.all.invalidate();
    },

    onError: () => {
      showNotification({
        title: "İşlem Başarısız",
        message: "",
        color: "red",
        autoClose: 2000,
      });
    },
  });

  const form = useForm<categoryPusherTypes>({
    initialValues: {
      price: 0,
      itemName: "",
      description: "",
    },
  });

  return (
    <Modal
      opened={edit}
      onClose={() => setedit(false)}
      title="Introduce yourself!"
      size={"70%"}
      overflow="inside"
    >
      <div className="flex h-auto max-h-[800px] flex-col items-center">
        <Stack className="w-3/4">
          <ImageSection
            imageBase64={imageBase64}
            setImageBase64={setImageBase64}
          />
          <div className="flex flex-col items-center">
            <TextInput
              label="Kategori Başlığı"
              radius="lg"
              size="md"
              className="mt-5 w-1/2"
              value={kategoriBasligi}
              onChange={(e) => setKategoriBasligi(e.currentTarget.value)}
            />
          </div>
          <Group position="apart">
            <p className="text-xl">Kategori içerikleri</p>
            <SearchBar
              itemName={itemList[0]?.itemName}
              searchInput={searchInput}
              setsearchInput={setsearchInput}
            />
          </Group>

          <Grid>
            {itemList
              .filter((item) => item.itemName.includes(searchInput))
              .map((value, index) => (
                <>
                  <Grid.Col key={index} span={6}>
                    <Items itemList={value} index={itemList.indexOf(value)} setItemList = {setItemList} />
                  </Grid.Col>
                </>
              ))}
            <KategoriPusher
              newItem={newItem}
              setnewItem={setnewItem}
              form={form}
              itemList={itemList}
              setItemList={setItemList}
            />
          </Grid>
          <Group position="right">
            <Button
              onClick={() =>
                mutate({
                  items: itemList.map((item) => ({
                    description: item.description || "",
                    name: item.itemName,
                    price: item.price,
                    images: [],
                    ingredients: [],
                  })),
                  categoryName: kategoriBasligi,
                  id: id,
                  workspaceSlug: query.workspaceId as string,
                  image: imageBase64,
                })
              }
              color="indigo"
              radius="xl"
              size="md"
            >
              Kaydet
            </Button>
          </Group>
        </Stack>
      </div>
    </Modal>
  );
};