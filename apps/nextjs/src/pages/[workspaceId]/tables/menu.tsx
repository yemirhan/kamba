import { TablesLayout } from "@/components/Tables/TablesLayout";
import { api } from "@acme/api/src/client";
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
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";
import React from "react";
import { Loader } from "@mantine/core";
import { CategoryCards } from "@/components/MenuComponents/CategoryCards";
import { useMenu } from "Providers/useMenu";
import { RouterOutputs } from "@acme/api";
import { useEffect } from "react";

const Menu = () => {
  const { query, isReady } = useRouter();
  const menuState = useMenu((state) => state.menu);
  const menuSetter = useMenu((state) => state.menuSet);

  const {
    data: menu,
    isLoading: menuLoading,
    isFetched: menuFetched,
  } = api.menu.all.useQuery(
    { workspaceSlug: query.workspaceId as string },
    {
      enabled: isReady,
    },
  );

  useEffect(() => {
    console.log("success");
    if (menu?.length !== menuState.length) {
      menuSetter(menu || []);
      console.log(menu);
    } else {
      for (let i = 0; i < menu.length; i++) {
        if (menu[i] !== menuState[i]) {
          {
            menuSetter(menu || []);
            console.log(menuState);
          }
        }
      }
    }
  }, [menuFetched]);

  return (
    <TablesLayout>
      <Group position="apart">
        <Title>Menü</Title>
        <div className="flex flex-row items-center">
          {menuLoading ? (
            <Loader color="green" size="lg" variant="dots" />
          ) : menu?.length === 0 ? (
            <Button color="green" radius="lg" size="md">
              Yeni Kategori Oluştur
            </Button>
          ) : (
            <div className="flex flex-row gap-4">
              <Text>Kategori Sayısı:</Text>
              <Text color="teal">{menu?.length}</Text>
              <Button></Button>
            </div>
          )}
        </div>
      </Group>
      <div className="mt-4 h-auto w-full">
        {menu?.length === 0 ? (
          <Button
            fullWidth
            variant="light"
            color="cyan"
            radius="lg"
            className="h-[200px] text-5xl font-light"
          >
            Kategori Eklemek için Tıkla
          </Button>
        ) : (
          <Grid>
            {menu?.map((category, index) => {
              return (
                <Grid.Col key={index} span={4}>
                  <CategoryCards index={index} />
                </Grid.Col>
              );
            })}
          </Grid>
        )}
      </div>
    </TablesLayout>
  );
};

export default Menu;
