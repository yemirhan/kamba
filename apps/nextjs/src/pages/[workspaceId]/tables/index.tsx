import { TablesLayout } from "@/components/Tables/TablesLayout";
import { api } from "@acme/api/src/client";
import {
  Button,
  Container,
  Flex,
  Grid,
  Group,
  Loader,
  Modal,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ShellLayout } from "../../../components/ShellLayout";
import { AddStoryModal } from "../../../components/Stories/AddStoryModal";
import { StoryCard } from "../../../components/Stories/StoryCard";

const Tables = () => {
  const router = useRouter();
  const [opened, { close, open }] = useDisclosure(false);
  const context = api.useContext();
  const { data: stories, isLoading } = api.story.getStoriesBySlug.useQuery(
    {
      slug: router.query.workspaceId as string,
    },
    { enabled: router.isReady },
  );

  return (
    <TablesLayout>
      <Group position="apart">
        <Title>Bölgeler</Title>
        <Button onClick={open}>Yeni Bölge Oluştur</Button>
      </Group>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Paper
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
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
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Grid>
              {(stories?.stories || []).map((story) => (
                <Grid.Col key={story.id} span={4}>
                  <StoryCard
                    name={story.name}
                    slug={story.slug}
                    tables={story._count.tables}
                  />
                </Grid.Col>
              ))}
            </Grid>
          </motion.div>
        )}
      </AnimatePresence>
      <AddStoryModal close={close} opened={opened} />
    </TablesLayout>
  );
};

export default Tables;
