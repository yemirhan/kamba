import { api } from "@acme/api/src/client";
import { CreateTableInput } from "@acme/api/src/router/tables";
import {
  Button,
  Grid,
  Group,
  Modal,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const CreateTableModal = ({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) => {
  const { query, isReady, ...router } = useRouter();
  const context = api.useContext();
  const { mutate, isLoading: isMutating } =
    api.tables.createNewTable.useMutation({
      onSuccess: () => {
        context.story.getStoryBySlug.invalidate();
        close();
      },
      onError: () => {
        showNotification({
          message: "İşlem Başarısız",
          autoClose: 2000,
        });
      },
    });
  const form = useForm<CreateTableInput>({
    initialValues: {
      chairs: 0,
      color: "OCEAN",
      name: "",
      slug: query.storyId as string,
    },
  });

  useEffect(() => {
    form.setFieldValue("slug", query.storyId as string);
  }, [query]);

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Yeni Masa Oluştur"
      size={"lg"}
    >
      <form
        onSubmit={form.onSubmit((values) => {
          mutate(values);
        })}
      >
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              placeholder="Masa Adı"
              label={"Masa Adı"}
              value={form.values.name}
              onChange={(e) => form.setFieldValue("name", e.target.value)}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <NumberInput
              placeholder="Sandalye Sayısı"
              max={20}
              label={"Sandalye Sayısı"}
              value={form.values.chairs}
              onChange={(e) => form.setFieldValue("chairs", e || 0)}
            />
          </Grid.Col>
        </Grid>
        <Group position="right" mt={"md"}>
          <Button
            type="submit"
            loading={isMutating}
            disabled={form.values.name.length < 1 || form.values.chairs < 1}
          >
            Oluştur
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
