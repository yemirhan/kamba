import { TablesLayout } from '@/components/Tables/TablesLayout'
import { api } from '@acme/api/src/client'
import { CreateMenuItem } from '@acme/api/src/router/menu'
import { Button, Grid, Group, Modal, NumberInput, Textarea, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/router'
import React from 'react'
import { Loader } from '@mantine/core'
import { MenuAdder } from './tablesComponents/MenuAdder'

const Menu = () => {
    const { query, isReady } = useRouter()
    const { data: menu, isLoading: menuLoading } = api.menu.all.useQuery({ workspaceSlug: query.workspaceId as string }, { enabled: isReady })
    const [opened, { open, close }] = useDisclosure(false)
    
    return (
        <TablesLayout>
            <Group position='apart'>
                <Title>
                    Menü
                </Title>
                <div className='flex flex-row gap-5 justify-center items-center'>
                <p>Menü Kategori Sayısı: {menu ? menu.length :  <Loader color="teal" size="sm" variant="dots" />}</p>
                {menu?.length !== 0 ? <MenuAdder /> : <></>}
                </div>
            </Group>

            {menuLoading ? (<Loader color="green" size="xl" variant="bars" />) : (
                menu?.length === 0 ? <MenuAdder className='w-full h-[300px] mt-20 bg-teal-600 opacity-50 text-8xl font-light rounded-3xl' message='Yeni Kategori' /> : <div>sa</div>
            )}
        </TablesLayout>
    )
}

export default Menu

const CreateMenuItem = ({
    opened,
    close
}: { opened: boolean, close: () => void }) => {
    const { query } = useRouter()
    const { mutate, isLoading } = api.menu.create.useMutation({
        onSuccess: () => {
            close()
        },
        onError: () => {
            close()
        }
    })
    const form = useForm<CreateMenuItem>({
        initialValues: {
            categoryName: "",
            image: "",
            items: [],
            workspaceSlug: query.workspaceId as string
        }
    })
    console.log(query.workspaceId);

    return (
        <Modal
            opened={opened}
            onClose={close}
            title="Yeni Menü Seçeneği Oluştur"
        >
            <form onSubmit={form.onSubmit((values) => {
                mutate(values)
            })}>
                <Grid>
                    <Grid.Col span={6}>
                        <TextInput {...form.getInputProps('categoryName')} label="Ürün Adı" />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput {...form.getInputProps('categoryName')} label="Ürün Adı" />
                    </Grid.Col>
                </Grid>
                <Group position='right'>
                    <Button
                        type="submit"
                        variant="outline"
                        color="red"
                        loading={isLoading}
                    >
                        Oluştur
                    </Button>
                </Group>
            </form>
        </Modal>
    )
}

