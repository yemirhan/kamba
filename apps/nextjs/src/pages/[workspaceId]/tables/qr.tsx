import { TablesLayout } from "@/components/Tables/TablesLayout";
import { api } from "@acme/api/src/client";
import {
  Button,
  Flex,
  Grid,
  Group,
  Loader,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import QRCode from "react-qr-code";

const QR = () => {
  const { query, isReady } = useRouter();
  const { data: stories, isLoading } = api.story.getStoriesWithTables.useQuery(
    {
      slug: query.workspaceId as string,
    },
    { enabled: isReady },
  );
  console.log(stories);
  return (
    <TablesLayout>
      <Group position="apart">
        <Title>QR</Title>
      </Group>
      {isLoading ? (
        <Paper>
          <Flex align={"center"} justify="center">
            <Loader size="lg" />
          </Flex>
        </Paper>
      ) : (
        <>
          {(stories?.stories || []).map((story) => (
            <Stack key={story.id}>
              <Title order={3}>{story.name}</Title>
              <Grid>
                {(story.tables || []).map((table) => (
                  <Grid.Col key={table.id} span={4}>
                    <Paper withBorder p={"md"}>
                      <Title order={4}>{table.name}</Title>
                      <QRCode
                        value={`https://kamba.vercel.app/menu/${query.workspaceId}/${table.slug}`}
                      />
                      <Button
                        component={Link}
                        href={`/menu/${query.workspaceId}/${table.slug}`}
                      >
                        Menü
                      </Button>
                    </Paper>
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>
          ))}
        </>
      )}
    </TablesLayout>
  );
};

export default QR;
