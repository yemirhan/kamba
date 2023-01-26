import React from 'react'
import { useState } from 'react'
import { Modal, Button, Group, Stack, Title } from '@mantine/core'
import { Container } from '@mantine/core'
import ImageSection  from './ImageSection'
import { TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import { Grid } from '@mantine/core'
import { KategoriPusher } from './KategoriPusher'
import { RouterOutputs } from '@acme/api'
import { useForm } from '@mantine/form'
type menuprops = {
    message? : string,
    className? : string
    menu? : RouterOutputs['menu']['all']
}

export type categoryPusherTypes = {price: number, itemName: string, description: string}

export const MenuAdder = ({
    message,
    className,
    menu
}: menuprops) => {
    const [opened, setOpened] = useState(false)
    const [kategoriBasligi, setKategoriBasligi] = useState("")
    const [itemList, setItemList] = useState<categoryPusherTypes[]>([])

    const form = useForm<categoryPusherTypes>({
      initialValues : {
        price : 0,
        itemName: "",
        description : ""
      }
    })
    
    
    
    return (
      <>
        <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
        size={'70%'}
        overflow='inside'
      >
        <div className='flex flex-col items-center h-auto max-h-[800px]'>
        <Stack className='w-3/4'>
            <ImageSection />
            <div className='flex flex-col items-center'>
            <TextInput
            placeholder="Başlangıçlar..."
            label="Kategori Başlığı"
            radius="lg"
            size="md"
            className='mt-5 w-1/2'
            value={kategoriBasligi}
            onChange={e=>setKategoriBasligi(e.currentTarget.value)}
            />
            </div>
            <Group position='apart'>
                <p className='text-xl'>Kategori içerikleri</p>
                <TextInput placeholder="Köri Soslu Tavuk..." icon={<IconSearch size={14} />} />
            </Group>

            <Grid>
              {menu ? (
                itemList.map((value) => (
                  <>
                  <Grid.Col span={6}>
                    <div>{value.itemName}</div>
                  </Grid.Col>
                  
                  </>
                ))
                
      
              )
               : <></>}
               <KategoriPusher form = {form} itemList = {itemList} setItemList = {setItemList}/>
            </Grid>

        </Stack>
        </div>
      </Modal>

      <Group position="center">
        <Button className={`${className}`} onClick={() => setOpened(true)}>{message? message : "Yeni Kategori Oluştur"}</Button>
      </Group>
      </>
    );
  }