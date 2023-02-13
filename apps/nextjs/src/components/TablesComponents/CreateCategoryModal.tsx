import { colors } from "@/utils/colors";
import { icons } from "@/utils/menuIcons";
import { placeholder } from "@/utils/placeholder";
import { api } from "@acme/api/src/client";
import { CreateMenuCategory } from "@acme/api/src/router/tables/menuCategories";
import {
  Button,
  ColorSwatch,
  FileButton,
  Flex,
  Grid,
  Group,
  Modal,
  Select,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useHover } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { forwardRef, useState } from "react";

export const CreateCategoryModal = ({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) => {
  const { query, push } = useRouter();
  const { hovered, ref } = useHover();

  const [file, setFile] = useState<File | null>(null);
  const { mutate, isLoading } = api.newMenuCategories.create.useMutation({
    onSuccess: (data) => {
      showNotification({
        title: "İşlem Başarılı",
        message: "Kategori sayfasına yönlendiriliyorsunuz",
        autoClose: 2000,
        onClose: () => push(`/${query.workspaceId}/tables/menu/${data.slug}`),
      });
    },
  });
  const form = useForm<CreateMenuCategory>({
    initialValues: {
      image: "",
      name: "",
      workspaceId: query.workspaceId as string,
      color: "GREEN",
      icon: "APPLE",
    },
  });
  return (
    <Modal opened={opened} onClose={close} size="lg" title="Yeni Kategori Ekle">
      <form
        onSubmit={form.onSubmit((values) => {
          mutate(values);
        })}
      >
        <Grid gutter={"lg"}>
          <Grid.Col span={6}>
            <FileButton
              onChange={(file) => {
                if (file) {
                  getBase64(file, (value) =>
                    form.setFieldValue("image", value),
                  );
                }
              }}
              accept="image/png,image/jpeg"
            >
              {(props) => (
                <div
                  className="relative h-64 w-64 overflow-hidden rounded-lg"
                  ref={ref}
                  {...props}
                >
                  <Image
                    fill={true}
                    src={
                      form.values.image.length > 0
                        ? form.values.image
                        : placeholder
                    }
                    alt="Card Image"
                  />
                  {hovered ? (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black bg-opacity-30">
                      <IconPlus size={20} color="white" />
                      <p>Fotoğrafı değiştir</p>
                    </div>
                  ) : null}
                </div>
              )}
            </FileButton>
          </Grid.Col>
          <Grid.Col span={6}>
            <Flex direction={"column"} gap="md">
              <TextInput
                label="Kategori Adı"
                placeholder="Kategori Adı"
                {...form.getInputProps("name")}
              />
              <Select
                data={Object.entries(colors).map(([key, value]) => ({
                  value: key,
                  label: key,
                  color: value,
                }))}
                label="Renk"
                itemComponent={SelectItem}
                {...form.getInputProps("color")}
              />
              <Select
                label="İkon"
                data={Object.entries(icons).map(([key, value]) => ({
                  value: key,
                  label: key,
                }))}
                {...form.getInputProps("icon")}
              />
            </Flex>
          </Grid.Col>
        </Grid>
        <Group position="right" mt={"lg"}>
          <Button
            type="submit"
            leftIcon={<IconPlus size={20} />}
            loading={isLoading}
            disabled={form.values.name.length === 0}
          >
            Ekle
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  color: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, color, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <ColorSwatch key={color} color={color} />

        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  ),
);
SelectItem.displayName = "IconSelector";

const getBase64 = (file: File, cb: (v: string) => void) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result as string);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
};
