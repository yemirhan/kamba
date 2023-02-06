import React from "react";
import { useMenu } from "Providers/useMenu";
import { Button } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { MenuItem } from "@acme/db";

type formType = UseFormReturnType<
  {
    categoryName: string | undefined;
    categoryImage: string | null | undefined;
    categoryItems: MenuItem[] | undefined;
    ItemIndex: number;
  },
  (values: {
    categoryName: string | undefined;
    categoryImage: string | null | undefined;
    categoryItems: MenuItem[] | undefined;
    ItemIndex: number;
  }) => {
    categoryName: string | undefined;
    categoryImage: string | null | undefined;
    categoryItems: MenuItem[] | undefined;
    ItemIndex: number;
  }
>;

const handleFilePicker = () => {
  document.getElementById("file-input")?.click();
};

export const ImageSection = ({
  index,
  form,
}: {
  index: number;
  form: formType;
}) => {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      form.values.categoryImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center">
      {form.values.categoryImage ? (
        <img
          src={form.values.categoryImage}
          alt="kategori_resmi"
          className="aspect-video w-8/12 bg-contain"
        />
      ) : (
        <Button
          color="teal"
          radius="xl"
          size="lg"
          onClick={() => handleFilePicker()}
        >
          Resim Eklemek için Tıkla
        </Button>
      )}
      <input
        id="file-input"
        type="file"
        onChange={handleFileSelect}
        className="hidden"
        accept=".png, .jpg, .jpeg"
      />
    </div>
  );
};
