import { useMenu } from "@/providers/useMenu";
import React from "react";
import { useEffect } from "react";

import { formType } from "./NewItemModal1";

const handleFilePicker = () => {
  document.getElementById("file-inputt")?.click();
};

export const SetItemImage1 = ({ form }: { form: formType }) => {
  const itemImageState = {
    SetIsEditCategoryImage: useMenu((state) => state.SetIsEditCategoryImage),
    isEditCategoryImage: useMenu((state) => state.isEditCategoryImage),
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      form.setFieldValue("image", reader.result as string);
      itemImageState.SetIsEditCategoryImage();
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (itemImageState.isEditCategoryImage) {
      handleFilePicker();
    }
  }, [itemImageState.isEditCategoryImage]);

  return (
    <input
      id="file-inputt"
      type="file"
      onChange={handleFileSelect}
      className="hidden"
      accept=".png, .jpg, .jpeg"
    />
  );
};
