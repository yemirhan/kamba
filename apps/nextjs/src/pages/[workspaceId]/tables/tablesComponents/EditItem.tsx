import React from 'react'
import { Modal, Button, Group } from '@mantine/core';
import { categoryPusherTypes } from './MenuAdder';
import { Grid, TextInput, NumberInput } from '@mantine/core';
import { IconCurrencyLira } from '@tabler/icons';
import { Textarea } from '@mantine/core';
import { CloseButton } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useForm } from '@mantine/form';

export const EditItem = ({
    editItem,
    seteditItem,
    itemList,
    index,
    setItemList
}: {editItem:boolean, seteditItem: React.Dispatch<React.SetStateAction<boolean>>, itemList: categoryPusherTypes, index : number, setItemList : React.Dispatch<React.SetStateAction<categoryPusherTypes[]>>} ) => {

  const form = useForm<categoryPusherTypes>({
    initialValues: {
      price: itemList.price,
      itemName: itemList.itemName,
      description: itemList.description,
    },
  });

  return (
    <>
      <Modal
        opened={editItem}
        onClose={() => seteditItem(false)}>
        {<>
            
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  placeholder="Ürün Adı"
                  label="Ürün Adı"
                  radius="md"
                  size="md"
                  {...form.getInputProps("itemName")}

                />
              </Grid.Col>
              <Grid.Col span={4}>
                <NumberInput
                  placeholder="Fiyat"
                  label="Fiyat"
                  icon={<IconCurrencyLira size={14} />}
                  radius="md"
                  size="md"
                  {...form.getInputProps("price")}
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
            </Grid>
            <Group position="right" className="mt-4">
              <Button
                onClick={()=>{
                  const newItems = [itemList]
                  newItems[index] = form.values
                  setItemList(newItems)
                  form.reset()
                  seteditItem(false)
                }}
                color="teal"
                radius="xl"
                size="md"
              >
                Kaydet
              </Button>
            </Group>
          </>}
      </Modal>
    </>
  )
}
