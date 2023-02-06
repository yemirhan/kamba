import React from "react";

export const NewCard = () => {
  return <div>NewCard</div>;
};

const [isFirstEntry, setIsFirstEntry] = useState(false);
const itemIsEdit = useMenu((state) => state.itemIsEdit);

<Grid.Col className="mt-14" span={12}>
  {!isFirstEntry ? (
    <Button
      fullWidth
      variant="light"
      color="cyan"
      radius="lg"
      className="h-[200px] text-5xl font-light"
      onClick={() => setIsFirstEntry(!isFirstEntry)}
    >
      İçerik eklemek için tıkla
    </Button>
  ) : (
    <Paper
      className="relative mt-14 w-[800px]"
      shadow="sm"
      radius="lg"
      p="md"
      withBorder
    >
      <div className="relative flex w-full flex-row gap-4 p-4">
        <Button
          variant="light"
          color="cyan"
          radius="lg"
          className="h-auto w-[100%] text-xl font-light"
          onClick={() => setIsFirstEntry(!isFirstEntry)}
        >
          Görsel
        </Button>
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              className="w-[3/4]"
              label="Ürün Adı"
              radius="md"
              {...form.getInputProps("itemName")}
            ></TextInput>
          </Grid.Col>
          <Grid.Col span={6}>
            <NumberInput
              placeholder="Fiyat"
              label="Fiyat"
              icon={<IconCurrencyLira size={14} />}
              radius="md"
              {...form.getInputProps("itemPrice")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea
              placeholder="Açıklama"
              label="Açıklama"
              radius="md"
              {...form.getInputProps("description")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea
              placeholder="İçerikler"
              label="Açıklama"
              radius="md"
              value={ingredients}
              onChange={(e) => setIngredients(e.currentTarget.value)}
            />
          </Grid.Col>
        </Grid>
      </div>
      <Group position="right">
        {form.values.itemName !== "" && form.values.itemPrice !== 0 ? (
          <Button color="green" radius="xl" size="md">
            Kaydet
          </Button>
        ) : (
          <Button color="green" radius="xl" size="md" disabled>
            Kaydet
          </Button>
        )}
      </Group>
    </Paper>
  )}
</Grid.Col>;
