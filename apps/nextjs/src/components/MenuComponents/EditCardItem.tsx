import React from "react";
import { UseFormReturnType } from "@mantine/form";
import { MenuItem } from "@acme/db";
import { Modal } from "@mantine/core";
import { useMenu } from "Providers/useMenu";

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
export const EditCardItem = ({ form }: { form: formType }) => {
  return <div>EditCardItem</div>;
};
