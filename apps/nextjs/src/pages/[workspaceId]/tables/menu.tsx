import { TablesLayout } from '@/components/Tables/TablesLayout'
import { api } from '@acme/api/src/client'
import { CreateMenuItem } from '@acme/api/src/router/menu'
import { Button, Grid, Group, Modal, NumberInput, Textarea, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/router'
import React from 'react'

const Menu = () => {
    const { query, isReady } = useRouter()
    const { data: menu } = api.menu.all.useQuery({ workspaceSlug: query.workspaceId as string }, { enabled: isReady })
    const [opened, { open, close }] = useDisclosure(false)
    return (
        <TablesLayout>
            <Group position='apart'>
                <Title>
                    Menü
                </Title>
                <Button
                    onClick={open}
                >
                    Yeni Menü Seçeneği Oluştur
                </Button>
            </Group>
            <CreateMenuItem
                opened={opened}
                close={close}
            />
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
            name: '',
            workspaceId: query.workspaceId as string,
            images: [],
            description: '',
            price: 0,
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
                    <Grid.Col span={12}>
                        <TextInput {...form.getInputProps('name')} label="Ürün Adı" />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <NumberInput {...form.getInputProps('price')} label="Ürün Fiyatı" />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Textarea {...form.getInputProps("description")} label="Ürün Bilgisi" />
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

