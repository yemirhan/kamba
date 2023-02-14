import { TablesLayout } from "@/components/Tables/TablesLayout";
import { api } from "@acme/api/src/client";
import { Button, Grid, Loader, Title, Paper, Flex } from "@mantine/core";
import { Group } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CreateCategoryModal } from "@/components/TablesComponents/CreateCategoryModal";
import { useDisclosure } from "@mantine/hooks";
import { CategoryCard } from "@/components/TablesComponents/CategoryCard";
const Menu = () => {
  const { query, isReady } = useRouter();
  const { data: menu, isFetched } = api.newMenuCategories.all.useQuery(
    { workspaceId: query.workspaceId as string },
    { enabled: isReady },
  );

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <TablesLayout>
        <Group position="apart">
          <Title>Menü</Title>
          <Button onClick={open} color="teal" radius="lg">
            Yeni Kategori Ekle
          </Button>
        </Group>
        <AnimatePresence mode="wait">
          {isFetched ? (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Grid>
                {menu?.length !== 0 ? (
                  menu?.map((category, index) => {
                    return (
                      <Grid.Col key={category.id} span={6} lg={4}>
                        <CategoryCard {...category} />
                      </Grid.Col>
                    );
                  })
                ) : (
                  <div className="flex h-[70vh] w-full flex-col items-center justify-center text-center">
                    <Title>Hiç Kategori Yok</Title>
                  </div>
                )}
              </Grid>
            </motion.div>
          ) : (
            <Paper
              component={motion.div}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              withBorder
              bg={"gray"}
              p="lg"
            >
              <Flex align={"center"} justify="center">
                <Loader size="lg" />
              </Flex>
            </Paper>
          )}
        </AnimatePresence>
      </TablesLayout>
      <CreateCategoryModal opened={opened} close={close} />
    </>
  );
};

export default Menu;
