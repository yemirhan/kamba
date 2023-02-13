import { TablesLayout } from "@/components/Tables/TablesLayout";
import { api } from "@acme/api/src/client";
import { CreateMenuItem } from "@acme/api/src/router/menu";
import { Button, Grid, Loader, Title, Badge, Card, Image } from "@mantine/core";
import { Group } from "@mantine/core";
import { Text } from "@mantine/core";
import { CategoryCard } from "@/components/TablesComponents/CategoryCard";
import { useRouter } from "next/router";
import React from "react";
import { useMenu } from "providers/useMenu";
import { CategoryCard1 } from "@/components/TablesComponents/CategoryCard1";
import { NewItemModal1 } from "@/components/TablesComponents/NewItemModal1";
const Menu = () => {
  const { query, isReady } = useRouter();
  const {
    data: menu,
    isLoading: menuLoading,
    isFetched,
  } = api.newMenuCategories.all.useQuery(
    { workspaceId: query.workspaceId as string },
    { enabled: isReady },
  );

  const SetIsNewMenu = useMenu((state) => state.SetIsNewMenu);

  console.log(menu);
  console.log(menuLoading);
  return (
    <>
      <TablesLayout>
        {isFetched ? (
          <>
            <Group position="apart">
              <Title>Menü</Title>
              <Button onClick={() => SetIsNewMenu()} color="teal" radius="lg">
                Yeni Kategori Ekle
              </Button>
            </Group>
            <Grid>
              {menu?.length !== 0 ? (
                <Grid.Col span={6} lg={4}>
                  {menu?.map((category, index) => {
                    return (
                      <CategoryCard1 key={index} categoryInfo={category} />
                    );
                  })}
                </Grid.Col>
              ) : (
                <div className="flex h-[70vh] w-full flex-col items-center justify-center text-center">
                  <Title>Hiç Kategori Yok</Title>
                </div>
              )}
            </Grid>
          </>
        ) : (
          <></>
        )}
      </TablesLayout>
      <NewItemModal1 />
    </>
  );
};

export default Menu;
