import React from "react";
import { Button, Card } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Text } from "@mantine/core";

export const NewItemMakerCard1 = () => {
  const mediaQuery = useMediaQuery("(min-width: 1000px)");
  return (
    <Card
      shadow="lg"
      p="lg"
      radius="md"
      withBorder
      h={mediaQuery ? "200px" : "130px"}
    >
      <Button>+</Button>
    </Card>
  );
};
