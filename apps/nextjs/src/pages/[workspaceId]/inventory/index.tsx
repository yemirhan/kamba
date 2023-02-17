import { InventoryTable } from "@/components/Inventory/Table";
import TableP from "@/components/Inventory/TableP";
import { api } from "@acme/api/src/client";
import { Container, Grid, Paper, Stack, Title } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { ShellLayout } from "../../../components/ShellLayout";

const Inventory = () => {
  const { query } = useRouter();
  const { data } = api.inventory.all.useQuery(
    {
      workspaceId: query.workspaceId as string,
    },
    {
      initialData: [],
    },
  );

  return (
    <ShellLayout>
      <Container size={"xl"}>
        <Grid>
          <Grid.Col span={9}>
            <InventoryTable data={data}></InventoryTable>
          </Grid.Col>
          <Grid.Col span={3}>
            <Paper withBorder p={"md"}>
              <Title size={"md"}>Overview</Title>
              <Stack spacing={"sm"} mt={"sm"}>
                <TableP
                  leftP={"Total Product"}
                  value={(data || []).filter((item) => item.amount > 0).length}
                ></TableP>
                <TableP
                  leftP={"Total Sell"}
                  value={(data || []).reduce(
                    (acc, curr) => acc + curr.price,
                    0,
                  )}
                ></TableP>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </ShellLayout>
  );
};

export default Inventory;
