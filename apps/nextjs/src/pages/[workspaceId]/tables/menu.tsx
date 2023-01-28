import { TablesLayout } from "@/components/Tables/TablesLayout";
import { api } from "@acme/api/src/client";
import { CreateMenuItem } from "@acme/api/src/router/menu";
import {
  Button,
  Grid,
  Group,
  Modal,
  NumberInput,
  Textarea,
  TextInput,
  Title,
  Card,
  Image,
  Text,
  Badge,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";
import React from "react";
import { Loader } from "@mantine/core";
import { MenuAdder } from "./tablesComponents/MenuAdder";
import { CategoryCard } from "./tablesComponents/CategoryCard";

const Menu = () => {
  const { query, isReady } = useRouter();
  const { data: menu, isLoading: menuLoading } = api.menu.all.useQuery(
    { workspaceSlug: query.workspaceId as string },
    { enabled: isReady },
  );

  return (
    <TablesLayout>
      <Group position="apart">
        <Title>Menü</Title>
        <div className="flex flex-row items-center justify-center gap-5">
          <p>
            Menü Kategori Sayısı:{" "}
            {menu ? (
              menu?.length
            ) : (
              <Loader color="teal" size="sm" variant="dots" />
            )}
          </p>
          {menu?.length !== 0 ? <MenuAdder menu={menu} /> : <></>}
        </div>
      </Group>

      {menuLoading ? (
        <Loader color="green" size="xl" variant="bars" />
      ) : menu?.length === 0 ? (
        <MenuAdder
          menu={menu}
          className="mt-20 h-[300px] w-full rounded-3xl bg-teal-600 text-8xl font-light opacity-50"
          message="Yeni Kategori"
        />
      ) : (
        <Grid>
          {(menu || []).map((value, index) => {
            return (
              <Grid.Col key={index} span={4}>
                <CategoryCard {...value} />
              </Grid.Col>
            );
          })}
        </Grid>
      )}
    </TablesLayout>
  );
};

export default Menu;
