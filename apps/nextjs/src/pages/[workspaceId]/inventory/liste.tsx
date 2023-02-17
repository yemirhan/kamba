import { InventoryLayout } from "@/components/Inventory/InventoryLayout";
import { Group, Title } from "@mantine/core";
import React from "react";

const List = () => {
  return (
    <InventoryLayout>
      <Group>
        <Title>Envanter Listesi</Title>
      </Group>
    </InventoryLayout>
  );
};

export default List;
