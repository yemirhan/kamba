import { Group, Stack, Text } from "@mantine/core";
import React from "react";

const TableP = ({ leftP, value }: { leftP: string; value: number }) => {
  return (
    <Stack>
      <Group position="apart">
        <Text>{leftP}</Text>
        <Text>{value}</Text>
      </Group>
    </Stack>
  );
};

export default TableP;
