import { DashboardHeader } from '@/components/DashboardHeader'
import { Logo } from '@/components/Logo'
import { SplashFooter } from '@/components/SplashFooter'
import { VisualCheckbox } from '@/components/VisualCheckbox'
import { getAuth } from '@/utils/getAuth'
import { trpc } from '@/utils/trpc'
import { AppShell, Button, Container, Flex, Group, Header, Loader, Modal, Paper, SimpleGrid, Stack, Text, TextInput, Title } from '@mantine/core'
import { useColorScheme, useDisclosure } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { IconExternalLink, IconLogout, IconPlus, IconRowInsertBottom, IconTable } from '@tabler/icons'
import dayjs from 'dayjs'
import { AnimatePresence, motion } from 'framer-motion'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return await getAuth(ctx, () => {
        return {
            props: {}
        }
    })
}
const Workspaces = () => {
    const [opened, { open, close }] = useDisclosure(false)

    const { data: workspaces, isLoading } = trpc.workspace.getAll.useQuery()
    const router = useRouter()
    return (<>
        <AppShell
            header={<DashboardHeader links={[]} />}
            footer={<SplashFooter links={[]} />}
        >
            <Container>
                <Stack>
                    <Group position='apart'>
                        <Title>
                            Workspaces
                        </Title>
                        <Button
                            variant="gradient"
                            gradient={{ from: 'teal', to: 'green', deg: 45 }}
                            leftIcon={<IconPlus size={18} />}
                            onClick={open}
                        >
                            Yeni Çalışma Alanı Oluştur
                        </Button>
                    </Group>
                    <AnimatePresence mode='wait'>
                        {
                            isLoading ? <Paper
                                component={motion.div}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                withBorder bg={"gray"} p="lg">
                                <Flex align={"center"} justify="center">
                                    <Loader size="lg" />
                                </Flex>
                            </Paper> :
                                (workspaces || []).map(workspace => <Paper
                                    component={motion.div}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    bg={"dark.6"}
                                    withBorder radius={"md"} p="lg" key={workspace.id}>
                                    <Group
                                        position="apart"
                                    >
                                        <Stack>
                                            <Title order={3}>
                                                {workspace.name}
                                            </Title>
                                            <Text>
                                                {`Son güncelleme: ${dayjs(workspace.createdAt).format("DD MMMM YYYY")}`}
                                            </Text>
                                            <Text>
                                                {`${workspace._count?.users || 0} üye`}
                                            </Text>
                                            <Text>
                                                {`${workspace._count?.boards || 0} kamba`}
                                            </Text>
                                        </Stack>
                                        <Button
                                            variant="subtle"
                                            leftIcon={<IconExternalLink size={18} />}
                                            onClick={() => router.push(`/${workspace.slug}/workspace`)}
                                        >
                                            Git
                                        </Button>
                                    </Group>
                                </Paper>)
                        }
                    </AnimatePresence>
                </Stack>
            </Container>
        </AppShell>
        <CreateWorkspace opened={opened} close={close} />
    </>
    )
}

export default Workspaces

const colors = ['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']
const mockdata = [
    { moduleType: "tables", title: 'Masa Yönetim', icon: <IconRowInsertBottom size={20} /> },
    { moduleType: "inventory", title: 'Envanter', icon: <IconTable size={20} /> },
];
const CreateWorkspace = ({ opened, close }: { opened: boolean, close: () => void }) => {
    const context = trpc.useContext()
    const [title, setTitle] = useState("")
    const [selectedModules, setSelectedModules] = useState<("tables" | "inventory")[]>([])
    const { mutate } = trpc.workspace.createNewWorkspace.useMutation({
        onSuccess: () => {
            context.workspace.getAll.invalidate()
            showNotification({
                title: "Başarılı",
                message: "Çalışma alanı başarıyla oluşturuldu.",
            })
            close()
        },
        onError: () => {
            showNotification({
                title: "Hata",
                message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
            });
            close()
        }
    })
    const items = mockdata.map((item) => <VisualCheckbox {...item} checked={selectedModules.includes(item.moduleType as any)} onClick={(type) => {
        if (selectedModules.includes(type)) {
            setSelectedModules(selectedModules.filter(x => x !== type))
        } else {
            setSelectedModules([...selectedModules, type])
        }
    }} key={item.title} />);
    return <Modal
        opened={opened}
        onClose={close}
        title="Yeni Çalışma Alanı Oluştur"
        size={"lg"}
    >
        <Stack>
            <TextInput
                placeholder='Benim Çalışma Alanım'
                label='Çalışma Alanı Adı'
                value={title}
                onChange={({ target: { value } }) => setTitle(value)}

            />
            <SimpleGrid
                cols={2}
            >
                {items}
            </SimpleGrid>
            <Group position='right'>
                <Button

                    onClick={() => mutate({
                        name: title,
                        tables: selectedModules.includes("tables"),
                        inventory: selectedModules.includes("inventory")
                        // color: colors[Math.floor(Math.random() * colors.length)]
                    })}
                    disabled={title.length < 3}>
                    Oluştur
                </Button>
            </Group>
        </Stack>
    </Modal>
}