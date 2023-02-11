import React from "react";
import { Menu, Button, Text } from "@mantine/core";

export const DropDownSearch1 = () => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button>Filtre ve Sırala</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Envanter Filtresi</Menu.Label>
        <Menu.Item>Tüm Ürünler</Menu.Item>
        <Menu.Item>Stoktakiler</Menu.Item>
        <Menu.Item>Stokta Yok</Menu.Item>
        <Menu.Divider />
        <Menu.Label>Sırala</Menu.Label>
        <Menu.Item>Alfabetik</Menu.Item>
        <Menu.Item>Oluşturulma Tarihi</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
