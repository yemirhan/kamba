import { InventoryTable } from "@/components/Inventory/Table";
import TableP from "@/components/Inventory/TableP";
import { Container, Grid, Paper, Stack, Title } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { ShellLayout } from "../../../components/ShellLayout";

const Inventory = () => {
  const router = useRouter();
  console.log(router.route);

  return (
    <ShellLayout>
      <Container size={"xl"}>
        <Grid>
          <Grid.Col span={9}>
            <InventoryTable data={data.data}></InventoryTable>
          </Grid.Col>
          <Grid.Col span={3}>
            <Paper withBorder p={"md"}>
              <Title size={"md"}>Overview</Title>
              <Stack spacing={"sm"} mt={"sm"}>
                <TableP leftP={"Total Product"}></TableP>
                <TableP leftP={"Total Sell"}></TableP>
                <TableP leftP={"Total Product"}></TableP>
                <TableP leftP={"Total Product"}></TableP>
                <TableP leftP={"Total Product"}></TableP>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </ShellLayout>
  );
};

export default Inventory;

const data = {
  data: [
    {
      id: "1",
      avatar:
        "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Robert Wolfkisser",
      job: "Engineer",
      email: "rob_wolf@gmail.com",
    },
    {
      id: "2",
      avatar:
        "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Jill Jailbreaker",
      job: "Engineer",
      email: "jj@breaker.com",
    },
    {
      id: "3",
      avatar:
        "https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Henry Silkeater",
      job: "Designer",
      email: "henry@silkeater.io",
    },
    {
      id: "4",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Bill Horsefighter",
      job: "Designer",
      email: "bhorsefighter@gmail.com",
    },
    {
      id: "5",
      avatar:
        "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Jeremy Footviewer",
      job: "Manager",
      email: "jeremy@foot.dev",
    },
  ],
};
