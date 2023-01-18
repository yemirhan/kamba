import { TablesLayout } from '@/components/Tables/TablesLayout'
import { api } from '@acme/api/src/client'
import { Button, Group, Modal, TextInput, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Categories = () => {
    const { query, isReady } = useRouter()
    const [opened, { open, close }] = useDisclosure(false)
    const { data: categories, isLoading } = api.menuCategories.all.useQuery({ workspaceSlug: query.workspaceId as string }, { enabled: isReady })
    return (
        <TablesLayout>
            <Group position='apart'>
                <Title>
                    Kategoriler
                </Title>
                <Button
                    variant="gradient"
                    leftIcon={<IconPlus size={18} />}
                    gradient={{ from: 'teal', to: 'green', deg: 45 }}
                    onClick={open}
                >
                    Yeni Kategori Oluştur
                </Button>
            </Group>
            <CreateCategoryModal
                opened={opened}
                close={close}
            />
        </TablesLayout>
    )
}

export default Categories

const CreateCategoryModal = ({ opened, close }: { opened: boolean, close: () => void }) => {
    const [categoryName, setCategoryName] = useState("")
    const { query } = useRouter()
    const apiContext = api.useContext()
    const { mutate, isLoading } = api.menuCategories.create.useMutation({
        onSuccess: () => {
            apiContext.menuCategories.all.invalidate()
            close()
        }
    })
    return <Modal
        opened={opened}
        onClose={close}
        title="Yeni Kategori Oluştur"
    >
        <TextInput label="Kategori Adı" value={categoryName} onChange={({ target: { value } }) => setCategoryName(value)} />
        <Button
            loading={isLoading}
            disabled={categoryName.length === 0}
            onClick={() => {
                mutate({ name: categoryName, order: 0, workspaceSlug: query.workspaceId as string })
            }}>
            Oluştur
        </Button>
    </Modal>
}