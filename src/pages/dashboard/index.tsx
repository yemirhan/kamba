import { AppShell, Avatar, Button, Container, Grid, Group, Loader, Modal, Paper, Stack, Text, TextInput, Title, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification, useNotifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react'
import { DashboardHeader } from '../../components/DashboardHeader';
import { DashboardNavbar } from '../../components/DashboardNavbar';
import { MultipleContainers } from '../../components/MultipleContainers';
import { ShellLayout } from '../../components/ShellLayout';
import { trpc } from '../../utils/trpc';



const Dashboard = () => {
    const { data, isLoading } = trpc.workspaces.getUserWorkspaces.useQuery()
    const [modalOpened, { toggle: openModal, close: closeModal }] = useDisclosure(false);

    return (<>
        <Head>
            <title>Kamba - Gorevler</title>
        </Head>
        <ShellLayout>
            <Container>
                <Stack>
                    <Group position='apart' >
                        <Title>
                            Ana Sayfa
                        </Title>
                        <Button
                            onClick={openModal}
                            leftIcon={<IconPlus size={18} />}>
                            Yeni Kamba oluştur
                        </Button>
                    </Group>
                    <Grid>
                        {data?.length === 0 ? <>
                            <Grid.Col span={12}>
                                <Paper withBorder p={"xl"} mt="lg" >
                                    <Stack align={"center"}>
                                        <Text weight={"bold"}>
                                            Şu anda hiç çalışma alanınız yok.
                                        </Text>
                                        <Text>
                                            Yeni bir çalışma alanı oluşturmak için yukarıdaki butona tıklayın.
                                        </Text>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                        </> :
                            <>
                                {data?.map(workspace => {
                                    return <Grid.Col span={4} key={workspace.id}>
                                        <Paper component={Link} href={`/alan/${workspace.slug}`} bg={"gray"} withBorder p={"xl"}>
                                            <Stack spacing={"xs"}>
                                                <Title order={3}>
                                                    {workspace.name}
                                                </Title>
                                                <Text>
                                                    {`${workspace.items.length} görev`}
                                                </Text>
                                                <Group position='right'>
                                                    <Avatar.Group>
                                                        {
                                                            workspace.users.map(user => {
                                                                return <Tooltip key={user.id} label={user.name}>
                                                                    <Avatar radius={"xl"} src={user.image} />
                                                                </Tooltip>
                                                            })
                                                        }
                                                    </Avatar.Group>
                                                </Group>
                                            </Stack>
                                        </Paper>

                                    </Grid.Col>
                                })}
                            </>}
                    </Grid>
                </Stack>
            </Container>
            <CreateNewWorkspace open={modalOpened} setClose={closeModal} />
        </ShellLayout>
    </>
    )
}

export default Dashboard;

const CreateNewWorkspace = ({ open, setClose }: { open: boolean, setClose: () => void }) => {
    const [title, setTitle] = useState("")
    const { mutate, isLoading, } = trpc.workspaces.createNewWorkspace.useMutation({
        onSuccess: () => {
            setClose()
        },
        onError: () => {
            showNotification({
                title: "Hata",
                message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
            })
        }
    })
    return (
        <Modal
            title="Yeni Çalışma Alanı Oluştur"
            opened={open}
            onClose={setClose}
        >
            <TextInput my={"md"} placeholder='Benim Çalıma Alanım' label='Çalışma Alanı Adı' value={title} onChange={({ target: { value } }) => setTitle(value)} />
            <Group position='right'>
                <Button
                    loading={isLoading}
                    onClick={() => mutate({
                        name: title
                    })}
                    disabled={title.length < 3}>
                    Oluştur
                </Button>
            </Group>
        </Modal>
    )
}