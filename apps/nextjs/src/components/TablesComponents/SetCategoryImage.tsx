import React from "react";
import { UseFormType } from "./EditCard";
import { UseFormReturnType } from "@mantine/form";
import { MenuItem } from "@acme/db";
import { useMenu } from "providers/useMenu";
import { ActionIcon, Group, Modal, Stack, Text } from "@mantine/core";
import { IconBan, IconCheck } from "@tabler/icons";

const handleFilePicker = () => {
  document.getElementById("file-input")?.click();
};

export const SetCategoryImage = ({ form }: { form: UseFormType }) => {
  const editCategoryImage = useMenu((state) => state.editCategoryImage);
  const SetEditCategoryImage = useMenu((state) => state.SetEditCategoryImage);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      form.setFieldValue("image", reader.result as string);
      SetEditCategoryImage();
    };
    reader.readAsDataURL(file);
  };

  console.log(form.values.image);

  return (
    <>
      <Modal opened={editCategoryImage} onClose={() => SetEditCategoryImage()}>
        <Stack>
          <Text>Kategori Resmini Değiştirmek İstediğinize Emin Misiniz?</Text>
          <Group position="apart">
            <ActionIcon onClick={() => handleFilePicker()}>
              <IconCheck size={18} />
            </ActionIcon>
            <ActionIcon onClick={() => SetEditCategoryImage()}>
              <IconBan size={18} />
            </ActionIcon>
          </Group>
        </Stack>
      </Modal>
      <input
        id="file-input"
        type="file"
        onChange={handleFileSelect}
        className="hidden"
        accept=".png, .jpg, .jpeg"
      />
    </>
  );
};
