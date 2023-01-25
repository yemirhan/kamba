import React from 'react'
import { useState } from 'react'
import { Modal, Button, Group, Stack, Title } from '@mantine/core'
import { Container } from '@mantine/core'
import ImageSection  from './ImageSection'
import { TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons'

type menuprops = {
    message? : string,
    className? : string
}

export const MenuAdder = ({
    message,
    className
}: menuprops) => {
    const [opened, setOpened] = useState(false)
    const [kategoriBasligi, setKategoriBasligi] = useState("")
    
    
    return (
      <>
        <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
        size={'70%'}
      >
        <div className='flex flex-col items-center'>
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
        </Stack>
        </div>
      </Modal>

      <Group position="center">
        <Button className={`${className}`} onClick={() => setOpened(true)}>{message? message : "Yeni Kategori Oluştur"}</Button>
      </Group>
      </>
    );
  }