import React from "react";
import {
  Modal,
  Button,
  Group,
  Stack,
  TextInput,
  Grid,
  Card,
} from "@mantine/core";
import { useMenu } from "providers/useMenu";
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { AspectRatio } from "@mantine/core";
import { useState } from "react";
import { IconSearch } from "@tabler/icons";
import { DropDownSearch1 } from "./DropDownSearch1";
import { NewItemMakerCard1 } from "./NewItemMakerCard1";
import Image from "next/image";

export const NewItemModal1 = () => {
  const isNewMenu = useMenu((state) => state.isNewMenu);
  const SetIsNewMenu = useMenu((state) => state.SetIsNewMenu);
  const ModalMediaQuery = useMediaQuery("(min-width: 1000px)");
  const { query } = useRouter();
  const form = useForm({
    initialValues: {
      image:
        "https://res.cloudinary.com/yemirhan-bucket/image/upload/v1676136679/influshop_comments/Group_10placeholder_yldivb.png",
      id: query.workspaceId as string,
      name: "",
    },
  });
  const [search, setSearch] = useState("");
  return (
    <div className="flex h-[400] flex-col items-center lg:h-[1000px]">
      <Modal
        opened={isNewMenu}
        onClose={() => SetIsNewMenu()}
        size={ModalMediaQuery ? 1200 : 700}
      >
        <div className="h-[80vh] lg:h-[70vh]">
          <Grid gutter={"xl"}>
            <Grid.Col span={5}>
              <Stack>
                <TextInput
                  placeholder="Hamburgerler..."
                  label="Kategori Adı"
                  withAsterisk
                />

                <Image
                  src={form.values.image}
                  alt="Kategori Resmi"
                  width={50}
                  height={50}
                />
              </Stack>
            </Grid.Col>
            <Grid.Col span={7}>
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
              </Stack>
            </Grid.Col>
          </Grid>
        </div>
      </Modal>
    </div>
  );
};
