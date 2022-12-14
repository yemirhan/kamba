
import { api } from '@acme/api/src/client';
import { AppShell, Avatar, Button, Container, Flex, Grid, Group, Loader, Paper, Stack, Text, Title, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { GetServerSideProps } from 'next';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { useEffect } from 'react'
import { CreateNewWorkspace } from '../../../components/CreateNewWorkspace';
import { ShellLayout } from '../../../components/ShellLayout';



const Dashboard = () => {
    const { query } = useRouter();
    const { data, isLoading, } = api.boards.getUserBoards.useQuery({
        workspaceId: query.workspaceId as string
    })
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
                        <AnimatePresence>
                            {isLoading && <Grid.Col span={12}>
                                <Paper component={motion.div}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    withBorder p={"xl"} radius="md">
                                    <Flex align={"center"} justify="center">
                                        <Loader size="lg" />
                                    </Flex>
                                </Paper>
                            </Grid.Col>}
                            {data?.length === 0 ? <>
                                <Grid.Col span={12}>
                                    <Paper
                                        component={motion.div}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        withBorder p={"xl"} mt="lg" >
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
                                            <Paper
                                                component={Link} href={`/alan/${workspace.slug}`} bg={"gray"} withBorder p={"xl"}>
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
                        </AnimatePresence>
                    </Grid>
                </Stack>
            </Container>
            <CreateNewWorkspace open={modalOpened} setClose={closeModal} />
        </ShellLayout>
    </>
    )
}

export default Dashboard;

