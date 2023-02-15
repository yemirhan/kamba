import React from "react";
import { useEffect } from "react";

import { formType } from "./EditCategory";

const handleFilePicker = () => {
  document.getElementById("file-inputt")?.click();
};

export const SetItemImage1 = ({
  form,
  editImage,
  setEditImage,
}: {
  form: formType;
  editImage: boolean;
  setEditImage: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      form.setFieldValue("image", reader.result as string);
      setEditImage(false);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (editImage) {
      handleFilePicker();
    }
  }, [editImage]);

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
