import { MenuItem } from "@/components/TablesComponents/MenuItem";
import { placeholder } from "@/utils/placeholder";
import { api } from "@acme/api/src/client";
import { AppShell, Container, Stack, Title } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

const TableMenu = () => {
  const { query, isReady } = useRouter();
  const { data, isLoading } = api.qrMenu.all.useQuery(
    {
      slug: query.workspaceSlug as string,
    },
    {
      enabled: isReady,
    },
  );
  return (
    <AppShell>
      <Container>
        <Stack>
          <Title order={3}>Menü</Title>
          {isLoading ? (
            <div>Loading</div>
          ) : (
            <>
              {(data || []).map((category) => (
                <Stack key={category.id}>
                  <Title order={4}>{category.name}</Title>
                  {(category.menuItems || []).map((item) => (
                    <MenuItem key={item.id} name={item.name} images={[]} />
                  ))}
                </Stack>
              ))}
            </>
          )}
        </Stack>
      </Container>
    </AppShell>
  );
};

export default TableMenu;
