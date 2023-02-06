import { TablesLayout } from "@/components/Tables/TablesLayout";
import { api } from "@acme/api/src/client";
import { CreateMenuItem } from "@acme/api/src/router/menu";
import { Button, Grid, Loader, Title } from "@mantine/core";
import { Group } from "@mantine/core";
import { Text } from "@mantine/core";
import { CategoryCard } from "@/components/TablesComponents/CategoryCard";
import { useRouter } from "next/router";
import React from "react";

const Menu = () => {
  const { query, isReady } = useRouter();
  const {
    data: menu,
    isLoading: menuLoading,
    isFetched,
  } = api.menu.all.useQuery(
    { workspaceSlug: query.workspaceId as string },
    { enabled: isReady },
  );

  return (
    <TablesLayout>
      <Group position="apart">
        <Title>Menü</Title>
        <div className="flex flex-row items-center justify-center gap-4">
          {isFetched ? (
            menu ? (
              <>
                <Text>{`Toplam Kategori Sayısı: ${menu?.length}`}</Text>
                <Button color="green" radius="xl" size="md">
                  Yeni Kategori
                </Button>
              </>
            ) : (
              <Title>Hiç Kategori Yok</Title>
            )
          ) : (
            <Loader color="green" variant="dots" size="xl" />
          )}
        </div>
      </Group>

      <Grid mt="md">
        {isFetched ? (
          menu ? (
            menu.map((categoryValues, index) => {
              return (
                <Grid.Col key={index} span={4}>
                  <CategoryCard categoryValues={categoryValues} />
                </Grid.Col>
              );
            })
          ) : (
            <Grid.Col span={12}>
              <Button
                fullWidth
                className="font-semilight h-[300px] text-3xl"
                radius="xl"
                variant="light"
              >
                Kategori Oluşturmak için Tıkla
              </Button>
            </Grid.Col>
          )
        ) : (
          <Loader color="green" variant="bars" size="xl" />
        )}
      </Grid>
    </TablesLayout>
  );
};

export default Menu;
