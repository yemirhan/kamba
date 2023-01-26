import React from 'react'
import { Grid } from '@mantine/core'
import { Button } from '@mantine/core'
import { useState } from 'react'
import { TextInput } from '@mantine/core'
import { NumberInput } from '@mantine/core'
import { Textarea } from '@mantine/core'
import { CloseButton,Group } from '@mantine/core'
import { useEffect } from 'react'
import { IconCurrencyLira } from '@tabler/icons'
import { api } from '@acme/api/src/client'
import { useRouter } from 'next/router'
import { UseForm, UseFormReturnType } from '@mantine/form/lib/types'
import { categoryPusherTypes } from './MenuAdder'


export const KategoriPusher = ({form, itemList, setItemList}:{form:UseFormReturnType<categoryPusherTypes>, itemList: any[], setItemList : React.Dispatch<React.SetStateAction<categoryPusherTypes[]>>}) => {
    const [newItem, setnewItem] = useState(false)
    
    
    

    useEffect(() => {
        function handleKeyDown(event:any) {
          if (event.key === 'Escape' && newItem) { // check if newItem is true
            setnewItem(false);
          }
        }
    
        document.addEventListener("keydown", handleKeyDown);
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, [newItem]); // re-run the effect only when newItem changes
    
      

  return (
    <>
    <Grid.Col span={12} className='h-40 rounded-xl'>
    {newItem ? (
        <>
    <Group position='right'>
        <></>
        <CloseButton
            onClick={() => setnewItem(false)}
            aria-label="Close modal"
            />
    </Group>
        <Grid>
            <Grid.Col span={6}>
                <TextInput placeholder="Ürün Adı" label="Ürün Adı" radius="md" size="md" {...form.getInputProps('itemName')}/>
            </Grid.Col>
            <Grid.Col span={4}>
            <NumberInput
            placeholder="Fiyat"
            label="Fiyat"
            icon={<IconCurrencyLira size={14} />}
            radius='md'
            size='md'
            {...form.getInputProps('price')}
            />
            </Grid.Col>
            <Grid.Col span={12}>
            <Textarea
            placeholder="Açıklama"
            label="Açıklama"
            radius="md"
            {...form.getInputProps('description')}
            />
            </Grid.Col>
      </Grid>
      <Group position='right' className='mt-4'>
            <Button onClick={()=>{
                setItemList((prev)=>[...prev, form.values])
                form.reset()
                setnewItem(false)
            }} color='teal' radius='xl' size='md'>Kaydet</Button>
        </Group>
      </>): <Button onClick={()=>setnewItem(true)} className='w-full h-full' color="teal" radius="md">
            Yeni İçerik Ekle
        </Button>}
    </Grid.Col>
    </>
  )
}
