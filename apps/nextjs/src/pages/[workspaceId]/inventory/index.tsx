import { InventoryLayout } from "@/components/Inventory/InventoryLayout";
import { api } from "@acme/api/src/client";
import {
  Button,
  createStyles,
  Grid,
  Group,
  Paper,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

const Inventory = () => {
  const { query } = useRouter();
  const { data } = api.inventory.all.useQuery(
    {
      workspaceSlug: query.workspaceId as string,
    },
    {
      initialData: [],
    },
  );
  const { data: count } = api.inventory.stockCount.useQuery(
    {
      workspaceSlug: query.workspaceId as string,
    },
    {
      initialData: [],
    },
  );

  return (
    <InventoryLayout>
      <Group>
        <Title>Envanter</Title>
      </Group>
      <Grid>
        <Grid.Col span={4}>
          <InventoryInsightComponent
            noCount
            title="Toplam Stok İÇERİĞİ"
            value={`${count}`}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <InventoryInsightComponent
            diff={13}
            title="Bİtmek Üzere Olan STOKLAR"
            value="14"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <InventoryInsightComponent diff={13} title="BİTEN STOK" value="14" />
        </Grid.Col>
      </Grid>
      <LastTenUpdated />
    </InventoryLayout>
  );
};

export default Inventory;

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));
const InventoryInsightComponent = ({
  title,
  value,
  diff = 0,
  noCount,
}: {
  title: string;
  value: string;
  diff?: number;
  noCount?: boolean;
}) => {
  const { classes } = useStyles();

  const DiffIcon = diff > 0 ? IconArrowUpRight : IconArrowDownRight;

  return (
    <Paper withBorder p="md" radius="md" key={title}>
      <Group position="apart">
        <div>
          <Text
            color="dimmed"
            transform="uppercase"
            weight={700}
            size="xs"
            className={classes.label}
          >
            {title}
          </Text>
          <Text weight={700} size="xl">
            {value}
          </Text>
        </div>
        <ThemeIcon
          color="gray"
          variant="light"
          sx={(theme) => ({
            color: diff > 0 ? theme.colors.teal[6] : theme.colors.red[6],
          })}
          size={38}
          radius="md"
        >
          <DiffIcon size={28} stroke={1.5} />
        </ThemeIcon>
      </Group>
      {!noCount && (
        <Text color="dimmed" size="sm" mt="md">
          <Text component="span" color={diff > 0 ? "teal" : "red"} weight={700}>
            {diff}%
          </Text>{" "}
          {diff > 0 ? "increase" : "decrease"} compared to last month
        </Text>
      )}
    </Paper>
  );
};

const LastTenUpdated = () => {
  const { query } = useRouter();
  const { data, isLoading } = api.inventory.getLastUpdatedTen.useQuery(
    {
      workspaceSlug: query.workspaceId as string,
    },
    {
      initialData: [],
    },
  );
  return (
    <Stack spacing={"md"}>
      <Title order={3}>En son güncellenen 10 veri</Title>
      <AnimatePresence>
        {isLoading ? (
          <Paper
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Text>Loading...</Text>
          </Paper>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Table>
              <thead>
                <tr>
                  <th>Ürün</th>
                  <th>Stok</th>
                  <th>Fiyat</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.amount}</td>
                    <td>{item.price}</td>
                    <td>
                      <Button
                        variant="outline"
                        color="red"
                        onClick={() => {
                          console.log("delete");
                        }}
                      >
                        Sil
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </motion.div>
        )}
      </AnimatePresence>
    </Stack>
  );
};
