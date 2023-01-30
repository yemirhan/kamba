import React from "react";
import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { categoryPusherTypes } from "./MenuAdder";
import { useState } from "react";

export const SearchBar = ({
  itemName,
  searchInput,
  setsearchInput,
}: {
  itemName: string | undefined;
  searchInput: string;
  setsearchInput: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <TextInput
      placeholder="Köri Soslu Tavuk..."
      icon={<IconSearch size={14} />}
      value={searchInput}
      onChange={(e) => setsearchInput(e.currentTarget.value)}
    />
  );
};
