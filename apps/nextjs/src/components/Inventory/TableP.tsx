import { Group, Stack, Text } from "@mantine/core";
import React from "react";

const TableP = ({ leftP }: { leftP: string }) => {
  return (
    <Stack>
      <Group position="apart">
        <Text>{leftP}</Text>
        <Text>asdasd</Text>
      </Group>
    </Stack>
  );
};

export default TableP;
