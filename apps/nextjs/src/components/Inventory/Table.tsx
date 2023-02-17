import { useState } from "react";
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  Modal,
  Button,
  NumberInput,
  TextInput,
  Grid,
  FileButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { api } from "@acme/api/src/client";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { Route } from "next/dist/server/router";
import { RouterOutputs } from "@acme/api";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors["teal"][7], 0.2)
        : theme.colors["teal"][0],
  },
}));

interface TableSelectionProps {
  data: RouterOutputs["inventory"]["all"] | undefined;
}

export function InventoryTable({ data }: TableSelectionProps) {
  const { classes, cx } = useStyles();
  const { query, isReady } = useRouter();
  const [selection, setSelection] = useState(["1"]);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  const apiContext = api.useContext();

  const toggleAll = () =>
    setSelection((current) =>
      current.length === (data || []).length
        ? []
        : (data || []).map((item) => item.id),
    );

  const rows = (data || []).map((item) => {
    const selected = selection.includes(item.id);
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Group spacing="sm">
            {/* <Avatar size={26} src={item.} radius={26} /> */}
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>{item.price}</td>
        <td>{item.amount}</td>
      </tr>
    );
  });
  const { mutate, isLoading } = api.inventory.create.useMutation({
    onSuccess: (data) => {
      apiContext.inventory.all.invalidate();
      setOpened(false);
      showNotification({
        title: "İşlem Başarılı",
        message: "Kategori sayfasına yönlendiriliyorsunuz",
        autoClose: 2000,
      });
    },
  });
  const form = useForm({
    initialValues: {
      name: "",
      amount: 0,
      price: 0,
    },
  });
  const [opened, setOpened] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  return (
    <ScrollArea>
      <Button onClick={() => setOpened(true)}>Ürün Ekle</Button>
      <Modal
        size={"xl"}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Ürün ekleme"
      >
        {
          <form
            onSubmit={form.onSubmit((values) => {
              mutate({
                amount: values.amount,
                name: values.name,
                price: values.price,
                image: undefined,
                workspaceId: query.workspaceId as string,
              });
            })}
          >
            <Grid>
              <Grid.Col span={8}>
                <TextInput
                  {...form.getInputProps("name")}
                  label="Ürün adı"
                  placeholder="Ürün ismi"
                />
              </Grid.Col>
              <Grid.Col span={8}>
                <NumberInput
                  {...form.getInputProps("price")}
                  label="Fiyatı"
                  placeholder="Fiyat"
                />
              </Grid.Col>
              <Grid.Col span={8}>
                <NumberInput
                  {...form.getInputProps("amount")}
                  label="Adeti"
                  placeholder="Adet"
                />
              </Grid.Col>
              <Grid.Col span={8}>
                <FileButton onChange={setFile} accept="image/png,image/jpeg">
                  {(props) => <Button {...props}>Upload image</Button>}
                </FileButton>
                {file && (
                  <Text size="sm" align="left" mt="sm">
                    Picked file: {file.name}
                  </Text>
                )}
              </Grid.Col>
              <Grid.Col span={8}>
                <button type="submit">Tamam</button>
              </Grid.Col>
            </Grid>
          </form>
        }
      </Modal>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === (data || []).length}
                indeterminate={
                  selection.length > 0 &&
                  selection.length !== (data || []).length
                }
                transitionDuration={0}
              />
            </th>
            <th>Name</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
