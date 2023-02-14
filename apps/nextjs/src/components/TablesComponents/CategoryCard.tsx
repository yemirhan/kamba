import React from "react";
import { RouterOutputs } from "@acme/api";
import {
  Card,
  Group,
  Text,
  Image,
  Badge,
  Button,
  ActionIcon,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";

export const CategoryCard = ({
  image,
  name,
  id,
  slug,
  _count,
}: RouterOutputs["newMenuCategories"]["all"][number]) => {
  const { query } = useRouter();
  return (
    <>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={image} height={160} alt="Norway" />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{name}</Text>
          <Badge color="cyan" variant="light">
            {`${_count?.menuItems || 0} İçerik`}
          </Badge>
        </Group>

        <div className="flex w-full flex-row items-center gap-2">
          <Button
            variant="light"
            color="teal"
            fullWidth
            mt="md"
            radius="md"
            component={Link}
            href={`/${query.workspaceId}/tables/menu/${slug}`}
          >
            İçeriği Gör
          </Button>
          {/* <ActionIcon>
            <IconTrash size={24} className="mt-4" />
          </ActionIcon>
          <ActionIcon>
            <IconPencil size={24} className="mt-4" />
          </ActionIcon> */}
        </div>
      </Card>
    </>
  );
};
